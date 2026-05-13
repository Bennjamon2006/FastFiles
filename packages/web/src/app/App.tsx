import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { LuFolder, LuLink, LuUpload, LuLock, LuUsers } from "react-icons/lu";
import { ColorThemeButton } from "../shared/ui/color-theme/ColorThemeButton";

const features = [
  { icon: LuLink, label: "Comparte enlace" },
  { icon: LuUpload, label: "Archivos temporales" },
  { icon: LuLock, label: "Privado" },
  { icon: LuUsers, label: "Salas compartidas" },
];

export function App() {
  const createRoom = () => {
    alert("Funcionalidad de creación de sala aún no implementada");
  };

  const joinRoom = () => {
    alert("Funcionalidad de unión a sala aún no implementada");
  };

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
          <VStack gap={4} textAlign="center">
            <Flex
              w={16}
              h={16}
              bg="accent.default"
              borderRadius="xl"
              align="center"
              justify="center"
            >
              <Icon boxSize={8} color="black" _dark={{ color: "white" }}>
                <LuFolder />
              </Icon>
            </Flex>

            <Heading size="2xl">FastFile</Heading>
            <Text color="fg.muted" fontSize="lg">
              Comparte archivos en salas temporales. Sin registro, sin
              complicaciones.
            </Text>
          </VStack>

          {/* Actions Card */}
          <Box
            w="full"
            bg="bg.default"
            borderRadius="xl"
            border="1px solid"
            borderColor="border.default"
            p={6}
          >
            <VStack gap={4}>
              {/* Name Input */}
              <Box w="full">
                <Text mb={2} fontWeight="medium" fontSize="sm">
                  Tu nombre
                </Text>
                <Input placeholder="Ingresa tu nombre" size="lg" />
              </Box>

              {/* Buttons */}
              <HStack w="full" gap={3}>
                <Button
                  onClick={createRoom}
                  size="lg"
                  flex={1}
                  bg="accent.default"
                  color="white"
                  _dark={{
                    color: "black",
                  }}
                  _hover={{ bg: "accent.hover" }}
                >
                  Crear Sala
                </Button>

                <Input placeholder="Código" size="lg" w={32} />

                <Button onClick={joinRoom} size="lg" variant="outline">
                  Unirse
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Features */}
          <Flex gap={6} flexWrap="wrap" justify="center">
            {features.map((feature, index) => (
              <HStack key={index} gap={2} color="fg.muted" fontSize="sm">
                <Icon>
                  <feature.icon />
                </Icon>
                <Text>{feature.label}</Text>
              </HStack>
            ))}
          </Flex>

          <Text color="fg.muted" fontSize="xs">
            Los archivos desaparecen cuando la sala se cierra
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}