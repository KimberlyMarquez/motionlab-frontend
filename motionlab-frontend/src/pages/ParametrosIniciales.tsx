import AjustesContainer from '../components/AjustesContainer';
import Footer from '../components/Footer';
import ButtonOrange from '../components/ButtonOrange';
import Parametros from '../components/Parametros';
import '../pages/Pages.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createMatch } from '../api/MatchAPI';


const ParametrosIniciales = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { equipos, integrantes } = location.state || { equipos: 6, integrantes: 5 };

  const [rpm, setRPM] = useState(2000);
  const [rueda, setRueda] = useState(20);
  const [distancia, setDistancia] = useState(5);


  const handleSiguiente = async () => {
    try {
      const response = await createMatch({
        teams: equipos,
        members: integrantes,
        rpm,
        wheel_size: rueda,
        distance: distancia,
        teacher_id: "L01253409"
      });

      console.log('Partida creada:', response.payload);

      navigate('/lobbyprofesor', { state: { codigo: response.payload.code } });
      console.log('Código: ', response.payload.code , 'Equipos:', equipos, 'Integrantes:', integrantes, 'RPM:', rpm, 'Rueda:', rueda, 'Distancia:', distancia);
    } catch (error) {
      console.error('Error enviando los datos al servidor:', error);
    }
  };

  return (
    <>
      <div className="background-container">
        <div className="main-content">
          <AjustesContainer label="PARÁMETROS INICIALES" pag_anterior="/ajuste-equipos">
            <div className="d-flex flex-column align-items-center  mt-2">
              <Parametros label="Revoluciones por minuto" unidad="rpm" valorInicial={2000} min={2000} max={4500} onChange={setRPM}/>
              <Parametros label="Tamaño de la rueda" unidad="cm" valorInicial={20} min={20} max={25} onChange={setRueda}/>
              <Parametros label="Distancia" unidad="m" valorInicial={5} min={5} max={22.6} onChange={setDistancia}/>
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
