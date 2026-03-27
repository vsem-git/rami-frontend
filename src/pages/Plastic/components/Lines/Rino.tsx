import { usePopup } from "../../../../components/PopupContext";

const Rino = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const { openPopup, closeAllPopups } = usePopup();
    return (
        <div
            onMouseEnter={() => {
                closeAllPopups();
                openPopup("rinopopup");
            }}
            onMouseLeave={() => closeAllPopups()}
            {...props}
            className={`group cursor-pointer ${className}`}
        >
            <div className="flex items-start gap-2">
                <svg
                    width="190"
                    height="20"
                    viewBox="0 0 190 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="2xl:mt-2.5 mt-1 md:w-[120px] 2xl:w-[190px]"
                >
                    <path
                        d="M1 20L70 1H190"
                        stroke="white"
                        strokeOpacity="0.5"
                    />
                </svg>

                <div className="flex gap-1 items-center">
                    <span className="font-semibold group-hover:scale-105 transition-transform text-xs 2xl:text-base after:absolute relative after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        РИНОПЛАСТИКА
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

export default Rino;
