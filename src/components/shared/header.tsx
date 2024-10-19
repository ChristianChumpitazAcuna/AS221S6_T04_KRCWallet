import ThemeToggle from "./themeToggle";
import {
	ConnectButton,
	darkTheme,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { NavLink } from "react-router-dom";
import Logo from "../ui/icons/icons";
import useThemeStore from "@/store/themeStore";

export default function Header() {
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
			<header className="fixed w-full h-[4rem] px-6 flex items-center justify-between rounded-b-3xl bg-background shadow-md ">
				<NavLink to={"/"}>
					<div className="flex gap-x-2 items-center hover:scale-105 transition-all duration-700 ease-in-out">
						<Logo className="fill-foreground" />
						<span className="text-lg font-bold">KRC Wallet</span>
					</div>
				</NavLink>

				<div className="flex items-center space-x-4">
					<ThemeToggle />

					<ConnectButton label="Conectar Wallet" />
				</div>
			</header>
		</RainbowKitProvider>
	);
}
