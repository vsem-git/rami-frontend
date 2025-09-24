import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const FourthAnimationBlock = () => {
    const containerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const bgRef = useRef(null);
    const textContainerRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1281px)", () => {
            gsap.set(bgRef.current, { y: "180px" });
        });

        mm.add("(min-width: 767px)", () => {
            gsap.set(bgRef.current, { y: "100px" });
        });

        mm.add("(max-width: 767px)", () => {
            gsap.set(bgRef.current, { y: "100px" });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=500%",
                scrub: true,
                pin: true,
            },
        });

        tl.addLabel("group1")
            .fromTo(
                ".bgpattern1",
                { xPercent: 120 },
                { xPercent: 0, duration: 1 },
                "group1"
            )
            .fromTo(
                ".bgpattern2",
                { xPercent: -120 },
                { xPercent: 0, duration: 1 },
                "group1"
            );

        tl.addLabel("group2")
            .to(
                textContainerRef.current,
                { y: "-100px", opacity: 0, duration: 1 },
                "group2"
            )
            .fromTo(
                bgRef.current,
                { y: "180px", duration: 1 },
                { y: "0px", duration: 1 },
                "group2"
            );

        // Вторая группа: следующие 4 анимации синхронно после первой
        tl.addLabel("group3", "+=0") // сразу после первой группы
            .fromTo(
                bgRef.current,
                { scale: 0.5 },
                { scale: 1, duration: 1 },
                "group3"
            )
            .fromTo(
                contentRef.current,
                { "--inset": "25%" },
                { "--inset": "0%", duration: 1 },
                "group3"
            )
            .fromTo(
                ".bgpattern1",
                { xPercent: 0 },
                { xPercent: 120, duration: 1 },
                "group3"
            )
            .fromTo(
                ".bgpattern2",
                { xPercent: 0 },
                { xPercent: -120, duration: 1 },
                "group3"
            );
    }, []);

    return (
        <>
            <div className="flex flex-col items-center sm:hidden">
                <div className="max-w-[320px] w-full text-[20px] uppercase inline-block text-center mb-10">
                    МЕжДУ парком,
                    <br /> заливом и городом
                </div>
                <div className="relative">
                    <img
                        src="/map.png"
                        alt="map"
                        className="w-full aspect-square object-cover"
                    />

                    <img
                        src="/pin.svg"
                        alt="pin"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
                <div className="flex flex-col w-full gap-4 py-[32px] px-4">
                    <div className="font-lg uppercase">
                        Санкт-Петербург, КРЕСТОВСКИЙ ПРОСПЕКТ, 4Б
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="rounded-full p-3 min-w-[40px] min-h-[40px] bg-black flex justify-center items-center w-fit">
                            <img src="/anchor.svg" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[18px]"> 10 МИНУТ </p>
                            <p className="text-xs"> ДО СТОЯНКИ ЯХТ </p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="rounded-full p-3 min-w-[40px] min-h-[40px] bg-black flex justify-center items-center w-fit">
                            <img src="/pointer.svg" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[18px]"> 10 МИНУТ </p>
                            <p className="text-xs"> ОТ ЦЕНТРА </p>
                        </div>
                    </div>
                    <button className="bg-[#691C32] p-5 uppercase text-white text-xs mt-4">
                        построить маршрут
                    </button>
                </div>
            </div>
            <div className="hidden sm:block h-dvh relative" ref={containerRef}>
                <div
                    ref={textContainerRef}
                    className="w-full text-center py-[82px] sm:py-[120px] xl:py-[248px]"
                >
                    <div className="max-w-[450px] text-[36px] uppercase inline-block text-center">
                        МЕжДУ парком, заливом и городом
                    </div>
                </div>
                <div ref={mapContainerRef} className="min-h-[500px] ку">
                    <div
                        ref={bgRef}
                        className="absolute top-0 left-0 w-full h-full bg-[url('/map.png')] bg-cover bg-center flex justify-between items-end"
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
                                        <p className="text-xl md:text-[20px] 2xl:text-[28px]">
                                            {" "}
                                            10 МИНУТ{" "}
                                        </p>
                                        <p className="text-xs 2xl:text-base">
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
                                        <p className="text-xl md:text-[20px] 2xl:text-[28px]">
                                            {" "}
                                            10 МИНУТ{" "}
                                        </p>
                                        <p className="text-xs 2xl:text-base">
                                            {" "}
                                            ОТ ЦЕНТРА{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="uppercase text-sm md:text-[20px] 2xl:text-[28px]">
                                Санкт-Петербург, КРЕСТОВСКИЙ ПРОСПЕКТ, 4Б
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="uppercase px-[32px] md:text-[13px] 2xl:text-base py-5 font-semibold bg-[#691C32] text-white cursor-pointer">
                                Построить маршрут
                            </button>
                        </div>
                        <div className=""></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FourthAnimationBlock;
