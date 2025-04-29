import AjustesContainer from '../components/AjustesContainer';
import Footer from '../components/Footer';
import ButtonOrange from '../components/ButtonOrange';
import ParametrosControl from '../components/Parametros';
import '../pages/Pages.css';
import { Navigate, useNavigate } from 'react-router-dom';

const ParametrosIniciales = () => {
  const navigate = useNavigate();
  const handleSiguiente = () => {
    navigate('/lobbyprofesor', { state: { codigo: 'SIN-CÓDIGO' } });
    console.log('Iniciando nueva partida...');
  };

  return (
    <>
      <div className="background-container">
        <div className="main-content">
          <AjustesContainer label="PARÁMETROS INICIALES" pag_anterior="/ajuste-equipos">
            <div className="d-flex flex-column align-items-center  mt-2">
              <ParametrosControl label="Revoluciones por minuto" unidad="rpm" valorInicial={2000} step={0.01} min={2000} max={4500}/>
              <ParametrosControl label="Tamaño de la rueda" unidad="cm" valorInicial={20} step={0.01} min={20} max={25}/>
              <ParametrosControl label="Distancia" unidad="m" valorInicial={5} step={0.01} min={5} max={22.6}/>
            </div>

            <div className="btn-orange text-center">
              <ButtonOrange label="NUEVA PARTIDA" onClick={handleSiguiente} />
            </div>
          </AjustesContainer>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ParametrosIniciales;
