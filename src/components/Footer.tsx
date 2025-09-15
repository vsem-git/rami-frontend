import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useHeader } from "./HeaderContext";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { setHeaderColor } = useHeader();
    const containerRef = useRef(null);
    const contactRef = useRef(null);
    const contactOpenRef = useRef(null);
    const contactContentRef = useRef(null);
    const footerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%",
                scrub: true,
                pin: true,
            },
        });

        gsap.set(footerRef.current, { y: "100%" });

        gsap.set(contactRef.current, { scale: 0.5 });

        gsap.fromTo(
            ".bgpattern1",
            { xPercent: 100 },
            {
                xPercent: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // начало анимации, когда верх контейнера достигнет нижней границы viewport
                    end: "center top", // конец анимации через 200px прокрутки
                    scrub: true, // плавная синхронизация с прокруткой
                    // pin: true,            // если не нужно фиксировать контейнер, можно убрать
                },
            }
        );

        gsap.fromTo(
            ".bgpattern2",
            { xPercent: -100 },
            {
                xPercent: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // начало анимации, когда верх контейнера достигнет нижней границы viewport
                    end: "center top", // конец анимации через 200px прокрутки
                    scrub: true, // плавная синхронизация с прокруткой
                    // pin: true,            // если не нужно фиксировать контейнер, можно убрать
                },
            }
        );

        tl.to({}, { duration: 1 });

        tl.to(footerRef.current, {
            y: "0%",
            duration: 2,
            onStart: () => {
                setHeaderColor("#ffffff");
            },
        });
    }, []);
    return (
        <footer className="h-dvh relative" ref={containerRef}>
            <div
                ref={contactRef}
                className="bg-rose-900 h-dvh w-full overflow-hidden group"
            >
                <div
                    className="absolute top-0 left-0 w-full h-full z-0 bg-[#691C32]"
                    ref={contactOpenRef}
                >
                    <div className="w-full h-full flex justify-center items-center relative cursor-pointer">
                        <div className="bg-white p-12 rounded-full group-hover:bg-transparent group-hover:border group-hover:border-white transition-all">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    className="group-hover:stroke-white transition-all"
                                    d="M16 5V16M16 27V16M16 16H27H5"
                                    stroke="#691C32"
                                    stroke-width="1.5"
                                />
                            </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 p-16 text-[32px] text-white uppercase font-semibold">
                            СВЯжитесь С НАМИ
                        </div>
                    </div>
                </div>
                <div
                    className="absolute top-0 left-0 w-full h-full grid grid-cols-2 z-10 bg-rose-900 opacity-0 pointer-events-none"
                    ref={contactContentRef}
                >
                    <img src="/contact.jpg" alt="contact" />
                    <div className="flex justify-center items-center">
                        CONTACT
                    </div>
                </div>
            </div>
            <div
                className="absolute inset-0 w-full h-dvh bg-[url('/footer.webp')] bg-cover bg-center text-white flex flex-col"
                ref={footerRef}
            >
                <div className="flex-1 text-[36px] font-semibold h-full flex">
                    <a
                        href="#"
                        className="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 border-l border-[#FFFFFF4D] leading-[150%] py-8 px-10"
                    >
                        История
                    </a>

                    <a
                        href="#"
                        className="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 border-l border-[#FFFFFF4D] leading-[150%] py-8 px-10"
                    >
                        Документы
                    </a>

                    <a
                        href="#"
                        className="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 border-l border-[#FFFFFF4D] leading-[150%] py-8 px-10"
                    >
                        Лицензия
                    </a>

                    <a
                        href="#"
                        className="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 border-l border-[#FFFFFF4D] leading-[150%] py-8 px-10"
                    >
                        Прайс
                    </a>
                </div>
                <div className="border-t border-[#FFFFFF4D] uppercase font-semibold flex justify-between py-8 px-10">
                    <a href="#" className="text-[#FFFFFF80]">
                        ©2025. Рамиклиник резиденс
                    </a>
                    <a href="#">Политика конфиденциальности</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
