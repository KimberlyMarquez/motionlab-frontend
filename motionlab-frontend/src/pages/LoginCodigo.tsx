import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import CustomButton from '../components/CustomButton';
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
          <label className="form-label fw-bold mb-2 fs-5" style={{color: '#032B6F'}}>Código</label>
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
          <CustomButton label="Acceder" onClick={handleSubmit} />
        </div>
      </FormContainer>
      <Footer />
    </>
  );
};

export default LoginCodigo;