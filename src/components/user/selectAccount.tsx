import { Wallet } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Card } from "../ui/card";
interface SelectAccountProps {
	accounts: string[];
	selectedAccount: string | null;
	onAccountChange: (newAccount: string) => void;
}

export default function SelectAccount({
	accounts,
	selectedAccount,
	onAccountChange,
}: SelectAccountProps) {
	return (
		<Card>
			<Select onValueChange={onAccountChange} value={selectedAccount || ""}>
				<SelectTrigger className="w-[280px] border-none">
					<Wallet className="mr-2 h-4 w-4" />
					<SelectValue placeholder="Selecciona una Cuenta" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Cuentas de MetaMask</SelectLabel>
						{accounts.map((account) => (
							<SelectItem key={account} value={account}>
								{account.slice(0, 7)}...{account.slice(-5)}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</Card>
	);
}
