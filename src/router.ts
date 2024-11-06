import { createBrowserRouter } from "react-router-dom";
import UserInfoPage from "./pages/userInfoPage";
import TransferPage from "./pages/transferPage";
import LandingPage from "./pages/landingPage";
import AppLayout from "./layouts/appLayout";
import Welcome from "./components/shared/welcome";
import MarketPlacePage from "./pages/marketPlacePage";
import SettingPage from "./pages/settingPage";

const router = createBrowserRouter([
	{
		path: "/",
		Component: LandingPage,
	},

	{
		path: "/app",
		Component: AppLayout,
		children: [
			{
				index: true,
				Component: Welcome,
			},
			{
				path: "userInfo",
				Component: UserInfoPage,
			},
			{
				path: "transfer",
				Component: TransferPage,
			},

			{
				path: "sellItem",
				Component: MarketPlacePage,
			},
			{
				path: "settings",
				Component: SettingPage,
			},
		],
	},
]);

export { router };
