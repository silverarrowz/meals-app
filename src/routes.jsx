import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Meals from "./components/Meals";
import FavoritesPage from "./components/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/meals-app",
    element: <App />,
    children: [
      { path: "/meals-app", element: <Meals /> },
      { path: "favorites", element: <FavoritesPage /> },
    ],
  },
]);

export default router;
