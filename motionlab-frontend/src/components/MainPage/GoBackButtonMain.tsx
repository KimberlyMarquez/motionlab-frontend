import { useNavigate } from 'react-router-dom';

const GoBackButtonMain = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <button className="button" onClick={handleGoBack}>
      <img 
        src="assets/MainPage/Return.svg" 
        alt="Cerrar sesión"
        className="icon" 
        title="Salir"
      />
    </button>
  );
};

export default GoBackButtonMain;