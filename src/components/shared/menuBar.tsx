import { Home, Plus, Settings, User, Wallet } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";
import IconButton from "../ui/iconButton";

export default function MenuBar() {
	return (
		<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md">
			<nav className="bg-card rounded-full flex justify-around items-center p-2 shadow-lg">
				<TooltipProvider>
					<IconButton icon={Home} tooltip="Home" />
					<IconButton icon={Wallet} tooltip="Wallet" />
					<Tooltip>
						<TooltipTrigger>
							<button className="rounded-full p-2 bg-foreground hover:scale-110">
								<Plus className="h-5 w-5 text-background" />
							</button>
						</TooltipTrigger>
						<TooltipContent>Add</TooltipContent>
					</Tooltip>
					<IconButton icon={Settings} tooltip="Settings" />
					<IconButton icon={User} tooltip="User" />
				</TooltipProvider>
			</nav>
		</div>
	);
}
