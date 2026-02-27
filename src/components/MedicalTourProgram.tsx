import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { POPUP_NAMES } from "../constants/popupNames";
import { usePopup } from "./PopupContext";

gsap.registerPlugin(ScrollTrigger);

export const MedicalTourProgram = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const itemsRefs = useRef<(HTMLDivElement | null)[]>([]);
    const descriptionsRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const { openPopup } = usePopup();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        if (
            !sectionRef.current ||
            !scrollAreaRef.current ||
            !textRef.current ||
            !itemsRefs.current.length
        )
            return;

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: "+=600%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=600%",
                scrub: 1,
            },
        });

        const naturalHeights: number[] = [];
        descriptionsRefs.current.forEach((desc, i) => {
            if (desc) {
                gsap.set(desc, {
                    maxHeight: "none",
                    opacity: 1,
                    overflow: "visible",
                });
                naturalHeights[i] = desc.scrollHeight;
                gsap.set(desc, {
                    maxHeight: 0,
                    opacity: 0,
                    overflow: "hidden",
                });
            }
        });

        itemsRefs.current.forEach((item, _) => {
            if (!item) return;
            const h2 = item.querySelector("h2");
            const h4 = item.querySelector("h4");

            if (h2) gsap.set(h2, { opacity: 0 });
            if (h4) gsap.set(h4, { opacity: 1 });
            gsap.set(item, { opacity: 0.7 });
        });

        gsap.set([scrollAreaRef.current, textRef.current], {
            autoAlpha: 0,
            y: 30,
        });

        tl.to([scrollAreaRef.current, textRef.current], {
            autoAlpha: 1,
            y: 0,
            duration: 6,
            ease: "power2.out",
        });

        itemsRefs.current.forEach((item, i) => {
            if (!item) return;
            const h2 = item.querySelector("h2");
            const h4 = item.querySelector("h4");
            const desc = descriptionsRefs.current[i];
            const naturalHeight = naturalHeights[i] || 100;

            tl.to(item, { opacity: 1, duration: 5 }, "+=0.7")
                .to(
                    desc,
                    {
                        maxHeight: naturalHeight,
                        opacity: 1,
                        duration: 5,
                        ease: "power2.inOut",
                    },
                    "<",
                )
                .to(
                    h4,
                    {
                        opacity: 0,
                        duration: 3,
                    },
                    "<",
                )
                .to(
                    h2,
                    {
                        opacity: 1,
                        duration: 3,
                    },
                    "<",
                )
                .to(
                    desc,
                    {
                        maxHeight: 0,
                        opacity: 0,
                        duration: 5,
                        ease: "power2.inOut",
                    },
                    "+=1.2",
                )
                .to(
                    h2,
                    {
                        opacity: 0,
                        duration: 3,
                    },
                    "<",
                )
                .to(
                    h4,
                    {
                        opacity: 1,
                        duration: 3,
                    },
                    "<",
                );
        });

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [isMobile]);

    const handleTitleClick = (index: number) => {
        openPopup(POPUP_NAMES.TOURISM_INFO, index);
    };
    if (isMobile) {
        return (
            <div
                className="flex medical-wrap px-4 bg-[#691C32] text-white min-h-screen gap-8 pt-16"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <img
                    src="/safety-screen/bg5.webp"
                    alt="Security"
                    className="object-cover medical-image-ph"
                />
            </div>
        );
    }
    return (
        <div
            ref={sectionRef}
            className="relative w-full h-screen p-4 flex justify-end overflow-hidden"
            style={{
                backgroundImage:
                    'linear-gradient(180deg, rgba(29, 29, 29, 0.8) 0%, rgba(29, 29, 29, 0.4) 50%, rgba(29, 29, 29, 0.8) 100%), url("/safety-screen/bg5.webp")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top",
            }}
        >
            <div
                ref={scrollAreaRef}
                className="w-full max-w-[480px] xl:max-w-[752px] px-4 md:px-8 lg:px-16 py-5 h-full bg-[#FFFFFF1A] backdrop-blur-[80px] overflow-y-auto"
                style={{ overscrollBehavior: "contain" }}
            >
                <div className="w-full h-full flex flex-col justify-center items-start relative">
                    {[
                        {
                            title: "Программа медицинского тура",
                            number: "01",
                            text: "Гармоничное сочетание элитарной экономики впечатлений и высокотехнологичной эстетической медицины с пациенто-центричным подходом",
                        },
                        {
                            title: "VIP-сопровождение пациентов",
                            number: "02",
                            text: "Только авторизованные пользователи могут получать доступ к информации",
                        },
                        {
                            title: "Детальный план пребывания пациента",
                            number: "03",
                            text: "Только авторизованные пользователи могут получать доступ к информации",
                        },
                        {
                            title: "Медицинский план",
                            number: "04",
                            text: "диагностика, лечение, реабилитация, программа стратегия управления возрастом",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            ref={(el) => {
                                itemsRefs.current[i] = el;
                            }}
                            className="w-full border-t border-[#FFFFFF1A] py-4 cursor-pointer overflow-visible relative group"
                        >
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2 relative">
                                    <h2
                                        onClick={() => handleTitleClick(i)}
                                        className="text-white uppercase text-[16px] 2xl:text-[18px] cursor-pointer hover:opacity-80 transition-opacity relative w-fit
                after:content-[''] 
                after:absolute 
                after:-bottom-1 
                after:left-0 
                after:w-0 
                after:h-0.5 
                after:bg-white 
                after:transition-all 
                after:duration-300 
                group-hover:after:w-full"
                                    >
                                        {item.title}
                                    </h2>
                                    <h4
                                        className="text-white absolute top-0 left-0 text-[12px] 2xl:text-[18px] uppercase"
                                        onClick={() => handleTitleClick(i)}
                                    >
                                        {item.title}
                                    </h4>
                                    <p
                                        ref={(el) => (
                                            (descriptionsRefs.current[i] = el),
                                            undefined
                                        )}
                                        className="text-[#FFFFFFBF] text-lg/[155%] relative uppercase max-w-[550px]"
                                        style={{
                                            overflow: "hidden",
                                            display: "block",
                                        }}
                                    >
                                        {item.text}
                                    </p>
                                </div>
                                <h1 className="text-[#FFFFFF80] uppercase text-[18px]">
                                    {item.number}
                                </h1>
                            </div>
                        </div>
                    ))}
                    <button
                        className="relative text-base font-semibold text-[#EAE6E0] uppercase cursor-pointer px-1 flex items-center gap-2 group mt-4"
                        onClick={() => openPopup("contact")}
                    >
                        <span className="relative">
                            Запланировать визит
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#EAE6E0] transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <img
                            src="/plus.svg"
                            alt=""
                            className="inline-block -mt-1"
                            style={{
                                filter: "brightness(0) invert(1)",
                            }}
                        />
                    </button>
                </div>
            </div>

            <h2
                ref={textRef}
                className="absolute top-[200px] left-10 text-2xl md:text-[24px] lg:text-4xl/[125%] text-white uppercase text-left opacity-0 max-w-[770px]"
            >
                В <b>RAMICLINIC RESIDENCE</b> пациенты вместе с новой эстетикой
                внешности получают уникальный культурный опыт пребывания в
                Санкт-Петербурге
            </h2>
        </div>
    );
};
