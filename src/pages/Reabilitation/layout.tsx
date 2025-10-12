import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import { ClocksProvider } from "../../components/Reabilitation/ClocksProvider";

const Layout = () => {
    return (
        <PopupProvider>
            <HeaderProvider>
                <ClocksProvider>
                    <div className="overflow-y-auto overflow-x-hidden h-full w-full bg-[#1D1D1D] fixed">
                        <Header />
                        <div className="z-10 relative">
                            <ScrollSmoother>
                                <Outlet />
                            </ScrollSmoother>
                        </div>
                    </div>
                </ClocksProvider>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
