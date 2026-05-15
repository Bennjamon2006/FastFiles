import { Container, Text, VStack } from "@chakra-ui/react";
import { LuLink, LuUpload, LuLock, LuUsers } from "react-icons/lu";
import Hero from "./components/Hero";
import Actions from "./components/Actions";
import Features from "./components/Features";
import { Header, PageContainer } from "@/shared/ui/components";

const features = [
  { icon: LuLink, label: "Comparte enlace" },
  { icon: LuUpload, label: "Archivos temporales" },
  { icon: LuLock, label: "Privado" },
  { icon: LuUsers, label: "Salas compartidas" },
];

export default function HomePage() {
  return (
    <PageContainer>
      {/* Header */}
      <Header />

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
    </PageContainer>
  );
}
