import './Pages.css';
import Footer from '../components/Footer';
import GoBackButtonMain from '../components/MainPage/GoBackButtonMain';
import LogInCard from '../components/LogInProfesores/LogInCard';

const LogInProfesores = () => {
    return (
        <>
            <div className="background-container flex-column">
                <LogInCard />
                <GoBackButtonMain redirectTo="/Main" />
                <Footer />
            </div>
        </>
    );
}

export default LogInProfesores;