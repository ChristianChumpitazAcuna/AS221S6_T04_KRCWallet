import { MoonStarIcon, SunMedium } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useThemeStore from "@/store/themeStore";
import { useEffect } from "react";

export default function ThemeToggle() {
	const { theme, setTheme } = useThemeStore();

	useEffect(() => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
	}, [theme]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				asChild
				className="h-[40px] w-[40px] hover:scale-[1.05] transition-all"
			>
				<Button
					variant="outline"
					size="icon"
					className="dark:bg-[#1A1B1F] border-none shadow-lg rounded-xl"
				>
					{theme === "dark" ? (
						<MoonStarIcon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 scale-100" />
					) : (
						<SunMedium className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 scale-100" />
					)}

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
