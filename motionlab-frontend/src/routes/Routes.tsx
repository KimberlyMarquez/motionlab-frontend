import { createBrowserRouter } from "react-router-dom";
import AjusteEquipos from "../pages/AjusteEquipos";
import ParametrosIniciales from "../pages/ParametrosIniciales";
import LoginCodigo from "../pages/LoginCodigo";
import LoginAlumnos from "../pages/LoginAlumnos";
import LobbyAlumnos from "../pages/LobbyAlumnos"
import LobbyProfesor from "../pages/LobbyProfesor";

const router = createBrowserRouter([
  {
    path: "/codigo",
    element: <LoginCodigo />,
  },
  {
    path: "/login",
    element: <LoginAlumnos />,
  },
  {
    path: "/ajuste-equipos",
    element: <AjusteEquipos />,
  },
  {
    path: "/parametros",
    element: <ParametrosIniciales />,
  },
  {
    path: "/lobby",
    element: <LobbyAlumnos />
  },
  {
    path: "/lobbyprofesor",
    element: <LobbyProfesor />
  }
]);

export default router;
