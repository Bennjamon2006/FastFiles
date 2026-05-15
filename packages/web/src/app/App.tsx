import { Router } from "@/core/routing";
import { routes } from "./routes";

export default function App() {
  return <Router routes={routes} />;
}
