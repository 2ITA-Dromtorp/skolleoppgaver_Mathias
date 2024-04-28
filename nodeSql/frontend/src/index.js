import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import { AuthProvider } from "./components/auth/AuthProvider";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
