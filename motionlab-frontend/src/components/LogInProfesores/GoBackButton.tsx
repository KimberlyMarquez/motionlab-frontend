import './buttons.css';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/Main");
  };

  return (
      <img 
        src="assets/LogInProfesores/gobackbutton.svg" 
        alt="Cerrar sesión"
        className="icon" 
        title="Salir"
        onClick={handleGoBack}
      />
  );
};

export default GoBackButton;