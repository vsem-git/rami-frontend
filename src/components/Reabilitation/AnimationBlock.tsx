import { useState } from "react";
import Clocks from "./Clocks";

const AnimationBlock = () => {
    const [minuteAngle] = useState(0);
    const [hourAngle] = useState(0);

    return (
        <div className="bg-[#1D1D1D] h-dvh w-full relative oveflow-hidden">
            <div className="relative aspect-square w-1/2 h-auto">
                <div className="bg-white w-full h-full rounded-full blur-[110px]"></div>
                <Clocks
                    minuteAngle={minuteAngle}
                    hourAngle={hourAngle}
                    className="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <img
                src="/reabilitation/reabilitation.webp"
                className="absolute -bottom-40 left-[5%]"
                width={770}
            />
            <div className="marquee text-white flex pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference absolute bottom-0 left-0 w-full">
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
            </div>
            <p className="text-[11px] md:text-xs 2xl:text-lg tracking-[1.5%] sm:max-w-1/2 opacity-0 text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[710px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]">
                <span className="font-bold">
                    Быстрая и комфортная реабилитация
                </span>{" "}
                пациента в Клинике-резиденции RAMICLINIC RESIDENCE начинается
                задолго до операционного вмешательства. Она включает в себя
                коррекцию гормонального статуса, устранение дефицитов и,
                конечно, полномасштабную подготовку кожи на инновационном
                отделении косметологии.
            </p>
            <div className="text-lg text-white absolute opacity-0 right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[720px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]">
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
            <div className="text-lg text-white absolute opacity-0 right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[720px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]">
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
            <div className="text-lg text-white absolute right-0 opacity-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]">
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
            <div className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]">
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
            <div className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase sm:max-w-1/2 md:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[770px] px-[16px] md:px-[32px] xl:px-[80px] 2xl:px-[110px]">
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
        </div>
    );
};

export default AnimationBlock;
