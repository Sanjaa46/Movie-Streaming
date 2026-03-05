import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/movies/:id", element: <MovieDetails /> },
    ],
  },
]);