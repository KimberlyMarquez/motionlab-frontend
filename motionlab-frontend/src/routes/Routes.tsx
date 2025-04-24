import { createBrowserRouter } from "react-router-dom";
import AjusteEquipos from "../pages/AjusteEquipos";
import ParametrosIniciales from "../pages/ParametrosIniciales";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AjusteEquipos />,
  },
  {
    path: "/parametros",
    element: <ParametrosIniciales />,
  },
]);

export default router;
