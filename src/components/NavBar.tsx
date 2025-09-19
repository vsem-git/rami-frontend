const NavBar = ({
    color,
    ref,
<<<<<<< HEAD
    navbarColor,
}: {
    color: string;
    ref: React.RefObject<HTMLDivElement>;
    navbarColor: string;
=======
}: {
    color: string;
    ref: React.RefObject<HTMLDivElement>;
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
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
<<<<<<< HEAD
            className="hidden md:flex navbarheader fixed left-10 top-1/2 -translate-y-1/2 z-50 uppercase font-semibold flex-col"
=======
            className="navbarheader fixed left-10 top-1/2 -translate-y-1/2 z-50 uppercase font-semibold flex flex-col"
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
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
<<<<<<< HEAD
                            className={`w-8 h-[1px] group-hover:w-16 transition-all duration-300`}
=======
                            className={`w-8 h-[2px] group-hover:w-10 transition-all duration-300`}
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
                            style={{
                                backgroundColor: navbarColor || color,
                                transition: "all 0.3s ease-in-out",
                            }}
                        />
                    </a>
                    <span
<<<<<<< HEAD
                        className={`pointer-events-none select-none absolute whitespace-nowrap text-shadow-lg left-[calc(100%_+_1.5rem)]`}
=======
                        className={`pointer-events-none select-none absolute whitespace-nowrap left-[calc(100%_+_1.5rem)]`}
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
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
