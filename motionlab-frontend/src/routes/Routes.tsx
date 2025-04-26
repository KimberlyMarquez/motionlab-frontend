import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogInProfesores from "../pages/LogInProfesores";
import ErrorPage from "../pages/ErrorPage";
import Main from "../pages/MainPage";
import LanzarPartidaProfesor from "../pages/LanzarPartidaProfesor";
import Landing from "../pages/LandingPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Landing />,
            },
            {
                path: "/Main",
                element: <Main />,
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
        ]
    },



]);

export default router;