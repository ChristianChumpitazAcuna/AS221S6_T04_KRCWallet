import ContractService from "@/service/contractService";
import { useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Input } from "../ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface AprroveTransferProps {
	account: Address;
	contract: ContractService;
}

export default function ApproveTransfer({
	account,
	contract,
}: AprroveTransferProps) {
	const [amount, setAmount] = useState<string>("");
	const [spender, setSpender] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [currentAllowance, setCurrentAllowance] = useState<string>("");

	const isValidAddress = (address: string) =>
		/^0x[a-fA-F0-9]{40}$/.test(address);
	const isValidAmount = (value: string) =>
		/^\d+(\.\d+)?$/.test(value) && parseFloat(value) > 0;

	const handleApproval = async () => {
		if (contract && isValidAddress(spender) && isValidAmount(amount)) {
			setLoading(true);
			try {
				await contract.approve(spender as Address, amount);
				toast.success("Aprobación exitosa");
				//   onApproval()
				setIsDialogOpen(false);
				setAmount("");
				setSpender("");
			} catch (e) {
				toast.error("Error al aprobar");
			} finally {
				setLoading(false);
			}
		}
	};

	const checkCurrentAllowance = async () => {
		if (contract && isValidAddress(spender)) {
			try {
				const allowance = await contract.getAllowance(
					account,
					spender as Address
				);
				setCurrentAllowance(allowance);
			} catch (e) {
				console.error("Error al obtener la aprobación actual", e);
				setCurrentAllowance("Error");
			}
		}
	};

	return (
		<Card>
			<CardContent className="space-y-6">
				<div className="space-y-2 pt-4">
					<label htmlFor="spender" className="text-sm text-muted-foreground">
						Cuenta Autorizada
					</label>
					<Input
						id="spender"
						value={spender}
						onChange={(e) => {
							setSpender(e.target.value);
							setCurrentAllowance("");
						}}
						onBlur={checkCurrentAllowance}
						placeholder="0x..."
						className={cn(
							"transition-colors",
							spender &&
								!isValidAddress(spender) &&
								"border-red-500 focus-visible:ring-red-500"
						)}
					/>
					{spender && !isValidAddress(spender) && (
						<p className="text-xs text-red-500">Dirección inválida</p>
					)}
					{currentAllowance && (
						<p className="text-xs text-muted-foreground">
							Aprobación actual: {currentAllowance} tokens
						</p>
					)}
				</div>
				<div className="space-y-2">
					<label htmlFor="amount" className="text-sm text-muted-foreground">
						Cantidad a Aprobar
					</label>
					<Input
						id="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder="0.00"
						className={cn(
							"transition-colors",
							amount &&
								!isValidAmount(amount) &&
								"border-red-500 focus-visible:ring-red-500"
						)}
					/>
					{amount && !isValidAmount(amount) && (
						<p className="text-xs text-red-500">Cantidad inválida</p>
					)}
				</div>
			</CardContent>
			<CardFooter>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogTrigger asChild>
						<Button
							className="w-full"
							disabled={!isValidAddress(spender) || !isValidAmount(amount)}
						>
							Revisar Aprobación
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirmar Aprobación</DialogTitle>
							<DialogDescription>
								Estás a punto de permitir que otra cuenta gaste tokens en tu
								nombre. Por favor, revisa los detalles antes de confirmar.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="flex items-center justify-between">
								<span className="font-medium">Tu cuenta:</span>
								<span className="text-sm text-muted-foreground break-all">
									{account}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium">Cuenta autorizada:</span>
								<span className="text-sm text-muted-foreground break-all">
									{spender}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="font-medium">Cantidad a aprobar:</span>
								<span className="text-lg font-bold">
									{amount} <ShieldCheck className="inline h-5 w-5 ml-1" />
								</span>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								Cancelar
							</Button>
							<Button onClick={handleApproval} disabled={loading}>
								{loading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Aprobando...
									</>
								) : (
									<>
										Confirmar Aprobación <ArrowRight className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	);
}
