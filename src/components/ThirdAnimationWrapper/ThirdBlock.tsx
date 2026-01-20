import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useHeader } from "../HeaderContext";
import ThirdAnimationBlock from "./ThirdAnimationBlock/ThirdAnimationBlock";

gsap.registerPlugin(ScrollTrigger);

const ThirdAndSecondAnimation = () => {
    const { setHeaderColor } = useHeader();
    const containerRef = useRef(null);
    const strokeContainerRef = useRef(null);

    useGSAP(() => {
        const windowHeight = document.documentElement.clientHeight;

        let triggeredWhite = false;
        let triggeredBlack = false;
        let prevProgress = 0;

        gsap.to(containerRef.current, {
            duration: 1,
            opacity: 1,
            scale: 1,
            paused: true, // Если нужно вручную запускать/реверсить
            onUpdate: function () {
                const currentProgress = this.progress();
                const directionUp = currentProgress > prevProgress; // Направление: вверх (появление)

                if (directionUp && currentProgress > 0.5 && !triggeredWhite) {
                    setHeaderColor("#000000"); // Белый при 50% появления
                    triggeredWhite = true;
                    triggeredBlack = false; // Сброс флага для чёрного
                } else if (
                    !directionUp &&
                    currentProgress < 0.5 &&
                    !triggeredBlack
                ) {
                    setHeaderColor("#ffffff"); // Чёрный при 50% исчезновения
                    triggeredBlack = true;
                    triggeredWhite = false; // Сброс флага для белого
                }

                prevProgress = currentProgress;
            },
        });

        const mm = gsap.matchMedia();
        /*  gsap.set(".bgpattern1", { xPercent: 120 });
        gsap.set(".bgpattern2", { xPercent: -120 }); */

        /* gsap.to(".runningstroke", {
            x: "-100%",
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
            },
        }); */

        /* gsap.fromTo(
            ".logoheader",
            { yPercent: 0 },
            {
                yPercent: -300,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "center bottom",
                    scrub: true,
                },
            }
        ); */

        mm.add("(min-width: 1281px)", () => {
            gsap.fromTo(
                ".logoheader",
                { yPercent: -300 },
                {
                    yPercent: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom+=800 bottom",
                        end: "bottom+=1000 bottom",
                        scrub: true,
                    },
                }
            );
        });

        mm.add("(min-width: 1281px)", () => {
            gsap.fromTo(
                ".logoheader",
                { yPercent: 0 },
                {
                    yPercent: -300,
                    duration: 1,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "top bottom",
                        end: "bottom-=1200 bottom",
                        scrub: true,
                    },
                }
            );
        });

        mm.add("(max-width: 1280px)", () => {
            gsap.fromTo(
                ".logoheader",
                { yPercent: -300 },
                {
                    yPercent: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom bottom",
                        end: "bottom+=400 bottom",
                        scrub: true,
                    },
                }
            );
        });

        gsap.fromTo(
            ".bgpattern1",
            { xPercent: 130 },
            {
                xPercent: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // когда верх элемента коснётся низа окна
                    end: "top+=200 top", // через 200px после начала
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".bgpattern2",
            { xPercent: -130 },
            {
                xPercent: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom", // когда верх элемента коснётся низа окна
                    end: "top+=200 top", // через 200px после начала
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".runningstroke",
            { yPercent: 150 },
            {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "top bottom",
                    end: "top center",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".runningstroke",
            { xPercent: 0 },
            {
                xPercent: -70,
                duration: 10,
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "top bottom",
                    end: "bottom -100%",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".bgpattern1",
            { xPercent: 0 },
            {
                xPercent: 130,
                duration: 1,
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "top bottom", // когда верх элемента коснётся низа окна
                    end: "top+=100 top", // через 200px после начала
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".bgpattern2",
            { xPercent: 0 },
            {
                xPercent: -130,
                duration: 10,
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "top bottom", // когда верх элемента коснётся низа окна
                    end: "top+=100 top", // через 200px после начала
                    scrub: true,
                },
            }
        );

        /* mm.add("(min-width: 1281px)", () => {
            gsap.to(".runningstroke", {
                y: "-100dvh",
                ease: "none",
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "bottom+=100 bottom", // начало за 200px до конца блока
                    end: "bottom+=1400 bottom", // конец за 10px до конца блока
                    scrub: true,
                },
            });
        }); */

        mm.add("(min-width: 1601px)", () => {
            gsap.to(".runningstroke", {
                y: "-100dvh",
                ease: "none",
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "bottom+=100 bottom",
                    end: "bottom+=1050 bottom",
                    scrub: true,
                },
            });
        });

        mm.add("(min-width: 768px) and (max-width: 1600px)", () => {
            gsap.to(".runningstroke", {
                y: "-100dvh",
                ease: "none",
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "bottom+=100 bottom",
                    end: "bottom+=950 bottom",
                    scrub: true,
                },
            });
        });

        mm.add("(max-width: 767px)", () => {
            if (windowHeight >= 900)
                gsap.to(".runningstroke", {
                    y: "-100dvh",
                    ease: "none",
                    duration: 8,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom-=100 bottom", // начало за 200px до конца блока
                        end: "bottom+=775 bottom-=80", // конец за 10px до конца блока
                        scrub: true,
                    },
                });

            if (windowHeight >= 800 && windowHeight < 900)
                gsap.to(".runningstroke", {
                    y: "-100dvh",
                    ease: "none",
                    duration: 8,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom-=100 bottom", // начало за 200px до конца блока
                        end: "bottom+=680 bottom-=80", // конец за 10px до конца блока
                        scrub: true,
                    },
                });

            if (windowHeight <= 799)
                gsap.to(".runningstroke", {
                    y: "-100dvh",
                    ease: "none",
                    duration: 8,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom-=100 bottom", // начало за 200px до конца блока
                        end: "bottom+=480 bottom-=80", // конец за 10px до конца блока
                        scrub: true,
                    },
                });
        });

        /* const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom+=700 bottom",
                scrub: true,
            },
        }); */

        /* tl.to({}, { duration: 30 });

        tl.addLabel("group1")
            .fromTo(
                ".bgpattern1",
                { xPercent: 120 },
                { xPercent: 0, opacity: 1, duration: 10 },
                "group1"
            )
            .fromTo(
                ".bgpattern2",
                { xPercent: -120 },
                { xPercent: 0, opacity: 1, duration: 10 },
                "group1"
            );

        tl.to({}, { duration: 130 }); */

        /* tl.addLabel("group2")
            .fromTo(
                ".bgpattern1",
                { xPercent: 0 },
                { xPercent: 130, duration: 10 },
                "group2"
            )
            .fromTo(
                ".bgpattern2",
                { xPercent: 0 },
                { xPercent: -130, duration: 10 },
                "group2"
            ); */
    });
    return (
        <div className="relative фыв" ref={containerRef}>
            <ThirdAnimationBlock />
            <div
                className="min-h-dvh pt-[0px] relative"
                ref={strokeContainerRef}
            >
                <div className="h-[100px] 2xl:h-[500px]" />
                <div
                    id="facilities"
                    className="flex flex-col md:flex-row justify-center px-4 md:px-[64px] xl:px-[80px] 2xl:px-[120px] md:gap-[105px] xl:gap-[80px] 2xl:gap-[128px]"
                >
                    <div className="flex flex-col gap-[32px] sm:gap-[120px] md:gap-[160px] 2xl:gap-[260px]">
                        <div>
                            <div>
                                <img
                                    src="/card1.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436]"
                                />
                            </div>
                            <div className="flex justify-between pt-4 2xl:pt-6 text-[16px] 2xl:text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Изысканная среда обитания
                                </span>
                                <span className="text-[#1D1D1D80]">01</span>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div>
                                <img
                                    src="/card3.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436]"
                                />
                            </div>
                            <div className="flex justify-between pt-4 2xl:pt-6 text-[16px] 2xl:text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Привилегированный сервис
                                </span>
                                <span className="text-[#1D1D1D80]">03</span>
                            </div>
                        </div>
                        <div className="block md:hidden">
                            <div>
                                <img
                                    src="/card2.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436] "
                                />
                            </div>
                            <div className="flex justify-between pt-4 2xl:pt-6 text-[16px] 2xl:text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Умные операционные
                                </span>
                                <span className="text-[#1D1D1D80]">02</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-[32px] md:pt-56 flex flex-col gap-[32px] sm:gap-[120px] md:gap-[160px] 2xl:gap-[260px]">
                        <div className="hidden md:block">
                            <div>
                                <img
                                    src="/card2.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436]"
                                />
                            </div>
                            <div className="flex justify-between pt-4 2xl:pt-6 text-[16px] 2xl:text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Умные операционные
                                </span>
                                <span className="text-[#1D1D1D80]">02</span>
                            </div>
                        </div>
                        <div className="block md:hidden">
                            <div>
                                <img
                                    src="/card3.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436]"
                                />
                            </div>
                            <div className="flex justify-between pt-4 2xl:pt-6 text-[16px] 2xl:text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Привелегированный сервис
                                </span>
                                <span className="text-[#1D1D1D80]">03</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img
                                    src="/telishevsky.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-776/436"
                                />
                            </div>
                            <div className="flex justify-between pt-4 2xl:pt-6 text-[16px] 2xl:text-[24px] leading-[130%]">
                                <span className="uppercase">Безопасность</span>
                                <span className="text-[#1D1D1D80]">04</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[200px] xl:h-[10dvh]" />
            </div>
        </div>
    );
};

export default ThirdAndSecondAnimation;
