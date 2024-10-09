import { useEffect, useState } from "react";

import { MoonStarIcon, SunMedium } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function ThemeToggle() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const localTheme = localStorage.getItem("theme") || "light";
		setTheme(localTheme);
		document.documentElement.classList.toggle("dark", localTheme === "dark");
	}, []);

	const handleThemeChange = (newTheme: any) => {
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					{theme === "dark" ? (
						<MoonStarIcon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 scale-100" />
					) : (
						<SunMedium className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 scale-100" />
					)}

					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => handleThemeChange("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleThemeChange("dark")}>
					Dark
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
