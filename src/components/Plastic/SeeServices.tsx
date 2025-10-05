import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollToPlugin);

const SeeServices = () => {
    const buttonRef = useRef<HTMLAnchorElement | null>(null);

    useEffect(() => {
        buttonRef.current?.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                duration: 1,
                scrollTo: "#services",
                ease: "power2.out",
            });
        });
    }, []);

    return (
        <a
            ref={buttonRef}
            href="/plastic#services"
            className="md:hidden fixed z-[99] bottom-4 left-4 flex items-center w-fit gap-3"
        >
            <div className="p-3 bg-[#691C32] rounded-full">
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8 2.5V8M8 13.5V8M8 8H13.5H2.5"
                        stroke="white"
                        stroke-width="1.5"
                    />
                </svg>
            </div>
            <p className="text-xs font-semibold text-white">СМОТРЕТЬ УСЛУГИ</p>
        </a>
    );
};

export default SeeServices;
