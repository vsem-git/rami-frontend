import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Outlet } from "react-router-dom";
import ContactPopUp from "../../components/ContactPopUp";
import { DoctorCardModal } from "../../components/DoctorCardModal";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import ScrollSmoother from "../../components/ScrollSmoother";
import Footer from "../../components/FooterWithoutAnimation";
import Header from "../../components/Header";

gsap.registerPlugin(ScrollTrigger);

const LayoutContent = () => {
    return (
        <>
            <ContactPopUp />
            <Header />
            <DoctorCardModal />

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
            <HeaderProvider>
                <LayoutContent />
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
