import { IconButton } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorTheme } from "./useColorTheme";

function ColorThemeIcon() {
  const { colorTheme } = useColorTheme();
  return colorTheme === "dark" ? <LuMoon /> : <LuSun />;
}

export function ColorThemeButton() {
  const { toggleColorTheme } = useColorTheme();

  return (
    <IconButton
      onClick={toggleColorTheme}
      variant="ghost"
      aria-label="Toggle color Theme"
      size="sm"
      css={{
        _icon: {
          width: "5",
          height: "5",
        },
      }}
    >
      <ColorThemeIcon />
    </IconButton>
  );
}
