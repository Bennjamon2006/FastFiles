import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { Wrapper } from "./app/Wrapper.tsx";

const container = document.getElementById("root");

if (!container) {
  alert("Root container not found");
  throw new Error("Root container not found");
}

createRoot(container).render(
  <StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </StrictMode>,
);
