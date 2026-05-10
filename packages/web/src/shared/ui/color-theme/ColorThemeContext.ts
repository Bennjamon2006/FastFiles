import { createContext } from "react";

type ColorTheme = "light" | "dark";

interface ColorThemeContextValue {
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleColorTheme: () => void;
}

export const ColorThemeContext = createContext<ColorThemeContextValue>({
  colorTheme: "light",
  setColorTheme: () => {},
  toggleColorTheme: () => {},
});
