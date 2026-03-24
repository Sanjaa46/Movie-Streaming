import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Movies from "../pages/Movies";
import ContinueWatching from "../pages/ContinueWatching";
import Bookmarked from "../pages/Bookmarked";
import Watched from "../pages/Watched";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/movies/:id", element: <MovieDetails /> },
      { path: "/movies", element: <Movies /> },
      { path: "/user/continue", element: <ContinueWatching /> },
      { path: "/user/bookmarked", element: <Bookmarked /> },
      { path: "/user/watched", element: <Watched /> },
    ],
  },
]);