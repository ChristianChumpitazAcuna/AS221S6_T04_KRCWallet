import AppSidebar from "@/components/shared/appSideBar";
import Header from "@/components/shared/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	const handleSidebarOpen = () => {
		setSidebarOpen((setSidebarOpen) => !setSidebarOpen);
	};

	return (
		<SidebarProvider open={sidebarOpen} onOpenChange={handleSidebarOpen}>
			<AppSidebar />
			<SidebarInset className="w-full h-screen">
				<Header onSidebarOpen={handleSidebarOpen} />
				<main className="h-full overflow-y-auto py-4">
					<Outlet />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
