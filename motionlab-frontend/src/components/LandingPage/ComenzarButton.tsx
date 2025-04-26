import { useNavigate } from 'react-router-dom'; 

const ComenzarButton = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/Main");
  };

    return(
        <button className="comenzarbutton" onClick={handleGoBack}> COMENZAR </button>
    )
}

export default ComenzarButton