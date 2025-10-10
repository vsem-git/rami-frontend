import { useRef, useState } from "react";
import Clocks from "./Clocks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AnimationBlock = () => {
    const [minuteAngle] = useState(0);
    const [hourAngle] = useState(0);

    const firstBlockRef = useRef(null);
    const secondBlockRef = useRef(null);
    const thirdBlockRef = useRef(null);
    const firstStepRef = useRef(null);
    const secondStepRef = useRef(null);
    const thirdStepRef = useRef(null);
    const fourthStepRef = useRef(null);
    const containerRef = useRef(null);
    const clocksRef = useRef(null);
    const imageRef = useRef(null);
    const marqueeRef = useRef(null);

    useGSAP(() => {
        gsap.set(
            [
                secondBlockRef.current,
                thirdBlockRef.current,
                firstStepRef.current,
                secondStepRef.current,
                thirdStepRef.current,
                fourthStepRef.current,
                clocksRef.current,
            ],
            { opacity: 0, scale: 0.5, filter: "blur(50px)" }
        );

        gsap.set(clocksRef.current, {
            yPercent: -50,
            xPercent: -50,
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

        tl.to(firstBlockRef.current, {
            opacity: 0,
            y: -20,
            duration: 1,
            ease: "power2.inOut",
        });

        tl.to(secondBlockRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
        })
            .to(
                clocksRef.current,
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    scale: 1,
                    ease: "power2.inOut",
                },
                "<"
            )
            .to(
                marqueeRef.current,
                {
                    opacity: 0,
                    y: "-20%",
                    ease: "power2.inOut",
                },
                "<"
            );

        tl.to(secondBlockRef.current, {
            opacity: 0,
            yPercent: -20,
            duration: 1,
            ease: "power2.inOut",
        });

        tl.to(thirdBlockRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
        });

        tl.fromTo(
            thirdBlockRef.current,
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

        tl.to(firstStepRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
        });

        tl.fromTo(
            firstStepRef.current,
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

        tl.to(secondStepRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
        });

        tl.fromTo(
            secondStepRef.current,
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

        tl.to(thirdStepRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
        });

        tl.fromTo(
            thirdStepRef.current,
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

        tl.to(fourthStepRef.current, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 1,
            ease: "power2.inOut",
        });
    });

    return (
        <div
            ref={containerRef}
            className="bg-[#1D1D1D] h-dvh w-full relative oveflow-hidden"
        >
            <div className="relative aspect-square w-1/2 top-1/2 -translate-y-1/2 h-auto">
                <div className="bg-white w-full h-full rounded-full blur-[110px]"></div>
                <Clocks
                    minuteAngle={minuteAngle}
                    hourAngle={hourAngle}
                    ref={clocksRef}
                    className="absolute w-full h-full left-1/2 top-1/2"
                />
            </div>

            <img
                src="/reabilitation/reabilitation.webp"
                ref={imageRef}
                className="absolute w-1/2 max-h-[100%] -bottom-40 left-[0%] object-contain"
                width={770}
            />
            <div
                ref={marqueeRef}
                className="marquee text-white flex pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference absolute bottom-0 left-0 w-full"
            >
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
            </div>
            <p
                ref={firstBlockRef}
                className="text-[11px] md:text-xs 2xl:text-lg tracking-[1.5%] sm:max-w-1/2 text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[710px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <span className="font-bold">
                    Быстрая и комфортная реабилитация
                </span>{" "}
                пациента в Клинике-резиденции RAMICLINIC RESIDENCE начинается
                задолго до операционного вмешательства. Она включает в себя
                коррекцию гормонального статуса, устранение дефицитов и,
                конечно, полномасштабную подготовку кожи на инновационном
                отделении косметологии.
            </p>
            <div
                ref={secondBlockRef}
                className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[720px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 2xl:mb-6">
                    ОМОЛОЖЕНИЕ И ОЗДОРОВЛЕНИЕ ОРГАНИЗМА ИЗНУТРИ
                </h1>
                <p className="text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                    повышение тургора, эластичности, уровня увлажненности кожи
                    <span className="font-bold">
                        {" "}
                        улучшают регенеративные возможности тканей
                    </span>{" "}
                    и приближают день, когда пациент сможет насладиться
                    полностью сформированным безупречным результатом
                    пластической операции.
                </p>
            </div>
            <div
                ref={thirdBlockRef}
                className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[720px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 2xl:mb-6">
                    ПОДРОБНЫЙ ГЕНЕТИЧЕСКИЙ АНАЛИЗ
                </h1>
                <p className="text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                    позволяет сделать{" "}
                    <span className="font-bold">детальный прогноз</span>{" "}
                    заживления ран, формирования рубцов, гематом, отеков и
                    заблаговременно предпринять меры эффективного предупреждения
                    этих состояний.
                </p>
            </div>
            <div
                ref={firstStepRef}
                className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[14px] rounded-full">
                        01
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            ВОЗДУШНО-КИСЛОРОДНАЯ ГИПЕРБАРИЧЕСКАЯ БАРОКАМЕРА
                            НОВОГО ПОКОЛЕНИЯ
                        </h1>
                        <p className="text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            ГИПЕРБАРИЧЕСКАЯ ОКСИГЕНАЦИЯ – нахождение пациента в
                            барокамере в среде повышенного давления и{" "}
                            <span className="font-bold">
                                дыхания обогащенной кислородной смесью
                            </span>
                            . Процедура повышает способность организма
                            транспортировать и поглощать кислород, а также
                            восстанавливать поврежденные клетки и ткани.
                        </p>
                    </div>
                </div>
            </div>
            <div
                ref={secondStepRef}
                className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[14px] rounded-full">
                        02
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ
                        </h1>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div className="mt-2.5">
                                <svg
                                    width="6"
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
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div>Терапия обогащенной тромбоцитами плазмы</div>
                        </div>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div className="mt-2.5">
                                <svg
                                    width="6"
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
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div>PRP для активации клеточной регенерации</div>
                        </div>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div className="mt-2.5">
                                <svg
                                    width="6"
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
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div>
                                Плацентарная терапия для улучшения метаболизма
                                клеток
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={thirdStepRef}
                className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[14px] rounded-full">
                        03
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            АППАРАТНАЯ КОСМЕТОЛОГИЯ
                        </h1>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div className="mt-2.5">
                                <svg
                                    width="6"
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
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div>Фототерапия широкополосным светов</div>
                        </div>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div className="mt-2.5">
                                <svg
                                    width="6"
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
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div>Высокочастотная ультразвуковая терапия</div>
                        </div>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div className="mt-2.5">
                                <svg
                                    width="6"
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
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div>Микротоковая терапия</div>
                        </div>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div className="mt-2.5">
                                <svg
                                    width="6"
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
                                        fillOpacity="0.5"
                                    />
                                </svg>
                            </div>
                            <div>Радиочастотная физиотерапия</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={fourthStepRef}
                className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[14px] rounded-full">
                        04
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            ИСПОЛЬЗОВАНИЕ ПРЕМИАЛЬНОЙ КОСМЕЦЕВТИКИ
                        </h1>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px]">
                            <div>с доказанной эффективностью</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimationBlock;
