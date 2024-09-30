// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

/// @title MyToken - A simple ERC20-like token implementation
/// @author Team-04
/// @notice This contract implements a basic token with transfer functionality
/// @dev This contract does not implement all ERC20 functions, it's a simplified version for educational purposes

contract MyToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    /// @notice Emitted when tokens are transferred from one account to another
    /// @param from The account sending the tokens
    /// @param to The account receiving the tokens
    /// @param value The amount of tokens transferred
    event Transfer(address indexed from, address indexed to, uint256 value);

    /// @notice Creates a new MyToken contract
    /// @dev Sets the token name, symbol, and mints the initial supply to the contract creator
    /// @param _name The name of the token
    /// @param _symbol The symbol of the token
    /// @param _initialSupply The initial supply of tokens to mint
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = 18;
        _totalSupply = _initialSupply * 10 ** uint256(decimals);
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    /// @notice Returns the total supply of tokens
    /// @return The total number of tokens in existence
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /// @notice Returns the balance of a specific address
    /// @param owner The address to query the balance of
    /// @return The number of tokens owned by the specified address
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    /// @notice Transfers tokens from the sender to a recipient
    /// @dev Emits a Transfer event upon successful transfer
    /// @param recipient The address to receive the tokens
    /// @param amount The number of tokens to transfer
    /// @return A boolean indicating whether the transfer was successful
    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(
            _balances[msg.sender] >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
}
