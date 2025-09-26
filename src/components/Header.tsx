import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "./NavBar";
import { useHeader } from "./HeaderContext";
import { useGSAP } from "@gsap/react";
import UnderlinedText from "./UnderlinedText/UnderlinedText";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const { headerColor, navbarColor } = useHeader();
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const menuRef = useRef(null);
    const visitRef = useRef(null);
    const navBarRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const logo = logoRef.current;
        const header = headerRef.current;
        const menu = menuRef.current;
        const visit = visitRef.current;
        const navBar = navBarRef.current;

        if (!logo || !header || !menu || !visit || !navBar) {
            console.error("One or more refs are not defined:", {
                logo,
                header,
                menu,
                visit,
                navBar,
            });
            return;
        }

        /* const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "+=1000",
                scrub: 1,
            },
        });
        tl.to({}, { duration: 3 })
            .to(menu, { opacity: 1, y: 0, duration: 0.5 }, 4)
            .to(visit, { opacity: 1, y: 0, duration: 0.5 }, 4)
            .to(navBar, { opacity: 1, y: 0, duration: 0.5 }, 4);

        tl.to(header, { opacity: 1, duration: 1 });

        tl.to({}, { duration: 1 });

        tl.to(logo, { scale: 1, x: 0, y: 0, duration: 1, ease: "power2.out" }); */
    }, []);

    return (
        <div
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-40 py-[16px] md:py-[20px] 2xl:py-[40px] md:px-[24px] sm:px-[16px] px-[16px] 2xl:px-[40px] grid grid-cols-3 justify-between items-center"
        >
            <div
                ref={menuRef}
                className="menuheader item flex font-semibold gap-4 items-center h-fit group cursor-pointer"
                style={{ transition: "none" }} // Отключаем CSS-переходы
            >
                <div className="flex flex-col gap-1">
                    <div
                        className="w-[32px] h-[2px]"
                        style={{
                            backgroundColor: headerColor,
                            transition: "background-color 0.3s ease-in-out", // Оставляем переход только для background-color
                        }}
                    ></div>
                    <div
                        className="w-[32px] h-[2px]"
                        style={{
                            backgroundColor: headerColor,
                            transition: "background-color 0.3s ease-in-out",
                        }}
                    ></div>
                </div>
                <div
                    className="theme hidden text-[13px] xl:text-base relative sm:block after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full"
                    style={{
                        color: headerColor,
                        transition: "color 0.3s ease-in-out",
                    }}
                >
                    МЕНЮ
                </div>
            </div>
            <div className="item-wrapper flex justify-center items-center relative h-[60px]">
                <div
                    className="logo logoheader w-[100px] h-[81px] 2xl:w-[149px] 2xl:h-[120px] absolute"
                    ref={logoRef}
                >
                    <div className="relative">
                        <div
                            className="absolute inset-0 w-[100px] h-[81px] 2xl:w-[149px] 2xl:h-[120px] bg-black/15 blur-[30px] z-0"
                            style={
                                headerColor === "#ffffff"
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                            }
                        ></div>
                        <img
                            src="/logo_black.png"
                            width={1000}
                            height={1000}
                            alt="logo"
                            className={`inset-0 absolute w-[100px] h-[81px] 2xl:w-[149px] z-1 2xl:h-[120px] ${
                                headerColor === "#000000"
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            style={{ transition: "opacity 0.3s ease-in-out" }}
                        />
                        <img
                            src="/logo_white.png"
                            width={1000}
                            height={1000}
                            alt="logo"
                            className={`absolute inset-0 w-[100px] h-[81px] 2xl:w-[149px] 2xl:h-[120px] ${
                                headerColor === "#000000"
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                            style={{ transition: "opacity 0.3s ease-in-out" }}
                        />
                    </div>
                </div>
            </div>
            <div
                ref={visitRef}
                className="item visitheader font-semibold justify-end hidden md:flex cursor-pointer text-[13px] xl:text-base"
                style={{
                    color: headerColor,
                    transition: "none", // Отключаем CSS-переходы
                }}
            >
                <style>
                    {`
                        .theme *:after {
                            background-color: ${headerColor};
                        }
                        
                        .theme:after {
                            background-color: ${headerColor};
                        }
                    `}
                </style>
                <UnderlinedText className="theme">
                    ЗАПЛАНИРОВАТЬ ВИЗИТ
                </UnderlinedText>
            </div>
            <div
                className="uppercase fixed text-[15px] md:text-base xl:text-[24px] bottom-6 xl:bottom-10 text-center w-full px-4 textheader"
                ref={textRef}
            >
                <div>клиника-резиденция пластический хирургии</div>
                <button className="uppercase text-[13px] font-semibold mt-6 sm:hidden">
                    ЗАПЛАНИРОВАТЬ ВИЗИТ
                </button>
            </div>
            <NavBar
                color={headerColor}
                ref={navBarRef as React.RefObject<HTMLDivElement>}
                navbarColor={navbarColor}
            />
        </div>
    );
};

export default Header;
