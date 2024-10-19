import { Link } from "react-router-dom";
import Logo from "../ui/icons/icons";

import { ReactNode, useEffect } from "react";
import useThemeStore from "@/store/themeStore";

const Li = ({ children }: { children: ReactNode }) => (
	<li className="text-sm text-foreground/50 cursor-pointer hover:text-foreground transition-all hover:scale-110 duration-300 ease-in-out">
		<p className="dark:hover:[text-shadow:_3px_5px_20px_#ffffff] hover:[text-shadow:_3px_5px_20px_#0a0a0a]">
			{children}
		</p>
	</li>
);

export default function NavBar() {
	const { theme, toggleTheme } = useThemeStore();

	useEffect(() => {
		document.documentElement.classList.remove("light", "dark");
		document.documentElement.classList.add(theme);
	}, [theme]);

	return (
		<nav
			className="fixed w-full h-[4rem] px-6 flex items-center justify-between rounded-b-3xl 
		bg-background shadow-md"
		>
			<ul className="w-full flex justify-around items-center gap-x-4">
				<Li>Descripción</Li>
				<Li>Objetivos</Li>
				<Li>Beneficios</Li>
				<li>
					<Link to={"/"}>
						<button onClick={toggleTheme}>
							<Logo className="fill-foreground" />
						</button>
					</Link>
				</li>
				<Li>Características</Li>
				<Li>Integrantes</Li>
				<Li>Conclusiones</Li>
			</ul>
		</nav>
	);
}
