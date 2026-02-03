import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const SafetyOperationRooms = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const photoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            return;
        }

        const section = sectionRef.current;
        const horizontal = horizontalRef.current;
        const photo = photoRef.current;

        if (!section || !horizontal || !photo) return;

        gsap.set(photo, {
            opacity: 1,
            scaleX: 1,
            transformOrigin: "left center",
        });

        gsap.to(photo, {
            scaleX: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=300%",
                scrub: true,
            },
        });

        const totalScrollWidth = horizontal.scrollWidth;
        const windowWidth = window.innerWidth;
        const scrollDistance = totalScrollWidth - windowWidth;

        gsap.to(horizontal, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${totalScrollWidth}`,
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            },
        });
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                ScrollTrigger.getAll().forEach((t) => t.kill());
                gsap.killTweensOf("*");
            } else {
                ScrollTrigger.refresh();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            gsap.killTweensOf("*");
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
        return (
            <section
                id="safety-operation"
                className="relative w-full h-auto overflow-visible  md:block hidden"
            >
                <div className="flex flex-col h-full w-full">
                    <div className="relative w-full h-[400px]">
                        <img
                            src="/operation-rooms/bg1.webp"
                            alt=""
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#1D1D1D80]" />
                        <h2 className="absolute left-[6%] top-[20%] text-[24px] text-white leading-[125%] uppercase">
                            Абсолютная <br />
                            безопасность
                        </h2>
                    </div>

                    <div className="p-4 space-y-8">
                        <div className="space-y-2">
                            <h4 className="text-xs text-[#B59158] leading-[155%] uppercase">
                                01
                            </h4>
                            <p className="text-sm text-[#1D1D1D] leading-[155%] uppercase">
                                Герметичные операционные с ИИ, управляемые
                                голосом
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs text-[#B59158] leading-[155%] uppercase">
                                02
                            </h4>
                            <p className="text-sm text-[#1D1D1D] leading-[155%] uppercase">
                                Централизованное стерилизационное отделение
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <img
                                src="/operation-rooms/card5.webp"
                                alt=""
                                className="w-1/2 aspect-[3/4] object-cover"
                            />
                            <img
                                src="/operation-rooms/card4.webp"
                                alt=""
                                className="w-1/2 aspect-[3/4] object-cover"
                            />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs text-[#B59158] leading-[155%] uppercase">
                                03
                            </h4>
                            <p className="text-sm text-[#1D1D1D] leading-[155%] uppercase">
                                Ламинарные потоки как гарантия абсолютной
                                стерильности
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs text-[#B59158] leading-[155%] uppercase">
                                04
                            </h4>
                            <p className="text-sm text-[#1D1D1D] leading-[155%] uppercase">
                                Мобильные операционные столы экстра-класса
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs text-[#B59158] leading-[155%] uppercase">
                                05
                            </h4>
                            <p className="text-sm text-[#1D1D1D] leading-[155%] uppercase">
                                Безопасное интраоперационное ведение пациента
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs text-[#B59158] leading-[155%] uppercase">
                                06
                            </h4>
                            <p className="text-sm text-[#1D1D1D] leading-[155%] uppercase">
                                Бесконтактная система доступа в операционный
                                блок
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-auto md:h-screen xl:h-[1080px] overflow-hidden md:block hidden"
            id="telemedicine-section"
        >
            <div ref={horizontalRef} className="flex h-full w-full">
                <div ref={photoRef} className="relative w-1/2 h-full">
                    <img
                        src="/operation-rooms/bg1.webp"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#1D1D1D80]" />

                    <h2 className="absolute left-[6%] top-[20%] text-[24px] xl:text-[36px] text-white leading-[125%] uppercase">
                        Абсолютная <br />
                        безопасность
                    </h2>
                </div>

                <img
                    src="/operation-rooms/acr.webp"
                    alt=""
                    className="absolute top-[0rem] left-[60rem] xl:left-[83rem] w-[576px] xl:w-[1094px] h-[240px] xl:h-[456px] opacity-30"
                />

                <div className="relative h-full">
                    <div className="absolute top-[200px] left-16 w-[320px] xl:w-[420px] space-y-3 xl:space-y-4">
                        <h4 className="text-xs xl:text-[18px] text-[#B59158] leading-[155%] uppercase">
                            01
                        </h4>
                        <p className="text-sm xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase">
                            Герметичные операционные с ИИ, управляемые голосом
                        </p>
                    </div>

                    <div className="absolute bottom-5 left-[15rem] flex gap-10">
                        <div className="min-w-[320px] xl:min-w-[420px] space-y-4 mt-0">
                            <h4 className="text-xs xl:text-[18px] text-[#B59158] leading-[155%] uppercase">
                                02
                            </h4>
                            <p className="text-sm xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase">
                                Централизованное стерилизационное отделение
                            </p>
                        </div>

                        <div className="flex gap-2 xl:gap-4">
                            <img
                                src="/operation-rooms/card5.webp"
                                alt=""
                                className="w-[23vw] xl:w-[450px] aspect-[3/4] shrink-0 object-cover"
                            />
                            <img
                                src="/operation-rooms/card4.webp"
                                alt=""
                                className="w-[23vw] xl:w-[450px] aspect-[3/4] shrink-0 object-cover"
                            />
                        </div>

                        <div className="min-w-[320px] xl:min-w-[420px] space-y-4 mt-20">
                            <h4 className="text-xs xl:text-[18px] text-[#B59158] leading-[155%] uppercase">
                                04
                            </h4>
                            <p className="text-sm xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase">
                                Мобильные операционные столы экстра-класса
                            </p>
                        </div>

                        <div className="absolute top-[-15rem] left-[56rem] xl:left-[88rem] w-[320px] xl:w-[420px] space-y-4">
                            <h4 className="text-xs xl:text-[18px] text-[#B59158] leading-[155%] uppercase">
                                03
                            </h4>
                            <p className="text-sm xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase">
                                Ламинарные потоки как гарантия абсолютной
                                стерильности
                            </p>
                        </div>
                    </div>

                    <div className="h-full absolute left-[92rem] xl:left-[150rem]">
                        <img
                            src="/operation-rooms/acr.webp"
                            alt=""
                            className="absolute top-[0rem] left-[15rem] min-w-[576px] xl:min-w-[1094px] h-[240px] xl:h-[456px] opacity-30"
                        />
                        <div className="h-full relative z-10 flex flex-col justify-center xl:justify-start gap-4 w-[450px] shrink-0 mt-8">
                            <img
                                src="/operation-rooms/card3.webp"
                                alt=""
                                className="w-[240px] xl:w-[450px] aspect-[3/4] shrink-0 object-cover"
                            />
                            <img
                                src="/operation-rooms/card2.webp"
                                alt=""
                                className="w-[240px] xl:w-[450px] aspect-[3/4] shrink-0 ml-[175px] xl:ml-[260px] -mt-[52px] xl:-mt-[230px] object-cover"
                            />
                        </div>

                        <div className="absolute top-[20rem] xl:top-[12rem] left-[18rem] xl:left-[35rem] w-[320px] xl:w-[420px] space-y-4">
                            <h4 className="text-xs xl:text-[18px] text-[#B59158] leading-[155%] uppercase">
                                05
                            </h4>
                            <p className="text-sm xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase">
                                Безопасное интраоперационное ведение пациента
                            </p>
                        </div>

                        <div className="absolute bottom-[20rem] left-[40rem] xl:left-[65rem] w-[320px] xl:w-[420px] space-y-4">
                            <h4 className="text-xs xl:text-[18px] text-[#B59158] leading-[155%] uppercase">
                                06
                            </h4>
                            <p className="text-sm xl:text-[21px] text-[#1D1D1D] leading-[155%] uppercase">
                                Бесконтактная система доступа в операционный
                                блок
                            </p>
                        </div>

                        <img
                            src="/operation-rooms/card2.jpg"
                            alt=""
                            className="absolute min-w-[540px] xl:min-w-[810px] h-full top-1/2 transform -translate-y-1/2 left-[62rem] xl:left-[95rem] shrink-0 object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
