import { useState, useEffect } from "react";
import { ColorThemeContext } from "./ColorThemeContext";

interface ColorThemeProviderProps {
  children: React.ReactNode;
}

export function ColorThemeProvider({ children }: ColorThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("color-theme") as
      | "light"
      | "dark"
      | null;

    if (storedTheme) {
      setColorTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setColorTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleColorTheme = () => {
    const newTheme = colorTheme === "light" ? "dark" : "light";
    setColorTheme(newTheme);
    localStorage.setItem("color-theme", newTheme);
  };

  return (
    <ColorThemeContext.Provider
      value={{ colorTheme, setColorTheme, toggleColorTheme }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
}
