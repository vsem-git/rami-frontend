import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import ContactPopUp from "../../components/ContactPopUp";
import BreastPopup from "../../components/Plastic/Popups/BreastPopup";
import BodyPopup from "../../components/Plastic/Popups/BodyPopup";
import HairPopup from "../../components/Plastic/Popups/HairPopup";
import IntimPopup from "../../components/Plastic/Popups/IntimPopup";
import PlasticPopup from "../../components/Plastic/Popups/PlasticPopup";
import CorrectionPopup from "../../components/Plastic/Popups/CorrectionPopup";

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
