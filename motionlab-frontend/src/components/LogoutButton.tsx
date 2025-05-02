import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

interface LogoutButtonProps {
  redirectTo: string;            
}

const LogoutButton = ({ redirectTo}: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => { 
    sessionStorage.clear();
    navigate(redirectTo);
  };

  return (
    <img 
      src="log-out.svg"
      alt="Cerrar sesión"
      className="logout-icon" 
      onClick={handleLogout}
      title="Salir"
    />
  );
};

export default LogoutButton;