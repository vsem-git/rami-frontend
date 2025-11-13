import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
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

        tl.to({}, { duration: 1 })

            .call(
                () => {
                    setHeaderColor("#000000");
                },
                [],
                "-=0"
            )

            .to(footerRef.current, {
                y: "0%",
                duration: 2,
            })

            .call(
                () => {
                    setHeaderColor("#ffffff");
                },
                [],
                "-=1"
            )
            .fromTo(
                ".navbarheader",
                { opacity: 1, pointerEvents: "auto" },
                {
                    opacity: 0,
                    pointerEvents: "none",
                    duration: 1,
                },
                "-=2"
            );
    }, []);
    return (
        <>
            <footer
                className="h-dvh relative overflow-hidden"
                ref={containerRef}
            >
                <div
                    ref={contactRef}
                    className={`relative w-full h-full flex justify-center items-center overflow-hidden `}
                >
                    <div
                        className=" group max-w-[328px] max-h-[328px] mx-4 w-full h-full sm:max-w-[480px] sm:max-h-[270px] md:max-w-[560px] md:max-h-[315px] 2xl:max-w-[924px] 2xl:max-h-[520px] z-0 bg-[#691C32] contact-footer-trigger"
                        ref={contactOpenRef}
                    >
                        <div className="w-full h-full flex justify-center items-center relative cursor-pointer">
                            <svg
                                width="924"
                                height="261"
                                preserveAspectRatio="none"
                                viewBox="0 0 924 261"
                                className="absolute top-0 w-full h-1/2"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 0L462 260L924 0"
                                    stroke="white"
                                    strokeOpacity="0.3"
                                />
                            </svg>

                            <div
                                className="bg-white p-3 2xl:p-6 rounded-full group-hover:bg-[#691C32] group-hover:border group-hover:border-white transition-all z-10"
                                onClick={() => openPopup("contact")}
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    className="h-[24px] w-[24px] 2xl:h-[32px] 2xl:w-[32px]"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="group-hover:stroke-white transition-all"
                                        d="M16 5V16M16 27V16M16 16H27H5"
                                        stroke="#691C32"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <div className="absolute bottom-0 left-0  p-4 2xl:p-6 text-[11px] md:text-[13px] 2xl:text-[16px] text-white uppercase font-semibold">
                                <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[#ffffff] after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                                    СВЯжитесь С НАМИ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute top-0 left-0 w-full h-full grid grid-cols-2 z-10 bg-rose-900 opacity-0 pointer-events-none"
                        ref={contactContentRef}
                    >
                        <img src="/contact.webp" alt="contact" />
                        <div className="flex justify-center items-center">
                            CONTACT
                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-0 w-full pt-20 sm:pt-0 h-dvh bg-[url('/footer.webp')] bg-cover bg-center text-white flex flex-col "
                    ref={footerRef}
                >
                    <div className="flex-1 sm:text-[21px] flex-col sm:flex-row uppercase md:text-[28px] 2xl:text-[36px] font-semibold h-full flex ">
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
                                strokeWidth="1.5"
                            />
                        </svg> */}
                        </a>

                        <a
                            href="/documents"
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
                                strokeWidth="1.5"
                            />
                        </svg> */}
                        </a>

                        <a
                            href="#"
                            className="flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10"
                        >
                            <a
                                href="/Выписка_из_реестра.pdf"
                                target="_blank"
                                className="relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full"
                            >
                                Лицензия
                            </a>
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
                                strokeWidth="1.5"
                            />
                        </svg> */}
                        </a>

                        <a
                            href="/prices"
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
                                strokeWidth="1.5"
                            />
                        </svg> */}
                        </a>
                    </div>
                    <div className=" absolute bottom-0 left-0 sm:left-auto sm:right-0 text-xs xl:text-base border-[#FFFFFF4D] border-0 uppercase font-semibold flex md:flex-row flex-col gap-4 justify-between p-6 2xl:p-10 footer-content">
                        <a href="/" className="text-[#FFFFFF80] hidden">
                            ©2025. Рамиклиник резиденс
                        </a>
                        <a
                            href="/privacy-policy"
                            className="text-xs xl:text-base"
                        >
                            Политика конфиденциальности
                        </a>
                    </div>
                </div>
            </footer>
            <div className="px-6 py-6 2xl:px-10 2xl:py-10 bg-[#1D1D1D] text-white flex flex-col-reverse gap-6 md:gap-0 md:flex-row ">
                <div className="uppercase text-[#FFFFFF80] sm:py-[11px] whitespace-nowrap text-[11px] xl:text-[12px] 2xl:text-base md:pr-[215px] xl:pr-[195px] 2xl:pr-[160px]">
                    ©2025. Рамиклиник резиденс
                </div>
                <div className="flex flex-col sm:flex-row justify-between flex-1 gap-6 sm:gap-0">
                    <div className="flex justify-between flex-col gap-6 sm:gap-[16px] xl:gap-0 xl:flex-row flex-1 pr-[clamp(2.5rem,-46.25rem+60vw,10rem)]">
                        <div className="uppercase max-w-[360px] md:max-w-[440px] 2xl:max-w-[570px] mb-0 xl:py-[11px] text-[11px] xl:text-[12px] 2xl:text-base">
                            Крестовский пр., 4Б, Крестовский остров,
                            Санкт-Петербург, Российская Федерация
                        </div>
                        <div className="flex gap-10 sm:py-[16px] md:py-[11px] mb-[6px] sm:mb-0 text-[11px] xl:text-[12px] 2xl:text-base">
                            <div className="font-semibold border-b border-[#FFFFFF26] h-fit whitespace-nowrap">
                                +7 (921) 447-00-31
                            </div>
                            <div className="font-semibold border-b border-[#FFFFFF26] h-fit whitespace-nowrap">
                                +7 (812) 627-13-13
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end md:items-start gap-1">
                        <a
                            href=""
                            className="border-[#FFFFFF1A] border p-[14px] rounded-full h-fit aspect-square"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 6.8C14.49 8.38 13.84 12.22 13.51 13.99C13.37 14.74 13.09 14.99 12.83 15.02C12.25 15.07 11.81 14.64 11.25 14.27C10.37 13.69 9.87 13.33 9.02 12.77C8.03 12.12 8.67 11.76 9.24 11.18C9.39 11.03 11.95 8.7 12 8.49C12.0069 8.45819 12.006 8.42517 11.9973 8.3938C11.9886 8.36244 11.9724 8.33367 11.95 8.31C11.89 8.26 11.81 8.28 11.74 8.29C11.65 8.31 10.25 9.24 7.52 11.08C7.12 11.35 6.76 11.49 6.44 11.48C6.08 11.47 5.4 11.28 4.89 11.11C4.26 10.91 3.77 10.8 3.81 10.45C3.83 10.27 4.08 10.09 4.55 9.9C7.47 8.63 9.41 7.79 10.38 7.39C13.16 6.23 13.73 6.03 14.11 6.03C14.19 6.03 14.38 6.05 14.5 6.15C14.6 6.23 14.63 6.34 14.64 6.42C14.63 6.48 14.65 6.66 14.64 6.8Z"
                                    fill="white"
                                />
                            </svg>
                        </a>
                        <a
                            href=""
                            className="border-[#FFFFFF1A] border p-[14px] rounded-full h-fit aspect-square"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10 0C4.477 0 0 4.477 0 10C0 11.89 0.525 13.66 1.438 15.168L0.546 18.2C0.494785 18.3741 0.491415 18.5587 0.536244 18.7346C0.581074 18.9104 0.672448 19.0709 0.800759 19.1992C0.929071 19.3276 1.08958 19.4189 1.26542 19.4638C1.44125 19.5086 1.62592 19.5052 1.8 19.454L4.832 18.562C6.39074 19.5049 8.17824 20.0023 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0ZM7.738 12.263C9.761 14.285 11.692 14.552 12.374 14.577C13.411 14.615 14.421 13.823 14.814 12.904C14.8632 12.7896 14.881 12.6641 14.8655 12.5405C14.85 12.417 14.8019 12.2998 14.726 12.201C14.178 11.501 13.437 10.998 12.713 10.498C12.5619 10.3932 12.3761 10.3512 12.1946 10.3806C12.0131 10.4101 11.8502 10.5088 11.74 10.656L11.14 11.571C11.1083 11.62 11.0591 11.6551 11.0025 11.6692C10.9459 11.6833 10.886 11.6754 10.835 11.647C10.428 11.414 9.835 11.018 9.409 10.592C8.983 10.166 8.611 9.6 8.402 9.219C8.37672 9.17046 8.36957 9.11449 8.38185 9.06115C8.39413 9.00781 8.42503 8.9606 8.469 8.928L9.393 8.242C9.52525 8.12759 9.61063 7.96841 9.63277 7.79495C9.65491 7.62149 9.61226 7.44596 9.513 7.302C9.065 6.646 8.543 5.812 7.786 5.259C7.6881 5.18866 7.57369 5.14479 7.45385 5.13165C7.33402 5.11851 7.21282 5.13654 7.102 5.184C6.182 5.578 5.386 6.588 5.424 7.627C5.449 8.309 5.716 10.24 7.738 12.263Z"
                                    fill="white"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
