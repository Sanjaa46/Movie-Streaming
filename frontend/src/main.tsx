import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { router } from "./app/router";
import React from 'react';
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataContext";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserDataProvider>
        <RouterProvider router={router} />
      </UserDataProvider>
    </AuthProvider>
  </React.StrictMode>
);

