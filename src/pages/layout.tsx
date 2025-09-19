import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import ScrollSmoother from "../components/ScrollSmoother";
import Footer from "../components/Footer";
import { HeaderProvider } from "../components/HeaderContext";
import Preloader from "../components/Preloader";

const RootLayout = () => {
    return (
        <Preloader>
            <HeaderProvider>
                <div className="bgpattern1 fixed top-0 right-0 h-full hidden sm:block opacity-50 z-[0]">
                    <img src="/pattern1.svg" alt="teambg" />
                </div>
                <div className="bgpattern2 fixed top-0 left-0 h-full opacity-50 z-[0]">
                    <img
                        src="/pattern2.svg"
                        alt="teambg"
                        className="h-full object-cover overflow-visible"
                    />
                </div>
                <div className="runningstroke fixed bottom-10 left-0 flex gap-8 z-[0] h-fit object-fit opacity-0 overflow-visible">
                    <img
                        src="/runningstrokelogo.svg"
                        alt=""
                        className="h-fit"
                    />
                    <img
                        src="/runningstrokelogo.svg"
                        alt=""
                        className="h-fit"
                    />
                <div className="bgpattern1 fixed top-0 right-0 h-full opacity-50 z-[0]">
                    <img src="/pattern1.svg" alt="teambg" />
                </div>
                <div className="bgpattern2 fixed top-0 left-0 h-full opacity-50 z-[0]">
                    <img src="/pattern2.svg" alt="teambg" />
                </div>
                <div className="runningstroke fixed bottom-10 left-0 flex gap-8 z-[0]">
                    <img src="/runningstrokelogo.svg" alt="" />
                    <img src="/runningstrokelogo.svg" alt="" />
                </div>
                <Header />
                <ScrollSmoother>
                    <Outlet />
                    <Footer />
                </ScrollSmoother>
<<<<<<< HEAD
                <p className="firstblocktext fixed bottom-0 text-[13px] md:text-sm 2xl:text-[21px] sm:top-1/2 sm:-translate-y-1/4 md:-translate-y-0 md:top-auto md:bottom-0 right-0 opacity-0 invisible text-white m-6 xl:m-10 2xl:m-20 uppercase max-w-full  sm:max-w-[320px] 2xl:max-w-[480px] 2xl:tracking-wider 2xl:leading-8 z-10">
=======
                <p className="firstblocktext fixed bottom-0 right-0 opacity-0 invisible text-white m-20 text-[21px] uppercase max-w-[480px] tracking-wider leading-8 z-10">
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
                    <span className="font-bold">Новый проект</span> владельцев
                    многопрофильной Клиники РАМИ Галины Резник и Мазена Хамуда –
                    Клиника пластической хирургии и эстетической косметологии{" "}
                    <span className="font-bold">RAMIСLINIC RESIDENCE</span>
                </p>
            </HeaderProvider>
        </Preloader>
    );
};

export default RootLayout;
