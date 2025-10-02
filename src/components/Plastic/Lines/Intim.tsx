const Intim = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props}>
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
                    <span className="font-semibold xl:text-xs 2xl:text-base">
                        ИНТИМНАЯ ПЛАСТИКА
                    </span>
                </div>
                <svg
                    width="181"
                    height="44"
                    viewBox="0 0 181 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-8"
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
