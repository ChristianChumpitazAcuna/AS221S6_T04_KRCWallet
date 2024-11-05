import { Item } from "@/interfaces/item";
import ContractService from "@/service/contractService";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AllItemsProps {
	contract: ContractService;
	account: Address;
}

export default function AllItems({ contract, account }: AllItemsProps) {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		getAllItems();
	}, []);

	const getAllItems = async () => {
		if (contract && account) {
			setLoading(true);
			try {
				const data = await contract.getAllItems();
				setItems(data);
			} catch (error) {
				console.error("Error al obtener los items: ", error);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Todos los items</CardTitle>
			</CardHeader>
			<CardContent>
				{loading ? (
					<p className="text-center text-muted-foreground">Cargando items...</p>
				) : (
					<div className="flex flex-row gap-x-3">
						{items.map((item) => (
							<Card key={item.id}>
								<CardContent className="p-4">
									<img
										src={item.imageURI}
										alt={item.name}
										className="w-full h-48 object-cover rounded-md mb-4"
									/>
									<h3 className="text-lg font-semibold mb-2">{item.name}</h3>
									<p className="text-sm text-muted-foreground mb-2">
										{item.description}
									</p>
									<p className="text-lg font-bold">{item.price} KRC</p>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
