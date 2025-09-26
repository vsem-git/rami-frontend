import { usePopup } from "./PopupContext";

const SecondSectionPopup2 = () => {
    const { isOpen, closePopup } = usePopup();

    const popupName = "secondsection2"; // уникальное имя попапа

    return (
        <div
            className="fixed flex flex-col justify-end inset-0 bg-[#1D1D1D80] h-dvh w-full overflow-hidden group z-50 transition-all duration-1000"
            style={{
                transform: isOpen(popupName)
                    ? "translateY(0)"
                    : "translateY(100vh)",
                opacity: isOpen(popupName) ? 1 : 0,
                pointerEvents: isOpen(popupName) ? "auto" : "none",
            }}
        >
            <div className="w-full flex justify-center mb-4">
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => closePopup(popupName)}
                >
                    <rect
                        x="0.5"
                        y="0.5"
                        width="47"
                        height="47"
                        rx="23.5"
                        stroke="white"
                        stroke-opacity="0.1"
                    />
                    <path
                        d="M30.75 17.25L24 24M17.25 30.75L24 24M24 24L17.25 17.25L30.75 30.75"
                        stroke="white"
                        stroke-width="1.5"
                    />
                </svg>
            </div>
            <div className="bg-[#691C32] w-full px-4 py-8 text-center">
                <h2 className="text-white uppercase text-[20px] mb-4">TITLE</h2>
                <p className="text-[#FFFFFF99] text-[11px] mb-8 max-w-[328px] uppercase">
                    Worem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis
                </p>
                <button className="text-[#691C32] bg-white uppercase py-5 w-full text-[13px] cursor-pointer">
                    Запланировать визит
                </button>
            </div>
        </div>
    );
};

export default SecondSectionPopup2;
