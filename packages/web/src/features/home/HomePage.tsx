import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { LuLink, LuUpload, LuLock, LuUsers } from "react-icons/lu";
import { ColorThemeButton } from "../../shared/ui/color-theme/ColorThemeButton";
import Hero from "./components/Hero";
import Actions from "./components/Actions";
import Features from "./components/Features";

const features = [
  { icon: LuLink, label: "Comparte enlace" },
  { icon: LuUpload, label: "Archivos temporales" },
  { icon: LuLock, label: "Privado" },
  { icon: LuUsers, label: "Salas compartidas" },
];

export default function App() {
  return (
    <Box minH="100vh" bg="bg.subtle">
      {/* Header */}
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

      <Container maxW="lg" py={20}>
        <VStack gap={8}>
          {/* Hero */}
          <Hero />

          {/* Actions Card */}
          <Actions />

          {/* Features */}
          <Features features={features} />

          <Text color="fg.muted" fontSize="xs">
            Los archivos desaparecen cuando la sala se cierra
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
