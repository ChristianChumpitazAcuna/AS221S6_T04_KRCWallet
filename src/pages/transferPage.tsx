import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ApproveTransfer from "@/components/user/approveTransfer";
import TransferToken from "@/components/user/transferTokens";
import { useContract } from "@/hooks/useContract";
import { ArrowRightLeft, Coins, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function TransferPage() {
	const { contract, account } = useContract();
	const [balance, setBalance] = useState<string>("");
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

	useEffect(() => {
		fetchBalance();
	}, [account, contract]);

	const fetchBalance = async () => {
		if (account && contract) {
			const balance = await contract.getBalanceOf(account);
			setBalance(balance);
		}
	};

	const renderSelectedComponent = () => {
		if (!account || !contract) return null;

		switch (selectedOption) {
			case "transfer":
				return <TransferToken contract={contract} onTransfer={fetchBalance} />;
			case "approve":
				return <ApproveTransfer account={account} contract={contract} />;
			default:
				return null;
		}
	};

	return (
		<section className="w-full h-full flex justify-center">
			<Card className="w-1/2 h-fit">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">
						Operaciones de Token
					</CardTitle>
					<CardDescription className="text-center">
						Selecciona la operación que deseas realizar
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
						<div className="flex items-center space-x-2">
							<Coins className="h-6 w-6 text-primary" />
							<span className="font-medium">Balance actual:</span>
						</div>
						<span className="text-lg font-bold">{balance}</span>
					</div>					
					<div className="grid grid-cols-2 gap-4">
						<Button
							variant={selectedOption === "transfer" ? "default" : "outline"}
							onClick={() => setSelectedOption("transfer")}
							className="h-20"
						>
							<div className="flex flex-col items-center">
								<ArrowRightLeft className="h-6 w-6 mb-2" />
								<span>Transferir Tokens</span>
							</div>
						</Button>
						<Button
							variant={selectedOption === "approve" ? "default" : "outline"}
							onClick={() => setSelectedOption("approve")}
							className="h-20"
						>
							<div className="flex flex-col items-center">
								<ShieldCheck className="h-6 w-6 mb-2" />
								<span>Aprobar Gasto de Tokens</span>
							</div>
						</Button>
					</div>

					{selectedOption && (
						<div className="mt-6">{renderSelectedComponent()}</div>
					)}
				</CardContent>
			</Card>
			
		</section>
	);
}
