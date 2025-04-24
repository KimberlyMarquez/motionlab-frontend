import Footer from '../components/Footer';
import LandingButton from '../components/LandingPage/LandingButton';
import LandingLogo from '../components/LandingPage/LandingLogo';
import './LandingPage.css';

const LandingPage = () => {
    return(
        <div className="landing-page-container d-flex">
            <div className="d-flex flex-column align-items-center justify-content-center pt-5">
                <div className="p-2">
                    <LandingLogo/>
                </div>
                <div className="mt-3">
                    <a className="p-4" href="/Main"> COMENZAR </a>
                </div>    
            </div>

            <footer className="footer text-center">
                <Footer/>
            </footer>
        </div>
    )
}

export default LandingPage;