import ContractService from "@/service/contractService";
import { useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";
import { Card, CardContent, CardFooter } from "../ui/card";
import { ArrowRight, CheckCircle, Copy, Loader2, Shield } from "lucide-react";
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
import { isValidAddress, isValidAmount } from "@/validations/utlis/validators";
import { Toaster } from "../ui/sonner";

const spender = import.meta.env.VITE_CONTRACT_MARKETPLACE_ADDRESS as Address;

interface AprroveTransferProps {
	account: Address;
	contract: ContractService;
}

export default function ApproveTransfer({
	account,
	contract,
}: AprroveTransferProps) {
	const [amount, setAmount] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
	const [currentAllowance, setCurrentAllowance] = useState<string>("");

	const handleApproval = async () => {
		if (
			contract &&
			spender &&
			isValidAddress(spender) &&
			isValidAmount(amount)
		) {
			setLoading(true);
			try {
				await contract.approve(spender, amount);
				toast.success("Aprobación exitosa");
				setIsDialogOpen(false);
				setAmount("");
			} catch (e) {
				toast.error("Error al aprobar");
			} finally {
				setLoading(false);
			}
		}
	};

	const checkCurrentAllowance = async () => {
		if (contract && spender && isValidAddress(spender)) {
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
		<Card className="border-none shadow-none">
			<CardContent className="space-y-6">
				<div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-lg">
					<div className="flex items-center gap-2">
						<Shield className="w-4 h-4 text-primary" />
						<span className="text-sm font-medium">Aprobación actual:</span>
					</div>
					<span className="font-bold tabular-nums">{currentAllowance}</span>
				</div>
				<div className="space-y-2">
					<label htmlFor="amount" className="text-sm text-muted-foreground">
						Cantidad a Aprobar
					</label>
					<Input
						id="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						onChangeCapture={checkCurrentAllowance}
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
							disabled={
								!spender || !isValidAddress(spender) || !isValidAmount(amount)
							}
						>
							Revisar Aprobación
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle className="flex items-center gap-2">
								<Shield className="w-5 h-5 text-primary" />
								Confirmar Aprobación
							</DialogTitle>
							<DialogDescription className="text-sm text-muted-foreground">
								Estás a punto de permitir que MarketPlace gaste tokens KRC de tu
								cuenta en tu nombre para realizar compras.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">
									Tu cuenta:
								</label>
								<div className="flex items-center gap-2 p-2 bg-muted/40 rounded-lg">
									<code className="text-xs flex-1 font-mono truncate">
										{account}
									</code>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Copy className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">
									Cuenta autorizada:
								</label>
								<div className="flex items-center gap-2 p-2 bg-muted/40 rounded-lg">
									<code className="text-xs flex-1 font-mono truncate">
										{spender}
									</code>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Copy className="h-4 w-4" />
									</Button>
								</div>
							</div>

							<div className="space-y-2">
								<label className="text-sm font-medium text-muted-foreground">
									Cantidad a aprobar:
								</label>
								<div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
									<span className="font-bold text-lg">{amount} KRC</span>
									<CheckCircle className="h-5 w-5 text-primary ml-auto" />
								</div>
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
			<Toaster position="top-right" richColors />
		</Card>
	);
}
