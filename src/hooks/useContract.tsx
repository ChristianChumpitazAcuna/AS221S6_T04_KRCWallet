import { useEffect, useState } from "react";
import ContractService from "../service/contractService";
import { useAccount } from "wagmi";

export const useContract = () => {
	const [contract, setContract] = useState<ContractService | null>(null);
	const { isConnected, address } = useAccount();

	useEffect(() => {
		initContract();
	}, [isConnected]);

	const initContract = () => {
		if (isConnected) {
			try {
				const contract = new ContractService();
				setContract(contract);
			} catch (e) {
				console.error(e);
			}
		} else {
			setContract(null);
		}
	};

	return { isConnected, contract, account: address };
};
