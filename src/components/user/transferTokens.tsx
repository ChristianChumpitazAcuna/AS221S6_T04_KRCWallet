import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
			<CardContent className="space-y-6">
				<div className="bg-neutral-950/5 dark:bg-white/5 rounded-2xl">
					<div className="flex items-center space-x-4 p-4">
						<User className="h-6 w-6" />
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium leading-none">Account</p>
							<p className="text-sm text-muted-foreground">{account}</p>
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<label className="text-sm text-muted-foreground">
						Cuenta Destino
					</label>
					<Input
						value={receiver}
						onChange={(e) => setReceiver(e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm text-muted-foreground">Monto</label>
					<Input value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>

				<Button
					onClick={transferToken}
					type="submit"
					disabled={loading}
					className="w-full"
				>
					{loading ? (
						<div className="flex items-center justify-center gap-2">
							<LoaderCircle className="w-4 h-4 animate-spin" />
							<span>Transfiriendo...</span>
						</div>
					) : (
						<span>Transferir</span>
					)}
				</Button>
			</CardContent>
			<Toaster position="top-right" />
		</Card>
	);
}
