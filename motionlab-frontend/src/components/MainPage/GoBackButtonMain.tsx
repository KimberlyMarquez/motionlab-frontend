import { useNavigate } from 'react-router-dom';
import './GoBackButtonMain.css';

interface GoBackButtonProps {
  redirectTo: string;
}

const GoBackButton = ({ redirectTo }: GoBackButtonProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(redirectTo);
  };

  return (
    <button className="button" onClick={handleGoBack}>
      <img
        src="assets/MainPage/Return.svg"
        alt="Regresar"
        title="Regresar"
      />
    </button>
  );
};

export default GoBackButton;
