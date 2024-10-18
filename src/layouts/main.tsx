import Header from "@/components/shared/header";
import MenuBar from "@/components/shared/menuBar";
import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<section className="w-full h-screen bg-neutral-200 dark:bg-neutral-900">
			<Header />
			<Outlet />
			<MenuBar />
		</section>
	);
}
