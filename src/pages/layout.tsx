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
                <p className="firstblocktext fixed bottom-0 right-0 opacity-0 invisible text-white m-20 text-[21px] uppercase max-w-[480px] tracking-wider leading-8 z-10">
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
