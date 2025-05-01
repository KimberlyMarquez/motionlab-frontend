import Footer from '../components/Footer';
import LandingLogo from '../components/LandingPage/LandingLogo';
import ComenzarButton from '../components/LandingPage/ComenzarButton';
import './LandingPage.css';

const LandingPage = () => {
    return(
        <div className="landing-page-container flex-column align-items-center d-flex">
            <div className="wrapper justify-content-center">
                <div className="containerlanding d-flex flex-column justify-content-center align-items-center">
                        <LandingLogo/>
                    <div className="comenzar pt-4">
                        <ComenzarButton/>
                    </div>   
                </div>    

            </div>
                <Footer/>
        </div>
    )
}

export default LandingPage;