interface CardNewsProps {
    title: string;
    day: number;
    month: string;
    image: string;
    onClick?: () => void;
    positionImage?: string;
    positionDay?: string;
}

export const CardNews = ({
    title,
    day,
    month,
    image,
    onClick,
    positionImage,
    positionDay,
}: CardNewsProps) => {
    return (
        <div
            className={`w-full max-w-[586px] border border-[#1D1D1D1F] cursor-pointer flex flex-col justify-between transition-opacity duration-300 ease-in-out hover:opacity-90 bg-white`}
            onClick={onClick}
        >
            <div className="relative px-9 py-[30px]">
                <h3 className="text-sm font-normal text-[#1D1D1D] uppercase">
                    {title}
                </h3>

                <h2
                    className={`absolute -bottom-18 left-9 z-10 text-[110px] font-normal text-[#691C32] uppercase ${positionDay}`}
                >
                    {day}
                </h2>
                <div className="w-full flex justify-end items-end mt-[120px]">
                    <button className="text-xs font-normal text-[#691C32] uppercase">
                        {month}
                    </button>
                </div>
            </div>

            <img
                src={image}
                alt=""
                className={`h-[250px] w-full object-cover ${positionImage}`}
            />
        </div>
    );
};
