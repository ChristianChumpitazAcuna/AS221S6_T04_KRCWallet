import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Principal from "./pages/principal";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "./wagmi";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<Principal />
			</QueryClientProvider>
		</WagmiProvider>
	</StrictMode>
);
