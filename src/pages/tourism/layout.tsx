import { Outlet } from "react-router-dom";
import ContactPopUp from "../../components/ContactPopUp";
import Footer from "../../components/Footer";
import HeaderUpdate from "../../components/HeaderUpdate";
import { NewsCardInfoModal } from "../../components/NewsCardInfoModal";
import { PopupProvider, usePopup } from "../../components/PopupContext";
import ScrollSmoother from "../../components/ScrollSmoother";
import TourismPanel from "./components/TourismPanel";
import { POPUP_NAMES } from "../../constants/popupNames";
import { dataTourism } from "../../shared/data/tourism";

const LayoutContent = () => {
    const { getPopupData, openPopup, closeAllPopups } = usePopup();
    const selectedIndex = getPopupData(POPUP_NAMES.TOURISM_INFO);

    const handleOpenContact = () => {
        closeAllPopups();
        openPopup("contact");
    };

    return (
        <>
            <ContactPopUp />
            <HeaderUpdate useWhiteText={true} isRelative />
            <NewsCardInfoModal />

            <TourismPanel
                tourismData={dataTourism.modal}
                selectedIndex={selectedIndex}
                handleOpenContact={handleOpenContact}
            />

            <ScrollSmoother>
                <Outlet />
                <Footer />
            </ScrollSmoother>
        </>
    );
};

const Layout = () => {
    return (
        <PopupProvider>
            <LayoutContent />
        </PopupProvider>
    );
};

export default Layout;
