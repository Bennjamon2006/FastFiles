import { useState } from "react";
import { Box, VStack, Input, HStack, Button, Text } from "@chakra-ui/react";
import CodeInput from "./CodeInput";

export default function Actions() {
  const [code, setCode] = useState("");

  const createRoom = () => {
    alert("Funcionalidad de creación de sala aún no implementada");
  };

  const joinRoom = () => {
    alert(`Funcionalidad de unión a sala aún no implementada, code: ${code}`);
  };
  return (
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

          <CodeInput
            flex={1}
            size="lg"
            placeholder="Código de sala"
            value={code}
            onChange={setCode}
          />

          <Button onClick={joinRoom} size="lg" variant="outline">
            Unirse
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
