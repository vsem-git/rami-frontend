import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useBackground } from "./BackgroundContext";

const states = [
    // State 0: для первого текста (initial)
    {
        bg: { height: "85%", left: "5%", top: "10%", scale: 1 },
        sub: { opacity: 0 },
        ball: {
            height: "100px",
            width: "100px",
            left: "36%",
            top: "5%",
            opacity: 0,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 1: для второго текста
    {
        bg: { top: "15%", scale: 1.25, left: "5%" },
        sub: { opacity: 1 },
        ball: {
            height: "100px",
            width: "100px",
            left: "32%",
            top: "8%",
            opacity: 1,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 2: для третьего текста
    {
        bg: { top: "5%", left: "5%" },
        ball: {
            height: "100px",
            width: "100px",
            left: "70%",
            top: "20%",
            opacity: 1,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 3: для четвёртого текста
    {
        bg: { top: "-5%", left: "5%" },
        ball: {
            height: "100px",
            width: "100px",
            left: "40%",
            top: "35%",
            opacity: 1,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 4: для пятого текста
    {
        bg: { top: "-15%", left: "10%", scale: 1.5 },
        ball: {
            height: "200px",
            width: "80px",
            left: "30%",
            top: "41%",
            opacity: 1,
            borderRadius: "50%",
            blur: 250,
            rotation: 3,
        },
    },
    // State 5: для шестого текста
    {
        bg: { top: "-25%", left: "10%" },
        ball: {
            height: "400px",
            width: "50px",
            left: "30%",
            top: "45%",
            opacity: 1,
            borderRadius: "50%",
            blur: 250,
            rotation: 12,
        },
    },
    // State 6: для седьмого текста
    {
        bg: { top: "-35%", left: "10%" },
        ball: {
            height: "250px",
            width: "40px",
            left: "35%",
            top: "58%",
            opacity: 1,
            borderRadius: "50%",
            blur: 250,
            rotation: 5,
        },
    },
    // State 7: для восьмого текста
    {
        bg: { top: "-45%", left: "10%" },
        ball: {
            height: "200px",
            width: "60px",
            left: "30%",
            top: "65%",
            opacity: 1,
            borderRadius: "50%",
            blur: 150,
            rotation: 5,
        },
    },
    // State 8: для девятого текста
    {
        bg: { top: "-55%", left: "15%", scale: 1.75 },
        sub: { opacity: 1 },
        ball: {
            height: "200px",
            width: "50px",
            left: "30%",
            top: "70%",
            opacity: 1,
            borderRadius: "50%",
            blur: 100,
            rotation: 13,
        },
    },
    // State 9: для десятого текста (возврат к initial-like)
    {
        bg: { top: "10%", left: "5%", scale: 1 },
        sub: { opacity: 0 },
        ball: {
            height: "400px",
            width: "80px",
            left: "38%",
            top: "75%",
            opacity: 0,
            borderRadius: "50%",
            blur: 150,
            rotation: 13,
        },
    },
];

const MobileBackground = () => {
    const { currentState } = useBackground(); // Получаем из контекста
    const bgRef = useRef(null);
    const ballRef = useRef(null);
    const substractRef = useRef(null);

    useEffect(() => {
        const state = states[currentState];
        gsap.to(bgRef.current, {
            ...state.bg,
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.to(substractRef.current, {
            ...state.sub,
            duration: 1,
            ease: "power2.inOut",
        });
        gsap.to(ballRef.current, {
            ...state.ball,
            duration: 1,
            ease: "power2.inOut",
        });
    }, [currentState]);

    return (
        <div
            className="absolute md:hidden w-fit h-[85%] left-[20%]"
            ref={bgRef}
        >
            <div className="relative h-full">
                <div
                    ref={ballRef}
                    className="bg-[#691C32] w-[100px] h-[100px] opacity-0 rounded-full blur-[27px] top-[10%] left-[46%] absolute -z-10 will-change-transform"
                ></div>

                <img
                    src="/getting-ready/bg2.png"
                    className="left-[12%] h-full opacity-0 blur-[27.2784px] object-contain will-change-transform"
                    ref={substractRef}
                />
                <img
                    src="/getting-ready/bg1.png"
                    className="absolute -ml-5 inset-0 h-full object-contain z-10 will-change-transform"
                />
            </div>
        </div>
    );
};

export default MobileBackground;
