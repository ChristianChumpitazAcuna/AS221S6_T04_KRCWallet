import { Ghost } from "lucide-react";
import SelectAccount from "./selectAccount";
import ThemeToggle from "./themeToggle";

interface SelectAccountProps {
	accounts: string[];
	selectedAccount: string | null;
	onAccountChange: (newAccount: string) => void;
}

export default function NavBar({
	accounts,
	selectedAccount,
	onAccountChange,
}: SelectAccountProps) {
	return (
		<nav className="h-[4rem] px-6 flex items-center justify-between border-b bg-background">
			<div className="flex items-center space-x-4">
				<Ghost className="h-6 w-6" />
				<span className="text-lg font-bold">KR Wallet</span>
			</div>

			<div className="flex items-center space-x-4">
				<ThemeToggle />
				<SelectAccount
					accounts={accounts}
					selectedAccount={selectedAccount}
					onAccountChange={onAccountChange}
				/>
			</div>
		</nav>
	);
}
