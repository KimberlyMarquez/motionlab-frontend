import CustomButton from '../CustomButton';
import './LanzarPartidaCard.css';

interface LanzarPartidaCardProps {
  nomina: string;
}

const LanzarPartidaCard = ({ nomina }: LanzarPartidaCardProps) => {
  return (
    <div className="lanzar-container">
      <h2 className="lanzar-title">
        ¡Hola, <b>{nomina}</b>!
      </h2>

      <div className="lanzar-box">
        <CustomButton label="Lanzar Partida" type="button" className="lanzar-button"/>
        <a href="#" className="stats-link">Estadísticas</a>
      </div>
    </div>
  );
};

export default LanzarPartidaCard;
