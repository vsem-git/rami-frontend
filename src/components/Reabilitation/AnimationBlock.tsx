import { useRef } from "react";
import Clocks from "./Clocks";
import gsap from "gsap";
import { useClocks } from "./ClocksProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimationBlock = () => {
    const { minuteAngle, hourAngle } = useClocks();

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

    return (
        <div
            ref={containerRef}
            className="md:h-dvh w-full relative oveflow-hidden"
        >
            <div className="hidden md:block relative pointer-events-none aspect-square w-[calc(50%*1.1)] top-1/2 -translate-y-1/2 h-auto">
                <div className="bg-white aspect-square pointer-events-none w-full h-full blur-[80px] rounded-full"></div>
                <Clocks
                    minuteAngle={minuteAngle}
                    hourAngle={hourAngle}
                    ref={clocksRef}
                    className="absolute w-full h-full pointer-events-none left-1/2 top-1/2"
                />
            </div>

            <img
                src="/reabilitation-screen/reabilitation.webp"
                ref={imageRef}
                className="hidden pointer-events-none md:block absolute w-1/2 max-h-[100%] bottom-[0%] md:-bottom-[10%] xl:-bottom-[15%] left-[1%] object-contain"
                width={770}
            />
            <div
                ref={marqueeRef}
                className="marquee-reabilitation hidden md:inline-flex text-white pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference absolute bottom-0 left-0 w-full"
            >
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
            </div>
            <span
                ref={firstBlockRef}
                className="text-[11px] md:text-xs 2xl:text-lg tracking-[1.5%] sm:max-w-[380px] text-white md:absolute pt-[120px] sm:pt-0 right-0 sm:ml-auto md:ml-0 top-0 h-dvh flex flex-col sm:justify-center uppercase leading-[155%] md:max-w-[410px] xl:max-w-[560px] 2xl:max-w-[710px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div>
                    <span>
                        <span className="font-bold inline">
                            Быстрая и комфортная реабилитация
                        </span>{" "}
                        пациента в
                    </span>
                    <span>
                        {" "}
                        Клинике-резиденции RAMICLINIC RESIDENCE начинается
                        задолго до операционного вмешательства. Она включает в
                        себя коррекцию гормонального статуса, устранение
                        дефицитов и, конечно, полномасштабную подготовку кожи на
                        инновационном отделении косметологии.
                    </span>
                </div>
            </span>
            <div
                ref={secondBlockRef}
                className="text-lg text-white  md:absolute right-0 sm:ml-auto md:ml-0 top-0 h-dvh flex flex-col  pt-[120px] sm:pt-0 sm:justify-center uppercase sm:max-w-[400px] md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[710px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 2xl:mb-6 tracking-[2%]">
                    ОМОЛОЖЕНИЕ И ОЗДОРОВЛЕНИЕ ОРГАНИЗМА ИЗНУТРИ
                </h1>
                <p className="text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%] tracking-[1.5%]">
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
                className="text-lg text-white  md:absolute right-0 sm:ml-auto md:ml-0 top-0 h-dvh flex flex-col pt-[120px] sm:pt-0 sm:justify-center uppercase sm:max-w-[400px] md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[720px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
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
                className="text-lg text-white  md:absolute right-0 sm:ml-auto md:ml-0 top-0 h-dvh flex flex-col pt-[120px] sm:pt-0 sm:justify-center uppercase sm:max-w-[390px] md:max-w-[420px] xl:max-w-[550px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[40px_1fr] xl:grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[11px] 2xl:text-[14px] rounded-full">
                        01
                    </div>
                    <div className="mt-3.5 2xl:mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            ВОЗДУШНО-КИСЛОРОДНАЯ ГИПЕРБАРИЧЕСКАЯ БАРОКАМЕРА
                            НОВОГО ПОКОЛЕНИЯ
                        </h1>
                        <p className="text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            ГИПЕРБАРИЧЕСКАЯ ОКСИГЕНАЦИЯ –{" "}
                            <span className="sm:whitespace-nowrap md:whitespace-normal">
                                {" "}
                                нахождение пациента в барокамере в среде
                            </span>{" "}
                            повышенного давления и{" "}
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
                className="text-lg text-white  md:absolute right-0 sm:ml-auto md:ml-0 top-0 h-dvh flex flex-col pt-[120px] sm:pt-0 sm:justify-center uppercase sm:max-w-[390px] md:max-w-[410px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[40px_1fr] xl:grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[11px] 2xl:text-[14px] rounded-full">
                        02
                    </div>
                    <div className="mt-3.5 2xl:mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            ИНЪЕКЦИОННАЯ КОСМЕТОЛОГИЯ
                        </h1>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div className="mt-[5.5px] 2xl:mt-[9.5px]">
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
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div className="mt-[5.5px] 2xl:mt-[9.5px]">
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
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div className="mt-[5.5px] 2xl:mt-[9.5px]">
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
                className="text-lg text-white  md:absolute right-0 sm:ml-auto md:ml-0 top-0 h-dvh flex flex-col pt-[120px] sm:pt-0 sm:justify-center uppercase sm:max-w-[400px] md:max-w-[420px] xl:max-w-[550px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[40px_1fr] xl:grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[11px] 2xl:text-[14px] rounded-full">
                        03
                    </div>
                    <div className="mt-3.5 2xl:mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            АППАРАТНАЯ КОСМЕТОЛОГИЯ
                        </h1>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div className="mt-[5.5px] 2xl:mt-[9.5px]">
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
                            <div className="md:whitespace-nowrap xl:whitespace-normal">
                                Фототерапия широкополосным светов
                            </div>
                        </div>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div className="mt-[5.5px] 2xl:mt-[9.5px]">
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
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div className="mt-[5.5px] 2xl:mt-[9.5px]">
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
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div className="mt-[5.5px] 2xl:mt-[9.5px]">
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
                className="text-lg text-white  md:absolute right-0 sm:ml-auto md:ml-0 top-0 h-dvh flex flex-col pt-[120px] sm:pt-0 sm:justify-center uppercase sm:max-w-[400px] md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]"
            >
                <div className="grid grid-cols-[40px_1fr] xl:grid-cols-[48px_1fr] gap-4">
                    <div className="aspect-square bg-[#FFFFFF1A] flex items-center justify-center text-[11px] 2xl:text-[14px] rounded-full">
                        04
                    </div>
                    <div className="mt-3.5 2xl:mt-2">
                        <h1 className="text-[15px] md:text-[16px] 2xl:text-[24px] leading-[130%] mb-4 md:mb-6">
                            ИСПОЛЬЗОВАНИЕ ПРЕМИАЛЬНОЙ КОСМЕЦЕВТИКИ
                        </h1>
                        <div className="flex items-start gap-2 mb-2 text-[11px] md:text-[12px] 2xl:text-[18px] leading-[155%]">
                            <div>с доказанной эффективностью</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimationBlock;
