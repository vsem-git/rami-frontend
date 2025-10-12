import { useEffect, useState } from "react";
import { gsap } from "gsap";

const doctors = [
    [
        "/swiper1.webp",
        "/serb.gif",
        ["ГЛАВНЫЙ ВРАЧ", "Пластический хирург", "ВРАЧ ВЫСШЕЙ КАТЕГОРИИ"],
        "Серб",
        "Ирина Анатольевна",
    ],
    [
        "/swiper2.webp",
        "/telishevskiy.gif",
        [
            "ЗАМЕСТИТЕЛЬ ГЛАВНОГО ВРАЧА ПО МЕДИЦИНСКОЙ ЧАСТИ",
            "РЕКОНСТРУКТИВНО-ПЛАСТИЧЕСКИЙ ХИРУРГ",
            "ОНКОЛОГ-МАММОЛОГ",
        ],
        "Телишевский",
        "Антон Валентинович",
    ],
    [
        "/swiper3.webp",
        "/tarasenko.gif",
        ["КАНДИДАТ МЕДИЦИНСКИХ НАУК", "ПЛАСТИЧЕСКИЙ ХИРУРГ"],
        "Тарасенко",
        "Василий Сергеевич",
    ],
    [
        "/swiper4.webp",
        "/hrustaleva.gif",
        [
            "ДОКТОР МЕДИЦИНСКИХ НАУК",
            "ПЛАСТИЧЕСКИЙ ХИРУРГ",
            "ЗАВЕДУЮЩАЯ КАФЕДРОЙ ПЛАСТИЧЕСКОЙ ХИРУРГИИ ПСПбГМУ ИМ. АК. ПАВЛОВА",
        ],
        "Хрусталева",
        "Ирина Эдуардовна",
    ],
    [
        "/swiper5.webp",
        "/kardov.gif",
        ["ПЛАСТИЧЕСКИЙ ХИРУРГ"],
        "Кардов",
        "Хазрит Музаринович",
    ],
    [
        "/swiper6.webp",
        "/rami.gif",
        ["ЗАМЕСТИТЕЛЬ ОПЕРАЦИОННОГО ДИРЕКТОРА", "ПЛАСТИЧЕСКИЙ ХИРУРГ"],
        "Хамуд",
        "Рами",
    ],
];

const Doctors = () => {
    useEffect(() => {
        gsap.set(".bgpattern1", { x: "120%" });
        gsap.set(".bgpattern2", { x: "-120%" });
    }, []);

    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <div className="2xl:pt-[152px] md:pt-[112px] pt-[80px] px-6 sm:px-4 md:px-6 2xl:px-10 md:mb-[120px] xl:mb-[160px] mb-[96px] 2xl:mb-[240px]">
            <div className="py-12 md:py-16 2xl:py-20">
                <div className="text-[24px] md:text-[28px] 2xl:text-[44px] tracking-[0.08em] leading-[125%] text-[#1D1D1D] uppercase mb-6 md:mb-8 2xl:mb-10">
                    Команда Ramiclinic residence
                </div>
                <div className="font-semibold leading-[155%] text-[11px] md:text-xs 2xl:text-base flex xl:flex-row flex-col justify-between xl:items-center">
                    <div>
                        <ul className="flex gap-10 xl:h-auto h-[48px] items-center uppercase mb-2 xl:mb-0 overflow-x-auto whitespace-nowrap">
                            <li
                                onClick={() => setActiveTab(0)}
                                className={`
                                    ${
                                        activeTab === 0
                                            ? "text-[#1D1D1D] after:bg-[#1D1D1D] after:w-full"
                                            : "text-[#1D1D1D80] after:bg-[#1D1D1D80] after:w-0"
                                    }${" "}
                                    relative
                                    cursor-pointer
                                    after:absolute 
                                    after:left-0 
                                    after:bottom-0 
                                    after:h-[1px] 
                                    after:transition-all 
                                    after:duration-300 
                                    hover:after:w-full
                                `}
                            >
                                ВСЕ ВРАЧИ
                            </li>
                            <li
                                onClick={() => setActiveTab(1)}
                                className={`
                                    ${
                                        activeTab === 1
                                            ? "text-[#1D1D1D] after:bg-[#1D1D1D] after:w-full"
                                            : "text-[#1D1D1D80] after:bg-[#1D1D1D80] after:w-0"
                                    }${" "}
                                    relative
                                    cursor-pointer
                                    after:absolute 
                                    after:left-0 
                                    after:bottom-0 
                                    after:h-[1px] 
                                    after:w-0 
                                    after:transition-all 
                                    after:duration-300 
                                    hover:after:w-full
                                `}
                            >
                                ПЛАСТИЧЕСКИЕ ХИРУРГИ
                            </li>
                            <li
                                onClick={() => setActiveTab(2)}
                                className={`
                                    ${
                                        activeTab === 2
                                            ? "text-[#1D1D1D] after:bg-[#1D1D1D] after:w-full"
                                            : "text-[#1D1D1D80] after:bg-[#1D1D1D80] after:w-0"
                                    }${" "}
                                    relative
                                    cursor-pointer
                                    after:absolute 
                                    after:left-0 
                                    after:bottom-0 
                                    after:h-[1px]  
                                    after:w-0 
                                    after:transition-all 
                                    after:duration-300 
                                    hover:after:w-full
                                `}
                            >
                                КОСМЕТОЛОГИ
                            </li>
                            <li
                                onClick={() => setActiveTab(3)}
                                className={`
                                    ${
                                        activeTab === 3
                                            ? "text-[#1D1D1D] after:bg-[#1D1D1D] after:w-full"
                                            : "text-[#1D1D1D80] after:bg-[#1D1D1D80] after:w-0"
                                    }${" "}
                                    relative
                                    cursor-pointer
                                    after:absolute 
                                    after:left-0 
                                    after:bottom-0 
                                    after:h-[1px] 
                                    after:w-0 
                                    after:transition-all 
                                    after:duration-300 
                                    hover:after:w-full
                                `}
                            >
                                Антиэйдж-специалисты
                            </li>
                        </ul>
                    </div>
                    <div className="flex justify-between items-center gap-4 bg-[#E8E8E8] p-3 xl:p-0 xl:">
                        <span>ДРУГИЕ СПЕЦИАЛИСТЫ</span>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="2xl:w-[32px] 2xl:h-[32px] h-[24px] w-[24px] hidden xl:inline"
                        >
                            <path
                                d="M16 5V16M16 27V16M16 16H27H5"
                                stroke="#1D1D1D"
                                strokeWidth="1.5"
                            />
                        </svg>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="xl:hidden"
                        >
                            <path
                                d="M2.5 8.5H13.5M13.5 8.5L9 4M13.5 8.5L9 13"
                                stroke="#1D1D1D"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
                <div className="aspect-[448/598.4] bg-cover bg-center bg-[url('/swiper1.webp')]"></div>
            </div>
            <div className="flex items-center justify-center pt-20">
                <button className="flex items-center 2xl:text-base text-xs gap-3">
                    <span className="font-semibold leading-[155%] uppercase">
                        Показать ещё
                    </span>
                    <div className="p-3 bg-[#691C32] rounded-full aspect-square">
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.5 4.34985V12.5999M12.5 20.8499L12.5 12.5999M12.5 12.5999L20.75 12.5999L4.25 12.5999"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Doctors;
