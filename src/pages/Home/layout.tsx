import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ScrollSmoother from "../../components/ScrollSmoother";
import Footer from "../../components/Footer";
import { HeaderProvider } from "../../components/HeaderContext";
import { PopupProvider } from "../../components/PopupContext";
import ContactPopUp from "../../components/ContactPopUp";
import SecondSectionPopup1 from "../../components/SecondSectionPopup1";
import SecondSectionPopup2 from "../../components/SecondSectionPopup2";
import SecondSectionPopup3 from "../../components/SecondSectionPopup3";

const RootLayout = () => {
    return (
        <PopupProvider>
            <HeaderProvider>
                <ContactPopUp />
                <SecondSectionPopup1 />
                <SecondSectionPopup2 />
                <SecondSectionPopup3 />
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
                        className="h-[96px] w-auto md:h-[120px] 2xl:h-[160px] object-cover object-right shrink-0"
                    />
                    <img
                        src="/runningstrokelogo.svg"
                        alt=""
                        className="h-[96px] w-auto md:h-[120px] 2xl:h-[160px] object-cover object-left shrink-0"
                    />
                </div>
                <Header />
                <ScrollSmoother>
                    <Outlet />
                    <Footer />
                </ScrollSmoother>
                <p className="firstblocktext pointer-events-none fixed top-[90px] md:bottom-0 text-[13px] md:text-sm 2xl:text-[21px] sm:top-1/2 sm:-translate-y-1/4 md:-translate-y-0 md:top-auto right-0 opacity-0 text-white m-6 xl:m-10 2xl:m-20 uppercase max-w-full  sm:max-w-[320px] 2xl:max-w-[480px] 2xl:tracking-wider 2xl:leading-8 z-10">
                    <span className="font-bold">Новый проект</span> владельцев
                    многопрофильной Клиники РАМИ Галины Резник и Мазена Хамуда –
                    Клиника пластической хирургии и эстетической косметологии{" "}
                    <span className="font-bold">RAMIСLINIC RESIDENCE</span>
                </p>
            </HeaderProvider>
        </PopupProvider>
    );
};

export default RootLayout;
