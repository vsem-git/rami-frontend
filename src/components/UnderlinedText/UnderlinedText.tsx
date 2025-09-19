const UnderlinedText = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span className={`relative group inline-block ${className}`}>
            <span className="after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[#7E318E] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                {children}
            </span>
        </span>
    );
};

export default UnderlinedText;
