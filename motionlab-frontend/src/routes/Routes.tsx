import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Landing from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/Landing",
        element: <Landing />,
        errorElement: <ErrorPage />,
    },


]);

export default router;