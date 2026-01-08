import { Outlet } from "react-router-dom";
import ContactPopUp from "../../components/ContactPopUp";
import { DoctorsModal } from "../../components/DoctorsModal";
import Footer from "../../components/DoctorsFooter";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import ScrollSmoother from "../../components/ScrollSmoother";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        const bgpattern1 = document.querySelector(".bgpattern1") as HTMLElement;
        const bgpattern2 = document.querySelector(".bgpattern2") as HTMLElement;
        bgpattern1.style.transform = "translateX(120%)";
        bgpattern2.style.transform = "translateX(-120%)";
    }, [location.pathname]);

    return (
        <PopupProvider>
            <HeaderProvider>
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
                <DoctorsModal />

                <Header />
                <ScrollSmoother>
                    <Outlet />
                    <Footer />
                </ScrollSmoother>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
