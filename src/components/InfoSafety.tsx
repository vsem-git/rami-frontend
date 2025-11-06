"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export const InfoSafety = () => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const stickyRef = useRef<HTMLDivElement | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setActiveIndex(0);
            ScrollTrigger.getAll().forEach((t) => t.kill());
            return;
        }

        const wrapper = wrapperRef.current;
        const sticky = stickyRef.current;
        if (!wrapper || !sticky) return;

        const blocks = gsap.utils.toArray<HTMLElement>(".safety-block");

        ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            endTrigger: blocks[blocks.length - 1],
            end: "bottom bottom",
            pin: sticky,
            pinSpacing: true,
            invalidateOnRefresh: true,
        });

        blocks.forEach((block, i) => {
            ScrollTrigger.create({
                trigger: block,
                start: "center center",
                end: "bottom center",
                onEnter: () => setActiveIndex(i),
                onEnterBack: () => setActiveIndex(i),
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [isMobile]);

    const blocks = [
        {
            title: "Конфиденциальность",
            number: "01",
            description:
                "Только авторизованные пользователи могут получать доступ к информации",
        },
        {
            title: "Защита данных",
            number: "02",
            description: "В том числе от несанкционированного внешнего доступа",
        },
        {
            title: "Целостность",
            number: "03",
            description:
                "Информация о пациентах корректная, точная, полная и защищенная",
        },
        {
            title: "Доступность",
            number: "04",
            description:
                "Уполномоченные пользователи имеют доступ к информации в любое время",
        },
    ];

    return (
        <div
            ref={wrapperRef}
            className="relative flex md:grid grid-cols-2 w-full medical-wrap bg-[#691C32] overflow-hidden gap-30 xl:gap-[120px] 2xl:gap-[170px] pt-8 sm:pt-20 md:pt-[100px] xl:pt-[160px]"
        >
            <div
                ref={stickyRef}
                className="sticky top-0 left-0 medical-image-screen flex-shrink-0 flex items-start justify-center px-4 lg:px-10"
            >
                <div>
                    <h3 className="text-2xl xl:text-4xl text-white leading-[125%] uppercase mb-4 md:mb-6 xl:mb-10 max-w-[640px]">
                        ИНФОРМАЦИОННАЯ БЕЗОПАСНОСТЬ
                    </h3>
                    <p className="text-xs xl:text-lg text-[#FFFFFFBF] leading-[155%] uppercase max-w-[540px]">
                        Сбалансированный комплекс мер и процессов,
                        предназначенных для защиты информации.
                    </p>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-[750px] mx-auto mr-0 lg:mr-16 xl:mr-[100px] space-y-[64px] text-white px-4 lg:px-0">
                {blocks.map((block, index) => (
                    <section
                        key={index}
                        className="safety-block border-t border-[#FFFFFF33] pt-5 sxl:pt-16"
                    >
                        <div className="flex items-center justify-between">
                            <div className="w-full flex flex-col xl:flex-row xl:items-center">
                                <div className="w-full flex flex-row xl:flex-col items-center xl:items-start justify-between xl:justify-start gap-0 xl:gap-6">
                                    <h3 className="text-[16px] sxl:text-2xl leading-[130%] uppercase">
                                        {block.title}
                                    </h3>
                                    <h1
                                        className={`block xl:hidden text-[32px]/[125%] sm:text-[44px]/[125%] lg:text-7xl/[125%] xl:text-[120px]/[125%] uppercase transition-opacity duration-500 ${
                                            isMobile || activeIndex === index
                                                ? "text-[#FFFFFF4D] opacity-100"
                                                : "opacity-30"
                                        }`}
                                    >
                                        {block.number}
                                    </h1>
                                    <p className="hidden xl:block text-xs xl:text-sm sxl:text-lg text-white uppercase leading-[155%] max-w-[554px]">
                                        {block.description}
                                    </p>
                                </div>
                                <p className="block xl:hidden text-[11px] md:text-xs xl:text-lg text-white uppercase leading-[155%] max-w-[300px] md:max-w-[368px] xl:max-w-[554px]">
                                    {block.description}
                                </p>
                                <h1
                                    className={`hidden xl:block text-[32px]/[125%] sm:text-[44px]/[125%] lg:text-7xl/[125%] sxl:text-[120px]/[125%] uppercase transition-opacity duration-500 ${
                                        isMobile || activeIndex === index
                                            ? "text-[#FFFFFF4D] opacity-100"
                                            : "opacity-30"
                                    }`}
                                >
                                    {block.number}
                                </h1>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};
