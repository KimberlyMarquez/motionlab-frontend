import '../LogInProfesores/buttons.css';
import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/loginprofesores");
  };

  return (
    <button className="button" onClick={handleLogout}>
      <img 
        src="assets/LanzarPartidaProfesor/logoutbutton.svg" 
        alt="Cerrar sesión"
        className="icon" 
        title="Salir"
      />
    </button>
    );
};

export default LogOutButton;