import { POPUP_NAMES } from "../constants/popupNames";
import type { dataTourismItem } from "../shared/data/tourism";
import ModalPanel from "./ModalPanel";

interface TourismPanelProps {
    tourismData: dataTourismItem[];
    selectedIndex?: number;
    handleOpenContact: () => void;
}

const TourismPanel: React.FC<TourismPanelProps> = ({
    tourismData,
    selectedIndex = 0,
    handleOpenContact,
}) => {
    const selectedItem = tourismData[selectedIndex] || tourismData[0];

    const modalTitle = selectedItem?.title || "Медицинский туризм";

    const content = (
        <div className="flex flex-col border-t border-[#FFFFFF26] py-6 md:py-10 xl:py-16">
            {selectedItem.description && (
                <div className="flex flex-col gap-2 xl:gap-3 mb-5 md:mb-6 xl:mb-16">
                    <p className="text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[640px]">
                        {selectedItem.description}
                    </p>
                </div>
            )}

            {selectedItem.specializations &&
                selectedItem.specializations.length > 0 && (
                    <ul className="space-y-4 pb-6 md:pb-10 xl:pb-16">
                        {selectedItem.specializations.map((spec, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 xl:gap-6 text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase"
                            >
                                <span className="text-[#FFFFFF80] min-w-[40px]">
                                    {(index + 1).toString().padStart(2, "0")}
                                </span>
                                <span className="flex-1">{spec}</span>
                            </li>
                        ))}
                    </ul>
                )}

            <div className="border-t border-[#FFFFFF26] pt-6 md:pt-10 xl:pt-14">
                <button
                    className="relative text-xs xl:text-sm 2xl:text-base font-semibold text-[#EAE6E0] uppercase cursor-pointer px-1 flex items-center gap-2 group mt-4"
                    onClick={handleOpenContact}
                >
                    <span className="relative">
                        Запланировать визит
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE6E0] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <img
                        src="/plus.svg"
                        alt=""
                        className="hidden sm:inline-block -mt-1"
                        style={{
                            filter: "brightness(0) invert(1)",
                        }}
                    />

                    <img
                        src="/plus-up.svg"
                        alt=""
                        className="block  sm:hidden -mt-[3px] w-4"
                        style={{
                            filter: "brightness(0) invert(1)",
                        }}
                    />
                </button>
            </div>
        </div>
    );

    return (
        <ModalPanel
            popupName={POPUP_NAMES.TOURISM_INFO}
            title={modalTitle}
            content={content}
        />
    );
};

export default TourismPanel;
