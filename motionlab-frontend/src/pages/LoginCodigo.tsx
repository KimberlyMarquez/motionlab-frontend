import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import CustomButton from '../components/CustomButton';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const LoginCodigo: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (codigo.trim()) {
      console.log('Accediendo con código:', codigo);
      navigate ('/login');
    }
  };

  return (
    <>
    <div className="background-container">
      <div className="main-content">
        <LogoutButton onClick={() => console.log("Logout")} />
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
        </div>
        <Footer />
    </div>
    </>
  );
};

export default LoginCodigo;
