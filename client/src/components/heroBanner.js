import "./herobanner.css"
import Logo from "../assets/logo.png"

const HeroBanner = () => {
    return (
        <div className="">
            <div className="hero-banner">
                <div className="hero-banner-left">
                    <div className="hero-banner-overlay">

                    </div>
                    <div className="hero-banner-logo"> 
                        <img src={Logo} style={{ width: "400px"}} alt="" />
                    </div>
                </div>
                <div className="hero-banner-right">
                    <div className="hero-headline">
                        I am the news!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;