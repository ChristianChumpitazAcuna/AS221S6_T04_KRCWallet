import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import ContractService from "@/service/contractService";
import { Address } from "viem";
import { isValidAddress, isValidAmount } from "@/validations/utlis/validators";
import { cn } from "@/lib/utils";

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
		if (
			contract &&
			receiver &&
			isValidAmount(amount) &&
			isValidAddress(receiver)
		) {
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
		<Card className="border-none shadow-none">
			<CardContent className="space-y-6">
				<div className="space-y-2 pt-4">
					<label className="text-sm text-muted-foreground">
						Cuenta Destino
					</label>
					<Input
						placeholder="0x..."
						value={receiver}
						onChange={(e) => setReceiver(e.target.value as Address)}
						className={cn(
							"transition-colors",
							receiver &&
								!isValidAddress(receiver) &&
								"border-red-500 focus-visible:ring-red-500"
						)}
					/>
					{receiver && !isValidAddress(receiver) && (
						<p className="text-red-500 text-sm">Dirección inválida</p>
					)}
				</div>
				<div className="space-y-2">
					<label className="text-sm text-muted-foreground">Monto</label>
					<Input
						placeholder="0.00"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className={cn(
							"transition-colors",
							amount &&
								!isValidAmount(amount) &&
								"border-red-500 focus-visible:ring-red-500"
						)}
					/>
					{amount && !isValidAmount(amount) && (
						<p className="text-red-500 text-sm">Monto inválido</p>
					)}
				</div>

				<Button
					onClick={transferToken}
					type="submit"
					disabled={
						loading ||
						!receiver ||
						!isValidAddress(receiver) ||
						!isValidAmount(amount)
					}
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
			<Toaster position="top-right" richColors />
		</Card>
	);
}
