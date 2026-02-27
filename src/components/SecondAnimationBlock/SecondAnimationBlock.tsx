import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePopup } from "../PopupContext";

gsap.registerPlugin(ScrollTrigger);

interface SectionData {
    title: string;
    description: string;
    popupName: string;
    mobileTitle?: string;
    icon?: React.ReactNode;
}

interface SecondAnimationBlockProps {
    ref: React.RefObject<HTMLDivElement>;
    className?: string;
    sections?: SectionData[];
}

const defaultSections: SectionData[] = [
    {
        title: "эталонная пластическая хирургия",
        description:
            "RAMICLINIC RESIDENCE гордится экспертной командой врачей, опирающихся на международную практику и возрастающий авторитет русской школы пластической хирургии с уникальным эстетическим почерком",
        popupName: "secondsection1",
    },
    {
        title: "Стратегия управления возрастом",
        description:
            "Работа на результат начинается задолго до операционной. Для каждого пациента оформляется генетический паспорт кожи с целью детализированного прогноза послеоперационного периода, разрабатывается индивидуальный план восстановительных косметологических процедур",
        popupName: "secondsection3",
    },
    {
        title: "интеллектуальная косметология",
        description:
            "Опытные врачи-косметологи, высокотехнологичный парк инновационного оборудования, достижения в сфере антиэйдж, биохакинга и регенеративной медицины – вот составляющие успеха, из которых складываются блестящие эстетические результаты пациентов",
        popupName: "secondsection2",
    },
];

const DefaultIcon = () => (
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
);

const SecondAnimationBlock = ({
    ref,
    className = "",
    sections = defaultSections,
}: SecondAnimationBlockProps) => {
    const { openPopup } = usePopup();

    useGSAP(() => {}, []);

    return (
        <div
            ref={ref}
            className={`absolute top-0 left-0 w-full h-full z-30 ${className}`}
        >
            <div id="services" className="h-dvh relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-dvh bg-[url('/animationblock2.jpg')] bg-cover bg-top flex justify-between items-end z-50">
                    <div className="relative h-full w-full flex flex-col justify-center md:grid grid-cols-3">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="max-h-[120px] h-full md:h-auto md:max-h-full relative flex flex-row-reverse md:flex-col justify-between md:justify-end items-center border-b border-r-0 md:border-r border-[#FFFFFF33] group px-4 md:px-0"
                            >
                                <div className="bg-[#FFFFFF26] backdrop-blur-[50px] p-4 md:p-8 rounded-full md:mb-10">
                                    {section.icon || <DefaultIcon />}
                                </div>
                                <p className="uppercase text-white text-[16px] md:text-[20px] 2xl:text-[28px] md:text-center md:mb-10 md:px-15 2xl:px-20">
                                    {section.mobileTitle || section.title}
                                </p>
                                <div
                                    className="absolute w-full h-full z-10 md:hidden"
                                    onClick={() => {
                                        openPopup(section.popupName);
                                        console.log(section.popupName);
                                    }}
                                ></div>
                                <div className="absolute hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-1000 inset-0 backdrop-blur-[40px] bg-[#1D1D1D4D]  flex-col justify-center items-center md:p-6 2xl:p-20 text-center">
                                    <p className="text-[20px] 2xl:text-[28px] uppercase mb-4 2xl:mb-6 leading-[130%] text-white">
                                        {section.title}
                                    </p>
                                    <p className="mb-8 2xl:mb-12 text-[#FFFFFF99] leading-[155%] uppercase font-extralight text-sm 2xl:text-base">
                                        {section.description}
                                    </p>
                                    {/* <a
                                        href="/plastic"
                                        className="text-[#691C32] bg-white font-semibold px-8 py-5 uppercase cursor-pointer text-sm 2xl:text-base"
                                    >
                                        Подробнее
                                    </a> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondAnimationBlock;
