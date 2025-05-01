import './Pages.css';
import Footer from '../components/Footer';
import LogoutButton from '../components/LogoutButton';
import LanzarPartidaCard from '../components/LanzarPartidaProfesor/LanzarPartidaCard';

const LanzarPartidaProfesor = () => {
    const nomina = sessionStorage.getItem('teacherId') || 'Profesor';

    return(
        <>  
            <div className="background-container flex-column">
                <LanzarPartidaCard nomina={nomina}/>
                <LogoutButton redirectTo="/loginprofesores"/>
            <Footer />
            </div>
        </>
    );
}

export default LanzarPartidaProfesor;