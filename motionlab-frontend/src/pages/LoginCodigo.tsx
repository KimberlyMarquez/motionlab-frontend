import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import Footer from '../components/Footer';

interface Props {
  onAccess: (codigo: string) => void;
  onLogout: () => void;
}

const LoginCodigo: React.FC<Props> = ({ onAccess, onLogout }) => {
  const [codigo, setCodigo] = useState('');

  const handleSubmit = () => {
    if (codigo.trim()) onAccess(codigo);
  };

  return (
    <>
      <LogoutButton onClick={onLogout} />
      <FormContainer>
        <div className="text-center w-100">
          <label className="form-label fw-bold text-primary mb-2 fs-5">Código</label>
          <input
            type="text"
            className="form-control mb-5"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            style={{ 
              backgroundColor: '#f2f2f2',
              border: 'none',
              borderRadius: '16px',
              padding: '0.75rem',
              fontSize: '1.1rem',
              boxShadow: 'none',
              outline: 'none',
              width: '17%',
              margin: '0 auto',
            }}
          />
          <button
            className="btn btn-primary px-4 py-2 fw-bold shadow mt-5"
            onClick={handleSubmit}
            style={{ 
              fontSize: '1.4rem',
              padding: '0.9rem 2rem',
              borderRadius: '12px',
              width: '20%',
            }}
          >
            ACCEDER
          </button>
        </div>
      </FormContainer>
      <Footer />
    </>
  );
};

export default LoginCodigo;