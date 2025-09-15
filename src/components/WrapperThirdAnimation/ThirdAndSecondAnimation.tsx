import ThirdAnimationBlock from "./ThirdAnimationBlock/ThirdAnimationBlock";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThirdAndSecondAnimation = () => {
    const containerRef = useRef(null);
    const strokeContainerRef = useRef(null);

    useGSAP(() => {
        gsap.set(".bgpattern1", { xPercent: 100 });
        gsap.set(".bgpattern2", { xPercent: -100 });
        gsap.set(".runningstroke", { bottom: "-150%" });

        gsap.to(".runningstroke", {
            bottom: "4%",
            duration: 100,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: strokeContainerRef.current,
                start: "top 150%",
                end: "top 60%",
                scrub: true,
            },
        });

        gsap.to(".runningstroke", {
            x: "-100%",
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
            },
        });

        gsap.to(".runningstroke", {
            y: "-100dvh",
            ease: "power2.in",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom 240%",
                end: "bottom bottom",
                scrub: true,
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        tl.to(
            ".bgpattern1",
            {
                xPercent: 0,
                opacity: 1,
                duration: 2,
                ease: "power2.inOut",
            },
            "<"
        ).to(
            ".bgpattern2",
            {
                xPercent: 0,
                opacity: 1,
                duration: 2,
                ease: "power2.inOut",
            },
            "<"
        );

        tl.to({}, { duration: 3 });

        tl.to(
            ".bgpattern1",
            {
                xPercent: 100,
                duration: 2,
                ease: "power2.inOut",
            },
            "<"
        ).to(
            ".bgpattern2",
            {
                xPercent: -100,
                duration: 2,
                ease: "power2.inOut",
            },
            "<"
        );

        tl.to({}, { duration: 3 });
    });
    return (
        <div className="relative фыв" ref={containerRef}>
            <ThirdAnimationBlock />
            <div
                className="min-h-dvh pt-[500px] relative "
                ref={strokeContainerRef}
            >
                <div className="h-[500px]" />
                <div className="flex flex-col md:flex-row justify-between px-[120px] gap-[120px]">
                    <div className=" flex flex-col gap-[260px]">
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
                            <div className="flex justify-between pt-6 text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Изысканная среда обитания
                                </span>
                                <span className="text-[#1D1D1D80]">01</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img
                                    src="/card2.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436]"
                                />
                            </div>
                            <div className="flex justify-between pt-6 text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Изысканная среда обитания
                                </span>
                                <span className="text-[#1D1D1D80]">02</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-56 flex flex-col gap-[260px]">
                        <div>
                            <div>
                                <img
                                    src="/card3.webp"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436]"
                                />
                            </div>
                            <div className="flex justify-between pt-6 text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Изысканная среда обитания
                                </span>
                                <span className="text-[#1D1D1D80]">03</span>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img
                                    src="/card4.png"
                                    alt="card"
                                    width={776}
                                    height={436}
                                    className="aspect-[776/436]"
                                />
                            </div>
                            <div className="flex justify-between pt-6 text-[24px] leading-[130%]">
                                <span className="uppercase">
                                    Изысканная среда обитания
                                </span>
                                <span className="text-[#1D1D1D80]">04</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-[100dvh]" />
            </div>
        </div>
    );
};

export default ThirdAndSecondAnimation;
