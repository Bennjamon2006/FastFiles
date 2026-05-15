import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

export function PageContainer(props: BoxProps) {
  return (
    <Box minH="100vh" bg="bg.subtle" {...props}>
      {props.children}
    </Box>
  );
}
