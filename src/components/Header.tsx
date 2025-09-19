import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavBar from "./NavBar";
import { useHeader } from "./HeaderContext";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const { headerColor, navbarColor } = useHeader();
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const menuRef = useRef(null);
    const visitRef = useRef(null);
    const navBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.set(headerRef.current, { opacity: 0 });

        gsap.set(logoRef.current, { y: "250%" });

        // Animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "+=1000",
                scrub: 1,
            },
        });

        // Phase 1: Header becomes visible with only logo (scaled 3x, centered)
        tl.to(headerRef.current, {
            opacity: 1,
            duration: 0.5,
        });

        // Ensure menu and visit items are hidden initially
        gsap.set([menuRef.current, visitRef.current, navBarRef.current], {
            opacity: 0,
            y: -100,
        });

        tl.to(
            {},
            {
                duration: 2,
            }
        );

        // Phase 2: Logo animation (scale down and move to original position)
        tl.to(logoRef.current, {
            scale: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: "power2.out",
        });

        // Phase 3: Reveal other elements
        tl.to(
            [menuRef.current, visitRef.current, navBarRef.current],
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.2,
                ease: "power2.out",
            },
            "<" // Overlap with logo animation for smoother transition
        );

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <>
            <div
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-40 py-[60px] px-[40px] grid grid-cols-3 justify-between items-center"
            >
                <div
                    ref={menuRef}
                    className="item flex font-semibold gap-4 items-center h-fit"
                >
                    <div className="flex flex-col gap-1">
                        <div
                            className={`w-[32px] h-[2px]`}
                            style={{
                                backgroundColor: headerColor,
                                transition: "all 0.3s ease-in-out",
                            }}
                        ></div>
                        <div
                            className={`w-[32px] h-[2px]`}
                            style={{
                                backgroundColor: headerColor,
                                transition: "all 0.3s ease-in-out",
                            }}
                        ></div>
                    </div>
                    <div
                        className={`text-[${headerColor}]`}
                        style={{
                            color: headerColor,
                            transition: "all 0.3s ease-in-out",
                        }}
                    >
                        МЕНЮ
                    </div>
                </div>
                <div className="item-wrapper flex justify-center items-center relative h-[60px]">
                    <div
                        className="logo w-[149px] h-[120px] absolute scale-[300%] translate-y-48"
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
                            />
                        </div>
                    </div>
                </div>
                <div
                    ref={visitRef}
                    className={`item font-semibold flex justify-end`}
                    style={{
                        color: headerColor,
                        transition: "all 0.3s ease-in-out",
                    }}
                >
                    ЗАПЛАНИРОВАТЬ ВИЗИТ
                </div>
                <NavBar
                    color={headerColor}
                    ref={navBarRef as React.RefObject<HTMLDivElement>}
                />
            </div>
        </>
    );
};

export default Header;
