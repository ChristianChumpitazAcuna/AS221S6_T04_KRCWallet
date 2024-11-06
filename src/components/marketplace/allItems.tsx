import { Item } from "@/interfaces/item";

import { Card, CardContent, CardFooter } from "../ui/card";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

interface AllItemsProps {
	data: Item[];
	isLoading: boolean;
	onPurchaseClick: (item: Item) => void;
}

export default function AllItems({
	data,
	isLoading,
	onPurchaseClick,
}: AllItemsProps) {
	return (
		<>
			<section className="w-full h-full overflow-y-auto p-6 rounded-lg border-2">
				{isLoading ? (
					<p className="text-center text-muted-foreground">Cargando items...</p>
				) : (
					<div className="grid grid-cols-4 gap-2">
						{data.map((item) => (
							<Card key={item.id} className="w-[15rem]">
								<CardContent>
									<img
										src={item.imageURI}
										alt={item.name}
										className="w-full h-48 object-cover rounded-md mt-4 mb-4"
									/>
									<h3 className="text-lg font-semibold mb-2">{item.name}</h3>
									<p className="text-sm text-muted-foreground mb-2">
										{item.description}
									</p>
									<p className="text-sm font-bold px-3 py-1 bg-foreground/5 w-fit rounded-2xl">
										{item.price} KRC
									</p>
								</CardContent>
								<CardFooter className="flex justify-center">
									<Button
										className="flex items-center gap-x-2"
										variant={"outline"}
										onClick={() => onPurchaseClick(item)}
									>
										<ShoppingCart className="w-5 h-5" />
										<span>Comprar</span>
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</section>
		</>
	);
}
