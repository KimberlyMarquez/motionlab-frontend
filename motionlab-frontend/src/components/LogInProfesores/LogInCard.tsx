import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import "./LogInCard.css";
import { useState } from "react";
import { teacherLogin } from "../../api/authAPI";

const LoginCard = () => {
  const navigate = useNavigate();
  const [nomina, setNomina] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nominaRegex = /^L\d{7}$/;

    if (!nominaRegex.test(nomina)) {
      alert(
        "La nómina debe tener el formato L seguido de 7 números. Ejemplo: L1234567"
      );
      return;
    }

    const res = await teacherLogin(nomina, password);

    if (res.status === "success") {
      sessionStorage.setItem("teacherId", res.payload);
      navigate("/lanzarpartidaprofesor");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-title">
        <strong>¡Bienvenido a MotionLab!</strong>
      </h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <b>Nómina</b>
          <input
            type="text"
            required
            value={nomina}
            onChange={(e) => setNomina(e.target.value)}
            placeholder="Nómina"
          />
        </label>
        <label>
          <b>Contraseña</b>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </label>
        <CustomButton label="Acceder" type="submit" />
      </form>
    </div>
  );
};

export default LoginCard;
