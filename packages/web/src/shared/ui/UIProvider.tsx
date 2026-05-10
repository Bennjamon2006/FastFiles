import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorThemeProvider } from "./color-theme";

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </ChakraProvider>
  );
}
