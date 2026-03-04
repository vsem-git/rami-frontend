import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { Input } from "./ui/Input";

gsap.registerPlugin(ScrollTrigger);

export const FormTourism = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const isDesktop = window.innerWidth > 768;

        if (!isDesktop) return;

        const animation = gsap.to(containerRef.current, {
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

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full min-h-[105vh] h-auto md:h-screen md:min-h-screen flex flex-col md:flex-row items-center bg-[#691C32] mb-10"
        >
            <img
                src="tourism/10.webp"
                alt=""
                className="w-full md:w-[256px] lg:w-1/2 h-[350px] md:h-full object-cover grayscale object-[0_60%] md:object-center"
            />

            <div className="w-full lg:w-1/2 px-8 lg:px-15 2xl:px-[160px] py-10">
                <h1 className="text-[18px] sm:text-[24px] lg:text-[32px] xl:text-[44px] text-white leading-[125%] uppercase max-w-[500px] md:max-w-[600px] lg:max-w-[400px] 2xl:max-w-full">
                    Начните путь к результату уже сегодня
                </h1>
                <p className="text-xs xl:text-lg text-[#FFFFFFBF] uppercase leading-[155%] mt-4 sm:mt-6 max-w-[560px]">
                    Оставьте заявку, и наш координатор свяжется с вами для
                    конфиденциальной консультации.
                </p>

                <form className="mt-5 xl:mt-10">
                    <Input
                        placeholder="Как вас зовут?*"
                        className="placeholder:uppercase"
                    />
                    <Input
                        placeholder="Телефон*"
                        className="placeholder:uppercase"
                    />
                    <Input
                        placeholder="Email*"
                        className="placeholder:uppercase"
                    />
                    <Input
                        placeholder="Что вас интересует?*"
                        className="placeholder:uppercase"
                    />

                    <div className="mt-1 sm:mt-5 xl:mt-10">
                        <ConsentCheckbox />
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-[148px] min-w-[148px] h-[56px] sm:h-[48px] flex items-center justify-center bg-white text-sm 2xl:text-base text-[#691C32] font-semibold uppercase cursor-pointer mt-6"
                    >
                        ОТПРАВИТЬ
                    </button>
                </form>
            </div>
        </div>
    );
};
