import { MoonStarIcon, SunMedium } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ThemeToggleProps {
	currentTheme: "light" | "dark";
	onThemeChange: (newTheme: "light" | "dark") => void;
}

export default function ThemeToggle({
	currentTheme,
	onThemeChange,
}: ThemeToggleProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					{currentTheme === "dark" ? (
						<MoonStarIcon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 scale-100" />
					) : (
						<SunMedium className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 scale-100" />
					)}

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => onThemeChange("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onThemeChange("dark")}>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
