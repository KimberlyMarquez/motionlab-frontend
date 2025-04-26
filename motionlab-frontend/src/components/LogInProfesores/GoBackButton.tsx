import './buttons.css';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/Main");
  };

  return (
    <button className="button" onClick={handleGoBack}>
      <img 
        src="assets/LogInProfesores/gobackbutton.svg" 
        alt="Cerrar sesión"
        className="icon" 
        title="Salir"
      />
    </button>
  );
};

export default GoBackButton;