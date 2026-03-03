interface CardNewsDetailProps {
    type: "number" | "avatar";
    number?: string;
    title?: string;
    avatarSrc?: string;
    name?: string;
    description?: string;
    className?: string;
}

export const CardNewsDetail = ({
    type,
    number,
    title,
    avatarSrc,
    name,
    description,
    className = "",
}: CardNewsDetailProps) => {
    if (type === "number") {
        return (
            <div
                className={`w-full border-t border-[#1414141F] flex items-stretch min-h-10 md:min-h-[98px] ${className}`}
            >
                <div className="min-w-10 md:min-w-[109px] border-r border-[#1414141F] flex items-center justify-center py-2 md:py-4">
                    <span className="text-xs md:text-base text-[#1D1D1D] uppercase">
                        {number}
                    </span>
                </div>
                <p className="text-sm md:text-xl text-[#1D1D1D] uppercase pl-5 py-2 md:py-4 flex items-center justify-center">
                    {title}
                </p>
            </div>
        );
    }

    if (type === "avatar") {
        return (
            <div
                className={`w-full border-y border-[#1414141F] flex items-stretch min-h-[110px] lg:min-h-[98px] ${className}`}
            >
                <div className="min-w-10 md:min-w-[109px] border-r border-[#1414141F] flex items-center justify-center py-4 md:py-2">
                    <img
                        src={avatarSrc}
                        alt={name}
                        className="w-6 md:w-14 h-6 md:h-14 rounded-full object-cover"
                    />
                </div>
                <div className="space-y-1 pl-2.5 md:pl-5  py-5 md:py-3">
                    <p className="text-xs md:text-xl text-[#1D1D1D] uppercase leading-[22px]">
                        {name}
                    </p>
                    <p className="text-xs md:text-xl text-[#1D1D1D66] uppercase max-w-[752px] leading-[170%]">
                        {description}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};
