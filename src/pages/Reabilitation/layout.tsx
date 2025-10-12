import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import { ClocksProvider } from "../../components/Reabilitation/ClocksProvider";
import MobileBackground from "../../components/Reabilitation/MobileBackground";

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
                        <MobileBackground />
                        <img
                            src="/reabilitation-screen/reabilitation.webp"
                            className="mobile-reabilitation-image fixed z-[1] md:hidden sm:w-[55%] max-h-[100%] -bottom-[8%] -left-[2%]  object-contain"
                            width={770}
                        />
                    </div>
                </ClocksProvider>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
