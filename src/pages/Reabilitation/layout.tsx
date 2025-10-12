import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import MobileBackground from "../../components/Reabilitation/MobileBackground";
import ScrollSmoother from "../../components/ScrollSmoother";
import { useState } from "react";
import { useEffect } from "react";

const Layout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isSmoother = () => {
        if (isMobile) {
            return <Outlet />;
        } else {
            return (
                <ScrollSmoother>
                    <Outlet />
                </ScrollSmoother>
            );
        }
    };

    return (
        <PopupProvider>
            <div className="fixed w-full h-full bg-[#1D1D1D]"></div>
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
            <MobileBackground />
            <HeaderProvider>
                <Header />
                {isSmoother()}
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;

/* <PopupProvider>
            <HeaderProvider>
                <ClocksProvider>
                    <div className="overflow-y-auto overflow-x-hidden h-full w-full bg-[#1D1D1D] fixed">
                        <Header />
                        <ScrollSmoother>
                            <Outlet />
                        </ScrollSmoother>
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
        </PopupProvider> */
