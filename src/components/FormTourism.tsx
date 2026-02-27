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

    return (
        <div
            ref={containerRef}
            className="w-full h-screen min-h-screen flex items-center bg-[#691C32]"
        >
            <img
                src="tourism/10.webp"
                alt=""
                className="w-1/2 h-full object-cover grayscale"
            />

            <div className="w-1/2 max-w-[640px] mx-auto">
                <h1 className="text-[44px] text-white leading-[125%] uppercase">
                    Начните путь к результату уже сегодня
                </h1>
                <p className="text-lg text-[#FFFFFFBF] uppercase leading-[155%] mt-6 max-w-[560px]">
                    Оставьте заявку, и наш координатор свяжется с вами для
                    конфиденциальной консультации.
                </p>

                <form className="mt-10">
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

                    <div className="mt-10">
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
