import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia, holesky, mainnet } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
	appName: "KRC Wallet",
	projectId: "d50ebd0909e0d8b3a2af4b97f8cb51c2",
	chains: [baseSepolia, holesky, mainnet],
});
