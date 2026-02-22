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
                className={`w-full border-t border-[#1414141F] flex items-center h-[98px] ${className}`}
            >
                <div className="w-[109px] h-full border-r border-[#1414141F] flex items-center justify-center">
                    <span className="text-base text-[#1D1D1D] uppercase">
                        {number}
                    </span>
                </div>
                <p className="text-xl text-[#1D1D1D] uppercase pl-5">{title}</p>
            </div>
        );
    }

    if (type === "avatar") {
        return (
            <div
                className={`w-full border-y border-[#1414141F] flex items-center h-[98px] ${className}`}
            >
                <div className="w-[109px] h-full border-r border-[#1414141F] flex items-center justify-center">
                    <img
                        src={avatarSrc}
                        alt={name}
                        className="w-14 h-14 rounded-full object-cover"
                    />
                </div>
                <div className="space-y-1 pl-5">
                    <p className="text-base text-[#1D1D1D] uppercase leading-[22px]">
                        {name}
                    </p>
                    <p className="text-base text-[#1D1D1D66] uppercase max-w-[752px] leading-[22px]">
                        {description}
                    </p>
                </div>
            </div>
        );
    }

    return null;
};
