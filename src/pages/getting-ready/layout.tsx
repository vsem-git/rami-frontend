import { Outlet } from "react-router-dom";
import ContactPopUp from "../../components/ContactPopUp";
import { HeaderProvider } from "../../components/HeaderContext";
import HeaderUpdate from "../../components/HeaderUpdate";
import { PopupProvider, usePopup } from "../../components/PopupContext";
import ScrollSmoother from "../../components/ScrollSmoother";
import { BackgroundProvider } from './components/GettingReady/BackgroundContext';
import MobileBackground from './components/GettingReady/MobileBackground';

const LayoutContent = () => {
    const { isOpen } = usePopup();

    return (
        <>
            <ContactPopUp />
            {!isOpen("contact") && <HeaderUpdate />}
            <div className="bg-[#080808] h-full w-full fixed pointer-events-none will-change-transform">
                <MobileBackground />
                <ScrollSmoother>
                    <Outlet />
                </ScrollSmoother>
            </div>
        </>
    );
};

const Layout = () => {
    return (
        <PopupProvider>
            <HeaderProvider>
                <BackgroundProvider>
                    <LayoutContent />
                </BackgroundProvider>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
