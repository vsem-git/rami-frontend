import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const AnimationBlock = () => {
    const containerRef = useRef(null);
    const runningStroke = useRef(null);
    const bgRef = useRef(null);
    const substractRef = useRef(null);
    const imageRef = useRef(null);
    const firstText = useRef(null);
    const secondText = useRef(null);
    const thirdText = useRef(null);
    const fourthText = useRef(null);
    const fifthText = useRef(null);
    const sixthText = useRef(null);
    const seventhText = useRef(null);
    const eighthText = useRef(null);
    const ninethText = useRef(null);
    const tenthText = useRef(null);

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
                        opacity: 1,
                    },
                    {
                        opacity: 0,
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        height: "85%",
                        left: "20%",
                    },
                    {
                        height: "170%",
                        top: "85%",
                        left: "15%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        height: "85%",
                        left: "21%",
                        opacity: 0,
                    },
                    {
                        height: "170%",
                        top: "85%",
                        left: "16%",
                        opacity: 1,
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        top: "85%",
                    },
                    {
                        top: "80%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        top: "85%",
                        opacity: 0,
                    },
                    {
                        top: "80%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        top: "80%",
                    },
                    {
                        top: "68%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        top: "80%",
                        opacity: 0,
                    },
                    {
                        top: "68%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );

            tl.to({}, { duration: 2, ease: "none" });

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
            );

            tl.fromTo(
                fifthText.current,
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        top: "68%",
                        left: "15%",
                    },
                    {
                        top: "53%",
                        height: "220%",
                        left: "3%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        top: "68%",
                        left: "16%",
                        opacity: 0,
                    },
                    {
                        top: "53%",
                        height: "220%",
                        left: "4%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );

            tl.to({}, { duration: 2, ease: "none" });

            tl.fromTo(
                fifthText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                }
            );

            tl.fromTo(
                sixthText.current,
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        top: "53%",
                        left: "3%",
                    },
                    {
                        top: "43%",
                        left: "3%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        top: "53%",
                        left: "4%",
                        opacity: 0,
                    },
                    {
                        top: "43%",
                        left: "4%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );

            tl.to({}, { duration: 2, ease: "none" });

            tl.fromTo(
                sixthText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                }
            );

            tl.fromTo(
                seventhText.current,
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        top: "43%",
                    },
                    {
                        top: "22%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        top: "43%",
                        opacity: 0,
                    },
                    {
                        top: "22%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );

            tl.to({}, { duration: 2, ease: "none" });

            tl.fromTo(
                seventhText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                }
            );

            tl.fromTo(
                eighthText.current,
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        top: "22%",
                    },
                    {
                        top: "-10%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        top: "22%",
                        opacity: 0,
                    },
                    {
                        top: "-10%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );

            tl.to({}, { duration: 2, ease: "none" });

            tl.fromTo(
                eighthText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                }
            );

            tl.fromTo(
                ninethText.current,
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        height: "220%",
                        left: "3%",
                        top: "-10%",
                    },
                    {
                        height: "260%",
                        left: "11%",
                        top: "-30%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        height: "220%",
                        left: "4%",
                        top: "-10%",
                    },
                    {
                        height: "260%",
                        left: "12%",
                        top: "-30%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );

            tl.to({}, { duration: 2, ease: "none" });

            tl.fromTo(
                ninethText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                }
            );

            tl.fromTo(
                tenthText.current,
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
            )
                .fromTo(
                    bgRef.current,
                    {
                        height: "220%",
                        left: "11%",
                        top: "-10%",
                    },
                    {
                        height: "85%",
                        left: "20%",
                        top: "50%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                )
                .fromTo(
                    substractRef.current,
                    {
                        height: "220%",
                        left: "12%",
                        opacity: 1,
                        top: "-10%",
                    },
                    {
                        height: "85%",
                        opacity: 0,
                        left: "21%",
                        top: "50%",
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "<"
                );

            tl.to({}, { duration: 2, ease: "none" });
        });
    });

    return (
        <div
            ref={containerRef}
            className="overflow-hidden relative min-h-dvh text-white bg-[#080808] before:z-[-1] before:absolute before:h-dvh before:bottom-0 before:left-20 before:w-[calc(90%)] "
        >
            <div className="absolute inset-0">
                <img
                    src="/getting-ready/bg2.png"
                    className="absolute top-1/2 opacity-0 h-[85%] left-[21%] blur-[27.2784px] -translate-y-1/2 object-contain"
                    ref={substractRef}
                />
                <img
                    src="/getting-ready/bg1.png"
                    className="absolute top-1/2 h-[85%] left-[20%] -translate-y-1/2 object-contain"
                    ref={bgRef}
                />
            </div>
            <div
                ref={runningStroke}
                className="marquee flex pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference absolute top-[calc(100dvh-96px-80px)] sm:bottom-[0px] md:bottom-[0px] left-0 w-full"
            >
                <span className="px-8 uppercase">
                    Подготовка к пластической операции
                </span>
                <span className="px-8 uppercase">
                    Подготовка к пластической операции
                </span>
                <span className="px-8 uppercase">
                    Подготовка к пластической операции
                </span>
                <span className="px-8 uppercase ">
                    Подготовка к пластической операции
                </span>
            </div>
            <div
                ref={firstText}
                className="md:absolute md:scale-50 text-xs sm:ml-auto md:ml-0 2xl:text-lg md:opacity-0 h-dvh right-0 z-10 flex flex-col gap-4 xl:p-[80px] 2xl:p-[115px] uppercase justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] md:px-[32px] lg:max-w-[420px] xl:max-w-[555px] 2xl:max-w-[800px]"
            >
                <p className="mt-[120px] sm:mt-0">
                    Еще до того, как будут проводиться пластические операции, мы
                    составляем детальный прогноз реакций организма на
                    хирургическое вмешательство, опираясь на результаты
                    инструментальной и лабораторной диагностики, включающей в
                    себя подробное генетическое исследование наследственных
                    особенностей формирования рубцов, заживления ран, склонности
                    к отекам и гематомам.
                </p>
            </div>
            <div
                ref={secondText}
                className="md:absolute md:scale-50 md:opacity-0 text-xs  sm:ml-auto md:ml-0 h-dvh right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] 2xl:text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="mt-[120px] sm:mt-0">
                    Составление{" "}
                    <span className="font-bold">
                        программы подготовки к пластической операции
                    </span>{" "}
                    – это всегда индивидуальный процесс, с которого начинается
                    любая история преображения в Клинике-резиденции RAMICLINIC
                    RESIDENCE.
                </p>
            </div>
            <div
                ref={thirdText}
                className="md:absolute md:scale-50 md:opacity-0 h-dvh  sm:ml-auto md:ml-0 right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[550px] 2xl:max-w-[790px]"
            >
                <p className="text-[12px] 2xl:text-lg mt-[120px] sm:mt-0">
                    С первого до последнего шага корреляция между внешними и
                    внутренними процессами каждого пациента находится под
                    пристальным контролем уникального антиэйдж-специалиста,
                    обладающего глубокими знаниями в вопросах профилактики,
                    замедления и коррекции процессов старения на всех уровнях
                    организма:{" "}
                    <span className="font-bold">
                        гормональном, ментальном, сенситивном и энергетическом.
                    </span>
                </p>
            </div>
            <div
                ref={fourthText}
                className="md:absolute md:scale-50 md:opacity-0  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10 flex flex-col  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-xs 2xl:text-lg mb-10 mt-[120px] sm:mt-0">
                    Это уникальный подход, который можно назвать{" "}
                    <span className="font-bold">роскошью</span>, доступной
                    только для пациентов Клиники-резиденции RAMICLINIC
                    RESIDENCE.
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
            <div
                className="md:absolute md:scale-50 md:opacity-0 flex items-center  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
                ref={fifthText}
            >
                <div className="mt-[120px] sm:mt-0 grid grid-cols-[40px_auto] xl:grid-cols-[48px_auto] gap-4">
                    <div className="bg-[#FFFFFF1A] text-[10px] md:text-[11px] 2xl:text-sm w-full flex items-center justify-center aspect-square rounded-full">
                        01
                    </div>
                    <div className="mt-[10px] xl:mt-[14px] 2xl:mt-2">
                        <p className="text-[15px] md:text-[16px] 2xl:text-[24px] mb-[16px] 2xl:mb-[24px]">
                            СОБСТВЕННАЯ ЛАБОРАТОРИЯ
                        </p>
                        <div className="flex flex-col gap-2 text-[11px] md:text-xs 2xl:text-[18px]">
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>Новейшее высокоточное оборудование</span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>
                                    Комплекс предоперационных исследований
                                </span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>
                                    Анализы в режиме Cito с готовностью
                                    результатов в течение 30–60 минут
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="md:absolute md:scale-50 md:opacity-0 flex items-center  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[790px]"
                ref={sixthText}
            >
                <div className="mt-[120px] sm:mt-0 grid grid-cols-[40px_auto] xl:grid-cols-[48px_auto] gap-4">
                    <div className="bg-[#FFFFFF1A] text-[10px] md:text-[11px] 2xl:text-sm w-full flex items-center justify-center aspect-square rounded-full">
                        02
                    </div>
                    <div className="mt-[10px] xl:mt-[14px] 2xl:mt-2">
                        <p className="text-[15px] md:text-[16px] 2xl:text-[24px] mb-[16px] 2xl:mb-[24px]">
                            ДИАГНОСТИЧЕСКОЕ ОБОРУДОВАНИЕ
                        </p>
                        <div className="flex flex-col gap-2 text-[11px] md:text-xs 2xl:text-[18px]">
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>Инновационный маммограф</span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>
                                    Диагностический комплекс для всех видов
                                    рентген-исследований
                                </span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>
                                    Ультразвуковой сканер экспертного класса
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="md:absolute md:scale-50 md:opacity-0 flex items-center  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[550px] 2xl:max-w-[800px]"
                ref={seventhText}
            >
                <div className="mt-[120px] sm:mt-0 grid grid-cols-[40px_auto] xl:grid-cols-[48px_auto] gap-4">
                    <div className="bg-[#FFFFFF1A] text-[10px] md:text-[11px] 2xl:text-sm w-full flex items-center justify-center aspect-square rounded-full">
                        03
                    </div>
                    <div className="mt-[10px] xl:mt-[14px] 2xl:mt-2">
                        <p className="text-[15px] md:text-[16px] 2xl:text-[24px] mb-[16px] 2xl:mb-[24px]">
                            ВОЗДУШНО-КИСЛОРОДНАЯ ГИПЕРБАРИЧЕСКАЯ БАРОКАМЕРА
                            НОВОГО ПОКОЛЕНИЯ
                        </p>
                        <p className="text-[12px] 2xl:text-lg">
                            <span className="font-bold">
                                ГИПЕРБАРИЧЕСКАЯ ОКСИГЕНАЦИЯ
                            </span>{" "}
                            – нахождение пациента в барокамере в среде
                            повышенного давления и дыхания обогащенной
                            кислородной смесью. Процедура повышает способность
                            организма транспортировать и поглощать кислород, а
                            также восстанавливать поврежденные клетки и ткани.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="md:absolute md:scale-50 md:opacity-0 flex items-center  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
                ref={eighthText}
            >
                <div className="mt-[120px] sm:mt-0 grid grid-cols-[40px_auto] xl:grid-cols-[48px_auto] gap-4">
                    <div className="bg-[#FFFFFF1A] text-[10px] md:text-[11px] 2xl:text-sm w-full flex items-center justify-center aspect-square rounded-full">
                        04
                    </div>
                    <div className="mt-[10px] xl:mt-[14px] 2xl:mt-2">
                        <p className="text-[15px] md:text-[16px] 2xl:text-[24px] mb-[16px] 2xl:mb-[24px]">
                            ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ
                        </p>
                        <div className="flex flex-col gap-2 text-[11px] md:text-xs 2xl:text-[18px]">
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>
                                    Терапия обогащенной тромбоцитами плазмы PRP
                                    для активации клеточной регенерации
                                </span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>
                                    Плацентарная терапия для улучшения
                                    метаболизма клеток
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="md:absolute md:scale-50 md:opacity-0 flex items-center  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[550px] 2xl:max-w-[800px]"
                ref={ninethText}
            >
                <div className="mt-[120px] sm:mt-0 grid grid-cols-[40px_auto] xl:grid-cols-[48px_auto] gap-4">
                    <div className="bg-[#FFFFFF1A] text-[10px] md:text-[11px] 2xl:text-sm w-full flex items-center justify-center aspect-square rounded-full">
                        05
                    </div>
                    <div className="mt-[10px] xl:mt-[14px] 2xl:mt-2">
                        <p className="text-[15px] md:text-[16px] 2xl:text-[24px] mb-[16px] 2xl:mb-[24px]">
                            АППАРАТНАЯ КОСМЕТОЛОГИЯ
                        </p>
                        <div className="flex flex-col gap-2 text-[11px] md:text-xs 2xl:text-[18px]">
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>Фототерапия широкополосным светов</span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>
                                    Высокочастотная ультразвуковая терапия
                                </span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>Микротоковая терапия</span>
                            </div>
                            <div className="grid grid-cols-[5px_auto] gap-2">
                                <svg
                                    width="6"
                                    className="mt-[5px]"
                                    height="6"
                                    viewBox="0 0 6 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="3"
                                        cy="3"
                                        r="3"
                                        fill="white"
                                        fill-opacity="0.5"
                                    />
                                </svg>
                                <span>Радиочастотная физиотерапия</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="md:absolute md:scale-50 md:opacity-0 flex items-center  sm:ml-auto md:ml-0 h-[calc(100dvh/1.25)] md:h-dvh right-0 z-10  xl:p-[80px] 2xl:p-[115px] text-lg uppercase mt-30 sm:mt-0 justify-start sm:justify-center w-full sm:max-w-[400px] px-[16px] lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
                ref={tenthText}
            >
                <div className="mt-[120px] sm:mt-0 grid grid-cols-[40px_auto] xl:grid-cols-[48px_auto] gap-4">
                    <div className="bg-[#FFFFFF1A] text-[10px] md:text-[11px] 2xl:text-sm w-full flex items-center justify-center aspect-square rounded-full">
                        06
                    </div>
                    <div className="mt-[10px] xl:mt-[14px] 2xl:mt-2">
                        <p className="text-[15px] md:text-[16px] 2xl:text-[24px] mb-[16px] 2xl:mb-[24px]">
                            ИСПОЛЬЗОВАНИЕ ПРЕМИАЛЬНОЙ КОСМЕЦЕВТИКИ
                        </p>
                        <p className="text-[12px] 2xl:text-lg">
                            с доказанной эффективностью
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimationBlock;
