import { AboutDynasty } from "../../components/AboutDynasty";
import { AboutInfo } from "../../components/AboutInfo";
import { AboutPersonalizedService } from "../../components/AboutPersonalizedService";
import { AboutSafety } from "../../components/AboutSafety";
import { AboutSmartOperational } from "../../components/AboutSmartOperational";
import { WelcomeAbout } from "../../components/WelcomeAbout";

export const About = () => {
    return (
        <div>
            <WelcomeAbout />
            <AboutInfo />
            {/* <AboutHistory /> */}
            <AboutDynasty />
            <AboutSmartOperational />
            <AboutSafety />
            <AboutPersonalizedService />
            {/* <AboutNutrition /> */}
        </div>
    );
};
