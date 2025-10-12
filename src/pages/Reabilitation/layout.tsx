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
                    <div className="overflow-y-auto overflow-x-hidden h-full w-full bg-[#1D1D1D] fixed reabilitation-block">
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
                        <div className="marquee-reabilitation md:hidden z-10 text-white inline-flex pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference absolute bottom-0 left-0 w-full">
                            <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                            <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                            <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                            <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                        </div>
                    </div>
                </ClocksProvider>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
