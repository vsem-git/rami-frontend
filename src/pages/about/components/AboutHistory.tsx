import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { CardAboutHistory } from "./CardAboutHistory";

gsap.registerPlugin(ScrollTrigger);

const historyData = [
    {
        id: 1,
        year: "1997",
        image: "about/cards/1.webp",
        description: [
            "На Гончарной улице в Санкт-Петербурге открылась Клиника РАМИ — первая частная многопрофильная клиника в городе и одна из первых в России.",
            "История компании началась с частного гинекологического кабинета, который вскоре был дополнен новыми направлениями - урологией и ультразвуковой диагностикой и перебрался в особняк на Кирочной",
        ],
    },
    {
        id: 2,
        year: "1999",
        image: "about/cards/2.webp",
        description: [
            "Переезд основного филиала Клиники на Кирочную, 13 – в особняк XIX века",
        ],
    },
    {
        id: 3,
        year: "1999",
        image: "about/cards/3.webp",
        description: [
            "Открытие направления пластической хирургии на Кирочной, 13.",
        ],
    },
    {
        id: 4,
        year: "2008",
        image: "about/cards/4.webp",
        description: ["Клиника стоматологии РАМИ на Гончарной улице"],
    },
    {
        id: 5,
        year: "2022",
        image: "about/cards/5.webp",
        description: [
            "Многопрофильная клиника РАМИ  торжественно отметила 25-летний юбилей. К этому времени прием на Кирочной ведут 150 специалистов более 60 медицинских направлений, проводится более 2000 операций в год",
        ],
    },
    {
        id: 6,
        year: "2025",
        image: "about/cards/6.webp",
        description: [
            "В привилегированной локации Крестовского острова открылась Клиника-резиденция пластической хирургии и косметологии RAMICLINIC RESIDENCE",
        ],
    },
];

const AUTOPLAY_INTERVAL = 3000;
const TOTAL = historyData.length;

const ArcIndicator = ({
    current,
    total,
    progress,
}: {
    current: number;
    total: number;
    progress: number;
}) => {
    const size = 80;
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const segmentFraction = 1 / total;
    const filled = (current - 1 + progress) * segmentFraction;
    const dashOffset = circumference * (1 - filled);

    return (
        <div className="relative flex items-center justify-center w-[80px] h-[80px] max-[500px]:w-[60px] max-[500px]:h-[60px]">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(234,230,224,0.2)"
                    strokeWidth={strokeWidth}
                />
            </svg>

            <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox={`0 0 ${size} ${size}`}
                style={{ transform: "rotate(-90deg)" }}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#EAE6E0"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                />
            </svg>

            <span className="relative z-10 text-2xl max-[500px]:text-xl text-[#EAE6E0]">
                {current}
            </span>
        </div>
    );
};

export const AboutHistory = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [slideProgress, setSlideProgress] = useState(0);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const prevIndexRef = useRef(0);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 600);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const animateTransition = (outIdx: number, inIdx: number) => {
        const cards = cardsRef.current;
        if (!cards[outIdx] || !cards[inIdx]) return;

        gsap.to(cards[outIdx], {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
        });
        gsap.fromTo(
            cards[inIdx],
            { y: 200, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        );
    };

    useEffect(() => {
        if (!isMobile) return;

        const cards = cardsRef.current;

        cards.forEach((card, i) => {
            if (i === 0) {
                gsap.set(card, { y: 0, opacity: 1 });
            } else {
                gsap.set(card, { y: 200, opacity: 0 });
            }
        });

        setActiveIndex(0);
        setSlideProgress(0);
        prevIndexRef.current = 0;

        const TICK = 50;
        const STEPS = AUTOPLAY_INTERVAL / TICK;

        let step = 0;

        progressRef.current = setInterval(() => {
            step += 1;
            setSlideProgress(step / STEPS);

            if (step >= STEPS) {
                step = 0;
                setActiveIndex((prev) => {
                    const next = (prev + 1) % TOTAL;
                    animateTransition(prev, next);
                    prevIndexRef.current = prev;
                    return next;
                });
                setSlideProgress(0);
            }
        }, TICK);

        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) return;

        const ctx = gsap.context(() => {
            const cards = cardsRef.current;

            gsap.set(cards[0], { y: 0, opacity: 1 });
            cards.slice(1).forEach((card) => {
                gsap.set(card, { y: 200, opacity: 0 });
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: `+=${cards.length * 80}%`,
                    pin: true,
                    scrub: 0.8,
                },
            });

            cards.forEach((card, i) => {
                if (i === 0) {
                    tl.to(card, {
                        opacity: 0,
                        duration: 0.4,
                        ease: "power1.out",
                    });
                } else {
                    tl.to(card, {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                    tl.to(card, {
                        opacity: 0,
                        duration: 0.4,
                        ease: "power1.out",
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen min-h-screen overflow-hidden"
        >
            <div className="absolute inset-0 w-full h-full bg-[url('/about/2.webp')] bg-no-repeat bg-cover bg-[25%_-28vw] md:bg-[20%_-15vw] lg:bg-[7vw_-15vw] xl:bg-[15vw_-12vw] 2xl:bg-[15vw_160%] scale-[2] md:scale-[1.6] lg:scale-[1.7] xl:scale-[2] max-[600px]:bg-[0%_-28vw]" />
            <div
                className="absolute inset-0 w-full h-full z-[1]"
                style={{ backgroundColor: "#1D1D1D1A" }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-1/2 w-[700px] md:w-[750px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1187px] h-[700px] md:h-[750px] lg:h-[900px] xl:h-[1000px] 2xl:h-[1187px] rounded-full border-2 border-[#EAE6E04D] max-[600px]:hidden" />

            <div className="relative z-10 items-center justify-between p-6 max-[600px]:flex hidden">
                <h4 className="max-[500px]:text-xs text-base text-[#EAE6E0] uppercase font-medium max-[500px]:max-w-[20px] leading-[20px]">
                    История компании
                </h4>

                <ArcIndicator
                    current={activeIndex + 1}
                    total={TOTAL}
                    progress={slideProgress}
                />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-1/2">
                {historyData.map((item, i) => (
                    <div
                        key={item.id}
                        ref={(el) => {
                            if (el) cardsRef.current[i] = el;
                        }}
                        className="absolute top-1/2 left-1/2 -translate-1/2"
                    >
                        <CardAboutHistory data={item} />
                    </div>
                ))}
            </div>
        </section>
    );
};
