import { useNavigate } from "react-router";

const ProfesorButton = () => {
    const navigate = useNavigate();
    const handleLoginProfesor = () => {
        navigate("/loginprofesores");
    };

    return (
        <div className="profesor person-container d-flex mb-4 ps-2 pe-5" onClick={handleLoginProfesor} style={{ 'width': '277px' }}>
            <img className="p-2 ps-0 ms-2 pe-2 me-2" src="../assets/MainPage/MainProfesor.svg" />
            <p className="mt-4 ms-2 me-5 pe-4"><b>Profesor</b></p>
        </div>
    )
}

export default ProfesorButton