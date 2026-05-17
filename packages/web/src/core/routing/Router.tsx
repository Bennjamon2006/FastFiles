import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { RouteDefinition } from "./RouteDefinition";
import { LoadingPage } from "@/shared/ui/loading";

type RouterProps = {
  routes: RouteDefinition[];
};

export function Router({ routes }: RouterProps) {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.page />}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
