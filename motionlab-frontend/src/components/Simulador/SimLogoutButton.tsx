import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../LogoutButton.css';

interface SimLogoutButtonProps {
  redirectTo: string;
}

const SimLogoutButton: React.FC<SimLogoutButtonProps> = ({ redirectTo }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(redirectTo);
  };

  return (
    <img
      src="/logoutsim.svg"
      alt="Cerrar sesión"
      className="logout-icon"
      onClick={handleLogout}
      title="Salir"
    />
  );
};

export default SimLogoutButton;