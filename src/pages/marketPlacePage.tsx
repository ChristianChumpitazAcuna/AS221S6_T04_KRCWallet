import AllItems from "@/components/marketplace/allItems";
import BuyItem from "@/components/marketplace/buyItem";
import SellItem from "@/components/marketplace/sellItem";
import UserItems from "@/components/marketplace/userItems";
import { Toaster } from "@/components/ui/sonner";
import { useContract } from "@/hooks/useContract";
import { Item } from "@/interfaces/item";
import { extracErrorMessages } from "@/validations/utlis/errorUtils";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";

const spender = import.meta.env.VITE_CONTRACT_MARKETPLACE_ADDRESS as Address;

export default function MarketPlacePage() {
	const { contract, account } = useContract();
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<Item | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [currentAllowance, setCurrentAllowance] = useState<string>("");
	const [buying, setBuying] = useState<boolean>(false);

	useEffect(() => {
		getData();
	}, [contract, account]);

	useEffect(() => {
		checkCurrentAllowance();
	}, [contract, account, spender]);

	const getData = async () => {
		if (contract && account) {
			setLoading(true);
			try {
				const data = await contract.getAllItems();
				setItems(data);
			} catch (error) {
				const errorMessage = extracErrorMessages(error);
				toast.error(errorMessage);
			} finally {
				setLoading(false);
			}
		}
	};

	const checkCurrentAllowance = async () => {
		if (contract && spender) {
			try {
				const allowance = await contract.getAllowance(
					account as Address,
					spender
				);
				setCurrentAllowance(allowance);
			} catch (e) {
				const errorMessage = extracErrorMessages(e);
				toast.error(errorMessage);
				setCurrentAllowance("Error");
			}
		}
	};

	const handlePurchaseClick = async (item: Item) => {
		setSelectedItem(item);
		setShowModal(true);
	};

	const buyItem = async (id: bigint) => {
		if (contract && account) {
			setBuying(true);
			try {
				await contract.buyItem(id);
				toast.success("Item comprado con éxito");
			} catch (error) {
				const errorMessage = extracErrorMessages(error);
				toast.error(errorMessage);
			} finally {
				setBuying(false);
				setShowModal(false);
				getData();
			}
		}
	};

	if (!contract || !account) return null;

	return (
		<section className="w-full h-full flex flex-col justify-center items-center gap-y-3 pr-2">
			<AllItems
				data={items}
				isLoading={loading}
				onPurchaseClick={handlePurchaseClick}
			/>
			<nav className="inline-flex gap-x-3 px-10 py-2 border-2 w-fit rounded-3xl justify-center">
				<SellItem contract={contract} account={account} onRefreshData={getData}/>
				<UserItems contract={contract} account={account} />
			</nav>

			<BuyItem
				item={selectedItem}
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				currentAllowance={currentAllowance}
				onBuy={buyItem}
				isBuying={buying}
			/>
			<Toaster position="top-right" richColors />
		</section>
	);
}
