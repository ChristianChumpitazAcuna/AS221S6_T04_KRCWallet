import ThemeToggle from "@/components/themeToggle";
import SelectAccount from "@/components/user/selectAccount";
import TransferToken from "@/components/user/transferTokens";
import TokenInfo from "@/components/user/userInfo";
import { useContract } from "@/hooks/useContract";
import { useEffect, useState } from "react";

export default function Principal() {
	const { contract, account, accounts, handleAccountChange } = useContract();
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
		<section
			className="w-full h-screen flex flex-row items-center justify-center gap-x-4 
			bg-gray-300 dark:bg-gray-950"
		>
			<ThemeToggle />
			<TokenInfo account={account!} balance={balance} />
			<TransferToken
				account={account!}
				contract={contract}
				onTransfer={fetchBalance}
			/>

			<SelectAccount
				accounts={accounts}
				selectedAccount={account}
				onAccountChange={handleAccountChange}
			/>
		</section>
	);
}
