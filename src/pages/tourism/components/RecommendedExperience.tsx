import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { EditableText } from "../../../components/EditableText";
import { CardRecommendedExperience } from "./CardRecommendedExperience";

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
    { id: 1, title: "Карточка 1" },
    { id: 2, title: "Карточка 2" },
    { id: 3, title: "Карточка 3" },
];

export const RecommendedExperience = () => {
    const [_, setCurrentIndex] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2,
        });
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        gsap.to(containerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: true,
            },
        });
    }, []);

    const animateCardChange = (direction: "next" | "prev") => {
        if (isAnimating || !cardRef.current) return;

        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false);
            },
        });

        tl.to(cardRef.current, {
            opacity: 0,
            y: -15,
            scale: 0.98,
            duration: 0.35,
            ease: "sine.inOut",
            onComplete: () => {
                if (direction === "next") {
                    setCurrentIndex((prev) => (prev + 1) % cardsData.length);
                } else {
                    setCurrentIndex(
                        (prev) =>
                            (prev - 1 + cardsData.length) % cardsData.length,
                    );
                }
            },
        })
            .set(cardRef.current, {
                y: 15,
                scale: 0.98,
                opacity: 0,
            })
            .to(cardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.45,
                ease: "sine.out",
            });
    };

    return (
        <div
            ref={containerRef}
            className="relative h-[80vh] lg:h-screen min-h-full lg:min-h-screen px-4 lg:px-6 xl:px-10 overflow-hidden"
        >
            <EditableText
                id="tourism.recommended.title"
                fallback="Опыт, который рекомендуют"
                tag="h1"
                className="text-[18px] sm:text-[24px] md:text-[32px] xl:text-[48px] text-[#1D1D1D] uppercase leading-[125%] text-center max-[600px]:pt-15 pt-[120px] 2xl:pt-50"
            />

            <div className="relative z-10 flex items-center justify-between mt-15 2xl:mt-30 max-[600px]:flex-col max-[600px]:gap-[100px]">
                <button
                    onClick={() => animateCardChange("prev")}
                    disabled={isAnimating}
                    className="max-[600px]:hidden min-w-8 lg:w-12 h-8 lg:h-12 bg-[#1D1D1D] border border-[#1D1D1D1A] backdrop-blur-sm flex items-center justify-center cursor-pointer rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-105 active:scale-95"
                >
                    <img
                        src="/icon-r.svg"
                        alt="Previous"
                        className="w-4 lg:w-10 rotate-180 transition-transform duration-300"
                    />
                </button>

                <div
                    ref={cardRef}
                    className="w-full max-w-[800px] xl:max-w-[1034px] mx-auto will-change-transform will-change-opacity"
                    style={{
                        opacity: 0,
                        transform: "translateY(0) scale(1)",
                    }}
                >
                    <CardRecommendedExperience />
                </div>

                <button
                    onClick={() => animateCardChange("next")}
                    disabled={isAnimating}
                    className="max-[600px]:hidden min-w-8 lg:w-12 h-8 lg:h-12 bg-[#1D1D1D] border border-[#1D1D1D1A] backdrop-blur-sm flex items-center justify-center cursor-pointer rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-105 active:scale-95"
                >
                    <img
                        src="/icon-r.svg"
                        alt="Next"
                        className="w-4 lg:w-10 transition-transform duration-300"
                    />
                </button>

                <div className=" max-[600px]:flex hidden w-full justify-center items-center gap-4">
                    <button
                        onClick={() => animateCardChange("prev")}
                        disabled={isAnimating}
                        className="flex min-w-8 h-8 bg-[#1D1D1D] border border-[#1D1D1D1A] backdrop-blur-sm  items-center justify-center cursor-pointer rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-105 active:scale-95"
                    >
                        <img
                            src="/icon-r.svg"
                            alt="Previous"
                            className="w-4 lg:w-10 rotate-180 transition-transform duration-300"
                        />
                    </button>
                    <button
                        onClick={() => animateCardChange("next")}
                        disabled={isAnimating}
                        className="flex min-w-8 h-8 bg-[#1D1D1D] border border-[#1D1D1D1A] backdrop-blur-sm  items-center justify-center cursor-pointer rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-105 active:scale-95"
                    >
                        <img
                            src="/icon-r.svg"
                            alt="Next"
                            className="w-4 transition-transform duration-300"
                        />
                    </button>
                </div>
            </div>

            <img
                src="/pattern1.svg"
                alt=""
                className="w-1/2 md:w-[40%] xl:w-[30%] absolute right-0 top-0 hidden sm:block"
            />
            <img
                src="/pattern2.svg"
                alt=""
                className="w-full sm:w-1/2 md:w-[40%] xl:w-[30%] absolute left-0 top-0 "
            />
        </div>
    );
};
