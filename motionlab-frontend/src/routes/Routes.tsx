import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Statistics from "../components/estadisticas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/estadisticas",
    element: <Statistics />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
