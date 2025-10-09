import { useState } from "react";
import Clocks from "./Clocks";

const AnimationBlock = () => {
    const [minuteAngle] = useState(0);
    const [hourAngle] = useState(0);

    return (
        <div className="bg-[#1D1D1D] h-dvh w-full relative oveflow-hidden">
            <div className=" w-1/2 h-full relative">
                <div className="bg-white w-full h-full rounded-full blur-[110px] aspect-square"></div>
                <Clocks
                    minuteAngle={minuteAngle}
                    hourAngle={hourAngle}
                    className="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <img
                src="/reabilitation/reabilitation.webp"
                className="absolute -bottom-40 left-[5%]"
                width={770}
            />
            <div className="marquee text-white flex pointer-events-none whitespace-nowrap text-[64px] md:text-[96px] 2xl:text-[130px] mix-blend-difference absolute bottom-0 left-0 w-full">
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
                <span className="px-8">РЕАБИЛИТАЦИЯ</span>
            </div>
            <p className="text-lg text-white absolute right-0 top-0 h-full flex flex-col justify-center uppercase max-w-[720px] px-[110px]">
                <span className="font-bold">
                    Быстрая и комфортная реабилитация
                </span>{" "}
                пациента в Клинике-резиденции RAMICLINIC RESIDENCE начинается
                задолго до операционного вмешательства. Она включает в себя
                коррекцию гормонального статуса, устранение дефицитов и,
                конечно, полномасштабную подготовку кожи на инновационном
                отделении косметологии.
            </p>
        </div>
    );
};

export default AnimationBlock;
