import { useEffect, useRef, useState } from "react";

const IMAGES = ["about/16.webp", "about/17.webp", "about/16.webp"];

const TOTAL = IMAGES.length;
const INTERVAL = 3000;
const TICK = 50;

const ArcIndicator = ({
    current,
    total,
    progress,
    size = 496,
    strokeWidth = 3,
    textClass = "text-[110px]",
}: {
    current: number;
    total: number;
    progress: number;
    size?: number;
    strokeWidth?: number;
    textClass?: string;
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const filled = (current - 1 + progress) / total;
    const dashOffset = circumference * (1 - filled);

    return (
        <>
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(234,230,224,0.2)"
                    strokeWidth={strokeWidth}
                />
            </svg>

            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(-90deg)" }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#EAE6E0"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.08s linear" }}
                />
            </svg>

            <h1
                className={`relative z-10 ${textClass} text-[#EAE6E0] uppercase leading-[110%]`}
            >
                {current}
            </h1>
        </>
    );
};

export const AboutNutrition = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const stepRef = useRef(0);

    useEffect(() => {
        const steps = INTERVAL / TICK;

        const timer = setInterval(() => {
            stepRef.current += 1;
            setProgress(stepRef.current / steps);

            if (stepRef.current >= steps) {
                stepRef.current = 0;
                setActiveIndex((prev) => (prev + 1) % TOTAL);
                setProgress(0);
            }
        }, TICK);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full max-[600px]:min-h-[1450px] min-h-[1600px] md:min-h-[1700px] lg:min-h-[1944px] xl:min-h-[2390px] bg-[#1D1D1D]">
            <h1 className="relative z-20 text-[44px] md:text-[56px] xl:text-[88px] 2xl:text-[110px] text-white uppercase leading-[110%] text-right pr-[54px] pt-20 md:pt-[90px] lg:pt-[120px] max-[500px]:text-center max-[500px]:pr-0 max-[500px]:pb-5 max-[600px]:text-[32px]">
                Питание
            </h1>
            <div>
                <img
                    src="about/Vector (7).webp"
                    alt=""
                    className="absolute z-10 top-[-36.5rem] md:top-[-45rem] xl:top-[-50rem] 2xl:top-[-58rem] left-0 w-[320px] md:w-[380px] lg:w-[400px] xl:w-[501px] 2xl:w-auto max-[600px]:w-[280px] max-[600px]:mt-[5rem] max-[500px]:w-[220px] max-[500px]:top-[-19.5%]"
                />
                <img
                    src="about/15.webp"
                    alt=""
                    className="absolute z-20 left-[-5.5rem] md:left-[-7rem] xl:left-[-9rem] 2xl:left-[-13rem] w-[680px] md:w-[800px] xl:w-[1100px] 2xl:w-[1402px] mt-[56px] xl:mt-[83px] max-[600px]:mt-7 max-[500px]:-mt-3 max-[500px]:w-[350px] max-[500px]:left-[-3.5rem]"
                />
            </div>

            <div className="relative z-20 w-full flex justify-end mt-[32rem] xl:mt-[45rem] max-[600px]:ml-[-3%] ml-[-10%] lg:ml-[-25%] xl:ml-[-18rem] max-[500px]:ml-0 max-[500px]:justify-center max-[500px]:mt-[18rem]">
                <p className="text-xs xl:text-base text-[#EAE6E0] uppercase font-suisse font-medium max-w-[280px] xl:max-w-[320px] 2xl:max-w-[478px] max-[500px]:text-center max-[500px]:max-w-[380px]">
                    Меню для пациентов RAMICLINIC RESIDENCE составляется
                    согласно индивидуальным рекомендациям лечащего врача и
                    диетолога и с учетом вкусовых предпочтений пациента
                </p>
            </div>

            <div className="max-[600px]:mt-[10rem] mt-[14rem] md:mt-[20rem] lg:mt-[23rem] xl:mt-[30rem] ml-4 md:ml-6 xl:ml-[54px] max-[500px]:ml-0 max-[500px]:mt-[8rem]">
                <h1 className="relative z-10 text-[44px] md:text-[56px] xl:text-[88px] 2xl:text-[110px] text-[#89685C] uppercase leading-[110%] max-[600px]:text-[32px] max-[500px]:text-center">
                    ИЗЫСКАННАЯ
                </h1>
                <h1 className="relative z-10 text-[44px] md:text-[56px] xl:text-[88px] 2xl:text-[110px] text-white uppercase leading-[110%] max-[600px]:text-[32px] max-[500px]:text-center">
                    СРЕДА <br className="lg:block hidden max-[500px]:block" />{" "}
                    ОБИТАНИЯ
                </h1>
            </div>

            <div className="relative w-full flex justify-end mt-15 lg:mt-[51px] xl:mt-[90px] 2xl:mt-[200px] max-[500px]:mt-8">
                <div className="absolute z-10 top-[40%] md:top-1/2 left-[49.5%] -translate-1/2 w-[150px] md:w-[200px] xl:w-[300px] 2xl:w-[496px] h-[150px] md:h-[200px] xl:h-[300px] 2xl:h-[496px] flex items-center justify-center rounded-full max-[600px]:w-[100px] max-[600px]:h-[100px] max-[500px]:top-[76%] max-[500px]:w-15 max-[500px]:h-15 max-[500px]:left-[90%]">
                    <span className="hidden 2xl:contents">
                        <ArcIndicator
                            current={activeIndex + 1}
                            total={TOTAL}
                            progress={progress}
                            size={496}
                            strokeWidth={3}
                            textClass="text-[110px]"
                        />
                    </span>
                    <span className="hidden xl:contents 2xl:hidden">
                        <ArcIndicator
                            current={activeIndex + 1}
                            total={TOTAL}
                            progress={progress}
                            size={300}
                            strokeWidth={3}
                            textClass="text-[88px]"
                        />
                    </span>
                    <span className="hidden md:contents xl:hidden max-[600px]:hidden">
                        <ArcIndicator
                            current={activeIndex + 1}
                            total={TOTAL}
                            progress={progress}
                            size={200}
                            strokeWidth={3}
                            textClass="text-[56px]"
                        />
                    </span>
                    <span className="contents md:hidden max-[500px]:hidden">
                        <ArcIndicator
                            current={activeIndex + 1}
                            total={TOTAL}
                            progress={progress}
                            size={100}
                            strokeWidth={2}
                            textClass="text-[32px]"
                        />
                    </span>
                    {/* ≤500px */}
                    <span className="contents max-[500px]:contents hidden">
                        <ArcIndicator
                            current={activeIndex + 1}
                            total={TOTAL}
                            progress={progress}
                            size={60}
                            strokeWidth={2}
                            textClass="text-xl"
                        />
                    </span>
                </div>

                <div className="h-full flex items-center justify-between max-[500px]:flex-col-reverse max-[500px]:items-start">
                    <div className="max-[600px]:h-[370px] h-[433px] xl:h-[503px] xl:h-[714px] 2xl:h-[1082px] flex flex-col justify-between pl-4 md:pl-6 xl:pl-15 max-[500px]:h-auto max-[500px]:gap-[30px]">
                        <div className="flex-1 flex items-center pt-[12rem] max-[500px]:pt-8">
                            <h4 className="max-[500px]:text-[11px] text-xs xl:text-base text-[#EAE6E0] uppercase font-suisse font-semibold">
                                Интерьеры
                            </h4>
                        </div>
                        <div className="relative z-20 w-full flex justify-end">
                            <p className="text-xs xl:text-base text-[#EAE6E0] uppercase font-suisse font-semibold max-w-[280px] md:max-w-[330px] xl:max-w-[355px] max-[600px]:max-w-[200px] max-[500px]:max-w-[350px] max-[500px]:text-[11px]">
                                В интерьерах резиденции использованы предметы
                                мебели, являющиеся самостоятельными
                                арт-объектами, экзотические породы дерева,
                                сложные декоративные элементы лепнины, латунь,
                                ценные виды натурального камня, витражи и люстры
                                в стиле ар деко
                            </p>
                        </div>
                    </div>

                    <div className="max-[500px]:w-full w-[51%] space-y-5 md:space-y-8 xl:space-y-10 2xl:space-y-15 max-[500px]:px-4 max-[500px]:flex items-center flex-col">
                        <div className="relative z-20 w-full flex justify-end pr-4 md:pr-6 xl:pr-[58px] max-[500px]:pr-0 max-[500px]:text-center max-[500px]:max-w-[400px]">
                            <p className="text-xs xl:text-base text-[#EAE6E0] uppercase font-suisse font-semibold">
                                Наша абсолютная ценность – подлинность всего,
                                что мы предлагаем пациенту: от экспертности и
                                профессионализма хирургов до изысканной среды
                                обитания
                            </p>
                        </div>

                        <div className="relative w-full max-[600px]:h-[370px] h-[433px] md:h-[503px] xl:h-[714px] 2xl:h-[1082px] overflow-hidden">
                            {IMAGES.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                                    style={{
                                        opacity: i === activeIndex ? 1 : 0,
                                    }}
                                />
                            ))}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ backgroundColor: "#00000033" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
