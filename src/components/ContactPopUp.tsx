import { usePopup } from "./PopupContext";
import { useState } from "react";

const ContactPopUp = () => {
    const { isOpen, closePopup } = usePopup();
    const [agree, setAgree] = useState(false);

    return (
        <div
            className="fixed inset-0 bg-[#691C32] h-dvh w-full overflow-hidden group z-50 md:grid grid-cols-2 transition-all duration-1000"
            style={{
                scale: isOpen ? 1 : 0.5,
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
            }}
        >
            <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="absolute top-6 right-6 cursor-pointer"
                onClick={() => closePopup()}
                xmlns="http://www.w3.org/2000/svg"
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

            <div className="max-h-full overflow-hidden md:block hidden">
                <img
                    src="/contact.jpg"
                    alt="contact"
                    className="object-cover max-h-full w-full object-center h-full"
                />
            </div>
            <div className="p-[30px] md:p-[80px]  2xl:p-[160px]">
                <h2 className="leading-[125%] text-[24px] 2xl:text-[44px] text-white uppercase mb-6">
                    Свяжитесь с нами
                </h2>
                <p className="leading-[155%] text-[#FFFFFFBF] uppercase max-w-[560px] text-sm 2xl:text-base mb-10">
                    Horem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc vulputate libero et velit interdum, ac aliquet odio
                    mattis.
                </p>
                <form>
                    <input
                        type="text"
                        placeholder="КАК ВАС ЗОВУТ?*"
                        className="placeholder:text-[#FFFFFF80] py-4 border-b border-[#FFFFFF1A] w-full text-white text-sm 2xl:text-[21px] outline-none mb-2"
                    />
                    <input
                        type="text"
                        placeholder="ТЕЛЕФОН*"
                        className="placeholder:text-[#FFFFFF80] py-4 border-b border-[#FFFFFF1A] w-full text-white text-sm 2xl:text-[21px] outline-none mb-2"
                    />
                    <input
                        type="text"
                        placeholder="EMAIL"
                        className="placeholder:text-[#FFFFFF80] py-4 border-b border-[#FFFFFF1A] w-full text-white text-sm 2xl:text-[21px] outline-none mb-2"
                    />
                    <input
                        type="text"
                        placeholder="ЧТО ВАС ИНТЕРЕСУЕТ?"
                        className="placeholder:text-[#FFFFFF80] py-4 border-b border-[#FFFFFF1A] w-full text-white text-sm 2xl:text-[21px] outline-none mb-10"
                    />
                    <div className="flex items-center gap-3 mb-10">
                        <div
                            className="border-[1.5px] border-white w-[15px] h-[15px] aspect-square relative cursor-pointer"
                            style={{
                                backgroundColor: agree
                                    ? "#FFFFFF"
                                    : "transparent",
                            }}
                            onClick={() => setAgree(!agree)}
                        >
                            <input
                                type="checkbox"
                                checked={agree}
                                className="absolute inset-0 sr-only"
                            />
                        </div>
                        <div className="text-[#FFFFFFBF] text-sm 2xl:text-base">
                            Принимаю{" "}
                            <span className="text-white underline">
                                условия обработки персональных данных
                            </span>
                        </div>
                    </div>
                    <button className="bg-white 2xl:px-8 px-4 2xl:py-5 py-2.5 text-sm 2xl:text-base text-[#691C32] font-semibold uppercase cursor-pointer">
                        ОТПРАВИТЬ
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPopUp;
