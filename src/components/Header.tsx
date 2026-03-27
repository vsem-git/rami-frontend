import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHeader } from "./HeaderContext";
import { MenuHeader } from "./MenuHeader";
import { usePopup } from "./PopupContext";
import Envelope from "./svg/Envelope";
import Phone from "./svg/Phone";
import { EditableText } from "./EditableText";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
    useWhiteText?: boolean;
}

const Header = ({ useWhiteText }: HeaderProps) => {
    const { headerColor, setHeaderColor } = useHeader();
    const headerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const visitRef = useRef<HTMLDivElement>(null);
    const navBarRef = useRef<HTMLDivElement>(null);
    const [isOpenMenu, setOpenMenu] = useState(false);
    const topLineRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLDivElement>(null);
    const bottomLineRef = useRef<HTMLDivElement>(null);
    const { openPopup } = usePopup();
    const location = useLocation();

    const currentColor = useWhiteText ? "#ffffff" : headerColor || "#000000";

    useEffect(() => {
        if (location.pathname === "/") {
            setHeaderColor("#000000");
        } else {
            setHeaderColor("#000000");
        }
    }, [location.pathname, setHeaderColor]);

    useGSAP(() => {
        const logo = logoRef.current;
        const header = headerRef.current;
        const visit = visitRef.current;
        const navBar = navBarRef.current;

        if (!logo || !header || !visit || !navBar) {
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "+=1000",
                scrub: 1,
            },
        });
        tl.to(header, { opacity: 1, duration: 1 });
    }, []);

    const toggleMenu = () => {
        if (!isOpenMenu) {
            gsap.to(topLineRef.current, {
                rotate: 45,
                y: 3,
                backgroundColor: "#ffffff",
                duration: 0.3,
                transformOrigin: "50% 50%",
            });
            gsap.to(bottomLineRef.current, {
                rotate: -45,
                y: -3,
                backgroundColor: "#ffffff",
                duration: 0.3,
                transformOrigin: "50% 50%",
            });
        } else {
            gsap.to([topLineRef.current, bottomLineRef.current], {
                rotate: 0,
                y: 0,
                backgroundColor: currentColor,
                duration: 0.3,
            });
        }
        setOpenMenu((prev) => !prev);
    };

    return (
        <div
            ref={headerRef}
            className="header fixed top-0 left-0 right-0 z-[50] py-[16px] md:py-[20px] 2xl:py-[40px] md:px-[24px] sm:px-[16px] px-[16px] 2xl:px-[40px] grid grid-cols-3 justify-between items-center"
        >
            <div
                ref={menuButtonRef}
                onClick={toggleMenu}
                className="relative menuheader item flex font-semibold gap-4 items-center h-fit group cursor-pointer z-[999] opacity-0 md:pointer-events-none"
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
                        <img
                            src="/logo_black.webp"
                            alt="logo"
                            className="absolute inset-0 w-[79px] h-[64px] 2xl:w-[149px] 2xl:h-[120px] z-10 transition-all duration-300"
                            style={{
                                filter:
                                    headerColor === "#ffffff"
                                        ? "brightness(0) invert(1)"
                                        : "none",
                            }}
                        />
                    </a>
                </div>
            </div>

            <div
                ref={visitRef}
                className="item visitheader font-semibold justify-end items-center flex gap-6 cursor-pointer text-[11px] md:text-[12px] 2xl:text-base"
                style={{
                    color: headerColor,
                    transition: "none",
                }}
            >
                <Phone className="md:hidden" />
                <Envelope
                    headerColor={headerColor}
                    onClick={() => openPopup("contact")}
                />
                <a
                    href="tel:+78126271313"
                    className="font-normal hidden md:inline"
                >
                    <EditableText id="header.phone" fallback="+7 (812) 627 -13-13" tag="span" />
                </a>
            </div>

            <MenuHeader isOpen={isOpenMenu} />
        </div>
    );
};

export default Header;
