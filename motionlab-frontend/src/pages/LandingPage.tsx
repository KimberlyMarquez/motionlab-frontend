import LandingGuy from "../components/LandingPage/LandingGuy";
import LandingCar from "../components/LandingPage/LandingCar";
import LandingButton from "../components/LandingPage/LandingButton";
import LandingLogo from "../components/LandingPage/LandingLogo";

const LandingPage = () => {
    return(
        <div className="landing-page-container position-relative">
            <img src="/assets/LandingPage/LandingBackground.svg" className="position-absolute top-0 start-0" alt="Background"/>
            <img src="/assets/LandingPage/LandingAssets.svg" className="position-absolute top-50 start-0" alt="Assets"/>
            <img src="/assets/LandingPage/LandingShadows.svg" className="position-absolute top-100 start-0" alt="Shadows"/>
            <img src="/assets/LandingPage/LandingBushMountain.svg" className="position-absolute top-150 start-0" alt="Shadows"/>
            <LandingGuy/>
            <LandingCar/>
            <LandingButton/>
            <LandingLogo/>
            <img src="/assets/Footer.svg" className="position-absolute top-200 start-0" alt="Footer"/>
        </div>
    );
}

export default LandingPage;