import { POPUP_NAMES } from "../constants/popupNames";
import { TOUR_ITEMS } from "./MedicalTourProgram";
import { usePopup } from "./PopupContext";

export const MedicalTourProgramMobile = () => {
    const { openPopup } = usePopup();

    const handleTitleClick = (index: number) => {
        openPopup(POPUP_NAMES.TOURISM_INFO, index);
    };

    return (
        <div
            className="w-full flex md:hidden flex-col bg-[#691C32] text-white min-h-[900px] gap-6 pb-14 h-screen"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="w-full h-[300px] sm:h-[400px] py-10 px-4 relative"
                style={{
                    backgroundImage: `linear-gradient(180deg, rgba(29, 29, 29, 0.6) 0%, rgba(29, 29, 29, 0.2) 50%, rgba(29, 29, 29, 0.6) 100%), url("/safety-screen/bg5.webp")`,
                    backgroundRepeat: "no-repeat, no-repeat",
                    backgroundSize: "cover, cover",
                    backgroundPosition: "center, center",
                }}
            >
                <h2 className="text-sm sm:text-[20px] text-white max-w-[328px] sm:max-w-[405px] leading-[130%] relative z-10">
                    В <b>RAMICLINIC RESIDENCE</b> пациенты вместе с новой
                    эстетикой внешности получают уникальный культурный опыт
                    пребывания в Санкт-Петербурге
                </h2>
            </div>

            <div className="flex flex-col gap-4 w-full px-4 mt-2">
                <h2
                    onClick={() => handleTitleClick(0)}
                    className="text-[14px] sm:text-xl uppercase mb-0 sm:mb-2
															cursor-pointer relative w-fit
															after:content-['']
															after:absolute
															after:-bottom-0
															after:left-0
															after:w-0
															after:h-px
															after:bg-white
															after:transition-all
															after:duration-300
															hover:after:w-full"
                >
                    Программа медицинского тура
                </h2>

                {TOUR_ITEMS.map((item, i) => (
                    <div
                        key={i}
                        className="border-t border-[#FFFFFF33] pt-2 pb-3"
                    >
                        <div className="flex flex-col gap-2">
                            {i !== 0 && (
                                <div className="flex items-center justify-between">
                                    <h3
                                        onClick={() => handleTitleClick(i)}
                                        className="text-[14px] sm:text-[16px] uppercase max-w-[488px] cursor-pointer relative w-fit
																									after:content-['']
																									after:absolute
																									after:-bottom-0
																									after:left-0
																									after:w-0
																									after:h-px
																									after:bg-white
																									after:transition-all
																									after:duration-300
																									hover:after:w-full"
                                    >
                                        {item.title}
                                    </h3>
                                    <span className="text-[#FFFFFF4D] text-[14px] sm:text-[16px]">
                                        {item.number}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-start justify-between">
                                <p className="text-[11px] text-[#FFFFFFBF] uppercase leading-snug max-w-[292px] sm:max-w-[408px]">
                                    {item.text}
                                </p>
                                {i === 0 && (
                                    <span className="text-[#FFFFFF4D] text-[14px] sm:text-[16px]">
                                        {item.number}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    className="relative text-xs xl:text-sm 2xl:text-base font-semibold text-[#EAE6E0] uppercase cursor-pointer px-1 flex items-center gap-1 group"
                    onClick={() => openPopup("contact")}
                >
                    <span className="relative">
                        Запланировать визит
                        <span className="absolute -bottom-0 left-0 w-0 h-px bg-[#EAE6E0] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <img
                        src="/plus-up.svg"
                        alt=""
                        className="inline-block -mt-[3px] w-4"
                        style={{
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                </button>
            </div>
        </div>
    );
};
