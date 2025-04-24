import './MainPage.css';
import Footer from '../components/Footer';
import ReturnButton from '../components/MainPage/ReturnButton';


const Main = () => {
    return(
        <div className="main-page-container d-flex flex-column align-items-center justify-content-center pt-5">
        <a href="/"><ReturnButton/></a>    
            <div className="container p-2 mt-3 ps-5 pe-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-4">
                    <h1 className="d-flex"><b>¡Bienvenido a MotionLab!</b></h1>
                    <h3 className="mt-4 mb-4"><b>Ingresar:</b></h3>
                    <div className="person-container d-flex mb-4 ps-2 pe-5">
                    <img className="p-2 ps-0 ms-2 pe-2 me-2" src="../assets/MainPage/MainEquipo.svg"/>
                    <p className="mt-4 ms-2 me-5 pe-5"><b>Equipo</b></p>
                    </div>
                    <div className="person-container d-flex mb-4 ps-2 pe-4">
                    <img className="p-2 ps-0 ms-2 pe-2 me-4" src="../assets/MainPage/MainProfesor.svg"/>
                    <p className="mt-4 me-5 pe-5"><b>Profesor</b></p>
                    </div>
                    <a className="p-2 ps-3 pe-3 mt-2 mb-3"> SIGUIENTE </a>
                </div>    
            </div>
            
            <footer className="footer text-center">
                <Footer/>
            </footer>
        </div>
        
    )
}

export default Main