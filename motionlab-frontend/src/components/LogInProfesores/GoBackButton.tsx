import './buttons.css';

const GoBackButton = () => {
  return (
    <button className="button">
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