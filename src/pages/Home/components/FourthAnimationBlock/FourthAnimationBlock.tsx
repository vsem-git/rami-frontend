import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {useScroll} from "../../ScrollContext.tsx";

gsap.registerPlugin(ScrollTrigger);

const FourthAnimationBlock = () => {
    const containerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const bgRef = useRef(null);
    const textContainerRef = useRef(null);
    const contentRef = useRef(null);
    const tlRef = useRef<null | GSAPTimeline>(null);
    const { setScrollToLocation } = useScroll();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
            gsap.set(bgRef.current, { y: 100 });
        });

        mm.add("(min-width: 768px) and (max-width: 1599px)", () => {
            gsap.set(bgRef.current, { y: 100 });
        });

        mm.add("(min-width: 1600px)", () => {
            gsap.set(bgRef.current, { y: 180 });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=225%",
                scrub: true,
                pin: true,
            },
        });

        tl.addLabel("group1")
            .fromTo(
                ".bgpattern1",
                { xPercent: 120 },
                { xPercent: 0, duration: 1 },
                "group1",
            )
            .fromTo(
                ".bgpattern2",
                { xPercent: -120 },
                { xPercent: 0, duration: 1 },
                "group1",
            );

        tl.addLabel("location");

        tl.addLabel("group2")
            .to(
                textContainerRef.current,
                { y: "-100px", opacity: 0, duration: 1 },
                "group2",
            )
            .to(bgRef.current, { y: "0px", duration: 1 }, "group2");

        // Вторая группа: следующие 4 анимации синхронно после первой
        tl.addLabel("group3", "+=0") // сразу после первой группы
            .fromTo(
                bgRef.current,
                { scale: 0.5 },
                { scale: 1, duration: 1 },
                "group3",
            )
            .fromTo(
                contentRef.current,
                { "--inset": "25%" },
                { "--inset": "0%", duration: 1 },
                "group3",
            )
            .fromTo(
                ".bgpattern1",
                { xPercent: 0 },
                { xPercent: 120, duration: 1 },
                "group3",
            )
            .fromTo(
                ".bgpattern2",
                { xPercent: 0 },
                { xPercent: -120, duration: 1 },
                "group3",
            );

        tlRef.current = tl;
    }, []);

    const handleScrollToLocation = () => {
        const tl = tlRef.current;
        if (!tl) return;
        const st = tl.scrollTrigger;
        if (!st) return;
        const progress = tl.labels["location"] / tl.duration();
        const scrollPosition = st.start + progress * (st.end - st.start);
        gsap.to(window, {
            scrollTo: scrollPosition,
            duration: 1,
            scrub: false,
            ease: "power2.inOut",
        });
    };

    useEffect(() => {
        setScrollToLocation(() => handleScrollToLocation);

        return () => {
            setScrollToLocation(() => {});
        };
    }, []);

    return (
        <>
            <div className="mt-[100px] flex flex-col items-center md:hidden">
                <div className="max-w-[320px] w-full text-[20px] uppercase inline-block text-center mb-10" data-content-hint="home.location.title">
                    МЕжДУ парком,
                    <br /> заливом и городом
                </div>
                <div className="relative">
                    <img
                        src="/map.webp"
                        alt="map"
                        className="w-full aspect-square object-cover"
                        data-content-hint="home.map.image"
                        data-content-hint-type="image"
                    />

                    <img
                        src="/pin.svg"
                        alt="pin"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
                <div className="flex flex-col w-full gap-4 py-[32px] px-4">
                    <div className="font-lg uppercase" data-content-hint="home.location.address">
                        Санкт-Петербург, КРЕСТОВСКИЙ ПРОСПЕКТ, 4Б
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="rounded-full p-3 min-w-[40px] min-h-[40px] bg-black flex justify-center items-center w-fit">
                            <img src="/anchor.svg" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[18px]" data-content-hint="home.location.yacht-time"> 10 МИНУТ </p>
                            <p className="text-xs" data-content-hint="home.location.yacht-label"> ДО СТОЯНКИ ЯХТ </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="rounded-full p-3 min-w-[40px] min-h-[40px] bg-black flex justify-center items-center w-fit">
                            <img src="/pointer.svg" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[18px]" data-content-hint="home.location.center-time"> 10 МИНУТ </p>
                            <p className="text-xs" data-content-hint="home.location.center-label"> ОТ ЦЕНТРА </p>
                        </div>
                    </div>
                    <a
                        href="https://yandex.com/maps/-/CPAXaP4L"
                        className="bg-[#691C32] p-5 uppercase text-white text-xs mt-4"
                        data-content-hint="home.location.route-btn"
                    >
                        построить маршрут
                    </a>
                </div>
            </div>
            <div
                className="-mt-[100px] hidden md:block h-dvh relative"
                ref={containerRef}
                id="location"
            >
                <div
                    ref={textContainerRef}
                    className="w-full text-center py-[82px] sm:py-[180px] 2xl:py-[248px]"
                >
                    <div className="md:max-w-[300px] 2xl:max-w-[450px] text-20px md:text-[24px] 2xl:text-[36px] uppercase inline-block text-center" data-content-hint="home.location.title">
                        МЕжДУ парком, заливом и городом
                    </div>
                </div>
                <div ref={mapContainerRef} className="min-h-[500px] ку">
                    <div
                        ref={bgRef}
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center flex justify-between items-end"
                        data-content-hint="home.map.image"
                        data-content-hint-type="image"
                        style={{ backgroundImage: "url('/map.webp')" }}
                    >
                        <div className="relative h-full w-full flex justify-center items-center">
                            <img src="/pin.svg" alt="pin" />
                        </div>
                    </div>
                    <div
                        ref={contentRef}
                        className="absolute top-0 left-0 w-full h-full grid grid-cols-3 items-end p-6"
                        style={{
                            // @ts-ignore
                            "--inset": "25%",
                            clipPath:
                                "inset(var(--inset) var(--inset) var(--inset) var(--inset))",
                        }}
                    >
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-3 items-center">
                                    <div className="rounded-full p-3 bg-black flex justify-center items-center w-fit">
                                        <img src="/anchor.svg" alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl md:text-[20px] 2xl:text-[28px]" data-content-hint="home.location.yacht-time">
                                            {" "}
                                            10 МИНУТ{" "}
                                        </p>
                                        <p className="text-xs 2xl:text-base" data-content-hint="home.location.yacht-label">
                                            {" "}
                                            ДО СТОЯНКИ ЯХТ{" "}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="rounded-full p-3 bg-black flex justify-center items-center w-fit">
                                        <img src="/pointer.svg" alt="" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl md:text-[20px] 2xl:text-[28px]" data-content-hint="home.location.center-time">
                                            {" "}
                                            10 МИНУТ{" "}
                                        </p>
                                        <p className="text-xs 2xl:text-base" data-content-hint="home.location.center-label">
                                            {" "}
                                            ОТ ЦЕНТРА{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="uppercase text-sm md:text-[20px] 2xl:text-[28px]" data-content-hint="home.location.address">
                                Санкт-Петербург, КРЕСТОВСКИЙ ПРОСПЕКТ, 4Б
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <a
                                href="https://yandex.com/maps/-/CPAXaP4L"
                                className="uppercase px-[32px] md:text-[13px] 2xl:text-base py-5 font-semibold bg-[#691C32] text-white cursor-pointer"
                                data-content-hint="home.location.route-btn"
                            >
                                Построить маршрут
                            </a>
                        </div>
                        <div className=""></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FourthAnimationBlock;
