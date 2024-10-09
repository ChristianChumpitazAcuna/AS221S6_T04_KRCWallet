import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface IconButtonProps {
	icon: LucideIcon;
	tooltip: string;
	className?: string;
	iconClass?: string;
}

const IconButton = ({
	icon: Icon,
	tooltip,
	className,
	iconClass,
}: IconButtonProps) => {
	return (
		<Tooltip>
			<TooltipTrigger>
				<button
					className={`rounded-full p-2 hover:scale-110 hover:bg-neutral-200 
                        dark:hover:bg-neutral-800 ${className}`}
				>
					<Icon className={`h-5 w-5 ${iconClass}`} />
				</button>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
};

export default IconButton;
