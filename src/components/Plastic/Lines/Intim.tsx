import { usePopup } from "../../PopupContext";

const Intim = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
    const { openPopup } = usePopup();
    return (
        <div
            onClick={() => openPopup("intimpopup")}
            {...props}
            className={`group cursor-pointer ${className}`}
        >
            <div className="flex items-start gap-2">
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
                    <span className="font-semibold text-xs 2xl:text-base after:absolute relative after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                        ИНТИМНАЯ ПЛАСТИКА
                    </span>
                </div>
                <svg
                    width="181"
                    height="44"
                    viewBox="0 0 181 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-8 2xl:max-w-[180px] max-w-[103px]"
                >
                    <path
                        d="M180 1L142 43H0"
                        stroke="white"
                        stroke-opacity="0.5"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Intim;
