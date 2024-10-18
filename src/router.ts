import { createBrowserRouter } from "react-router-dom";
import Main from "./layouts/main";
import UserInfoPage from "./pages/userInfoPage";
import TransferPage from "./pages/transferPage";
import HomePage from "./pages/homePage";

const router = createBrowserRouter([
	{
		path: "/",
		Component: Main,
		children: [
			{
				path: "/",
				Component: HomePage,  // Página de inicio cuando la ruta es "/"
			},
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
