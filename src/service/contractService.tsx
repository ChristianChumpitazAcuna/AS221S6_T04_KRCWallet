import { holesky } from "viem/chains";
import { contractABI } from "../ABI/contractABI";
import {
	Address,
	createPublicClient,
	createWalletClient,
	custom,
	http,
} from "viem";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as Address;

const client = createPublicClient({
	chain: holesky,
	transport: http(),
});
const walletClient = createWalletClient({
	chain: holesky,
	transport: custom(window.ethereum),
});

export default class ContractService {
	async getName(): Promise<string> {
		try {
			const name = await client.readContract({
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
			const symbol = client.readContract({
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
			const decimals = client.readContract({
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
			const totalSupply = client.readContract({
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
			const balance = await client.readContract({
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
		try {
			const decimals = await this.getDecimals();
			const amountFormat = BigInt(
				Math.floor(parseFloat(amount) * 10 ** decimals)
			);

			const [account] = await walletClient.getAddresses();

			const { request } = await client.simulateContract({
				account: account,
				address: CONTRACT_ADDRESS,
				abi: contractABI,
				functionName: "transfer",
				args: [recipient, amountFormat],
			});

			const txHash = await walletClient.writeContract(request);

			const receipt = await client.waitForTransactionReceipt({ hash: txHash });

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

	private formatAmount(amount: bigint, decimals: number): string {
		const formatedAmount = amount / BigInt(10 ** decimals);
		return formatedAmount.toString();
	}
}
