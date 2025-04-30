import CustomButton from '../CustomButton';
import './LanzarPartidaCard.css';
import { useNavigate } from 'react-router-dom';

interface LanzarPartidaCardProps {
  nomina: string;
}

const LanzarPartidaCard = ({ nomina }: LanzarPartidaCardProps) => {
  const navigate = useNavigate();

  const handleLanzarPartida = () => {
    navigate('/ajuste-equipos', { state: { codigo: 'SIN-CÓDIGO' } });
  };
  return (
    <div className="lanzar-container">
      <h2 className="lanzar-title">
        ¡Hola, <b>{nomina}</b>!
      </h2>

      <div className="lanzar-box">
        <CustomButton label="Lanzar Partida" type="button" className="lanzar-button" onClick={handleLanzarPartida}/>
        <a href="/estadisticas" className="stats-link">Estadísticas</a>
      </div>
    </div>
  );
};

export default LanzarPartidaCard;
