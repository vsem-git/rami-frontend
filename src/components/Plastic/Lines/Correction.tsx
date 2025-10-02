import { usePopup } from "../../PopupContext";

const Correction = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const { openPopup } = usePopup();
    return (
        <div
            onClick={() => openPopup("breastpopup")}
            {...props}
            className={`group cursor-pointer ${className}`}
        >
            <div className="flex flex-col xl:flex-row items-start gap-2">
                <div className="flex gap-1 items-center">
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
                    <span className="font-semibold text-xs 2xl:text-base">
                        <p className="after:absolute relative after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                            КОРРЕКЦИЯ ШРАМОВ
                        </p>
                        <p className="after:absolute relative after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-[9ch]">
                            И РУБЦОВ
                        </p>
                    </span>
                </div>
                <svg
                    width="116"
                    height="32"
                    viewBox="0 0 116 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="xl:hidden translate-x-1/2"
                >
                    <path
                        d="M1 1L30.9479 31H116"
                        stroke="white"
                        stroke-opacity="0.5"
                    />
                </svg>

                <svg
                    width="193"
                    height="52"
                    viewBox="0 0 193 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden xl:block mt-3 2xl:max-w-[192px] max-w-[115px]"
                >
                    <path
                        d="M192 51L142 1H0"
                        stroke="white"
                        stroke-opacity="0.5"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Correction;
