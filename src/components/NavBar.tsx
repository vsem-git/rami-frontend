const NavBar = ({
    color,
    ref,
    navbarColor,
}: {
    color: string;
    ref: React.RefObject<HTMLDivElement>;
    navbarColor: string;
}) => {
    const pathname = window.location.pathname;

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
            className={`${
                pathname === "/" ? "hidden md:flex " : "hidden"
            }navbarheader opacity-0 fixed left-4 md:left-6 2xl:left-10 top-1/2 -translate-y-1/2 z-50 uppercase font-semibold flex-col`}
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
                "О клинике",
                "Манифест искренности",
                "Направления услуг",
                "Команда врачей",
                "Удобства клиники",
                "Расположение",
            ].map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 relative py-3"
                >
                    <a href="#" className="relative group">
                        <div className="absolute -left-4 -right-4 -top-2 -bottom-2" />
                        <div
                            className={`w-6 xl:w-8 h-[1px] group-hover:w-16 transition-all duration-300`}
                            style={{
                                backgroundColor: navbarColor || color,
                                transition: "all 0.3s ease-in-out",
                            }}
                        />
                    </a>
                    <span
                        className={`pointer-events-none select-none absolute whitespace-nowrap left-[calc(100%_+_1.5rem)]`}
                        style={{
                            color: navbarColor || color,
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
