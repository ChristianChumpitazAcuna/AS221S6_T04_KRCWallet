import { User, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
				<div className="flex items-center space-x-4 p-4">
					<User className="h-6 w-6" />
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium">Account</p>
						<p className="text-sm text-muted-foreground">{account}</p>
					</div>
				</div>
				<div className="flex items-center space-x-4 p-4">
					<Wallet className="h-6 w-6" />
					<div className="flex-1 space-y-1">
						<p className="text-sm font-medium">Balance</p>
						<p className="text-sm text-muted-foreground">
							{balance.toString()}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
