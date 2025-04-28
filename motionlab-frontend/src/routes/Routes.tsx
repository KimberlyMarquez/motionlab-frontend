import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Simulador from "../pages/Simulador";
import Tutorial from "../pages/Tutorial";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/simulador",
                element: <Simulador equipoId="1" />,
            },
            {
                path: "/tutorial",
                element: <Tutorial />,
            },
        ]
    },

]);

export default router;