import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { router } from "./app/router";
import React from 'react';
import './index.css'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
