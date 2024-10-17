import { Ghost } from "lucide-react";
import ThemeToggle from "./themeToggle";
import {
	ConnectButton,
	darkTheme,
	lightTheme,
	RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";

export default function NavBar() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const localTheme = localStorage.getItem("theme");
		setTheme(localTheme as "light" | "dark");
		document.documentElement.classList.toggle("dark", localTheme === "dark");
	}, []);

	const handleThemeChange = (newTheme: "light" | "dark") => {
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

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
			<nav className="h-[4rem] px-6 flex items-center justify-between border-b bg-background">
				<div className="flex items-center space-x-4">
					<Ghost className="h-6 w-6" />
					<span className="text-lg font-bold">KRC Wallet</span>
				</div>

				<div className="flex items-center space-x-4">
					<ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />

					<ConnectButton label="Conectar Wallet" />
				</div>
			</nav>
		</RainbowKitProvider>
	);
}
