import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StudyMemo } from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <StudyMemo />
  </StrictMode>
);
