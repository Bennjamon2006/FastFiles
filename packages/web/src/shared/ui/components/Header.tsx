import { Flex } from "@chakra-ui/react";
import { ColorThemeButton } from "@/shared/ui/color-theme";

export function Header() {
  return (
    <Flex
      as="header"
      justify="flex-end"
      p={4}
      position="absolute"
      top={0}
      left={0}
      right={0}
    >
      <ColorThemeButton />
    </Flex>
  );
}
