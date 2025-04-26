import { useState } from 'react';
import LobbyContainer from '../components/LobbyContainer';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import IconWithText from '../components/IconWithText';
import { FaUser, FaUsers } from 'react-icons/fa';
import '../pages/Pages.css';

const LobbyAlumnos = () => {
  const [equipos, setEquipos] = useState(8);
  const [integrantes, setIntegrantes] = useState(5);
  const navigate = useNavigate();
 
  const handleSiguiente = () => {
    console.log('Equipos:', equipos, 'Integrantes:', integrantes);
    navigate('/parametros');
  };

  const Equipos: React.FC<{ equipos: number; integrantes: number }> = ({ equipos, integrantes }) => {
    const renderEquipos = () => {
      const equiposArray = [];

      for (let i = 1; i <= equipos; i++) {
        equiposArray.push(
          <div key={i} className="equipo-card">
            <h5 className="equipo-title">Equipo {i}</h5>
            <div className="integrantes-list">
              {[...Array(integrantes)].map((_, idx) => (
                <div key={idx} className="integrante-name">AXXXXXXX</div>
              ))}
            </div>
          </div>
        );
      }

      return equiposArray;
    };

    return (
      <div className="equipos-container">
        {renderEquipos()}
      </div>
    );
  };

  return (
    <>
      <div className="background-container">
        <div className="main-content">
        <LobbyContainer label="vrfd" pag_anterior="/">

            <div className="info-icons">
                <IconWithText icon={<FaUser size={30} />} text={integrantes} />
                <IconWithText icon={<FaUsers size={40} />} text={equipos} />
            </div>
            
            <div className="d-flex justify-content-around flex-wrap mt-4">
              <Equipos equipos={equipos} integrantes={integrantes} />
            </div>

            <div className="loading start-50 translate-middle-x">
              Esperando a que inicie la partida...
            </div>
        </LobbyContainer>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default LobbyAlumnos;
