import { useNavigate } from "react-router"

const EquipoButton = () => {
    const navigate = useNavigate();
    const handleLoginEquipo = () => {
        navigate("/codigo");
    };

    return (
        <div className="equipo person-container d-flex mb-4 ps-2 pe-5" onClick={handleLoginEquipo}>
            <img className="p-2 ps-0 ms-2 pe-2 me-2" src="../assets/MainPage/MainEquipo.svg" />
            <p className="mt-4 ms-2 me-5 pe-5"><b>Equipo</b></p>
        </div>
    )
}

export default EquipoButton