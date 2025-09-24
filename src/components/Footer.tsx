import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useHeader } from "./HeaderContext";
import { usePopup } from "./PopupContext";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const { setHeaderColor } = useHeader();
    const containerRef = useRef(null);
    const contactRef = useRef(null);
    const contactOpenRef = useRef(null);
    const contactContentRef = useRef(null);
    const footerRef = useRef(null);
    const { openPopup } = usePopup();
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

        gsap.fromTo(
            ".bgpattern1",
            { xPercent: 120 },
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
            { xPercent: -120 },
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

        tl.call(() => {
            setHeaderColor("#000000");
        })
            .call(() => {
                setHeaderColor("#ffffff");
            })
            .to(footerRef.current, {
                y: "0%",
                duration: 2,
            });
    }, []);
    return (
        <footer className="h-dvh relative" ref={containerRef}>
            <div
                ref={contactRef}
                className={`bg-rose-900 h-dvh w-full overflow-hidden group scale-50`}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full z-0 bg-[#691C32]"
                    ref={contactOpenRef}
                >
                    <div className="w-full h-full flex justify-center items-center relative cursor-pointer">
                        <div
                            className="bg-white p-12 rounded-full group-hover:bg-transparent group-hover:border group-hover:border-white transition-all"
                            onClick={() => openPopup()}
                        >
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
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 text-[24px] md:text-[32px] text-white uppercase font-semibold">
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
                className="absolute inset-0 w-full pt-20 sm:pt-0 h-dvh bg-[url('/footer.webp')] bg-cover bg-center text-white flex flex-col"
                ref={footerRef}
            >
                <div className="flex-1 sm:text-[21px] flex-col sm:flex-row uppercase md:text-[28px] 2xl:text-[36px] font-semibold h-full flex">
                    <a
                        href="#"
                        className="flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10"
                    >
                        <span className="relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full">
                            История
                        </span>
                        {/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                stroke-width="1.5"
                            />
                        </svg> */}
                    </a>

                    <a
                        href="#"
                        className="flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10"
                    >
                        <span className="relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full">
                            Документы
                        </span>
                        {/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                stroke-width="1.5"
                            />
                        </svg> */}
                    </a>

                    <a
                        href="#"
                        className="flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10"
                    >
                        <span className="relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full">
                            Лицензия
                        </span>
                        {/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                stroke-width="1.5"
                            />
                        </svg> */}
                    </a>

                    <a
                        href="#"
                        className="flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10"
                    >
                        <span className="relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full">
                            Прайс
                        </span>
                        {/* <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="-translate-x-1 h-[32px] w-[32px] rotate-180 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <path
                                d="M12 20.25V3.75M12 3.75L5.25 10.5M12 3.75L18.75 10.5"
                                stroke="white"
                                stroke-width="1.5"
                            />
                        </svg> */}
                    </a>
                </div>
                <div className="border-t text-xs 2xl:text-base border-[#FFFFFF4D] uppercase font-semibold flex md:flex-row flex-col gap-4 justify-between py-6 md:px-6 md:py-8 px-4 2xl:py-8 2xl:px-10">
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
