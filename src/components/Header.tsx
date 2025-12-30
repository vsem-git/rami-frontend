import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useHeader } from "./HeaderContext";
import { MenuHeader } from "./MenuHeader";
import { usePopup } from "./PopupContext";
import UnderlinedText from "./UnderlinedText/UnderlinedText";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
    useWhiteText?: boolean;
}

const Header = ({ useWhiteText }: HeaderProps) => {
    const { headerColor } = useHeader();
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const menuRef = useRef(null);
    const visitRef = useRef(null);
    const navBarRef = useRef<HTMLDivElement>(null);
    const [isOpenMenu, setOpenMenu] = useState(false);
    const topLineRef = useRef(null);
    const menuButtonRef = useRef(null);
    const bottomLineRef = useRef(null);
    const { openPopup } = usePopup();

    const currentColor = useWhiteText ? "#ffffff" : headerColor || "#000000";

    useEffect(() => {
        console.log("Ширина экрана в пикселях - ", window.innerWidth);
    }, []);

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

    const toggleMenu = () => {
        setOpenMenu((prev) => !prev);

        if (!topLineRef.current || !bottomLineRef.current) return;

        if (!isOpenMenu) {
            gsap.to(topLineRef.current, {
                rotate: 45,
                y: 6,
                backgroundColor: "#ffffff",
                duration: 0.3,
            });
            gsap.to(bottomLineRef.current, {
                rotate: -45,
                y: -1,
                backgroundColor: "#ffffff",
                duration: 0.3,
            });
        } else {
            gsap.to([topLineRef.current, bottomLineRef.current], {
                rotate: 0,
                y: 0,
                backgroundColor: currentColor,
                duration: 0.3,
            });
        }
    };

    return (
        <div
            ref={headerRef}
            className="header fixed top-0 left-0 right-0 z-[50] py-[16px] md:py-[20px] 2xl:py-[40px] md:px-[24px] sm:px-[16px] px-[16px] 2xl:px-[40px] grid grid-cols-3 justify-between items-center"
        >
            <div
                ref={menuButtonRef}
                onClick={toggleMenu}
                className="relative menuheader item flex font-semibold gap-4 items-center h-fit group cursor-pointer z-[999]"
            >
                <div className="flex flex-col gap-1">
                    <div
                        ref={topLineRef}
                        className="w-[32px] h-[2px]"
                        style={{
                            backgroundColor: currentColor,
                            transition: "background-color 0.3s ease-in-out",
                        }}
                    ></div>
                    <div
                        ref={bottomLineRef}
                        className="w-[32px] h-[2px]"
                        style={{
                            backgroundColor: currentColor,
                            transition: "background-color 0.3s ease-in-out",
                        }}
                    ></div>
                </div>
                <div
                    className={`hidden text-[13px] xl:text-base relative sm:block after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full ${
                        isOpenMenu ? "after:bg-white" : "after:bg-current"
                    }`}
                    style={{
                        color: isOpenMenu ? "#fff" : currentColor,
                        transition: "color 0.3s ease-in-out",
                    }}
                >
                    {isOpenMenu ? "ЗАКРЫТЬ" : "МЕНЮ"}
                </div>
            </div>
            <div className="item-wrapper flex justify-center items-center relative h-[60px]">
                <div
                    className="logo logoheader w-[79px] h-[64px] 2xl:w-[149px] 2xl:h-[120px] absolute"
                    ref={logoRef}
                >
                    <a href="/" className="relative block">
                        <div
                            className="absolute inset-0 w-[79px] h-[64px] 2xl:w-[149px] 2xl:h-[120px] bg-black/45 blur-[30px] z-0"
                            style={
                                headerColor === "#ffffff"
                                    ? { opacity: 1 }
                                    : { opacity: 0 }
                            }
                        ></div>
                        <img
                            src="/logo_black.webp"
                            width={1000}
                            height={1000}
                            alt="logo"
                            className={`inset-0 absolute w-[79px] h-[64px] 2xl:w-[149px] z-1 2xl:h-[120px] ${
                                headerColor === "#000000"
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            style={{ transition: "opacity 0.3s ease-in-out" }}
                        />
                        <img
                            src="/logo_white.webp"
                            width={1000}
                            height={1000}
                            alt="logo"
                            className={`absolute inset-0 w-[79px] h-[64px] 2xl:w-[149px] 2xl:h-[120px] ${
                                headerColor === "#000000"
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                            style={{ transition: "opacity 0.3s ease-in-out" }}
                        />
                    </a>
                </div>
            </div>
            <div
                ref={visitRef}
                className="item visitheader font-semibold justify-end items-center flex gap-6 cursor-pointer text-[11px] md:text-[12px] 2xl:text-base"
                style={{
                    color: headerColor,
                    transition: "none", // Отключаем CSS-переходы
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="md:hidden"
                >
                    <g clip-path="url(#clip0_15_529)">
                        <rect width="24" height="24" fill="white" />
                        <path
                            d="M2.01394 6.87134C1.34749 10.0618 3.85967 13.8597 7.01471 17.0147C10.1698 20.1698 13.9676 22.682 17.1581 22.0155C19.782 21.4674 21.1215 20.0697 21.8754 18.8788C22.1355 18.4678 22.0042 17.9344 21.6143 17.6436L17.9224 14.8897C17.5243 14.5928 16.9685 14.633 16.6174 14.9842L14.6577 16.9438C14.6577 16.9438 12.7529 16.3246 10.2288 13.8006C7.70482 11.2766 7.08564 9.37175 7.08564 9.37175L9.04529 7.4121C9.39648 7.06091 9.43671 6.5052 9.13975 6.10709L6.38585 2.4151C6.09505 2.02525 5.56163 1.89395 5.15068 2.15407C3.9597 2.90794 2.56203 4.24747 2.01394 6.87134Z"
                            stroke="#000000"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_15_529">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 48 48"
                    id="Layer_2"
                    data-name="Layer 2"
                >
                    <defs>
                        <style>{`.cls-1{fill:none;stroke:${headerColor};stroke-linecap:round;stroke-linejoin:round;`}</style>
                    </defs>
                    <path
                        className="cls-1"
                        d="M6.47,10.71a2,2,0,0,0-2,2h0V35.32a2,2,0,0,0,2,2H41.53a2,2,0,0,0,2-2h0V12.68a2,2,0,0,0-2-2H6.47Zm33.21,3.82L24,26.07,8.32,14.53"
                    />
                </svg>
                <span className="font-normal hidden md:inline">
                    +7 (812) 627 -13-13{" "}
                </span>
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
                <UnderlinedText
                    className="theme hidden! md:inline-block!"
                    onClick={() => openPopup("contact")}
                >
                    ЗАПЛАНИРОВАТЬ ВИЗИТ
                </UnderlinedText>
            </div>
            {/* <NavBar
                color={headerColor}
                ref={navBarRef as React.RefObject<HTMLDivElement>}
                navbarColor={navbarColor}
            /> */}

            <MenuHeader isOpen={isOpenMenu} />
        </div>
    );
};

export default Header;
