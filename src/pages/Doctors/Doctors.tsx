import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { DoctorsCard } from "../../components/DoctorsCard";
import DoctorsCardInfo from "../../components/DoctorsCardInfo";
import { useHeader } from "../../components/HeaderContext";
import { usePopup } from "../../components/PopupContext";
import SecondAnimationBlock from "../../components/SecondAnimationBlock/SecondAnimationBlock";
import { POPUP_NAMES } from "../../constants/popupNames";
import { DOCTORS_DATA } from "../../shared/data/doctor";

gsap.registerPlugin(ScrollTrigger);

interface Tab {
    id: number;
    label: string;
}

const TABS: Tab[] = [
    { id: 0, label: "ВСЕ ВРАЧИ" },
    { id: 1, label: "ПЛАСТИЧЕСКИЕ ХИРУРГИ" },
    { id: 2, label: "КОСМЕТОЛОГИ" },
    { id: 3, label: "Антиэйдж-специалисты" },
];

interface PlusIconProps {
    className?: string;
}

export const PlusIcon: React.FC<PlusIconProps> = ({ className = "" }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 32 32"
        fill="none"
        className={className}
    >
        <path
            d="M16 5V16M16 27V16M16 16H27H5"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

interface ArrowIconProps {
    className?: string;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ className = "" }) => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        className={className}
    >
        <path
            d="M12.5 4.34985V12.5999M12.5 20.8499L12.5 12.5999M12.5 12.5999L20.75 12.5999L4.25 12.5999"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

interface TabItemProps {
    tab: Tab;
    isActive: boolean;
    onClick: (id: number) => void;
}

export const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onClick }) => (
    <li
        onClick={(e) => {
            e.preventDefault();
            onClick(tab.id);
        }}
        className={`
      relative cursor-pointer transition-colors duration-300
      ${isActive ? "text-[#1D1D1D]" : "text-[#1D1D1D80]"}
      after:absolute after:left-0 after:bottom-0 after:h-[1px] after:transition-all after:duration-300
      ${
          isActive
              ? "after:bg-[#1D1D1D] after:w-full"
              : "after:bg-[#1D1D1D80] after:w-0"
      }
      hover:after:w-full
    `}
    >
        {tab.label}
    </li>
);

