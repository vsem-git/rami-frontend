import { useRef } from "react";
import { APARTMENTS } from "../../../../shared/data/apartments";
import { useApartmentsAnimation } from "./animations/useApartmentsAnimation";

export const WelcomeApartments: React.FC = () => {
    const sectionRef = useRef<HTMLElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const defaultContentRef = useRef<HTMLDivElement | null>(null);
    const doctorContentRef = useRef<HTMLDivElement | null>(null);

    useApartmentsAnimation(
        sectionRef,
        backgroundRef,
        defaultContentRef,
        doctorContentRef,
    );

    return (
        <section
            ref={sectionRef}
            className="relative h-auto md:h-screen overflow-hidden"
            aria-label="Приветствие и информация о докторе"
        >
            <div
                aria-label="Фоновое изображение"
                className="w-full h-[370px] md:h-auto"
            >
                <div
                    ref={backgroundRef}
                    className="relative w-full h-full md:absolute inset-0 bg-cover bg-center bg-[url('/apartments-screen/bg.webp')] flex items-end justify-center"
                    style={{ backgroundPosition: "50% 8%" }}
                    role="img"
                >
                    <div
                        className="block md:hidden w-[299px] h-[299px] bg-cover bg-center bg-[url('/doctor-screen/serb1.webp')]"
                        style={{ backgroundPosition: "50% 10%" }}
                        aria-hidden="true"
                    />
                </div>
            </div>

            <div
                className="absolute inset-0 z-10 hidden md:block"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.5) 50%, rgba(29, 29, 29, 0.5) 100%)",
                }}
                aria-hidden="true"
            />

            <div
                ref={defaultContentRef}
                className="relative z-20 min-h-auto md:min-h-screen flex flex-col justify-end text-[#1D1D1D] md:text-white px-5"
            >
                <h1 className="text-2xl/[125%] sm:text-3xl/[125%] md:text-5xl/[125%] xl:text-7xl/[125%] 2xl:text-[88px]/[114%] font-normal uppercase">
                    МЕДИЦИНСКИЕ АПАРТАМЕНТЫ
                </h1>
            </div>

            <div
                ref={doctorContentRef}
                className="relative md:absolute inset-0 z-30 flex items-center justify-center p-6 xl:p-10 mt-10 md:mt-0"
            >
                <div className="w-full flex justify-start md:justify-end">
                    {APARTMENTS[0].content}
                </div>
            </div>
        </section>
    );
};
