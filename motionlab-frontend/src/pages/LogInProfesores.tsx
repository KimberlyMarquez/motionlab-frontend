import './pages.css';
import Footer from '../components/Footer';
import GoBackButton from '../components/LogInProfesores/GoBackButton';
import LogInCard from '../components/LogInProfesores/LogInCard';

const LogInProfesores = () => {
    return(
        <>  
            <div className="background-container flex-column">
                <LogInCard />
            <GoBackButton />
            <Footer />
            </div>
        </>
    );
}

export default LogInProfesores;