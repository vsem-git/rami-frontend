import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import Footer from "../../components/Footer";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import { ScrollProvider } from "./ScrollContext";
import ContactPopUp from "../../components/ContactPopUp";
import SecondSectionPopup1 from "../../components/SecondSectionPopup1";
import SecondSectionPopup2 from "../../components/SecondSectionPopup2";
import SecondSectionPopup3 from "../../components/SecondSectionPopup3";
import ScrollToButton from "../../components/ScrollToButton";

const RootLayout = () => {
    return (
        <PopupProvider>
            <HeaderProvider>
                <ScrollProvider>
                    <ContactPopUp />
                    <SecondSectionPopup1 />
                    <SecondSectionPopup2 />
                    <SecondSectionPopup3 />

                    <div
                        className={`scrolltosection uppercase fixed text-[15px] z-10 md:text-base 2xl:text-[24px] bottom-0 w-full text-center  `}
                    >
                        <div className="textheader">
                            клиника-резиденция пластической хирургии
                        </div>
                        <button className="uppercase text-[13px] font-semibold mt-2 sm:hidden textheader">
                            ЗАПЛАНИРОВАТЬ ВИЗИТ
                        </button>
                        <ScrollToButton />
                    </div>
                    <div className="bgpattern1 fixed top-0 right-0 h-full hidden sm:block opacity-50 z-[0]">
                        <img
                            src="/pattern1.svg"
                            alt="teambg"
                            className="h-full object-cover overflow-visible"
                        />
                    </div>
                    <div className="bgpattern2 fixed top-0 left-0 h-full opacity-50 z-[0]">
                        <img
                            src="/pattern2.svg"
                            alt="teambg"
                            className="h-full object-cover overflow-visible"
                        />
                    </div>
                    <div className="runningstroke fixed bottom-4 left-0 flex gap-8 z-[0] overflow-visible opacity-0">
                        <img
                            src="/runningstrokelogo.svg"
                            alt=""
                            className="w-auto h-[96px] md:h-[120px] 2xl:h-[176px] py-[24px] md:py-[28px] 2xl:py-10 object-cover object-right shrink-0"
                        />
                        <img
                            src="/runningstrokelogo.svg"
                            alt=""
                            className="w-auto h-[96px] md:h-[120px] 2xl:h-[176px] py-[24px] md:py-[28px] 2xl:py-10 object-cover object-left shrink-0"
                        />
                    </div>
                    <Header />
                    <ScrollSmoother>
                        <Outlet />
                        <Footer />
                    </ScrollSmoother>
                </ScrollProvider>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default RootLayout;
