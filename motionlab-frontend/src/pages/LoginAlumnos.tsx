import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import Footer from '../components/Footer';

interface Props {
  codigo: string;
  onBack: () => void;
}

const LoginAlumnos: React.FC<Props> = ({ codigo, onBack }) => {
  const [matriculas, setMatriculas] = useState(['', '', '', '', '']);

  const handleMatriculaChange = (index: number, value: string) => {
    const newMatriculas = [...matriculas];
    newMatriculas[index] = value;
    setMatriculas(newMatriculas);
  };

  const setCodigoAccedido = (value: null) => {
    console.log('CodigoAccedido set to:', value);
  };

  function onLogout(): void {
    setCodigoAccedido(null);
    console.log('User logged out');
  }

  return (
    <>
      <LogoutButton onClick={() => setCodigoAccedido(null)} />
      <FormContainer>
        <button className="btn btn-link p-0 mb-2" onClick={onBack}>
          &larr; Regresar
        </button>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="text-danger m-0">¡Bienvenido!</h5>
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
        <button className="btn btn-primary w-100">¡UNIRSE!</button>
      </FormContainer>
      <div className="logout-button" onClick={onLogout}>
        <img src="/log-out.svg" alt="Salir" />
      </div>
      <Footer />
    </>
  );
};

export default LoginAlumnos;
