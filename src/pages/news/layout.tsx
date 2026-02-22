import { Outlet } from "react-router-dom";
import ContactPopUp from "../../components/ContactPopUp";
import Footer from "../../components/Footer";
import HeaderUpdate from "../../components/HeaderUpdate";
import { PopupProvider } from "../../components/PopupContext";
import ScrollSmoother from '../../components/ScrollSmoother'
import { NewsCardInfoModal } from '../../components/NewsCardInfoModal'

const LayoutContent = () => {
    return (
        <>
            <ContactPopUp />
            <HeaderUpdate useWhiteText={false} isRelative={true} />
            <NewsCardInfoModal />

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
