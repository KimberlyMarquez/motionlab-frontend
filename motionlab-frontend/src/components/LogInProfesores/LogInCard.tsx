import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';
import './LoginCard.css';
import { useState } from 'react';
import { teacherLogin } from '../../api/authAPI';

const LoginCard = () => {
  const navigate = useNavigate();
  const [nomina, setNomina] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nominaRegex = /^L\d{8}$/;

    if (!nominaRegex.test(nomina)) {
      alert('La nómina debe tener el formato L seguido de 8 números. Ejemplo: L12345678');
      return;
    }

    const res = await teacherLogin(nomina, password);

    if (res.status === "success") {
      localStorage.setItem('teacherId', res.payload);
      navigate('/lanzarpartidaprofesor');
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
            placeholder="L12345678"
          />
        </label>
        <label>
          <b>Contraseña</b>
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••"
          />
        </label>
        <CustomButton label="Acceder" type="submit" />
      </form>
    </div>
  );
};

export default LoginCard;


