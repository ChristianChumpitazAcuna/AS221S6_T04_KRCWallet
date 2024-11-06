import { Item } from "@/interfaces/item";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface BuyItemProps {
	item: Item | null;
	isOpen: boolean;
	onClose: () => void;
	currentAllowance: string;
	onBuy: (id: bigint) => void;
	isBuying: boolean;
}

export default function BuyItem({
	item,
	isOpen,
	onClose,
	currentAllowance,
	onBuy,
	isBuying,
}: BuyItemProps) {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-2/6">
				<DialogHeader>
					<DialogTitle>Detalles de la compra</DialogTitle>
				</DialogHeader>
				<div className="p-3 bg-muted/50 rounded-lg">
					<div className="text-sm text-muted-foreground flex items-center justify-between">
						<span>Tokens Aprobados Disponibles:</span>
						<span className="font-medium">{currentAllowance}</span>
					</div>
				</div>
				<div className="grid gap-4 py-2">
					<div className="grid grid-cols-4 items-center gap-4">
						<img
							src={item?.imageURI}
							alt={item?.name}
							className="w-full aspect-square object-cover rounded-lg col-span-1"
						/>
						<div className="col-span-3">
							<h3 className="font-semibold mb-1">{item?.name}</h3>
							<p className="text-sm">{item?.description}</p>
							<p className="font-bold ">{item?.price} KRC</p>
						</div>
					</div>

					<div className="border-t-4  pt-4 mt-2">
						<div className="flex justify-between items-center mb-4">
							<span className="font-medium">Total:</span>
							<span className="font-bold text-lg">{item?.price} KRC</span>
						</div>
					</div>
				</div>
				<section className="inline-flex items-center justify-center gap-x-6 w-full">
					<Button onClick={onClose} variant="outline">
						Cancelar
					</Button>
					<Button
						onClick={() => item?.id && onBuy(item.id)}
						disabled={isBuying}
					>
						{isBuying ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Comprando...
							</>
						) : (
							<>
								Confirmar Compra <ArrowRight className="ml-2 h-4 w-4" />
							</>
						)}
					</Button>
				</section>
			</DialogContent>
		</Dialog>
	);
}
