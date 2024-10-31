import ThemeToggle from "./themeToggle";
import {
	ConnectButton,
	darkTheme,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import useThemeStore from "@/store/themeStore";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
	onSidebarOpen: () => void;
}

export default function Header({ onSidebarOpen }: HeaderProps) {
	const { theme } = useThemeStore();

	return (
		<RainbowKitProvider
			theme={
				theme === "dark"
					? darkTheme({
							accentColor: "#ffffff",
							accentColorForeground: "#0a0a0a",
					  })
					: lightTheme({
							accentColor: "#0a0a0a",
							accentColorForeground: "#ffffff",
					  })
			}
			coolMode
			showRecentTransactions
		>
			<header
				className="w-full h-[4rem] px-6 flex items-center justify-between 
			rounded-b-lg bg-primary-foreground border-2"
			>
				<Button
					onClick={onSidebarOpen}
					variant="outline"
					size="icon"
					className="dark:bg-[#1A1B1F] border-none shadow-lg rounded-xl"
				>
					<Menu className="h-5 w-5" />
				</Button>

				<div className="flex items-center space-x-4">
					<ThemeToggle />

					<ConnectButton label="Conectar Wallet" />
				</div>
			</header>
		</RainbowKitProvider>
	);
}
