import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useContentContext } from "../../contexts/ContentContext";
import { EditableImage } from "../EditableImage";
import { EditableText } from "../EditableText";
import { useHeader } from "../HeaderContext";
import ThirdAnimationBlock from "./ThirdAnimationBlock/ThirdAnimationBlock";

gsap.registerPlugin(ScrollTrigger);

interface CardItem {
    image: string;
    title: string;
    number: string;
    alt?: string;
}

interface CardsData {
    leftColumn: CardItem[];
    rightColumn: CardItem[];
}

interface ThirdAndSecondAnimationProps {
    isShowBlockDoctors?: boolean;
    isShowBlockCards?: boolean;
    isTeamDescription?: boolean;
    cardsData?: CardsData;
    classNameTop?: string;
}

const defaultCardsData: CardsData = {
    leftColumn: [
        {
            image: "/card1.webp",
            title: "Изысканная среда обитания",
            number: "01",
            alt: "card",
        },
        {
            image: "/card3.webp",
            title: "Привилегированный сервис",
            number: "03",
            alt: "card",
        },
    ],
    rightColumn: [
        {
            image: "/card2.webp",
            title: "Умные операционные",
            number: "02",
            alt: "card",
        },
        {
            image: "/telishevsky.webp",
            title: "Безопасность",
            number: "04",
            alt: "card",
        },
    ],
};

const ThirdAndSecondAnimation = ({
    isShowBlockDoctors = true,
    isShowBlockCards = true,
    cardsData = defaultCardsData,
    isTeamDescription,
    classNameTop,
}: ThirdAndSecondAnimationProps) => {
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
            paused: true,
            onUpdate: function () {
                const currentProgress = this.progress();
                const directionUp = currentProgress > prevProgress;

                if (directionUp && currentProgress > 0.5 && !triggeredWhite) {
                    setHeaderColor("#000000");
                    triggeredWhite = true;
                    triggeredBlack = false;
                } else if (
                    !directionUp &&
                    currentProgress < 0.5 &&
                    !triggeredBlack
                ) {
                    setHeaderColor("#ffffff");
                    triggeredBlack = true;
                    triggeredWhite = false;
                }

                prevProgress = currentProgress;
            },
        });

        const mm = gsap.matchMedia();

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
                },
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
                },
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
                    start: "top bottom",
                    end: "top+=200 top",
                    scrub: true,
                },
            },
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
                    start: "top bottom",
                    end: "top+=200 top",
                    scrub: true,
                },
            },
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
            },
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
            },
        );

        gsap.fromTo(
            ".bgpattern1",
            { xPercent: 0 },
            {
                xPercent: 130,
                duration: 1,
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "top bottom",
                    end: "top+=100 top",
                    scrub: true,
                },
            },
        );

        gsap.fromTo(
            ".bgpattern2",
            { xPercent: 0 },
            {
                xPercent: -130,
                duration: 10,
                scrollTrigger: {
                    trigger: strokeContainerRef.current,
                    start: "top bottom",
                    end: "top+=100 top",
                    scrub: true,
                },
            },
        );

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
                        start: "bottom-=100 bottom",
                        end: "bottom+=775 bottom-=80",
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
                        start: "bottom-=100 bottom",
                        end: "bottom+=680 bottom-=80",
                        scrub: true,
                    },
                });

            if (windowHeight <= 799 && windowHeight >= 700)
                gsap.to(".runningstroke", {
                    y: "-100dvh",
                    ease: "none",
                    duration: 8,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom-=100 bottom",
                        end: "bottom+=530 bottom-=80",
                        scrub: true,
                    },
                });

            if (windowHeight <= 699 && windowHeight >= 600)
                gsap.to(".runningstroke", {
                    y: "-100dvh",
                    ease: "none",
                    duration: 8,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom-=100 bottom",
                        end: "bottom+=520 bottom-=80",
                        scrub: true,
                    },
                });

            if (windowHeight <= 599 && windowHeight >= 500)
                gsap.to(".runningstroke", {
                    y: "-100dvh",
                    ease: "none",
                    duration: 8,
                    scrollTrigger: {
                        trigger: strokeContainerRef.current,
                        start: "bottom-=100 bottom",
                        end: "bottom+=400 bottom-=80",
                        scrub: true,
                    },
                });
        });
    });

    const { registerField } = useContentContext();

    useEffect(() => {
        registerField("facility-01-image", "/card1.webp", "image");
        registerField("facility-01-title", "Изысканная среда обитания", "text");
        registerField("facility-01-number", "01", "text");
        registerField("facility-02-image", "/card2.webp", "image");
        registerField("facility-02-title", "Умные операционные", "text");
        registerField("facility-02-number", "02", "text");
        registerField("facility-03-image", "/card3.webp", "image");
        registerField("facility-03-title", "Привилегированный сервис", "text");
        registerField("facility-03-number", "03", "text");
        registerField("facility-04-image", "/telishevsky.webp", "image");
        registerField("facility-04-title", "Безопасность", "text");
        registerField("facility-04-number", "04", "text");
    }, [registerField]);

    const renderCard = (
        card: CardItem,
        index: number,
        column: "left" | "right",
    ) => {
        const num = card.number;

        return (
            <div key={`${column}-${index}`}>
                <div>
                    <EditableImage
                        id={`facility-${num}-image`}
                        fallback={card.image}
                        alt={card.alt || "card"}
                        width={776}
                        height={436}
                        className="aspect-[776/436]"
                    />
                </div>
                <div className="flex justify-between pt-4 2xl:pt-6 text-[16px] 2xl:text-[24px] leading-[130%]">
                    <EditableText
                        id={`facility-${num}-title`}
                        fallback={card.title}
                        tag="span"
                        className="uppercase"
                    />
                    <EditableText
                        id={`facility-${num}-number`}
                        fallback={card.number}
                        tag="span"
                        className="text-[#1D1D1D80]"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="relative" ref={containerRef}>
            <div
                style={{
                    display: isShowBlockDoctors ? "block" : "none",
                }}
            >
                <ThirdAnimationBlock isTeamDescription={isTeamDescription} />
            </div>
            <div
                style={{
                    display: isShowBlockCards ? "block" : "none",
                }}
                className="min-h-dvh pt-[0px] relative"
                ref={strokeContainerRef}
            >
                <div
                    className="h-[100px] 2xl:h-[500px]"
                    style={{
                        display: isShowBlockDoctors ? "block" : "none",
                    }}
                />
                <div
                    id="facilities"
                    className="flex flex-col md:flex-row justify-center px-4 md:px-[64px] xl:px-[80px] 2xl:px-[120px] md:gap-[105px] xl:gap-[80px] 2xl:gap-[128px]"
                >
                    <div className="flex flex-col gap-[32px] sm:gap-[120px] md:gap-[160px] 2xl:gap-[260px]">
                        {cardsData.leftColumn.map((card, index) =>
                            renderCard(card, index, "left"),
                        )}
                    </div>

                    <div className="pt-[32px] md:pt-56 flex flex-col gap-[32px] sm:gap-[120px] md:gap-[160px] 2xl:gap-[260px]">
                        {cardsData.rightColumn.map((card, index) =>
                            renderCard(card, index, "right"),
                        )}
                    </div>
                </div>

                <div className={`h-[200px] xl:h-[10dvh] ${classNameTop} `} />
            </div>
        </div>
    );
};

export default ThirdAndSecondAnimation;
