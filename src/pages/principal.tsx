import MenuBar from "@/components/shared/menuBar";
import NavBar from "@/components/shared/navBar";
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
		<section className="w-full h-screen flex flex-col gap-y-4 bg-neutral-100 dark:bg-neutral-900">
			<NavBar
				accounts={accounts}
				selectedAccount={account}
				onAccountChange={handleAccountChange}
			/>
			<section className="h-full flex flex-row gap-x-6 items-center justify-center">
				<TokenInfo account={account!} balance={balance} />
				<TransferToken
					account={account!}
					contract={contract}
					onTransfer={fetchBalance}
				/>
			</section>
			<section>
				<MenuBar />
			</section>
		</section>
	);
}
