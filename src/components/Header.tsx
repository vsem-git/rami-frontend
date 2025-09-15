import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "./NavBar";
import { useHeader } from "./HeaderContext";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const { headerColor } = useHeader();
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const menuRef = useRef(null);
    const visitRef = useRef(null);
    const navBarRef = useRef<HTMLDivElement>(null);

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

        /* gsap.set(header, { opacity: 0 }); */
        gsap.set(logo, {
            scale: 3,
            y: () =>
                // @ts-ignore
                (window.innerHeight - logo.offsetHeight * 3) / 2 -
                // @ts-ignore
                logo.offsetTop,
        });

        gsap.set([menu, visit, navBar], {
            opacity: 0,
            y: -100, // Пиксели вместо процентов
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "+=1000",
                scrub: 1,
            },
        });
        /* .to(header, { opacity: 1, duration: 1 }) */
        /* tl.to({}, { duration: 3 })
            .to(menu, { opacity: 1, y: 0, duration: 0.5 }, 4)
            .to(visit, { opacity: 1, y: 0, duration: 0.5 }, 4)
            .to(navBar, { opacity: 1, y: 0, duration: 0.5 }, 4);

        tl.to({}, { duration: 1 });

        tl.to(logo, { scale: 1, x: 0, y: 0, duration: 1, ease: "power2.out" }); */

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <div
            ref={headerRef}
            className="fixed top-0 left-0 right-0 z-40 py-[40px] px-[40px] grid grid-cols-3 justify-between items-center"
        >
            <div
                ref={menuRef}
                className="menuheader item flex font-semibold gap-4 items-center h-fit"
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
                    className="logo logoheader w-[149px] h-[120px] absolute"
                    ref={logoRef}
                >
                    <div className="relative">
                        <img
                            src="/logo_black.png"
                            width={1000}
                            height={1000}
                            alt="logo"
                            className={`inset-0 absolute w-[149px] h-[120px] ${
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
                            className={`absolute inset-0 w-[149px] h-[120px] ${
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
                className="item visitheader font-semibold flex justify-end"
                style={{
                    color: headerColor,
                    transition: "none", // Отключаем CSS-переходы
                }}
            >
                ЗАПЛАНИРОВАТЬ ВИЗИТ
            </div>
            <NavBar
                color={headerColor}
                ref={navBarRef as React.RefObject<HTMLDivElement>}
            />
        </div>
    );
};

export default Header;
