import React from 'react';
import './LogoutButton.css';

interface Props {
  onClick: () => void;
}

const LogoutButton: React.FC<Props> = ({ onClick }) => {
  return (
    <img 
      src="/log-out.svg" 
      alt="Cerrar sesión"
      className="logout-icon" 
      onClick={onClick}
      title="Salir"
    />
  );
};

export default LogoutButton;
