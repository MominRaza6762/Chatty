import { create } from "zustand";
import { themes } from "../constants/index";

export const useThemeStore = create((set) => ({
  theme: themes.find((theme) => theme["Ocean Breeze"])["Ocean Breeze"],
  setTheme: (themeName) => {
    const selectedTheme = themes.find((theme) => theme[themeName]);
    if (selectedTheme) {
      set({ theme: selectedTheme[themeName] });
    }
  },
}));
