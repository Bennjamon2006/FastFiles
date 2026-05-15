import { VStack, Flex, Heading, Text } from "@chakra-ui/react";
import { LuFolder } from "react-icons/lu";
import { Icon } from "@/shared/ui/components";

export default function Hero() {
  return (
    <VStack gap={4} textAlign="center">
      <Flex
        w={16}
        h={16}
        bg="accent.default"
        borderRadius="xl"
        align="center"
        justify="center"
      >
        <Icon>
          <LuFolder />
        </Icon>
      </Flex>

      <Heading size="2xl">FastFile</Heading>
      <Text color="fg.muted" fontSize="lg">
        Comparte archivos en salas temporales. Sin registro, sin complicaciones.
      </Text>
    </VStack>
  );
}
