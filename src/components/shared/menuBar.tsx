import { Home, Plus, Settings, User, Wallet } from "lucide-react";
import { NavLink } from "react-router-dom";

interface MenuItemProps {
	to: string;
	icon: React.ReactNode;
	label: string;
}

const MenuItem = ({ to, icon, label }: MenuItemProps) => {
	return (
		<li className="rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 hover:scale-105 transition-all group">
			<NavLink to={to} className="flex items-center  px-4 py-2 text-sm">
				{icon}
				<span className="ml-2 whitespace-nowrap">{label}</span>
			</NavLink>
		</li>
	);
};

export default function MenuBar() {
	return (
		<nav
			className="fixed bottom-5 left-1/2 transform -translate-x-1/2 py-2 px-4 flex justify-center items-center rounded-full shadow-md bg-background 
			dark:bg-background text-foreground transition-all duration-300 ease-in-out"
		>
			<ul className="flex items-center space-x-2">
				<MenuItem to="/" icon={<Home size={24} />} label="Inicio" />
				<MenuItem
					to="app/transfer"
					icon={<Wallet size={24} />}
					label="Wallet"
				/>
				<li className="rounded-full p-2 bg-foreground text-background hover:scale-105 transition-all">
					<button className="flex items-center justify-center w-8 h-8">
						<Plus size={24} />
					</button>
				</li>
				<MenuItem to="/" icon={<Settings size={24} />} label="Ajustes" />
				<MenuItem to="app/userInfo" icon={<User size={24} />} label="Perfil" />
			</ul>
		</nav>
	);
}
