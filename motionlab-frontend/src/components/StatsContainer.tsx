import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonRegresar from '../components/ButtonRegresar';
import '../components/Statistics.css';
import Leaderboard from '../components/Leaderboard';

interface Props {
  label: string;
  children: React.ReactNode;
  pag_anterior: string;
  onDownload: () => void;
  activeTab: "equipos" | "alumnos";
}

const StatsContainer: React.FC<Props> = ({ 
  label, 
  children, 
  onDownload,
  activeTab 
}) => {
  const navigate = useNavigate();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleRegresar = () => {
    navigate(-1);
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      {showLeaderboard && <Leaderboard onClose={() => setShowLeaderboard(false)} />}
      
      <div className="ajustes-box shadow-lg p-4">
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="btn-reg" onClick={handleRegresar}>
              <ButtonRegresar label='< Regresar' />
            </div>

            <div className="actions-section d-flex align-items-center">
              <div className="me-2" onClick={onDownload}>
                <img src="/descarga.png" alt="DOWNLOAD" className="icon-size" />
              </div>
              
              <div className="me-2" onClick={toggleLeaderboard}>
                <img src="/leaderboard.svg" alt="LEADERBOARD" className="icon-size" />
              </div>
            </div>
          </div>

          <div className="ajustes-label position-absolute start-50 translate-middle-x">
            {label}
          </div>
        </div>

        <div className="ajustes-content">
          <div className="h-100 d-flex flex-column justify-content-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsContainer;