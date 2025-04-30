import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import LogoutButton from '../components/LogoutButton';
import CustomButton from '../components/CustomButtonT4';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import '../pages/Pages.css';
import { accederConCodigo } from '../api/logincodigoAPI';

const LoginCodigo: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const regex = /^[a-zA-Z0-9]{8}$/;

    if (!regex.test(codigo)) {
      alert('El código debe tener exactamente 8 caracteres alfanuméricos.');
      return;
    }

    const result = await accederConCodigo(codigo);

    if (result.success) {
      console.log('Código válido y equipo creado:', result);
      navigate('/login', { state: { codigo } });
    } else {
      alert(result.error);
    }
  };

  return (
    <>
      <div className="background-container">
        <div className="main-content">
          <LogoutButton /> {/* Ya no requiere la prop onClick */}
          <FormContainer>
            <div className="text-center w-100">
              <label
                className="form-label fw-bold mb-3 fs-5"
                style={{
                  color: '#032B6F',
                  fontFamily: '"Inter", sans-serif'
                }}
              >
                Código
              </label>
              <input
                type="text"
                className="form-control mb-5"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                style={{
                  backgroundColor: '#f2f2f2',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  fontSize: '1.1rem',
                  boxShadow: 'none',
                  outline: 'none',
                  width: '19%',
                  margin: '0 auto',
                }}
              />
              <CustomButton label="ACCEDER" onClick={handleSubmit} />
            </div>
          </FormContainer>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LoginCodigo;
