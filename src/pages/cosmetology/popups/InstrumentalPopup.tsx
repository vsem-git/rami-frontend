import { usePopup } from "../../../components/PopupContext";
import { useEffect, useState } from "react";

export const InstrumentalPopup = () => {
    const { isOpen, closePopup, openPopup } = usePopup();
    const popupName = "instrumental-modal";
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth <= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    // обработчик клика по свободной области
    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // чтобы клик внутри контента не закрывал модалку
        if (e.target === e.currentTarget && isMobile) {
            closePopup(popupName);
        }
    };

    return (
        <div
            className={`fixed flex flex-col sm:flex-row justify-end right-0 sm:max-w-[384px] md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px] h-dvh w-full group z-50 transition-all duration-1000 ${
                isOpen(popupName)
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
            // добавляем клик только на мобильной версии
            onClick={handleBackgroundClick}
        >
            <div
                className={`bg-[#691C32] transition-all duration-1000 text-center sm:text-left sm:max-w-[384px] md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px] w-full justify-center px-8 xl:px-20 2xl:px-[120px] py-8 flex flex-col ${
                    isOpen(popupName)
                        ? "translate-y-0 sm:translate-x-0"
                        : "translate-y-full sm:translate-y-0 sm:translate-x-full"
                }`}
            >
                <button
                    className="cursor-pointer absolute z-[9999] top-1/2 -translate-y-1/2 -left-14"
                    onClick={() => closePopup(popupName)}
                >
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.5"
                            y="0.5"
                            width="47"
                            height="47"
                            rx="23.5"
                            stroke="white"
                            strokeOpacity="0.1"
                        />
                        <path
                            d="M30.75 17.25L24 24M17.25 30.75L24 24M24 24L17.25 17.25L30.75 30.75"
                            stroke="white"
                            strokeWidth="1.5"
                        />
                    </svg>
                </button>

                <h2 className="text-white uppercase text-[24px] 2xl:text-[36px] mb-4">
                    АППАРАТНАЯ КОСМЕТОЛОГИЯ
                </h2>
                <p className="text-[#FFFFFF99] text-[12px] 2xl:text-[18px] mb-8 md:max-w-none uppercase">
                    В распоряжении пациентов Клиники-резиденции RAMICLINIC
                    RESIDENCE – один из самых роскошных парков
                    косметологического оборудования в нашей стране. Здесь
                    собраны оригинальные аппараты со всего мира для фототерапии
                    широкополосным светом, высокочастотной ультразвуковой
                    терапии, микротоковой терапии, радиочастотной физиотерапии и
                    других инновационных процедур.
                </p>

                <button
                    onClick={() => {
                        closePopup(popupName);
                        openPopup("contact");
                    }}
                    className="text-[#691C32] hover:outline hover:outline-white hover:bg-transparent hover:text-white transition-all duration-300 bg-white uppercase py-5 px-8 text-[12px] 2xl:text-base cursor-pointer w-full sm:w-fit font-semibold"
                >
                    Запланировать визит
                </button>
            </div>
        </div>
    );
};
