import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Movies from "../pages/Movies";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/movies", element: <Movies /> },
    ],
  },
]);