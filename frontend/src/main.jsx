import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <GoogleOAuthProvider
      clientId="847080916256-8lab7jnvon45hre2rfo9qb1u6ts8rumn.apps.googleusercontent.com"
    >

      <AuthProvider>

        <NotificationProvider>

          <CartProvider>

            <App />

          </CartProvider>

        </NotificationProvider>

      </AuthProvider>

    </GoogleOAuthProvider>

  </React.StrictMode>
);