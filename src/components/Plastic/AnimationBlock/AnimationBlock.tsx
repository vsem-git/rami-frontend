import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Hair from "../Lines/Hair";
import Correction from "../Lines/Correction";
import Plastic from "../Lines/Plastic";
import Grud from "../Lines/Grud";
import Intim from "../Lines/Intim";
import Body from "../Lines/Body";
import { usePopup } from "../../PopupContext";
import Rino from "../Lines/Rino";

const AnimationBlock = () => {
    const { openPopup } = usePopup();

    const containerRef = useRef(null);
    const runningStroke = useRef(null);
    const imageRef = useRef(null);
    const firstText = useRef(null);
    const secondText = useRef(null);
    const thirdText = useRef(null);
    const fourthText = useRef(null);
    const servicesBlock = useRef(null);

    useGSAP(() => {
        gsap.set(".shelf", {
            scale: 0,
            opacity: 0,
        });

        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            gsap.set(
                [
                    firstText.current,
                    secondText.current,
                    thirdText.current,
                    fourthText.current,
                ],
                {
                    opacity: 0,
                    filter: "blur(10px)",
                }
            );

            gsap.fromTo(
                firstText.current,
                {
                    opacity: 0,
                    duration: 1,
                    ease: "none",
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 2,
                    ease: "power2.inOut",
                }
            );

            gsap.to(".shelf", {
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: "power2.inOut",
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=1000%",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    fastScrollEnd: true,
                },
            });

            tl.to({}, { duration: 0.5, ease: "none" });

            tl.fromTo(
                runningStroke.current,
                {
                    y: "0%",
                    opacity: 1,
                },
                {
                    y: "-100%",
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                }
            )
                .to(
                    imageRef.current,
                    {
                        /* scale: 1.2,
                        bottom: "8%", */
                        left: "-4%",
                        width: "120%",
                        duration: 2,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    firstText.current,
                    {
                        autoAlpha: 1,
                        yPercent: 0,
                    },
                    {
                        autoAlpha: 0,
                        yPercent: -5,
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );
            tl.fromTo(
                firstText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "<"
            );

            tl.fromTo(
                secondText.current,
                {
                    opacity: 0,
                    ease: "none",
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    filter: "blur(0px)",
                    ease: "power2.inOut",
                }
            );

            tl.to({}, { duration: 0.5, ease: "none" });

            tl.fromTo(
                secondText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "power2.inOut",
                }
            );

            tl.fromTo(
                thirdText.current,
                {
                    opacity: 0,
                    ease: "none",
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    filter: "blur(0px)",
                    ease: "power2.inOut",
                }
            );

            tl.to({}, { duration: 0.5, ease: "none" });

            tl.fromTo(
                thirdText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "power2.inOut",
                }
            );

            tl.fromTo(
                fourthText.current,
                {
                    opacity: 0,
                    ease: "none",
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.75,
                    filter: "blur(0px)",
                    ease: "power2.inOut",
                }
            );
        });

        /* tl.to({}, { duration: 2, ease: "none" });

        tl.fromTo(
            fourthText.current,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "none",
            }
        ); */
    });

    return (
        <div
            ref={containerRef}
            className="overflow-hidden relative min-h-dvh text-white md:bg-[#080808] before:z-[-1] before:absolute before:h-dvh before:bottom-0 before:left-20 before:w-[calc(90%)] "
        >
            <div className="hidden md:block absolute z-[-1] h-dvh w-full bg-[#080808]">
                <div
                    ref={imageRef}
                    className="absolute md:-bottom-10 left-0 w-[100%] aspect-[4096/2777] bg-[url('/plasticbg.webp')] [background-position:15%_bottom] bg-no-repeat bg-cover min-h-dvh md:bg-contain sm:bg-bottom"
                >
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="md:hidden absolute bottom-4 left-4 flex items-center w-fit gap-3">
                        <div className="p-3 bg-[#691C32] rounded-full">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2.5V8M8 13.5V8M8 8H13.5H2.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </div>
                        <p className="text-xs font-semibold">СМОТРЕТЬ УСЛУГИ</p>
                    </div>
                    <Hair className="shelf hidden md:block absolute bottom-[47%] left-[27.5%] z-50" />
                    <Rino className="shelf hidden md:block absolute bottom-[41.6%] 2xl:bottom-[41.5%] left-[28.2%] z-50" />
                    <Correction className="shelf hidden md:block absolute bottom-[37%] right-[76.5%] 2xl:left-[5.5%] z-50 2xl:whitespace-nowrap" />
                    <Grud className="shelf hidden md:block absolute bottom-[30%] right-[74%] 2xl:left-[14.5%] z-50" />
                    <Intim className="shelf hidden md:block absolute bottom-[24%] right-[71%] 2xl:left-[10.5%] 2xl:whitespace-nowrap z-50" />
                    <Body className="shelf hidden md:block absolute bottom-[26%] left-[31%] 2xl:left-[29.5%] z-50" />
                    <Plastic className="shelf hidden md:block absolute bottom-[36.2%] left-[28.9%] 2xl:left-[29%] 2xl:bottom-[36%] z-50" />
                </div>
            </div>
            <div
                ref={runningStroke}
                className="marquee flex pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference absolute top-[calc(100dvh-96px-80px)] sm:top-[96px] md:top-[122px] left-0 w-full"
            >
                <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
            </div>
            <div
                ref={firstText}
                className="md:absolute md:scale-50 text-xs sm:ml-auto md:ml-0 2xl:text-lg md:opacity-0 h-dvh right-0 z-10 flex flex-col gap-4 xl:p-[80px] 2xl:p-[115px] uppercase justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] md:px-[32px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="mt-30">
                    «Plastikos» в переводе с греческого языка означает
                    «создавать форму», на латыни «plasticus» — ваяющий,
                    формирующий. Команда пластических хирургов RAMICLINIC
                    RESIDENCE умеет всё: и реконструктивные, и эстетические
                    операции, включая симультанные, когда одновременно
                    проводится несколько операций на разных, не связанных между
                    собой анатомических областях.
                </p>

                <p>
                    Современные пластические операции не только продлевают
                    молодость, но и меняют качество жизни наших пациентов, давая
                    возможность ежедневно наслаждаться эстетическим
                    преображением, ощущением свободы и обретением духовной силы.
                </p>
            </div>
            <div
                ref={servicesBlock}
                id="services"
                className="md:absolute md:scale-50 mt-30 sm:mt-0 text-xs sm:ml-auto md:ml-0 2xl:text-lg md:opacity-0 pt-[122px]  h-[calc(100dvh-122px)] right-0 z-10 flex flex-col gap-8 xl:p-[80px] 2xl:p-[115px] uppercase justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-[20px] uppercase">
                    Услуги пластической хирургии
                </p>
                <div className="border-t border-[#FFFFFF26] text-[11px]">
                    <div
                        onClick={() => openPopup("hairpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Пересадка волос</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("correctionpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">
                            Коррекция шрамов и рубцов
                        </div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("plasticpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">пластика лица</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("breastpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Грудь</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("intimpopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Интимная пластика</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                    <div
                        onClick={() => openPopup("bodypopup")}
                        className="py-4 flex justify-between items-center border-b border-[#FFFFFF26]"
                    >
                        <div className="font-semibold">Тело</div>
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                                stroke="white"
                                strokeOpacity="0.5"
                                strokeWidth="1.5"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div
                ref={secondText}
                className="md:absolute md:scale-50 md:opacity-0  sm:ml-auto md:ml-0 h-dvh right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <div className="mb-8 2xl:mb-10 text-sm 2xl:text-[21px]">
                    Сегодня в операционном портфеле RAMICLINIC RESIDENCE
                    представлены все виды пластической хирургии:
                </div>
                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            01
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Реконструктивные операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            02
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Эстетические операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            03
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Онкопластические операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            04
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Повторные операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-2 2xl:mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            05
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Мужская пластика
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={thirdText}
                className="md:absolute md:scale-50 md:opacity-0 h-dvh  sm:ml-auto md:ml-0 right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-lg md:text-[20px] 2xl:text-[28px] mb-6">
                    Наш подход
                </p>
                <p className="text-[13px] md:text-[14px] 2xl:text-[21px]">
                    Выбор оптимальной тактики и стратегии эстетического
                    преображения в RAMICLINIC RESIDENCE происходит на первой
                    встрече с пластическим хирургом и решение принимается вместе
                    с пациентом.
                </p>
            </div>
            <div
                ref={fourthText}
                className="md:absolute md:scale-50 md:opacity-0  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-sm md:text-[18px] 2xl:text-[20px] mb-10">
                    Используя данные генетического паспорта кожи и наш подход к
                    антиэйдж-сопровождению пациент получает подробную
                    персонализированную «дорожную карту», где находятся все
                    этапы эстетического преображения: от подготовки до самого
                    операционного вмешательства и предсказуемых сценариев
                    реабилитационной программы.
                </p>
                {/* <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            01
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Генетический паспорт кожи
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            02
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Антиэйдж-сопровождение
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center 2xl:text-sm text-[10px] md:text-[11px] rounded-full">
                            03
                        </div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs">
                            Персонализированная «дорожная карта»
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[40px_1fr] 2xl:grid-cols-[48px_1fr] gap-3 2xl:gap-6 items-center mb-4">
                        <div className="aspect-square flex justify-center items-center rounded-full"></div>
                        <div className="2xl:text-lg font-medium uppercase text-[11px] md:text-xs text-[#FFFFFF99] leading-[155%]">
                            С логистикой всех этапов эстетического преображения:
                            от подготовки к операции до предсказуемых сценариев
                            реабилитационной программы.
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default AnimationBlock;
