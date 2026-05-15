import { Flex, HStack, Text } from "@chakra-ui/react";
import { Icon } from "@/shared/ui/components";

export interface Feature {
  icon: React.ElementType;
  label: string;
}

interface FeaturesProps {
  features: Feature[];
}

export default function Features({ features }: FeaturesProps) {
  return (
    <Flex gap={6} flexWrap="wrap" justify="center">
      {features.map((feature, index) => (
        <HStack key={index} gap={2} color="fg.muted" fontSize="sm">
          <Icon boxSize={5}>
            <feature.icon />
          </Icon>
          <Text>{feature.label}</Text>
        </HStack>
      ))}
    </Flex>
  );
}
