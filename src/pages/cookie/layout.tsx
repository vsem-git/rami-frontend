import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Outlet, useLocation } from "react-router-dom";
import ContactPopUp from "../../components/ContactPopUp";
import { DoctorCardModal } from "../../components/DoctorCardModal";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import ScrollSmoother from "../../components/ScrollSmoother";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const LayoutContent = () => {
    const location = useLocation();

    useEffect(() => {
        const bgpattern1 = document.querySelector(".bgpattern1") as HTMLElement;
        const bgpattern2 = document.querySelector(".bgpattern2") as HTMLElement;
        bgpattern1.style.transform = "translateX(120%)";
        bgpattern2.style.transform = "translateX(-120%)";
    }, [location.pathname]);

    return (
        <>
            <div className="bgpattern1 fixed top-0 right-0 h-full hidden sm:block opacity-50 z-[0]">
                <img
                    src="/pattern1.svg"
                    alt="teambg"
                    className="h-full object-cover overflow-visible"
                />
            </div>
            <div className="bgpattern2 fixed top-0 left-0 h-full hidden sm:block opacity-50 z-[0]">
                <img
                    src="/pattern2.svg"
                    alt="teambg"
                    className="h-full object-cover overflow-visible"
                />
            </div>
            <ContactPopUp />
            <DoctorCardModal />

            <Header />

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
