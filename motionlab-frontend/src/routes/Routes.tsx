import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import AjusteEquipos from "../pages/AjusteEquipos";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AjusteEquipos />,
        errorElement: <ErrorPage />,
    },

]);

export default router;