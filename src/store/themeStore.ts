import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			theme: "light",
			setTheme: (theme) => set({ theme }),
			toggleTheme: () =>
				set((state) => ({
					theme: state.theme === "light" ? "dark" : "light",
				})),
		}),
		{
			name: "theme-storage",
		}
	)
);

export default useThemeStore;
