import TokenInfo from "@/components/user/userInfo";
import { useContract } from "@/hooks/useContract";
import { useEffect, useState } from "react";

export default function UserInfoPage() {
	const { contract, account } = useContract();
	const [balance, setBalance] = useState<string>("");

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
		<section className="h-fit w-full flex flex-row  justify-center gap-x-4">
			<TokenInfo account={account!} balance={balance} />
		</section>
	);
}
