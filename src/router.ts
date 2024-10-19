import { createBrowserRouter } from "react-router-dom";
import UserInfoPage from "./pages/userInfoPage";
import TransferPage from "./pages/transferPage";
import LandingPage from "./pages/landingPage";
import MainLayout from "./layouts/mainLayout";

const router = createBrowserRouter([
	{
		path: "/",
		Component: LandingPage,
	},
	{
		path: "/app",
		Component: MainLayout,
		children: [
			{
				path: "app/userInfo",
				Component: UserInfoPage,
			},
			{
				path: "app/transfer",
				Component: TransferPage,
			},
		],
	},
]);

export { router };
