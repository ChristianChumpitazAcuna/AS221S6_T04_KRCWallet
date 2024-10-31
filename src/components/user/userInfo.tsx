import { User, Wallet } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface UserInfoProps {
	account: string;
	balance: string;
}

export default function UserInfo({ account, balance }: UserInfoProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					Informacion del Usuario
				</CardTitle>
				<CardDescription className="text-center">
					User information
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-4">
				<div className="flex items-center space-x-4 p-4 rounded-xl border">
					<div className="p-4 bg-foreground/5 rounded-full">
						<User className="h-6 w-6" />
					</div>
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium">Account</p>
						<p className="w-fit text-sm text-muted-foreground px-3 py-2 bg-foreground/5 rounded-3xl">
							{account}
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4 rounded-xl border">
					<div className="p-4 bg-foreground/5 rounded-full">
						<Wallet className="h-6 w-6" />
					</div>
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium">Balance</p>
						<p className="w-fit text-sm text-muted-foreground px-3 py-2 bg-foreground/5 rounded-3xl">
							{balance.toString()}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
