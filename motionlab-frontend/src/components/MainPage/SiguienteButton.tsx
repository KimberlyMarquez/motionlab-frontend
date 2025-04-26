import { useNavigate } from 'react-router-dom'; 

const SiguienteButton = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/loginprofesores");
  };

    return(
        <button className="siguiente" onClick={handleGoBack}> SIGUIENTE </button>
    )
}

export default SiguienteButton