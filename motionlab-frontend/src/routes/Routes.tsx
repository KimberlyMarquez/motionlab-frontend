import { createBrowserRouter } from "react-router-dom";
import AjusteEquipos from "../pages/AjusteEquipos";
import ParametrosIniciales from "../pages/ParametrosIniciales";
import LoginCodigo from "../pages/LoginCodigo";
import LoginAlumnos from "../pages/LoginAlumnos";

const router = createBrowserRouter([
  {
    path: "/",
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
]);

export default router;
