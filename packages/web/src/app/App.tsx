import Router from "../core/routing/Router";
import { routes } from "./routes";

export default function App() {
  return (
    <Router routes={routes} />
  );
}