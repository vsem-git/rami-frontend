import { usePopup } from "../../PopupContext";

const Rino = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const { openPopup } = usePopup();
    return (
        <div
            onClick={() => openPopup("rinopopup")}
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
                    className="-mt-0.5 2xl:mt-2 2xl:max-w-[132px] max-w-[80px]"
                >
                    <path
                        d="M1 51L51 1H153"
                        stroke="white"
                        stroke-opacity="0.5"
                    />
                </svg>
                <div className="flex gap-1 items-center">
                    <span className="font-semibold text-xs 2xl:text-base after:absolute relative after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
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
                            stroke-opacity="0.5"
                            stroke-width="1.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Rino;
