import { useContext } from "react";
import { ColorThemeContext } from "./ColorThemeContext";

export function useColorTheme() {
  const context = useContext(ColorThemeContext);

  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }

  const { colorTheme, setColorTheme, toggleColorTheme } = context;

  return {
    colorTheme,
    setColorTheme,
    toggleColorTheme,
  };
}
