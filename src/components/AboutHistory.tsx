import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { CardAboutHistory } from "./CardAboutHistory";

gsap.registerPlugin(ScrollTrigger);

const historyData = [
    {
        id: 1,
        year: "1997",
        image: "about/cards/1.jpg",
        description: [
            "На Гончарной улице в Санкт-Петербурге открылась Клиника РАМИ — первая частная многопрофильная клиника в городе и одна из первых в России.",
            "История компании началась с частного гинекологического кабинета, который вскоре был дополнен новыми направлениями - урологией и ультразвуковой диагностикой и перебрался в особняк на Кирочной",
        ],
    },
    {
        id: 2,
        year: "1999",
        image: "about/cards/2.jpg",
        description: [
            "Переезд основного филиала Клиники на Кирочную, 13 – в особняк XIX века",
        ],
    },
    {
        id: 3,
        year: "1999",
        image: "about/cards/3.jpg",
        description: [
            "Открытие направления пластической хирургии на Кирочной, 13.",
        ],
    },
    {
        id: 4,
        year: "2008",
        image: "about/cards/4.jpg",
        description: ["Клиника стоматологии РАМИ на Гончарной улице"],
    },
    {
        id: 5,
        year: "2022",
        image: "about/cards/5.jpg",
        description: [
            "Многопрофильная клиника РАМИ  торжественно отметила 25-летний юбилей. К этому времени прием на Кирочной ведут 150 специалистов более 60 медицинских направлений, проводится более 2000 операций в год",
        ],
    },
    {
        id: 6,
        year: "2025",
        image: "about/cards/6.jpg",
        description: [
            "В привилегированной локации Крестовского острова открылась Клиника-резиденция пластической хирургии и косметологии RAMICLINIC RESIDENCE",
        ],
    },
];

export const AboutHistory = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
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
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen min-h-screen overflow-hidden"
        >
            <div className="absolute inset-0 w-full h-full bg-[url('about/2.jpg')] bg-no-repeat bg-cover bg-[20rem_-17rem] scale-[2]" />

            <div className="absolute top-1/2 left-1/2 -translate-1/2 w-[1187px] h-[1187px] rounded-full border-2 border-[#EAE6E04D]" />

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
