import { useNavigate } from 'react-router-dom';
import '../pages/Ajustes.css';

interface Props {
  label: string;
  children: React.ReactNode;
  pag_anterior: string;
}

const AjustesContainer: React.FC<Props> = ({ label, children, pag_anterior }) => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate(pag_anterior);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="ajustes-box shadow-lg p-4">
        <button className="btn-regresar" onClick={handleRegresar}>
          &lt; Regresar
        </button>

        <div className="ajustes-label position-absolute start-50 translate-middle-x">
          {label}
        </div>

        <div className="ajustes-content">
          <div className="h-100 d-flex flex-column justify-content-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjustesContainer;


