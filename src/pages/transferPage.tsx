import TransferToken from "@/components/user/transferTokens";
import { useContract } from "@/hooks/useContract";
import { useEffect, useState } from "react";

export default function TransferPage() {
	const { contract, account } = useContract();
	const [, setBalance] = useState<string>("");

	useEffect(() => {
		fetchBalance();
	}, [account, contract]);

	const fetchBalance = async () => {
		if (account && contract) {
			const balance = await contract.getBalanceOf(account);
			setBalance(balance);
		}
	};

	return (
		<section className="h-screen w-full flex flex-row items-center justify-center gap-x-4">
			<TransferToken
				account={account!}
				contract={contract}
				onTransfer={fetchBalance}
			/>
		</section>
	);
}
