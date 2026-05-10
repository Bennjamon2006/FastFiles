import { Container, Heading, Text } from "@chakra-ui/react";
import { ColorThemeButton } from "../shared/ui/color-theme";

function App() {
  return (
    <Container>
      <Heading>Welcome to FastFile Web!</Heading>
      <Text mt={4}>
        This is the web version of FastFile, a powerful file management tool.
      </Text>
      <ColorThemeButton />
    </Container>
  );
}

export default App;
