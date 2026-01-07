import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { router } from "./app/router";
import React from 'react';
import './index.css'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
