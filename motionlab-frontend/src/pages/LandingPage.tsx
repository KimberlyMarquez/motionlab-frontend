import LandingGuy from "../components/LandingPage/LandingGuy";
import LandingCar from "../components/LandingPage/LandingCar"

const LandingPage = () => {
    return(
        <div className="container position-relative">
            <img src="/assets/LandingPage/LandingBackground.svg" className="position-absolute top-0 start-0" alt="Background"/>
            <img src="/assets/LandingPage/LandingAssets.svg" className="position-absolute top-50 start-0" alt="Assets"/>
            <img src="/assets/LandingPage/LandingShadows.svg" className="position-absolute top-100 start-0" alt="Shadows"/>
            <img src="/assets/LandingPage/LandingBushMountain.svg" className="position-absolute top-150 start-0" alt="Shadows"/>
            <LandingGuy/>
            <LandingCar/>
        </div>
    );
}

export default LandingPage;