import { holesky } from "viem/chains";
import { tokenABI } from "../ABI/tokenABI";
import {
	Address,
	createPublicClient,
	createWalletClient,
	custom,
	http,
	PublicClient,
	WalletClient,
} from "viem";
import { marketplaceABI } from "@/ABI/marketplaceABI";
import { createItem, Item } from "@/interfaces/item";
import { extracErrorMessages } from "@/validations/utlis/errorUtils";

const CONTRACT_TOKEN_ADDRESS = import.meta.env
	.VITE_CONTRACT_TOKEN_ADDRESS as Address;
const CONTRACT_MARKETPLACE_ADDRESS = import.meta.env
	.VITE_CONTRACT_MARKETPLACE_ADDRESS as Address;

export default class ContractService {
	private walletClient: WalletClient | null = null;
	private publicClient: PublicClient;

	constructor() {
		this.publicClient = createPublicClient({
			chain: holesky,
			transport: http(),
		});
		this.connectWallet();
	}

	private connectWallet() {
		if (typeof window !== "undefined" && window.ethereum) {
			this.walletClient = createWalletClient({
				chain: holesky,
				transport: custom(window.ethereum),
			});
		}
	}

	async getName(): Promise<string> {
		try {
			const name = await this.publicClient.readContract({
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "name",
			});

			return name;
		} catch (e) {
			console.error("Error al obtener el nombre del contrato: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async getSymbol(): Promise<string> {
		try {
			const symbol = this.publicClient.readContract({
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "symbol",
			});

			return symbol;
		} catch (e) {
			console.error("Error al obtener el simbolo del contrato: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async getDecimals(): Promise<number> {
		try {
			const decimals = this.publicClient.readContract({
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "decimals",
			});

			return decimals;
		} catch (e) {
			console.error("Error al obtener los decimales del contrato: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async getTotalSupply(): Promise<bigint> {
		try {
			const totalSupply = this.publicClient.readContract({
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "totalSupply",
			});

			return totalSupply;
		} catch (e) {
			console.error("Error al obtener el total de tokens: ", e);
			throw e;
		}
	}

	async getBalanceOf(account: Address): Promise<string> {
		try {
			const balance = await this.publicClient.readContract({
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "balanceOf",
				args: [account],
			});

			const simbol = await this.getSymbol();
			const amount = await this.formatAmount(balance.toString(), false);

			return `${amount} ${simbol}`;
		} catch (e) {
			console.error("Error al obtener el balance: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async transfer(recipient: Address, amount: string): Promise<void> {
		if (!this.walletClient) throw new Error("No se ha conectado la billetera");

		try {
			const amountFormat = BigInt(await this.formatAmount(amount, true));

			const [account] = await this.walletClient.getAddresses();

			const { request } = await this.publicClient.simulateContract({
				account: account,
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "transfer",
				args: [recipient, amountFormat],
			});

			await this.writeContract(request);
		} catch (e) {
			console.error("Error al transferir tokens: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async approve(spender: Address, amount: string): Promise<void> {
		if (!this.walletClient) throw new Error("No se ha conectado la billetera");

		try {
			const amountFormat = BigInt(await this.formatAmount(amount, true));

			const [account] = await this.walletClient.getAddresses();

			const { request } = await this.publicClient.simulateContract({
				account: account,
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "approve",
				args: [spender, amountFormat],
			});

			await this.writeContract(request);
		} catch (e) {
			console.error("Error al aprobar tokens: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async getAllowance(owner: Address, spender: Address): Promise<string> {
		try {
			const allowance = await this.publicClient.readContract({
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "allowance",
				args: [owner, spender],
			});

			const simbol = await this.getSymbol();
			const amount = await this.formatAmount(allowance.toString(), false);

			return `${amount} ${simbol}`;
		} catch (e) {
			console.error("Error al obtener la aprobación: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async transferFrom(
		sender: Address,
		recipient: Address,
		amount: string
	): Promise<void> {
		if (!this.walletClient) throw new Error("No se ha conectado la billetera");

		try {
			const amountFormat = BigInt(await this.formatAmount(amount, true));

			const [account] = await this.walletClient.getAddresses();

			const { request } = await this.publicClient.simulateContract({
				account: account,
				address: CONTRACT_TOKEN_ADDRESS,
				abi: tokenABI,
				functionName: "transferFrom",
				args: [sender, recipient, amountFormat],
			});

			await this.writeContract(request);
		} catch (e) {
			console.error("Error al transferir tokens: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async sellItem(item: createItem): Promise<void> {
		if (!this.walletClient) throw new Error("No se ha conectado la billetera");

		try {
			const priceFormat = BigInt(await this.formatAmount(item.price, true));
			const [account] = await this.walletClient.getAddresses();

			const { request } = await this.publicClient.simulateContract({
				account: account,
				address: CONTRACT_MARKETPLACE_ADDRESS,
				abi: marketplaceABI,
				functionName: "sellItem",
				args: [item.name, item.description, item.imageURI, priceFormat],
			});

			await this.writeContract(request);
		} catch (e) {
			console.error("Error al vender item: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async buyItem(itemId: bigint): Promise<void> {
		if (!this.walletClient) throw new Error("No se ha conectado la billetera");

		try {
			const [account] = await this.walletClient.getAddresses();

			const { request } = await this.publicClient.simulateContract({
				account: account,
				address: CONTRACT_MARKETPLACE_ADDRESS,
				abi: marketplaceABI,
				functionName: "buyItem",
				args: [itemId],
			});

			await this.writeContract(request);
		} catch (e) {
			console.error("Error al comprar item: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async getAllItems(): Promise<Item[]> {
		try {
			const items = await this.publicClient.readContract({
				address: CONTRACT_MARKETPLACE_ADDRESS,
				abi: marketplaceABI,
				functionName: "getAllItems",
			});

			const itemsFormatted = await Promise.all(
				items.map(async (item: any) => ({
					id: item.id,
					name: item.name,
					description: item.description,
					imageURI: item.imageURI,
					price: (await this.formatAmount(item.price, false)).toString(),
					seller: item.seller,
					isActive: item.isActive,
				}))
			);

			return itemsFormatted;
		} catch (e) {
			console.error("Error al obtener items: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	async getItemsBySeller(account: Address): Promise<Item[]> {
		try {
			const items = await this.publicClient.readContract({
				address: CONTRACT_MARKETPLACE_ADDRESS,
				abi: marketplaceABI,
				functionName: "getItemsBySeller",
				args: [account],
			});

			const itemsFormatted = await Promise.all(
				items.map(async (item: any) => ({
					id: item.id,
					name: item.name,
					description: item.description,
					imageURI: item.imageURI,
					price: (await this.formatAmount(item.price, false)).toString(),
					seller: item.seller,
					isActive: item.isActive,
				}))
			);

			return itemsFormatted;
		} catch (e) {
			console.error("Error al obtener items: ", e);
			throw new Error(extracErrorMessages(e));
		}
	}

	private async formatAmount(amount: string, forSending: boolean) {
		const decimals = await this.getDecimals();
		const amountBigInt = BigInt(amount);

		if (forSending) {
			return amountBigInt * BigInt(10 ** decimals);
		} else {
			return (amountBigInt / BigInt(10 ** decimals)).toString();
		}
	}

	private async writeContract(request: any) {
		if (!this.walletClient) throw new Error("No se ha conectado la billetera");

		try {
			const txHash = await this.walletClient.writeContract(request);
			const receipt = await this.publicClient.waitForTransactionReceipt({
				hash: txHash,
			});

			if (receipt.status === "success") {
				console.log("Transacción exitosa");
			} else {
				throw new Error("Transacción fallida");
			}
		} catch (e) {
			console.error("Error al escribir contrato: ", e);
			throw e;
		}
	}
}
