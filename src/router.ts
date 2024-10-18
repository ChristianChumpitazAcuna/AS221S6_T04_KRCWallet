import { createBrowserRouter } from "react-router-dom";
import Main from "./layouts/main";
import UserInfoPage from "./pages/userInfoPage";
import TransferPage from "./pages/transferPage";

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
]);

export { router };
