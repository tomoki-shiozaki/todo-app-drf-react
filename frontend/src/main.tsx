import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

// グローバル CSS 読み込み
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// OpenAPI 初期設定
import "./services/setupApiClient";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
