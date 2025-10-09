import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";

const Layout = () => {
    return (
        <PopupProvider>
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
