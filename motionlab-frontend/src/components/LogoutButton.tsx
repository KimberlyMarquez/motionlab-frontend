import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar datos si es necesario
    sessionStorage.clear();
    navigate('/Main'); // Cambia la ruta si necesitas redirigir a otra página
  };

  return (
    <img 
      src="/log-out.svg" 
      alt="Cerrar sesión"
      className="logout-icon" 
      onClick={handleLogout}
      title="Salir"
    />
  );
};

export default LogoutButton;
