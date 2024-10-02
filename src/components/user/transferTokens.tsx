import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { LoaderCircle, User } from "lucide-react";

interface TransferTokenProps {
	account: string;
	contract: any;
	onTransfer: () => void;
}

export default function TransferToken({
	account,
	contract,
	onTransfer,
}: TransferTokenProps) {
	const [amount, setAmount] = useState<string>("");
	const [receiver, setReceiver] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const transferToken = async () => {
		if (contract && receiver) {
			setLoading(true);
			try {
				await contract.transfer(receiver, amount, account!);
				toast.success("Transferencia exitosa");
				onTransfer();
			} catch (e) {
				toast.error("Error al transferir");
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="uppercase text-center">Transfer Tokens</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-10">
				<CardDescription>
					<div className="flex items-center space-x-4 p-4">
						<User className="h-6 w-6" />
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium leading-none">Account</p>
							<p className="text-sm text-muted-foreground">{account}</p>
						</div>
					</div>
				</CardDescription>
				<CardDescription>
					<label>Cuenta Destino</label>
					<Input
						value={receiver}
						onChange={(e) => setReceiver(e.target.value)}
					/>
				</CardDescription>
				<CardDescription>
					<label>Monto</label>
					<Input value={amount} onChange={(e) => setAmount(e.target.value)} />
				</CardDescription>
				<Button
					onClick={transferToken}
					type="submit"
					disabled={loading}
					className="w-full"
				>
					{loading ? (
						<div className="flex items-center justify-center gap-2">
							<LoaderCircle className="w-4 h-4 animate-spin" />
							<span>Transferiendo...</span>
						</div>
					) : (
						<span>Transferir</span>
					)}
				</Button>
			</CardContent>
			<Toaster />
		</Card>
	);
}
