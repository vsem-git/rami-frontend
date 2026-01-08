import { usePopup } from "../../PopupContext";

const Plastic = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const { openPopup, closeAllPopups } = usePopup();
    return (
        <div
            onMouseEnter={() => {
                closeAllPopups();
                openPopup("plasticpopup");
            }}
            onMouseLeave={() => closeAllPopups()}
            {...props}
            className={`group cursor-pointer ${className}`}
        >
            <div className="flex items-start gap-2">
                <svg
                    width="153"
                    height="52"
                    viewBox="0 0 153 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="2xl:max-w-[152px] max-w-[91px]"
                >
                    <path
                        d="M1 1L51 51H153"
                        stroke="white"
                        strokeOpacity="0.5"
                    />
                </svg>

                <div className="flex gap-1 items-center mt-10">
                    <span className="font-semibold group-hover:scale-105 transition-transform text-xs 2xl:text-base after:absolute relative after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        ПЛАСТИКА ЛИЦА
                    </span>
                    <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 3V8.5M8 14V8.5M8 8.5H13.5H2.5"
                            stroke="white"
                            strokeOpacity="0.5"
                            strokeWidth="1.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Plastic;
