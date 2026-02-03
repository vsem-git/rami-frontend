import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef, useState } from "react";
import arrow from "/arrow-ap.svg";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const featuresLeft = [
    { text: "Безопасность пребывания", id: "safety-apartments-new" },
    { text: "Hi-tech технологии", id: "technologies-apartments-new" },
    { text: "Комфорт в деталях", id: "details-info-apartments-new" },
    { text: "Персонализированный сервис 24/7", id: "service-apartments-new" },
    {
        text: "Живописная пространственная среда",
        id: "picturesque-wednesday-apartments-new",
    },
];

const featuresRight = [
    "Аквамарин",
    "Александрит",
    "Аметист",
    "Бриллиант",
    "Жемчуг",
    "Изумруд",
    "Рубин",
    "Сапфир",
];

export const WelcomeApartmentsNew = () => {
    const [hoverIndexRight, setHoverIndexRight] = useState<number | null>(2);
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleScrollToSection = (sectionId: string) => {
        const targetSection = document.getElementById(sectionId);

        if (!targetSection) {
            return;
        }

        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: targetSection,
                offsetY: 0,
            },
            ease: "power2.inOut",
        });
    };

    useEffect(() => {
        if (!sliderRef.current) return;

        const slider = sliderRef.current;
        const slides = slider.querySelectorAll("img");

        slides.forEach((slide) => {
            const clone = slide.cloneNode(true);
            slider.appendChild(clone);
        });

        const totalWidth = slider.scrollWidth / 2;

        const animation = gsap.to(slider, {
            x: -totalWidth,
            duration: 20,
            ease: "none",
            repeat: -1,
        });

        const createSeamlessLoop = () => {
            gsap.set(slider, { x: 0 });

            animation.play(0);

            const onUpdate = () => {
                if (animation.progress() >= 0.5) {
                    gsap.set(slider, { x: 0 });
                    animation.play(0);
                }
            };

            animation.eventCallback("onUpdate", onUpdate);
        };

        createSeamlessLoop();

        return () => {
            animation.kill();
        };
    }, []);

    const handleScrollToNext = () => {
        handleScrollToSection("safety-apartments-new");
    };

    return (
        <div
            id="welcomeApartmentsNew"
            className="relative w-full max-[650px]:min-h-screen min-h-[1650px] md:min-h-[1800px] lg:min-h-[1900px] xl:min-h-[2000px] 2xl:min-h-[2400px] bg-[#1D1D1D] pt-32 md:pt-40 2xl:pt-52"
        >
            <img
                src="/apartmentsnew-screen/bg11.webp"
                alt=""
                className="absolute left-0 top-0 max-[650px]:w-[265px] w-[517px] xl:w-[702px] 2xl:w-[1026px]"
            />

            <div className="relative w-full flex justify-center items-center ">
                <ul className="absolute left-0 max-[1020px]:hidden flex flex-col gap-4 pl-[3%] max-[1150px]:mt-24 mt-10 2xl:mt-0">
                    {featuresLeft.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-center gap-4 cursor-pointer uppercase group"
                            onClick={() => handleScrollToSection(item.id)}
                        >
                            <span className="text-[#EAE6E0] transition-all duration-300 group-hover:text-white text-xs 2xl:text-base">
                                0{i + 1}
                            </span>
                            <span className=" text-xs 2xl:text-base text-[#EAE6E0] font-normal leading-none border-b border-[#EAE6E0] pb-2 pt-2 transition-all duration-300 group-hover:text-white group-hover:border-white">
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col items-center mx-12">
                    <h4 className="max-[650px]:text-xs text-base 2xl:text-xl font-normal text-white uppercase max-[650px]:mb-4 mb-6 md:mb-[30px] leading-none">
                        Медицинские
                    </h4>
                    <h1 className="relative z-10 max-[650px]:text-[32px] text-[44px] md:text-[55px] lg:text-[88px] 2xl:text-[110px] font-normal text-white uppercase leading-none">
                        апартаменты
                    </h1>

                    <div className="flex gap-5 -mt-10 2xl:-mt-12">
                        <div className="relative max-[1150px]:w-[308px] w-[374px] 2xl:w-[473px] max-[1150px]:h-[378px] h-[458px] 2xl:h-[580px] overflow-hidden card_apartments-welcome ">
                            <img
                                src="/apartmentsnew-screen/bg2.webp"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[#00000033]" />
                        </div>
                    </div>
                </div>

                <div className="absolute w-[200px] mt-10 2xl:mt-0 max-[1100px]:mt-24  tabs_apartments">
                    <ul className="flex flex-col gap-3">
                        {featuresRight.map((item, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-4 cursor-pointer uppercase transition-all duration-300 max-[650px]:h-5"
                                onMouseEnter={() => setHoverIndexRight(i)}
                            >
                                <span
                                    className={`h-px bg-[#EAE6E0] transition-all duration-300 ${
                                        hoverIndexRight === i ? "w-6" : "w-2"
                                    } ${hoverIndexRight === i ? "opacity-100" : "opacity-50"}`}
                                />

                                <span
                                    className={`max-[650px]:hidden text-xs 2xl:text-base text-[#EAE6E0] font-normal leading-none transition-opacity duration-300 ${
                                        hoverIndexRight === i
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }`}
                                >
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="absolute w-[273px] 2xl:w-[310px] h-[273px] 2xl:h-[310px] border border-[#FFFFFF0F] rounded-full flex justify-end  button-apartments">
                    <button
                        onClick={handleScrollToNext}
                        className="max-[650px]:w-8 w-10 max-[650px]:h-8 h-10 rounded-full border border-[#FFFFFF0F] bg-[#1D1D1D] flex items-center justify-center cursor-pointer mr-8 mt-5 relative z-40 hover:bg-[#2D2D2D] transition-colors duration-300 max-[1150px]:mr-2.5 max-[1150px]:mt-3 max-[1020px]:-mr-1 max-[650px]:-mr-2 max-[650px]:mt-2"
                        aria-label="Перейти к следующему разделу"
                    >
                        <img src={arrow} alt="Стрелка вниз" />
                    </button>
                </div>
            </div>

            <div className="relative w-full flex justify-center items-center flex-col max-[650px]:mt-6 mt-8 md:mt-[60px] lg:mt-[66px] 2xl:mt-22">
                <h2 className="relative z-10 text-base md:text-lg lg:text-2xl 2xl:text-[32px] font-normal text-white uppercase max-w-[450px] md:max-w-[550px] lg:max-w-[800px] 2xl:max-w-[1000px] text-center leading-[125%] px-3">
                    Спроектированы как респектабельные люксовые номера в
                    высококлассных отелях
                </h2>

                <ul className="max-[650px]:hidden max-[1020px]:flex hidden flex-col gap-2 mt-8">
                    {featuresLeft.map((item, i) => (
                        <li
                            key={i}
                            className="flex items-center gap-4 cursor-pointer uppercase group"
                            onClick={() => handleScrollToSection(item.id)}
                        >
                            <span className="text-[#EAE6E0] transition-all duration-300 group-hover:text-white text-xs 2xl:text-base">
                                0{i + 1}
                            </span>
                            <span className=" text-xs 2xl:text-base text-[#EAE6E0] font-normal leading-none border-b border-[#EAE6E0] pb-2 pt-2 transition-all duration-300 group-hover:text-white group-hover:border-white">
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="max-[650px]:hidden flex items-center justify-center mt-[-8rem] md:mt-[-7rem] lg:mt-[-10rem] 2xl:mt-[-13rem] px-[136px] ">
                    <img
                        src="/apartmentsnew-screen/card21.webp"
                        alt=""
                        className="relative z-10 max-[710px]:w-[165px] w-[185px] md:w-[210px] lg:w-[260px] xl:w-[293px] 2xl:w-[359px] max-[710px]:h-[180px] h-[218px] md:h-[230px] lg:h-[300px] xl:h-[344px] 2xl:h-[422px] mt-[15rem] lg:mt-[24rem] mr-[-1.5rem] lg:mr-[-3.5rem] "
                    />
                    <img
                        src="/apartmentsnew-screen/card19.webp"
                        alt=""
                        className="w-[240px] md:w-[290px] lg:w-[360px] xl:w-[417px] 2xl:w-[511px] h-[310px] md:h-[370px] lg:h-[450px] xl:h-[522px] 2xl:h-[640px]"
                    />

                    <img
                        src="/apartmentsnew-screen/bg7.webp"
                        alt=""
                        className="relative z-10 w-[220px] lg:w-[320px] xl:w-[355px] 2xl:w-[435px] h-[280px] lg:h-[400px] xl:h-[453px] 2xl:h-[556px] max-[710px]:mt-[25rem] mt-[27rem] md:mt-[29rem] lg:mt-[38rem] xl:mt-[41rem] 2xl:mt-[49rem] ml-[-2rem] md:ml-[-3rem]"
                    />
                    <img
                        src="/apartmentsnew-screen/card20.webp"
                        alt=""
                        className="max-[710px]:w-[165px] w-[185px] md:w-[210px] lg:w-[260px] xl:w-[293px] 2xl:w-[359px] max-[710px]:h-[180px] h-[229px] md:h-[280px] xl:h-[361px] lg:h-[340px] 2xl:h-[443px] mt-[-1rem] lg:mt-[-2rem] xl:mt-[-5rem] ml-[-4rem] md:ml-[-5rem] lg:ml-[-6rem] xl:ml-[-8rem]"
                    />

                    <img
                        src="/apartmentsnew-screen/bg4.webp"
                        alt=""
                        className="w-[253px] 2xl:w-[283px] h-[290px] 2xl:h-[355px] lg:mt-[32rem] ml-[-3.5rem] max-[1380px]:hidden"
                    />
                </div>

                <div
                    ref={sliderRef}
                    className="relative z-10 hidden max-[650px]:flex items-center gap-2  mt-[54px] mb-[112px]"
                >
                    <img
                        src="/apartmentsnew-screen/card21.webp"
                        alt=""
                        className="w-[160px] h-[200px]"
                    />
                    <img
                        src="/apartmentsnew-screen/card19.webp"
                        alt=""
                        className="w-[160px] h-[200px]"
                    />
                    <img
                        src="/apartmentsnew-screen/bg7.webp"
                        alt=""
                        className="w-[160px] h-[200px]"
                    />
                    <img
                        src="/apartmentsnew-screen/card20.webp"
                        alt=""
                        className="w-[160px] h-[200px]"
                    />
                    <img
                        src="/apartmentsnew-screen/bg4.webp"
                        alt=""
                        className="w-[160px] h-[200px]"
                    />
                </div>
            </div>

            <img
                src="/apartmentsnew-screen/figure.webp"
                alt=""
                className="absolute left-0 bottom-0"
            />
        </div>
    );
};
