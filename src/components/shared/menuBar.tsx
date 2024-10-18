import { Home, Plus, Settings, User, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
	to: string;
	icon: React.ReactNode;
}

const MenuItem = ({ to, icon }: MenuItemProps) => {
	return (
		<li className="rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-white/10 hover:scale-105 transition-all group">
			<NavLink to={to}>{icon}</NavLink>
		</li>
	);
};

export default function MenuBar() {
	return (
		<nav
			className="fixed bottom-5 left-1/2 transform -translate-x-1/2  w-fit h-[4rem] px-8 flex justify-center
		 rounded-full shadow-md bg-background dark:bg-background text-foreground"
		>
			<ul className="inline-flex gap-x-6 items-center">
				<MenuItem to={"/"} icon={<Home />} />
				<MenuItem to={"/transfer"} icon={<Wallet />} />

				<li
					className="rounded-full p-[.7rem] flex items-center bg-foreground text-background
				 hover:scale-105 transition-all "
				>
					<button>
						<Plus />
					</button>
				</li>
				<MenuItem to={"/"} icon={<Settings />} />
				<MenuItem to={"/userInfo"} icon={<User />} />
			</ul>
		</nav>
	);
}
