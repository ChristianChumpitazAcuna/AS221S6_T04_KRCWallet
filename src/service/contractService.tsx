import Web3 from "web3";
import contractABI from "../ABI/contractABI.json";
import BigNumber from "bignumber.js";

const CONTRACT_ADDRESS = "0x3161801Cb3A21361c10930D106793CC80ae8144F";

interface MyContract {
	methods: {
		name(): {
			call(): Promise<string>;
		};
		symbol(): {
			call(): Promise<string>;
		};
		decimals(): {
			call(): Promise<string>;
		};
		totalSupply(): {
			call(): Promise<string>;
		};
		balanceOf(account: string): {
			call(): Promise<string>;
		};
		transfer(
			to: string,
			amount: string
		): {
			send(options: { from: string }): Promise<any>;
		};
	};
	events: {};
}

export default class ContractService {
	private contract: MyContract;

	constructor(web3: Web3) {
		this.contract = new web3.eth.Contract(
			contractABI as any,
			CONTRACT_ADDRESS
		) as unknown as MyContract;
	}

	async getTotalSupply(): Promise<string> {
		return await this.contract.methods.totalSupply().call();
	}

	async getBalanceOf(account: string): Promise<string> {
		try {
			const balance = await this.contract.methods.balanceOf(account).call();
			const simbol = await this.getSymbol();
			const decimals = await this.getDecimals();
			const amount = this.formatAmount(balance, decimals);
			return `${amount} ${simbol}`;
		} catch (e) {
			console.error("Error: ", e);
			throw e;
		}
	}

	async transfer(to: string, amount: string, from: string): Promise<any> {
		try {
			const decimals = await this.getDecimals();
			const rawAmount = new BigNumber(amount)
				.multipliedBy(new BigNumber(10).pow(decimals))
				.integerValue(BigNumber.ROUND_FLOOR)
				.toString();

			const transfer = await this.contract.methods
				.transfer(to, rawAmount)
				.send({ from });
			return transfer;
		} catch (e) {
			console.error("Error: ", e);
			throw e;
		}
	}

	private formatAmount(amount: string, decimals: string): string {
		const formatedAmount = new BigNumber(amount).dividedBy(
			new BigNumber(10).pow(decimals)
		);
		return formatedAmount.toFixed();
	}

	async getName(): Promise<string> {
		return await this.contract.methods.name().call();
	}

	private async getSymbol(): Promise<string> {
		return await this.contract.methods.symbol().call();
	}

	private async getDecimals(): Promise<string> {
		return await this.contract.methods.decimals().call();
	}
}
