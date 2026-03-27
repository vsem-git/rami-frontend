import VideoAnimation from "./components/VideoAnimation/VideoAnimation";
/* import FirstAnimationBlock from "./components/FirstAnimationBlock/FirstAnimationBlock"; */
import FourthAnimationBlock from "./components/FourthAnimationBlock/FourthAnimationBlock";
import RebornFirstAnimationBlock from "./components/RebornFirstAnimationBlock/RebornFirstAnimationBlock";
import ThirdBlock from "../../components/ThirdAnimationWrapper/ThirdBlock";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useHeader } from "../../components/HeaderContext";

// function toggleBypass() {
//     const key = "uc_bypass";
//     const on = localStorage.getItem(key) === "1";
//     if (on) localStorage.removeItem(key);
//     else localStorage.setItem(key, "1");
//     location.reload();
// }

const Home = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { setHeaderColor } = useHeader();

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            onEnter: () => setHeaderColor("#ffffff"),
            onLeave: () => setHeaderColor("#000000"),
            onEnterBack: () => setHeaderColor("#ffffff"),
            onLeaveBack: () => setHeaderColor("#000000"),
        });
    });

    return (
        <>
            <VideoAnimation />
            <RebornFirstAnimationBlock />
            {/* <SecondAnimationBlock /> */}
            <ThirdBlock />
            <div
                ref={sectionRef}
                className="mt-[100px] overflow-hidden relative min-h-dvh w-full flex justify-start items-start md:items-center  bg-[url('/2slide.webp')] bg-cover bg-center"
            >
                <div
                    className="absolute w-[600px] h-[600px] top-1/2 -translate-y-1/2 left-20 bg-[#1D1D1D]/50 blur-[5px] md:blur-[200px] hidden md:block"
                    style={{ willChange: "filter" }}
                />
                <div
                    className="absolute w-full md:w-[600px] h-[250px] md:h-[600px] right-0 md:-right-30 top-0 md:-top-40 bg-[#1D1D1D9D] blur-[80px] md:blur-[200px]"
                    style={{ willChange: "filter" }}
                />
                <p
                    className="text-white text-sm 2xl:text-[21px] ml-[24px] mt-[110px] sm:mt-[96px] md:ml-[120px] md:mt-0 xl:ml-[120px] 2xl:ml-[200px] max-w-[312px] sm:max-w-[288px] md:max-w-[360px] xl:max-w-[360px] 2xl:max-w-[560px] uppercase z-10"
                    style={{ willChange: "opacity" }}
                >
                    <span className="font-bold">Расположена</span> в живописной
                    и престижной локации Санкт-Петербурга – в дельте Невы, на
                    <span className="font-bold"> Крестовском острове</span>, в
                    историческом особняке, окруженном старинным парком
                </p>
            </div>
            <FourthAnimationBlock />
        </>
    );
};

export default Home;
