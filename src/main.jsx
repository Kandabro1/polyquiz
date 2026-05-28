import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>   {/* ← Jalon 2 : le Provider enveloppe TOUT */}
      <App />
    </UserProvider>
  </React.StrictMode>
);