const Doctors: React.FC = () => {
    const { setHeaderColor } = useHeader();
    const [activeTab, setActiveTab] = useState<number>(0);
    const [clickedCards, setClickedCards] = useState<Set<number>>(new Set());
    const SecondAnimationBlockRef = useRef<HTMLDivElement>(null);
    const { openPopup } = usePopup();

    const toggleCard = useCallback((index: number) => {
        setClickedCards((prev) => {
            const newSet = new Set(prev);
            newSet.has(index) ? newSet.delete(index) : newSet.add(index);
            return newSet;
        });
    }, []);

    const handleClick = () => {
        openPopup(POPUP_NAMES.DOCTORS);
    };

    const displayedDoctors = activeTab <= 1 ? DOCTORS_DATA : [];

    const chunkArray = (array: any[], size = 2) => {
        const result = [];

        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }

        return result;
    };

    useLayoutEffect(() => {
        const element = SecondAnimationBlockRef.current;
        if (!element) return;

        const trigger = ScrollTrigger.create({
            trigger: element,
            start: "top 10%",
            end: "bottom 20%",
            onEnter: () => setHeaderColor("#ffffff"),
            onLeave: () => setHeaderColor("#000000"),
            onEnterBack: () => setHeaderColor("#ffffff"),
            onLeaveBack: () => setHeaderColor("#000000"),
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <>
            <div className="2xl:pt-[152px] md:pt-[112px] pt-[80px] px-6 sm:px-4 md:px-6 2xl:px-10 md:mb-[120px] xl:mb-[160px] mb-[96px] 2xl:mb-[240px]">
                <div className="py-12 md:py-16 2xl:py-20">
                    <div className="flex gap-3 mb-8">
                        <img
                            src="/quotes.webp"
                            alt=""
                            className="w-[40px] h-[33px]"
                        />
                        <p className="max-w-[580px] flex flex-col">
                            <span className="mb-2">
                                Уникальность команды врачей RAMICLINIC RESIDENCE
                                в том, что каждый из докторов уже все доказал и
                                прежде всего себе. Это особое ментальное
                                состояние позволяет иметь ОБЩЕЕ ДЕЛО! А это –
                                общая ценность, общая система мышления, общая
                                ответственность!
                            </span>
                            <span className="text-[#1d1d1db8]">Ирина СЕРБ</span>
                            <span className="text-[#1d1d1db8]">
                                Главный врач RAMICLINIC RESIDENCE
                            </span>
                            <span className="text-[#1d1d1db8]">
                                Пластический хирург
                            </span>
                        </p>
                    </div>
                    <h1 className="text-[24px] md:text-[28px] 2xl:text-[44px] tracking-[0.08em] leading-[125%] text-[#1D1D1D] uppercase mb-6 md:mb-8 2xl:mb-10">
                        Врачи Ramiclinic residence
                    </h1>

                    <div className="font-semibold leading-[155%] text-[11px] md:text-xs 2xl:text-base flex lg:flex-row flex-col justify-between xl:items-center">
                        <nav className="">
                            <ul className="flex gap-10 xl:h-auto h-[48px] items-center uppercase overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
                                {TABS.map((tab) => (
                                    <TabItem
                                        key={tab.id}
                                        tab={tab}
                                        isActive={activeTab === tab.id}
                                        onClick={setActiveTab}
                                    />
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                <div>
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-10 md:gap-20">
                        {" "}
                        {chunkArray(displayedDoctors).map((chunk, index) => {
                            const doc1 = chunk[0];
                            const doc2 = chunk[1];

                            return (
                                <div
                                    key={index}
                                    className="grid gap-4 grid-cols-2 w-full"
                                    style={{
                                        gridTemplateRows:
                                            "min-content 1fr min-content",
                                    }}
                                >
                                    {doc1 && (
                                        <>
                                            <div className="row-start-1 row-end-3 col-start-1 justify-self-start w-full max-w-[448px]">
                                                <DoctorsCard
                                                    doctor={doc1}
                                                    index={index * 2}
                                                    isClicked={clickedCards.has(
                                                        index * 2,
                                                    )}
                                                    onCardClick={toggleCard}
                                                />
                                            </div>
                                            <div className="row-start-1 col-start-2 justify-self-start self-end mb-6">
                                                <DoctorsCardInfo
                                                    doctor={doc1}
                                                    className="text-left xl:-ml-32 2xl:-ml-24"
                                                />
                                            </div>
                                        </>
                                    )}

                                    {doc2 && (
                                        <>
                                            <div className="row-start-2 row-end-4 col-start-2 justify-self-end w-full max-w-[448px]">
                                                <DoctorsCard
                                                    doctor={doc2}
                                                    index={index * 2 + 1}
                                                    isClicked={clickedCards.has(
                                                        index * 2 + 1,
                                                    )}
                                                    onCardClick={toggleCard}
                                                />
                                            </div>
                                            <div className="row-start-3 col-start-1 justify-self-end self-start mt-6">
                                                <DoctorsCardInfo
                                                    doctor={doc2}
                                                    className="text-right xl:-mr-32 2xl:-mr-24"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-center pt-20">
                    <button className="flex items-center 2xl:text-base text-xs gap-3 group cursor-pointer">
                        <span className="font-semibold leading-[155%] uppercase relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 after:bg-[#1D1D1D] group-hover:after:w-full">
                            Показать ещё
                        </span>
                        <div className="p-3 bg-[#691C32] rounded-full aspect-square">
                            <ArrowIcon className="text-white" />
                        </div>
                    </button>
                </div>
            </div>
            <SecondAnimationBlock
                className="relative"
                ref={
                    SecondAnimationBlockRef as unknown as React.RefObject<HTMLDivElement>
                }
            />
        </>
    );
};

export default Doctors;
