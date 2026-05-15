import { UIProvider } from "@/shared/ui/UIProvider";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  return <UIProvider>{children}</UIProvider>;
}
