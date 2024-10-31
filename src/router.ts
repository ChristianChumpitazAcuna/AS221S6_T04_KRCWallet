import { createBrowserRouter } from "react-router-dom";
import UserInfoPage from "./pages/userInfoPage";
import TransferPage from "./pages/transferPage";
import LandingPage from "./pages/landingPage";
import AppLayout from "./layouts/appLayout";
import Welcome from "./components/shared/welcome";

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
		],
	},
]);

export { router };
