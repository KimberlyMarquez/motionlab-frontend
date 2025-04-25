import AjustesContainer from '../components/AjustesContainer';
import Footer from '../components/Footer';
import ButtonOrange from '../components/ButtonOrange';
import ParametrosControl from '../components/Parametros';
import '../pages/ParametrosIniciales.css';

const ParametrosIniciales = () => {
  const handleSiguiente = () => {
    // Lógica para continuar o navegar
    console.log('Iniciando nueva partida...');
  };

  return (
    <>
      <div className="background-container">
        <div className="main-content">
          <AjustesContainer label="PARÁMETROS INICIALES" pag_anterior="/ajuste-equipos">
            <div className="d-flex flex-column align-items-center gap-4 mt-4">
              <ParametrosControl label="Revoluciones por minuto" unidad="rpm" valorInicial={60} />
              <ParametrosControl label="Tamaño de la rueda" unidad="cm" valorInicial={30} />
              <ParametrosControl label="Distancia" unidad="m" valorInicial={100} />
            </div>

            <div className="btn-orange text-center mt-5">
              <ButtonOrange label="NUEVA PARTIDA >" onClick={handleSiguiente} />
            </div>
          </AjustesContainer>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ParametrosIniciales;
