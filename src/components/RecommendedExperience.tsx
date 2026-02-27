import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
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
            className="relative h-screen min-h-screen px-10 overflow-hidden"
        >
            <h1 className="text-[48px] text-[#1D1D1D] uppercase leading-[125%] text-center pt-50">
                Опыт, который рекомендуют
            </h1>

            <div className="relative z-10 flex items-center justify-between mt-30">
                <button
                    onClick={() => animateCardChange("prev")}
                    disabled={isAnimating}
                    className="w-12 h-12 bg-[#1D1D1D] border border-[#1D1D1D1A] backdrop-blur-sm flex items-center justify-center cursor-pointer rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-105 active:scale-95"
                >
                    <img
                        src="/icon-r.svg"
                        alt="Previous"
                        className="w-10 h-10 rotate-180 transition-transform duration-300"
                    />
                </button>

                <div
                    ref={cardRef}
                    className="w-full max-w-[1034px] mx-auto will-change-transform will-change-opacity"
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
                    className="w-12 h-12 bg-[#1D1D1D] border border-[#1D1D1D1A] backdrop-blur-sm flex items-center justify-center cursor-pointer rounded-full hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 hover:scale-105 active:scale-95"
                >
                    <img
                        src="/icon-r.svg"
                        alt="Next"
                        className="w-10 h-10 transition-transform duration-300"
                    />
                </button>
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
