import AjustesContainer from '../components/AjustesContainer';
import Footer from '../components/Footer';
import ButtonOrange from '../components/ButtonOrange';
import Parametros from '../components/Parametros';
import '../pages/Pages.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createMatch } from '../api/MatchAPI';


const ParametrosIniciales = () => {
  const navigate = useNavigate();
  const [rpm, setRPM] = useState(2000);
  const [rueda, setRueda] = useState(20);
  const [distancia, setDistancia] = useState(5);


  const handleSiguiente = async () => {
    const teacherId = sessionStorage.getItem('teacherId');
    const equipos = Number(sessionStorage.getItem('equipos')) || 6;
    const integrantes = Number(sessionStorage.getItem('integrantes')) || 5;

    if (!teacherId) {
      console.error('No se encontró el teacherId en sessionStorage');
      return;
    }


    try {
      const response = await createMatch({
        teams: equipos,
        members: integrantes,
        rpm,
        wheel_size: rueda,
        distance: distancia,
        teacher_id: teacherId
      });
  
      console.log('Partida creada:', response.payload);

      sessionStorage.setItem("codigo", response.payload.code);
      sessionStorage.setItem("matchId", response.payload.id.toString());
      sessionStorage.setItem("teams", response.payload.teams.toString());
      sessionStorage.setItem("members", response.payload.members.toString());
  
      navigate('/lobbyprofesor');
  
      console.log('Código:', response.payload.code, 'Profesor:', teacherId, 'Equipos:', response.payload.teams, 'Integrantes:', response.payload.members, 'RPM:', rpm, 'Rueda:', rueda, 'Distancia:', distancia);
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
              <Parametros label="Revoluciones por minuto" unidad="rpm" valorInicial={2000}  step={0.01} min={2000} max={4500} onChange={setRPM}/>
              <Parametros label="Tamaño de la rueda" unidad="cm" valorInicial={20} min={20}  step={0.01} max={25} onChange={setRueda}/>
              <Parametros label="Distancia" unidad="m" valorInicial={5} min={5} max={22.6}  step={0.01} onChange={setDistancia}/>
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
