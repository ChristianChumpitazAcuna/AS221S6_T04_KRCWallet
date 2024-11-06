import { NavLink } from "react-router-dom";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import { Home, Settings, StoreIcon, User, Wallet } from "lucide-react";
import Logo from "../ui/icons/icons";

interface MenuItemProps {
	to: string;
	icon: React.ReactNode;
	label: string;
}

const MenuItem = ({ to, icon, label }: MenuItemProps) => {
	return (
		<li
			className="opacity-70 hover:opacity-100 transition-opacity 
		hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl"
		>
			<NavLink to={to} className="flex items-center px-4 py-3 text-sm gap-x-4">
				{icon}

				<p className="group-data-[collapsible=icon]:hidden text-foreground">
					{label}
				</p>
			</NavLink>
		</li>
	);
};

export default function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarContent className="flex flex-col items-center justify-around">
				<ul className="flex flex-col gap-y-4">
					<MenuItem
						to="/app"
						icon={<Home size={24} strokeWidth={1.5} />}
						label="Inicio"
					/>
					<MenuItem
						to="/app/userInfo"
						icon={<User size={24} strokeWidth={1.5} />}
						label="Perfil"
					/>
					<MenuItem
						to="/app/transfer"
						icon={<Wallet size={24} strokeWidth={1.5} />}
						label="Wallet"
					/>
					<MenuItem
						to="/app/sellItem"
						icon={<StoreIcon size={24} strokeWidth={1.5} />}
						label="Tienda"
					/>
					<MenuItem
						to="/app/settings"
						icon={<Settings size={24} strokeWidth={1.5} />}
						label="Ajustes"
					/>
				</ul>

				<NavLink
					to="/"
					className="flex flex-row items-center justify-center py-6"
				>
					<Logo className="fill-foreground" />
					<span className="text-lg font-bold group-data-[collapsible=icon]:hidden">
						KRC Wallet
					</span>
				</NavLink>
			</SidebarContent>
		</Sidebar>
	);
}
