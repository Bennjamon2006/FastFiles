import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { RouteDefinition } from "./RouteDefinition";

type RouterProps = {
  routes: RouteDefinition[];
};

export default function Router({ routes }: RouterProps) {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
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
