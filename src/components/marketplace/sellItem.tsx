import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { createItem } from "@/interfaces/item";
import ContractService from "@/service/contractService";
import { Address } from "viem";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { Card } from "../ui/card";
import { ArrowRight, Loader2, PlusCircle } from "lucide-react";
import { extracErrorMessages } from "@/validations/utlis/errorUtils";

interface SellItemProps {
	contract: ContractService;
	account: Address;
	onRefreshData: () => void;
}

export default function SellItem({
	contract,
	account,
	onRefreshData,
}: SellItemProps) {
	const [item, setItem] = useState<createItem>({
		name: "",
		description: "",
		imageURI: "",
		price: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	const sellItem = async () => {
		if (contract && account) {
			setLoading(true);

			try {
				await contract.sellItem(item);
				toast.success("Item vendido correctamente");
			} catch (error) {
				const errorMessage = extracErrorMessages(error);
				toast.error(errorMessage);
			} finally {
				setLoading(false);
				setItem({
					name: "",
					description: "",
					imageURI: "",
					price: "",
				});
				setIsDialogOpen(false);
				onRefreshData();
			}
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button className="inline-flex rounded-full px-5 py-2">
					<PlusCircle className="w-5 h-5" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crea un nuevo item</DialogTitle>
					<DialogDescription>
						Ingresa los datos del item que deseas vender
					</DialogDescription>
				</DialogHeader>
				<Card className="flex flex-col gap-y-3 border-none">
					<Input
						type="text"
						placeholder="Nombre"
						value={item.name}
						onChange={(e) => setItem({ ...item, name: e.target.value })}
					/>
					<Input
						type="text"
						placeholder="Descripción"
						value={item.description}
						onChange={(e) => setItem({ ...item, description: e.target.value })}
					/>
					<Input
						type="url"
						placeholder="URL de la imagen"
						value={item.imageURI}
						onChange={(e) => setItem({ ...item, imageURI: e.target.value })}
					/>
					<Input
						type="number"
						placeholder="Precio"
						value={item.price}
						onChange={(e) => setItem({ ...item, price: e.target.value })}
					/>
					<div className="inline-flex gap-x-4 items-center justify-center mt-6">
						<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
							Cancelar
						</Button>
						<Button onClick={sellItem} disabled={loading} type="submit">
							{loading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Vendiendo...
								</>
							) : (
								<>
									Vender Item <ArrowRight className="ml-2 h-4 w-4" />
								</>
							)}
						</Button>
					</div>
				</Card>
			</DialogContent>

			<Toaster position="top-right" />
		</Dialog>
	);
}
