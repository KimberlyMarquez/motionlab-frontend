import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AjusteEquipos from "../pages/AjusteEquipos";
import ParametrosIniciales from "../pages/ParametrosIniciales";
import LoginCodigo from "../pages/LoginCodigo";
import LoginAlumnos from "../pages/LoginAlumnos";
import LobbyAlumnos from "../pages/LobbyAlumnos";
import LobbyProfesor from "../pages/LobbyProfesor";
import LogInProfesores from "../pages/LogInProfesores";
import ErrorPage from "../pages/ErrorPage";
import Main from "../pages/MainPage";
import LanzarPartidaProfesor from "../pages/LanzarPartidaProfesor";
import Landing from "../pages/LandingPage";
import Statistics from "../pages/estadisticas";

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
      },
      {
        path: "/codigo",
        element: <LoginCodigo />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginAlumnos />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/ajuste-equipos",
        element: <AjusteEquipos />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/parametros",
        element: <ParametrosIniciales />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/lobby",
        element: <LobbyAlumnos />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/lobbyprofesor",
        element: <LobbyProfesor />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/estadisticas",
        element: <Statistics />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
