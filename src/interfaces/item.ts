import { Address } from "viem";

export interface createItem {
	name: string;
	description: string;
	imageURI: string;
	price: string;
}

export interface Item {
	id: bigint;
	name: string;
	description: string;
	imageURI: string;
	price: string;
	seller: Address;
	isActive: boolean;
}
