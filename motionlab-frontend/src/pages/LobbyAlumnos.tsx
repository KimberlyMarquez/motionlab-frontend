import { useState } from 'react';
import LobbyContainer from '../components/LobbyContainer';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import '../pages/Pages.css';

const LobbyAlumnos = () => {
  const [equipos, setEquipos] = useState(6);
  const [integrantes, setIntegrantes] = useState(5);
  const navigate = useNavigate();
 
  const handleSiguiente = () => {
    console.log('Equipos:', equipos, 'Integrantes:', integrantes);
    navigate ('/parametros');
  };

  return (
    <>
    <div className="background-container">
        <div className="main-content">
      <LobbyContainer label= "vrfd" pag_anterior="/">
      
        <div className="d-flex justify-content-around flex-wrap mt-4">
        </div>

      </LobbyContainer>

      </div>
      <Footer />
      </div>
    </>
  );
};

export default LobbyAlumnos;