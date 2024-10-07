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
				<CardTitle className="uppercase text-center">User Info</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					<div className="flex items-center space-x-4 p-4">
						<User className="h-6 w-6" />
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium">Account</p>
							<p className="text-sm text-muted-foreground">{account}</p>
						</div>
					</div>
				</CardDescription>
				<CardDescription>
					<div className="flex items-center space-x-4 p-4">
						<Wallet className="h-6 w-6" />
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium">Balance</p>
							<p className="text-sm text-muted-foreground">{balance}</p>
						</div>
					</div>
				</CardDescription>
			</CardContent>
		</Card>
	);
}
