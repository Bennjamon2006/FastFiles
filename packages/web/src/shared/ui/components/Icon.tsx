import { Icon as ChakraIcon } from "@chakra-ui/react";
import type { IconProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props extends IconProps {
  children: ReactNode;
}

export function Icon({ children, ...rest }: Props) {
  return (
    <ChakraIcon boxSize={8} color="black" _dark={{ color: "white" }} {...rest}>
      {children}
    </ChakraIcon>
  );
}
