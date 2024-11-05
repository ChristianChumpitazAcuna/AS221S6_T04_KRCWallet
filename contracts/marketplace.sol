import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Marketplace {
    IERC20 private krcToken;

    struct Item {
        uint256 id;
        string name;
        string description;
        string imageURI;
        uint256 price;
        address seller;
        bool isActive;
    }

    uint256 private _itemIds;
    mapping(uint256 => Item) public items;

    event ItemCreated(
        uint256 indexed itemId,
        string name,
        string imageURI,
        uint256 price,
        address indexed seller
    );
    event ItemSold(
        uint256 indexed itemId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );
    event ItemDeleted(uint256 indexed itemId, address indexed seller);

    constructor(address _krcTokenAddress) {
        require(
            _krcTokenAddress != address(0),
            "Direccion de contrato invalida"
        );
        krcToken = IERC20(_krcTokenAddress);
    }

    function sellItem(
        string memory name,
        string memory description,
        string memory imageURI,
        uint256 price
    ) public returns (uint256) {
        require(bytes(name).length > 0, "El nombre no puede estar vacio");
        require(
            bytes(imageURI).length > 0,
            "Debe proporcionar una URI de imagen"
        );
        require(price > 0, "El precio debe ser mayor a cero");

        _itemIds++;
        uint256 newItemId = _itemIds;

        items[newItemId] = Item({
            id: newItemId,
            name: name,
            description: description,
            imageURI: imageURI,
            price: price,
            seller: msg.sender,
            isActive: true
        });

        emit ItemCreated(newItemId, name, imageURI, price, msg.sender);
        return newItemId;
    }

    function buyItem(uint256 itemId) public {
        (bool canBuy, string memory reason) = canBuyItem(itemId, msg.sender);
        require(canBuy, reason);

        Item storage item = items[itemId];
        require(msg.sender != item.seller, "No puedes comprar tu propio item");

        item.isActive = false;

        bool transferred = krcToken.transferFrom(
            msg.sender,
            item.seller,
            item.price
        );
        require(transferred, "Error en la transferencia");

        emit ItemSold(itemId, item.seller, msg.sender, item.price);
    }

    function deleteItem(uint256 itemId) public {
        Item storage item = items[itemId];
        require(
            item.seller == msg.sender,
            "Solo el vendedor puede eliminar el item"
        );
        require(item.isActive, "El item ya esta inactivo");

        item.isActive = false;
        emit ItemDeleted(itemId, msg.sender);
    }

    function canBuyItem(uint256 itemId, address buyer)
        public
        view
        returns (bool canBuy, string memory reason)
    {
        Item storage item = items[itemId];

        if (!item.isActive) {
            return (false, "Item esta inactivo");
        }

        uint256 buyerBalance = krcToken.balanceOf(buyer);
        if (buyerBalance < item.price) {
            return (false, "Balance insuficiente");
        }

        uint256 allowance = krcToken.allowance(buyer, address(this));
        if (allowance < item.price) {
            return (false, "El monto aprobado es menor que el precio del item");
        }

        return (true, "ok");
    }

    function getItem(uint256 itemId)
        public
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            bool
        )
    {
        Item storage item = items[itemId];
        return (
            item.id,
            item.name,
            item.description,
            item.imageURI,
            item.price,
            item.seller,
            item.isActive
        );
    }

    function getNumberTotalItems() public view returns (uint256) {
        return _itemIds;
    }
}
