import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import Footer from "../../components/Footer";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import ContactPopUp from "../../components/ContactPopUp";

const Layout = () => {
    return (
        <PopupProvider>
            <HeaderProvider>
                <ContactPopUp />
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
