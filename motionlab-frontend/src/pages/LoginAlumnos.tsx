import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registrarAlumnos } from '../api/loginalumnosAPI';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import Footer from '../components/Footer';
import CustomButton from '../components/CustomButtonT4';
import ButtonRegresar from '../components/ButtonRegresar';
import '../pages/Pages.css';

const LoginAlumnos: React.FC = () => {
  const miembros = parseInt(sessionStorage.getItem("members") || "5");
  const [matriculas, setMatriculas] = useState<string[]>(Array(miembros).fill(''));
  const navigate = useNavigate();
  const location = useLocation();
  const codigo = location.state?.codigo || "sin código";

  const validarMatricula = (matricula: string) => /^A0\d{7}$/.test(matricula);

  const handleMatriculaChange = (index: number, value: string) => {
    const nuevasMatriculas = [...matriculas];
    nuevasMatriculas[index] = value;
    setMatriculas(nuevasMatriculas);
  };

  const handleSubmit = async () => {
    const filtradas = matriculas.filter((m) => m.trim() !== '');

    if (filtradas.length === 0) {
      alert('Debe ingresar al menos una matrícula.');
      return;
    }

    if (filtradas.some((m) => !validarMatricula(m))) {
      alert('Las matrículas deben empezar con A0 y tener exactamente 7 números.');
      return;
    }

    if (new Set(filtradas).size !== filtradas.length) {
      alert('No puede haber matrículas repetidas.');
      return;
    }

    const teamId = sessionStorage.getItem('teamId');
    if (!teamId) {
      alert('No hay equipo asociado. Reintenta.');
      return;
    }

    const res = await registrarAlumnos(teamId, filtradas);

    if (res.success) {
      navigate('/lobby');
    } else {
      alert(res.message);
    }
  };

  return (
    <>
      <div className="background-container">
        <div className="main-content">
          <FormContainer>
            <div className="d-flex justify-content-between align-items-center mb-5 px-4">
              <div
                className="btn-regresar-encabezado"
                onClick={() => {
                  sessionStorage.removeItem("codigo");
                  sessionStorage.removeItem("matchId");
                  sessionStorage.removeItem("teamId");
                  sessionStorage.removeItem("members");
                  navigate(-1);
                }}
              >
                <ButtonRegresar label='< Regresar' />
              </div>
              <div className="codigo-box">{codigo}</div>
            </div>

            <div className="text-center mb-5 mt-4">
              <label className="form-label fw-bold fs-5" style={{ color: '#032B6F', fontFamily: '"Inter", sans-serif' }}>
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

