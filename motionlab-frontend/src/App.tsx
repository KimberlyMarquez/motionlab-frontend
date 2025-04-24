import { useState } from 'react';
import LoginCodigo from './pages/LoginCodigo.tsx';
import LoginAlumnos from './pages/LoginAlumnos.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [codigoAccedido, setCodigoAccedido] = useState<string | null>(null);

  return (
    <div className="background-container">
      <div className="main-content">
        {codigoAccedido ? (
          <LoginAlumnos 
            codigo={codigoAccedido} 
            onBack={() => setCodigoAccedido(null)} 
          />
        ) : (
          <LoginCodigo 
            onAccess={setCodigoAccedido}
            onLogout={() => setCodigoAccedido(null)}
          />
        )}
    
      </div>
    </div>
  );
};

export default App;