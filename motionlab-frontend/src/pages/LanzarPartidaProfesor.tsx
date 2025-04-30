import './Pages.css';
import Footer from '../components/Footer';
import LogOutButton from '../components/LanzarPartidaProfesor/LogOutButton';
import LanzarPartidaCard from '../components/LanzarPartidaProfesor/LanzarPartidaCard';

const LanzarPartidaProfesor = () => {
    const nomina = localStorage.getItem('teacherId') || 'Profesor';

    return(
        <>  
            <div className="background-container flex-column">
                <LanzarPartidaCard nomina={nomina}/>
            <LogOutButton />
            <Footer />
            </div>
        </>
    );
}

export default LanzarPartidaProfesor;