import { useNavigate } from 'react-router-dom';

interface Props {
  label: string;
  children: React.ReactNode;
}

const AjustesContainer: React.FC<Props> = ({ label, children }) => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate('/');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div
        className="shadow-lg p-4"
        style={{
          backgroundColor: '#E8F1FF',
          width: '100%',
          maxWidth: '1200px',
          height: '80%',
          borderRadius: '100px',
          border: '1px solid black',
        }}
      >
          <button
            onClick={handleRegresar}
            style={{
                position: 'absolute',
                left: 170,
                backgroundColor: '#92B3E6',
                color: 'white',
                fontFamily: '"Jersey 20", sans-serif',
                fontSize: '1.6rem',
                padding: '0rem 1rem',
                borderRadius: '16px',
                border: '5px solid #6B95D6',
                boxShadow: '6px 6px 10px rgba(0, 0, 0, 0.2)',
                letterSpacing: '1px',
            }}
            >
            &lt; Regresar
            </button>

        
          <div className="position-absolute start-50 translate-middle-x"
            style={{
              top: 58,
              backgroundColor: '#547EBC',
              color: 'white',
              borderRadius: '0 0 16px 16px',
              fontWeight: 'bold',
              fontSize: '2.5rem',
              padding: '1rem 3rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            }}
          >
            {label}
          </div>

        <div style={{ marginTop: '90px', height: '80%' }}>
          <div className="h-100 d-flex flex-column justify-content-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjustesContainer;

