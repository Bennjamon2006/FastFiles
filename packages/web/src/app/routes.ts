import { lazy } from "react";
import type { RouteDefinition } from "@/core/routing/RouteDefinition";

const HomePage = lazy(() => import("@/features/home/HomePage"));

export const routes: RouteDefinition[] = [
  {
    path: "/",
    page: HomePage,
  },
];
