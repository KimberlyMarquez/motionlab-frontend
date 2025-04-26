import './MainPage.css';
import Footer from '../components/Footer';
import ReturnButton from '../components/MainPage/ReturnButton';
import EquipoButton from '../components/MainPage/EquipoButton';
import ProfesorButton from '../components/MainPage/ProfesorButton';
import SiguienteButton from '../components/MainPage/SiguienteButton';

const Main = () => {
  return (
    <div className="main-page-container">
      <a href="/"><ReturnButton /></a>
      <div className="wrapper-main">
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
          <h1 className="d-flex"><b>¡Bienvenido a MotionLab!</b></h1>
          <h3 className="mt-4 mb-4"><b>Ingresar:</b></h3>
          <EquipoButton />
          <ProfesorButton />
          <SiguienteButton />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
