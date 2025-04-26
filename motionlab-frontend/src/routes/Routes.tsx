import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogInProfesores from "../pages/LogInProfesores";
import ErrorPage from "../pages/ErrorPage";
import LanzarPartidaProfesor from "../pages/LanzarPartidaProfesor";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/loginprofesores",
        element: <LogInProfesores />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/lanzarpartidaprofesor",
        element: <LanzarPartidaProfesor />,
        errorElement: <ErrorPage />,
    }
]);

export default router;