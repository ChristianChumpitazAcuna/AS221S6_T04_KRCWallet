import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import ContractService from "@/service/contractService";
import { Address } from "viem";

interface TransferTokenProps {
	contract: ContractService;
	onTransfer: () => void;
}

export default function TransferToken({
	contract,
	onTransfer,
}: TransferTokenProps) {
	const [amount, setAmount] = useState<string>("");
	const [receiver, setReceiver] = useState<Address>();
	const [loading, setLoading] = useState<boolean>(false);

	const transferToken = async () => {
		if (contract && receiver) {
			setLoading(true);
			try {
				await contract.transfer(receiver, amount);
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
			<CardContent className="space-y-6">
				<div className="space-y-2 pt-4">
					<label className="text-sm text-muted-foreground">
						Cuenta Destino
					</label>
					<Input
						placeholder="0x..."
						value={receiver}
						onChange={(e) => setReceiver(e.target.value as Address)}
					/>
				</div>
				<div className="space-y-2">
					<label className="text-sm text-muted-foreground">Monto</label>
					<Input
						placeholder="0.00"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
					/>
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
