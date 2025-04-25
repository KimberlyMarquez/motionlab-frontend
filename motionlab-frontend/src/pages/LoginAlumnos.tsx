import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import Footer from '../components/Footer';
import CustomButton from '../components/CustomButton';
import ButtonRegresar from '../components/ButtonRegresar';
import '../pages/Pages.css';

const LoginAlumnos: React.FC = () => {
  const [matriculas, setMatriculas] = useState(['', '', '', '', '']);
  const navigate = useNavigate();
  const location = useLocation();
  const codigo = location.state?.codigo || '';

  const handleMatriculaChange = (index: number, value: string) => {
    const nuevasMatriculas = [...matriculas];
    nuevasMatriculas[index] = value;
    setMatriculas(nuevasMatriculas);
  };

  const handleSubmit = () => {
    if (codigo.trim()) {
      navigate('/lobby');
    }
  };

  const setCodigoAccedido = (value: null) => {
    console.log('Código accedido set to:', value);
  };

  const onLogout = () => {
    setCodigoAccedido(null);
    console.log('Usuario cerró sesión');
  };

  const handleRegresar = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="background-container">
        <div className="main-content">
          <LogoutButton onClick={onLogout} />

          <FormContainer>
            <div className="d-flex justify-content-between align-items-center mb-5 px-4">
            <div className="btn-regresar-encabezado"onClick={handleRegresar}>
              < ButtonRegresar label='< REGRESAR' />
            </div>
              <div className="codigo-box">{codigo}</div>
            </div>

            <div className="text-center mb-5 mt-4">
              <label className="form-label fw-bold fs-5" style={{ color: '#032B6F' }}>
                Matrículas
              </label>

              {matriculas.map((m, i) => (
                <input
                  key={i}
                  type="text"
                  className="form-control mb-2 input-matricula"
                  value={m}
                  onChange={(e) => handleMatriculaChange(i, e.target.value)}
                  style={{ 
                    backgroundColor: '#f2f2f2',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '0 0.5rem',
                    fontSize: '1.2rem',
                    boxShadow: 'none',
                    outline: 'none',
                    width: '22%',
                    margin: '0 auto',
                    textAlign: 'center',
                  }}
                />
              ))}
              
              <div className='mb-5 mt-3'>
                <CustomButton label="¡UNIRSE!" onClick={handleSubmit} />
              </div>
            </div>
          </FormContainer>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LoginAlumnos;