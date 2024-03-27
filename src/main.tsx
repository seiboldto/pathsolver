import "normalize.css";
import "./styles/styles.css";

import * as React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
