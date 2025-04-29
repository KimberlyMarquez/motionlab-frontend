import { useState } from 'react';
import AjustesContainer from '../components/AjustesContainer';
import EquipoControl from '../components/EquipoControl';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButtonT4';
import '../pages/Pages.css';

const AjusteEquipos = () => {
  const [equipos, setEquipos] = useState(6);
  const [integrantes, setIntegrantes] = useState(5);
  const navigate = useNavigate();
 
  const handleSiguiente = () => {
    console.log('Equipos:', equipos, 'Integrantes:', integrantes);
    navigate ('/parametros', { state : { equipos, integrantes }});
  };

  return (
    <>
    <div className="background-container">
      <div className="main-content">
      <AjustesContainer label= "AJUSTE DE EQUIPOS" pag_anterior="/">
      
        <div className="d-flex justify-content-around flex-wrap mt-4">
          <EquipoControl
            label={
                <>
                  Número de <br /> equipos
                </>
              }
            value={equipos}
            onIncrement={() => setEquipos(e => Math.min(8, e + 1))}
            onDecrement={() => setEquipos(e => Math.max(1, e - 1))}
          />
          <EquipoControl
            label={
                <>
                  Número de <br /> integrantes
                </>
              }
            value={integrantes}
            onIncrement={() => setIntegrantes(i => Math.min(5, i + 1))}
            onDecrement={() => setIntegrantes(i => Math.max(1, i - 1))}
          />
        </div>
        
        <div className="text-center mt-5">
          <CustomButton label="SIGUIENTE >" onClick={handleSiguiente}/>
        </div>

      </AjustesContainer>

      </div>
      <Footer />
      </div>
    </>
  );
};

export default AjusteEquipos;

