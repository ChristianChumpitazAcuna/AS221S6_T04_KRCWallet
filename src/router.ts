import { createBrowserRouter } from "react-router-dom";
import Main from "./layouts/main";
import UserInfoPage from "./pages/userInfoPage";
import TransferPage from "./pages/transferPage";
import LandingLayout from "./pages/landingPage";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Main,
		children: [
			{
				path: "/userInfo",
				Component: UserInfoPage,
			},
			{
				path: "/transfer",
				Component: TransferPage,
			},
		],
	},
	{
		path: "/landing",
		Component: LandingLayout,
	},
]);

export { router };
