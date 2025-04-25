import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import '../pages/Pages.css';

const LoginAlumnos: React.FC = () => {
  const [matriculas, setMatriculas] = useState(['', '', '', '', '']);
  const [codigo] = useState(''); 
  const navigate = useNavigate();

  const handleMatriculaChange = (index: number, value: string) => {
    const newMatriculas = [...matriculas];
    newMatriculas[index] = value;
    setMatriculas(newMatriculas);
  };

  const handleSubmit = () => {
    if (codigo.trim()) {
      navigate ('/parametros');
    }
  };


  const setCodigoAccedido = (value: null) => {
    console.log('CodigoAccedido set to:', value);
  };

  function onLogout(): void {
    setCodigoAccedido(null);
    console.log('User logged out');
  }

  const handleBack = () => {
    console.log("Regresar a la página anterior");
    navigate(-1); 
  };

  return (
    <>
    <div className="background-container">
      <div className="main-content">
        <LogoutButton onClick={onLogout} />
        <FormContainer>
          <button className="btn-regresar" onClick={handleBack}>
            &larr; Regresar
          </button>
          <div className="d-flex justify-content-between align-items-center mb-2 mt-5">
            <span className="fw-bold">{codigo}</span>
          </div>
          <label className="form-label">Matrículas</label>
          {matriculas.map((m, i) => (
            <input
              key={i}
              type="text"
              className="form-control mb-2"
              value={m}
              onChange={(e) => handleMatriculaChange(i, e.target.value)}
            />
          ))}
          <CustomButton label="¡UNIRSE!" onClick={handleSubmit} />
        </FormContainer>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LoginAlumnos;

