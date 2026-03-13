import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface SafetyCard {
    title: string;
    text?: string;
    image: string;
}

interface InfoSafetyNewProps {
    cards?: SafetyCard[];
    className?: string;
    overlayGradient?: string;
}

const defaultCards: SafetyCard[] = [
    {
        title: "МЕДИЦИНСКАЯ\nБЕЗОПАСНОСТЬ",
        text: `В RAMICLINIC RESIDENCE обеспечивается самое строгое соблюдение медицинских протоколов и технологических требований для бесперебойного функционирования всего клинического комплекса. Это создает максимальный уровень безопасности для пациентов и медицинского персонала.`,
        image: "/safety-screen/info/1.webp",
    },
    {
        title: "ФИЗИЧЕСКАЯ\nБЕЗОПАСНОСТЬ",
        text: `Сбалансированный комплекс мер и процессов, предназначенных для защиты информации от несанкционированного доступа, искажения, уничтожения или раскрытия. Обеспечивает соответствие требованиям законов о защите персональных данных РФ и других нормативных актов.`,
        image: "/safety-screen/info/2.webp",
    },
    {
        title: "ИНФОРМАЦИОННАЯ\nБЕЗОПАСНОСТЬ",
        text: `В RAMICLINIC RESIDENCE обеспечивается самое строгое соблюдение медицинских протоколов и технологических требований для бесперебойного функционирования всего клинического комплекса. Это создает максимальный уровень безопасности для пациентов и медицинского персонала.`,
        image: "/safety-screen/info/3.webp",
    },
];

const defaultGradient =
    "linear-gradient(180deg, rgba(29, 29, 29, 0.54) 0%, rgba(29, 29, 29, 0) 100%)";

export const InfoSafetyNew = ({
    cards = defaultCards,
    className = "",
    overlayGradient = defaultGradient,
}: InfoSafetyNewProps) => {
    const sectionRef = useRef(null);
    const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=240%",
                    pin: true,
                    scrub: 1.5,
                });

                gsap.fromTo(
                    cardsRef.current,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.6,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top top+=120",
                            end: "bottom top",
                            scrub: 1.5,
                        },
                    },
                );
            }, sectionRef);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`w-full min-h-[80vh] md:min-h-screen 2xl:min-h-[105vh] bg-[#1D1D1D] flex items-center pt-0 md:pt-24 ${className}`}
        >
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 xl:p-10 2xl:p-[56px] ">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) {
                                cardsRef.current[i] = el;
                            }
                        }}
                        className="relative w-full h-full bg-cover bg-center py-6 md:py-8 px-4 md:px-6 overflow-hidden min-h-[200px] md:min-h-[600px]"
                        style={{ backgroundImage: `url(${card.image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(29,29,29,0.5)] to-[rgba(29,29,29,0.3)]" />

                        <div className="relative z-10">
                            <h2 className="text-[18px] md:text-2xl xl:text-[28px] 2xl:text-[32px] font-normal text-[#EAE6E0] uppercase leading-[125%] whitespace-pre-line">
                                {card.title}
                            </h2>
                            {card.text && (
                                <p className="text-xs xl:text-sm 2xl:text-base font-medium uppercase text-[#EAE6E0] mt-6 xl:mt-8 max-w-[400px] md:max-w-full">
                                    {card.text}
                                </p>
                            )}
                        </div>

                        <div className="absolute bottom-0 2x:-bottom-4 right-4 md:right-6 z-10 pointer-events-none">
                            <h1 className="text-[40px]/[125%] sm:text-[60px]/[125%] lg:text-7xl/[125%] xl:text-[110px]/[125%] font-normal text-[#EAE6E0]">
                                {String(i + 1).padStart(2, "0")}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
