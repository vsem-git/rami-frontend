import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useHeader } from "./HeaderContext";
import { usePopup } from "./PopupContext";
import FooterInfo from "./FooterInfo";

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
            },
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
            },
        );

        tl.to({}, { duration: 1 })

            .call(
                () => {
                    setHeaderColor("#000000");
                },
                [],
                "-=0",
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
                "-=1",
            )
            .fromTo(
                ".navbarheader",
                { opacity: 1, pointerEvents: "auto" },
                {
                    opacity: 0,
                    pointerEvents: "none",
                    duration: 1,
                },
                "-=2",
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
                    {/* <img
						src='/pattern1.svg'
						alt=''
						className='w-1/2 md:w-[40%] xl:w-[30%] absolute right-0 top-1/2 transform -translate-y-1/2 hidden sm:block'
					/>
					<img
						src='/pattern2.svg'
						alt=''
						className='w-full sm:w-1/2 md:w-[40%] xl:w-[30%] absolute left-0 top-1/2 transform -translate-y-1/2 '
					/> */}
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
                    className="absolute inset-0 w-full pt-17 sm:pt-0 h-screen bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0)),url('/footer.webp')] bg-cover bg-center text-white flex flex-col "
                    ref={footerRef}
                >
                    <div className="flex-1 sm:text-[21px] flex-col sm:flex-row uppercase md:text-[28px] 2xl:text-[36px] font-semibold h-full flex ">
                        <a
                            href="/"
                            className="hidden temporary:flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10"
                        >
                            <span className="relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full">
                                Блог
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
                        </svg>  */}
                        </a>

                        <a
                            href="/patient"
                            className="flex gap-2 items-center group sm:[writing-mode:vertical-rl] sm:[text-orientation:mixed] sm:rotate-180 border-b sm:border-b-0 sm:border-l border-[#FFFFFF4D] leading-[150%] py-4 sm:py-8 px-4 md:px-10"
                        >
                            <span className="relative after:absolute after:-left-1 after:top-0 after:h-0 after:w-[1px] after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:h-full">
                                Пациентам
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
                            href="/%D0%92%D1%8B%D0%BF%D0%B8%D1%81%D0%BA%D0%B0_%D0%B8%D0%B7_%D1%80%D0%B5%D0%B5%D1%81%D1%82%D1%80%D0%B0.pdf"
                            target="_blank"
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
                                strokeWidth="1.5"
                            />
                        </svg> */}
                        </a>
                    </div>
                    <div className=" absolute bottom-0 left-0 sm:left-auto sm:right-0 text-xs xl:text-base border-[#FFFFFF4D] border-0 uppercase font-semibold flex md:flex-row flex-col gap-4 justify-between p-6 2xl:p-10 footer-content">
                        <a href="#" className="text-[#FFFFFF80] hidden">
                            ©2025. Рамиклиник резиденс
                        </a>
                        <a
                            href="/privacy-policy"
                            className="flex gap-2 items-center group text-xs xl:text-base leading-[150%]"
                            target="_blank"
                        >
                            <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#FFFFFF] after:transition-all after:duration-300 group-hover:after:w-full">
                                Политика конфиденциальности
                            </span>
                        </a>
                    </div>
                </div>
            </footer>
            <FooterInfo />
        </>
    );
};

export default Footer;
