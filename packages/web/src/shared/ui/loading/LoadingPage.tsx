import { Flex, Heading, Spinner, VStack } from "@chakra-ui/react";
import { PageContainer } from "../components/PageContainer";
import { Header } from "../components/Header";

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = "Cargando..." }: LoadingPageProps) {
  return (
    <PageContainer>
      <Header />
      <Flex
        flex={1}
        align="center"
        justify="center"
        minH="100vh"
      >
        <VStack gap={4}>
          <Spinner
            size="xl"
            color="accent.default"
            borderWidth="3px"
          />
          <Heading size="md" color="fg.muted">
            {message}
          </Heading>
        </VStack>
      </Flex>
    </PageContainer>
  );
}