import { holesky } from "viem/chains";
import { contractABI } from "../ABI/contractABI";
import {
	Address,
	createPublicClient,
	createWalletClient,
	custom,
	http,
	PublicClient,
	WalletClient,
} from "viem";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as Address;

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
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "name",
			});

			return name;
		} catch (e) {
			console.error("Error al obtener el nombre del contrato: ", e);
			throw e;
		}
	}

	async getSymbol(): Promise<string> {
		try {
			const symbol = this.publicClient.readContract({
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "symbol",
			});

			return symbol;
		} catch (e) {
			console.error("Error al obtener el simbolo del contrato: ", e);
			throw e;
		}
	}

	async getDecimals(): Promise<number> {
		try {
			const decimals = this.publicClient.readContract({
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "decimals",
			});

			return decimals;
		} catch (e) {
			console.error("Error al obtener los decimales del contrato: ", e);
			throw e;
		}
	}

	async getTotalSupply(): Promise<bigint> {
		try {
			const totalSupply = this.publicClient.readContract({
				address: CONTRACT_ADDRESS,
				abi: contractABI,
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
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "balanceOf",
				args: [account],
			});

			const simbol = await this.getSymbol();
			const decimals = await this.getDecimals();
			const amount = this.formatAmount(balance, decimals);

			return `${amount} ${simbol}`;
		} catch (e) {
			console.error("Error al obtener el balance: ", e);
			throw e;
		}
	}

	async transfer(recipient: Address, amount: string): Promise<void> {
		if (!this.walletClient) {
			throw new Error("No se ha conectado la billetera");
		}

		try {
			const decimals = await this.getDecimals();
			const amountFormat = BigInt(
				Math.floor(parseFloat(amount) * 10 ** decimals)
			);

			const [account] = await this.walletClient.getAddresses();

			const { request } = await this.publicClient.simulateContract({
				account: account,
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "transfer",
				args: [recipient, amountFormat],
			});

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
			console.error("Error al transferir tokens: ", e);
			throw e;
		}
	}

	async approve(spender: Address, amount: string): Promise<void> {
		if (!this.walletClient) {
			throw new Error("No se ha conectado la billetera");
		}

		try {
			const decimals = await this.getDecimals();
			const amountFormat = BigInt(
				Math.floor(parseFloat(amount) * 10 ** decimals)
			);

			const [account] = await this.walletClient.getAddresses();

			const { request } = await this.publicClient.simulateContract({
				account: account,
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "approve",
				args: [spender, amountFormat],
			});

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
			console.error("Error al aprobar tokens: ", e);
			throw e;
		}
	}

	async getAllowance(owner: Address, spender: Address): Promise<string> {
		try {
			const allowance = await this.publicClient.readContract({
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "allowance",
				args: [owner, spender],
			});

			const simbol = await this.getSymbol();
			const decimals = await this.getDecimals();
			const amount = this.formatAmount(allowance, decimals);

			return `${amount} ${simbol}`;
		} catch (e) {
			console.error("Error al obtener la aprobación: ", e);
			throw e;
		}
	}

	private formatAmount(amount: bigint, decimals: number): string {
		const formatedAmount = amount / BigInt(10 ** decimals);
		return formatedAmount.toString();
	}
}
