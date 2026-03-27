import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import ContactPopUp from "../../components/ContactPopUp";
import BreastPopup from "./components/Popups/BreastPopup";
import BodyPopup from "./components/Popups/BodyPopup";
import HairPopup from "./components/Popups/HairPopup";
import IntimPopup from "./components/Popups/IntimPopup";
import PlasticPopup from "./components/Popups/PlasticPopup";
import CorrectionPopup from "./components/Popups/CorrectionPopup";
import SeeServices from "./components/SeeServices";
import RinoPopup from "./components/Popups/RinoPopup";

const Layout = () => {
    return (
        <PopupProvider>
            <CorrectionPopup />
            <PlasticPopup />
            <IntimPopup />
            <HairPopup />
            <ContactPopUp />
            <BreastPopup />
            <BodyPopup />
            <RinoPopup />
            <div className="fixed md:hidden md:-bottom-10 left-0 w-[100%] aspect-[4096/2777] bg-[url('/plasticbg.webp')] [background-position:15%_bottom] bg-no-repeat bg-cover min-h-dvh md:bg-contain md:bg-bottom">
                <div className="absolute inset-0 bg-black/30"></div>
            </div>
            <SeeServices />
            <HeaderProvider>
                <Header />
                <ScrollSmoother>
                    <Outlet />
                </ScrollSmoother>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
