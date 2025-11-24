import { useCallback, useState } from "react";
import { DoctorsCard } from "../../components/DoctorsCard";
import { usePopup } from "../../components/PopupContext";
import { POPUP_NAMES } from "../../constants/popupNames";

export type DoctorType = [string, string, string[], string, string, string];

const DOCTORS_DATA: DoctorType[] = [
    [
        "/swiper1.webp",
        "/serb.gif",
        ["ГЛАВНЫЙ ВРАЧ", "Пластический хирург"],
        "Серб",
        "Ирина Анатольевна",
        "/doctor",
    ],
    [
        "/swiper2.webp",
        "/telishevskiy.gif",
        [
            "ЗАМЕСТИТЕЛЬ ГЛАВНОГО ВРАЧА",
            "ПЛАСТИЧЕСКИЙ ХИРУРГ",
            "ОНКОЛОГ-МАММОЛОГ",
        ],
        "Телишевский",
        "Антон Валентинович",
        "/doctor",
    ],
    [
        "/swiper3.webp",
        "/tarasenko.gif",
        ["КАНДИДАТ МЕДИЦИНСКИХ НАУК", "ПЛАСТИЧЕСКИЙ ХИРУРГ"],
        "Тарасенко",
        "Василий Сергеевич",
        "/doctor",
    ],
    [
        "/swiper4.webp",
        "/hrustaleva.gif",
        ["ДОКТОР МЕДИЦИНСКИХ НАУК", "ПЛАСТИЧЕСКИЙ ХИРУРГ"],
        "Хрусталева",
        "Ирина Эдуардовна",
        "/doctor",
    ],
    [
        "/swiper5.webp",
        "/kardov.gif",
        ["ПЛАСТИЧЕСКИЙ ХИРУРГ"],
        "Кардов",
        "Хазрит Музаринович",
        "/doctor",
    ],
    [
        "/swiper6.webp",
        "/rami.gif",
        ["ПЛАСТИЧЕСКИЙ ХИРУРГ"],
        "Хамуд",
        "Рами",
        "/doctor",
    ],
];

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

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onClick }) => (
    <li
        onClick={() => onClick(tab.id)}
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
    const [activeTab, setActiveTab] = useState<number>(0);
    const [clickedCards, setClickedCards] = useState<Set<number>>(new Set());
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

    return (
        <div className="2xl:pt-[152px] md:pt-[112px] pt-[80px] px-6 sm:px-4 md:px-6 2xl:px-10 md:mb-[120px] xl:mb-[160px] mb-[96px] 2xl:mb-[240px]">
            <div className="py-12 md:py-16 2xl:py-20">
                <h1 className="text-[24px] md:text-[28px] 2xl:text-[44px] tracking-[0.08em] leading-[125%] text-[#1D1D1D] uppercase mb-6 md:mb-8 2xl:mb-10">
                    Команда Ramiclinic residence
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

                    <div
                        className="flex justify-between items-center gap-4 bg-[#E8E8E8] cursor-pointer lg:bg-transparent px-3 pb-3 py-3 2xl:py-3 xl:p-0 group"
                        onClick={handleClick}
                    >
                        <span className="relative after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 after:bg-[#1D1D1D] group-hover:after:w-full uppercase">
                            Другие направления
                        </span>
                        <PlusIcon className="2xl:w-[32px] 2xl:h-[32px] h-[24px] w-[24px] hidden xl:inline" />
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
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

            <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] xl:grid-cols-4 gap-4">
                {displayedDoctors.map((doctor, index) => (
                    <DoctorsCard
                        key={index}
                        doctor={doctor}
                        index={index}
                        isClicked={clickedCards.has(index)}
                        onCardClick={toggleCard}
                    />
                ))}
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
    );
};

export default Doctors;
