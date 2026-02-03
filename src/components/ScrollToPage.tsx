import { usePopup } from "./PopupContext";
import ScrollToButton from "./ScrollToButton";

const ScrollToPage = () => {
    const { openPopup } = usePopup();
    return (
        <div
            className={`scrolltosection uppercase fixed text-[15px] z-10 md:text-base 2xl:text-[24px] bottom-0 w-full text-center  `}
        >
            <div className="textheader mb-4 md:mb-0">
                клиника-резиденция
                <br className="md:hidden" /> пластической хирургии
            </div>
            <button
                onClick={() => {
                    console.log("click");
                    openPopup("contact");
                }}
                className="uppercase text-[13px] font-semibold mt-2 sm:hidden textheader"
            >
                ЗАПЛАНИРОВАТЬ ВИЗИТ
            </button>
            <ScrollToButton />
        </div>
    );
};

export default ScrollToPage;
