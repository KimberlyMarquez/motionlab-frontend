import { useNavigate } from 'react-router-dom';
import logo from '/Logo.svg';
import '../components/Lobby.css';

interface Props {
  label: string;
  children: React.ReactNode;
  pag_anterior: string;
}

const AjustesContainer = ({ label, children, pag_anterior }: Props) => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate(pag_anterior);
  };

  const handleIrAtras = () => {
    sessionStorage.clear();
    navigate("/")
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="lobby-box shadow-lg p-4">
        <div>
          <button onClick={handleIrAtras}><img src={logo} alt="Logo" className="logo" /></button>

          <div className="lobby-label position-absolute start-50 translate-middle-x">
            <div className="codigo">Código</div>
            {label}
          </div>
        </div>
        <div className="lobby-content">
          <div className="h-100 d-flex flex-column justify-content-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjustesContainer;