export const marketplaceABI = [
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "buyItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "deleteItem",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "_krcTokenAddress",
				type: "address",
			},
		],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "string",
				name: "imageURI",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "seller",
				type: "address",
			},
		],
		name: "ItemCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "seller",
				type: "address",
			},
		],
		name: "ItemDeleted",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				indexed: true,
				internalType: "address",
				name: "seller",
				type: "address",
			},
			{
				indexed: true,
				internalType: "address",
				name: "buyer",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "ItemSold",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "string",
				name: "imageURI",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
		],
		name: "sellItem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "buyer",
				type: "address",
			},
		],
		name: "canBuyItem",
		outputs: [
			{
				internalType: "bool",
				name: "canBuy",
				type: "bool",
			},
			{
				internalType: "string",
				name: "reason",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getAllItems",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "string",
						name: "imageURI",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "seller",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isActive",
						type: "bool",
					},
				],
				internalType: "struct Marketplace.Item[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "itemId",
				type: "uint256",
			},
		],
		name: "getItem",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "string",
				name: "",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "",
				type: "address",
			},
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "seller",
				type: "address",
			},
		],
		name: "getItemsBySeller",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "id",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "string",
						name: "description",
						type: "string",
					},
					{
						internalType: "string",
						name: "imageURI",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "price",
						type: "uint256",
					},
					{
						internalType: "address",
						name: "seller",
						type: "address",
					},
					{
						internalType: "bool",
						name: "isActive",
						type: "bool",
					},
				],
				internalType: "struct Marketplace.Item[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getNumberTotalItems",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "items",
		outputs: [
			{
				internalType: "uint256",
				name: "id",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				internalType: "string",
				name: "description",
				type: "string",
			},
			{
				internalType: "string",
				name: "imageURI",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "price",
				type: "uint256",
			},
			{
				internalType: "address",
				name: "seller",
				type: "address",
			},
			{
				internalType: "bool",
				name: "isActive",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "krcToken",
		outputs: [
			{
				internalType: "contract IERC20",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
] as const;
