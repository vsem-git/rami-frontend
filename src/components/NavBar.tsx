const NavBar = ({
    color,
    ref,
}: {
    color: string;
    ref: React.RefObject<HTMLDivElement>;
}) => {
    const wrapLetters = (text: string) => {
        return text.split("").map((char, index) => (
            <span
                key={index}
                className="letter inline-block opacity-0 -translate-x-[10px] transition-all duration-300 ease-in-out"
                style={{ transitionDelay: `${index * 50}ms` }}
            >
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <nav
            ref={ref}
            className="navbarheader fixed left-10 top-1/2 -translate-y-1/2 z-50 uppercase font-semibold flex flex-col"
        >
            <style>
                {`
              .group:hover ~ span .letter {
                opacity: 1;
                transform: translateX(0);
              }
            `}
            </style>
            {[
                "Клиника",
                "Команда",
                "Династия",
                "Подготовка к пластической операции",
                "Пластическая хирургия",
                "Косметология",
                "Реабилитация",
                "Медицинский туризм",
                "Блог",
            ].map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 relative py-3"
                >
                    <a href="#" className="relative group">
                        <div className="absolute -left-4 -right-4 -top-2 -bottom-2" />
                        <div
                            className={`w-8 h-[2px] group-hover:w-10 transition-all duration-300`}
                            style={{
                                backgroundColor: color,
                                transition: "all 0.3s ease-in-out",
                            }}
                        />
                    </a>
                    <span
                        className={`pointer-events-none select-none absolute whitespace-nowrap left-[calc(100%_+_1.5rem)]`}
                        style={{
                            color: color,
                            transition: "all 0.3s ease-in-out",
                        }}
                    >
                        {wrapLetters(item)}
                    </span>
                </div>
            ))}
        </nav>
    );
};

export default NavBar;
