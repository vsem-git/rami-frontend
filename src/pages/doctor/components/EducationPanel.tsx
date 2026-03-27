import { POPUP_NAMES } from '../../../constants/popupNames';
import type { EducationItem } from '../../../shared/types/doctor';
import ModalPanel from '../../../components/ModalPanel';

interface EducationPanelProps {
    educationData: EducationItem[];
}

const EducationPanel: React.FC<EducationPanelProps> = ({ educationData }) => {
    const content = (
        <>
            {educationData.map((item: EducationItem, idx: number) => (
                <div
                    key={idx}
                    className={`flex flex-col border-t border-[#FFFFFF80] ${
                        idx === educationData.length - 1
                            ? "py-6 md:py-10 xl:py-16"
                            : "py-6 md:py-10 xl:py-16"
                    }`}
                >
                    {(item.year ||
                        (item.description && item.description.length > 0)) && (
                        <div className="flex flex-col gap-2 xl:gap-3">
                            {item.year && (
                                <h4 className="text-xs xl:text-[18px] text-[#FFFFFF80] leading-[130%] uppercase">
                                    {item.year}
                                </h4>
                            )}

                            {item.description &&
                            Array.isArray(item.description) ? (
                                item.description.map((desc, i) => (
                                    <p
                                        key={i}
                                        className="text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[640px] mb-4"
                                    >
                                        {desc}
                                    </p>
                                ))
                            ) : (
                                <p className="text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase max-w-[640px] mb-4">
                                    {item.description}
                                </p>
                            )}
                        </div>
                    )}

                    {item.specializations &&
                        item.specializations.length > 0 && (
                            <ul className="space-y-1 md:space-y-2">
                                {item.specializations.map((spec, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-0 xl:gap-6 text-[13px] md:text-sm xl:text-[21px] text-white leading-[155%] uppercase"
                                    >
                                        <span className="text-[#FFFFFF80] min-w-[40px]">
                                            {(index + 1)
                                                .toString()
                                                .padStart(2, "0")}
                                        </span>
                                        {spec}
                                    </li>
                                ))}
                            </ul>
                        )}
                </div>
            ))}
        </>
    );

    return (
        <ModalPanel
            popupName={POPUP_NAMES.DOCTORS_EDUCATION}
            title="Образование"
            content={content}
        />
    );
};

export default EducationPanel;
