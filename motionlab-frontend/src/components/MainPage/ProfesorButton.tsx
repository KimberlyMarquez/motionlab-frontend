import { useNavigate } from "react-router";

const ProfesorButton = () => {
    const navigate = useNavigate();
    const handleLoginProfesor = () => {
        navigate("/loginprofesores");
      };

    return(
        <div className="profesor person-container d-flex mb-4 ps-2 pe-4" onClick={handleLoginProfesor}>
        <img className="p-2 ps-0 ms-2 pe-2 me-4" src="../assets/MainPage/MainProfesor.svg"/>
        <p className="mt-4 me-5 pe-5"><b>Profesor</b></p>
        </div>
    )
}

export default ProfesorButton