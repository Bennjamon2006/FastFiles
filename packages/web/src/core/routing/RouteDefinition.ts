import type { ComponentType, LazyExoticComponent } from "react";

type PageComponent = LazyExoticComponent<ComponentType<unknown>>;

export type RouteDefinition = {
  path: string;
  page: PageComponent;
};
