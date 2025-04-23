import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="rounded-4 shadow-lg p-4" style={{ 
        backgroundColor: '#E8F1FF',
        width: '100%', 
        maxWidth: '1000px', 
        height: '70%' }}>
        <div className="text-center fw-bold fs-4 mb-4" style={{color: '#C85332'}}>¡Bienvenido!</div>

        <div className="bg-white rounded-4 shadow p-4 mx-auto" style={{ maxWidth: '97%', height: '300px' }}>
          <div className="h-100 d-flex flex-column justify-content-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
