import AllItems from "@/components/marketplace/allItems";
import SellItem from "@/components/marketplace/sellItem";
import UserItems from "@/components/marketplace/userItems";
import { useContract } from "@/hooks/useContract";

export default function MarketPlacePage() {
	const { contract, account } = useContract();

	if (!contract || !account) return null;

	return (
		<section className="w-full h-full flex flex-col justify-center items-center gap-y-3 px-3">
			<AllItems contract={contract} account={account} />
			<nav className="inline-flex gap-x-3 px-10 py-2 border-2 w-fit rounded-3xl justify-center">
				<SellItem contract={contract} account={account} />
				<UserItems contract={contract} account={account} />
			</nav>
		</section>
	);
}
