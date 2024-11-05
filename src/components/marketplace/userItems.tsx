import { Card, CardContent } from "../ui/card";
import { Item } from "@/interfaces/item";
import { useEffect, useState } from "react";
import ContractService from "@/service/contractService";
import { Address } from "viem";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Package } from "lucide-react";

interface SellItemProps {
	contract: ContractService;
	account: Address;
}

export default function UserItems({ contract, account }: SellItemProps) {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		getItemsByOwner();
	}, []);

	const getItemsByOwner = async () => {
		if (contract && account) {
			setLoading(true);
			try {
				const data = await contract.getItemsBySeller(account);
				setItems(data);
			} catch (error) {
				console.error("Error al obtener los items del usuario: ", error);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button className="inline-flex rounded-full px-5 py-2">
						<Package className="w-5 h-5" />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Tus items</SheetTitle>
						<SheetDescription>
							Estos son los items que has publicado en el mercado.
						</SheetDescription>
					</SheetHeader>

					<div className="mt-3 h-auto overflow-y-auto">
						{loading ? (
							<p className="text-center text-muted-foreground">
								Cargando items...
							</p>
						) : (
							<div className="flex flex-col gap-y-3">
								{items.map((item) => (
									<Card key={item.id}>
										<CardContent className="p-4 flex gap-x-3">
											<img
												src={item.imageURI}
												alt={item.name}
												className="w-auto h-32 object-cover rounded-md mb-4"
											/>
											<div>
												<h3 className="text-lg font-semibold mb-2">
													{item.name}
												</h3>
												<p className="text-sm text-muted-foreground mb-2">
													{item.description}
												</p>
												<p className="text-lg font-bold">{item.price} KRC</p>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
}
