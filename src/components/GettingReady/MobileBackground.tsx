import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useBackground } from "./BackgroundContext";

const states = [
    // State 0: для первого текста (initial)
    {
        bg: { height: "85%", left: "20%", top: "40%" },
        sub: { height: "85%", left: "21%", top: "50%", opacity: 0 },
        ball: {
            height: "100px",
            width: "100px",
            left: "46%",
            top: "10%",
            opacity: 0,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 1: для второго текста
    {
        bg: { height: "170%", left: "15%", top: "75%" },
        sub: { height: "170%", left: "16%", top: "85%", opacity: 1 },
        ball: {
            height: "100px",
            width: "100px",
            left: "46%",
            top: "10%",
            opacity: 1,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 2: для третьего текста
    {
        bg: { height: "170%", left: "15%", top: "70%" },
        sub: { height: "170%", left: "16%", top: "80%", opacity: 1 },
        ball: {
            height: "100px",
            width: "100px",
            left: "85%",
            top: "23%",
            opacity: 1,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 3: для четвёртого текста
    {
        bg: { height: "170%", left: "15%", top: "58%" },
        sub: { height: "170%", left: "16%", top: "68%", opacity: 1 },
        ball: {
            height: "100px",
            width: "100px",
            left: "51%",
            top: "36%",
            opacity: 1,
            borderRadius: "50%",
            blur: 27,
            rotation: 0,
        },
    },
    // State 4: для пятого текста
    {
        bg: { height: "220%", left: "3%", top: "53%" },
        sub: { height: "220%", left: "4%", top: "53%", opacity: 1 },
        ball: {
            height: "200px",
            width: "80px",
            left: "55%",
            top: "39%",
            opacity: 1,
            borderRadius: "50%",
            blur: 250,
            rotation: 3,
        },
    },
    // State 5: для шестого текста
    {
        bg: { height: "220%", left: "3%", top: "43%" },
        sub: { height: "220%", left: "4%", top: "43%", opacity: 1 },
        ball: {
            height: "400px",
            width: "80px",
            left: "49%",
            top: "45%",
            opacity: 1,
            borderRadius: "50%",
            blur: 250,
            rotation: 12,
        },
    },
    // State 6: для седьмого текста
    {
        bg: { height: "220%", left: "3%", top: "22%" },
        sub: { height: "220%", left: "4%", top: "22%", opacity: 1 },
        ball: {
            height: "250px",
            width: "80px",
            left: "45%",
            top: "58%",
            opacity: 1,
            borderRadius: "50%",
            blur: 250,
            rotation: 5,
        },
    },
    // State 7: для восьмого текста
    {
        bg: { height: "220%", left: "3%", top: "-10%" },
        sub: { height: "220%", left: "4%", top: "-10%", opacity: 1 },
        ball: {
            height: "400px",
            width: "80px",
            left: "40%",
            top: "65%",
            opacity: 1,
            borderRadius: "50%",
            blur: 300,
            rotation: 5,
        },
    },
    // State 8: для девятого текста
    {
        bg: { height: "260%", left: "11%", top: "-30%" },
        sub: { height: "260%", left: "12%", top: "-30%", opacity: 1 },
        ball: {
            height: "400px",
            width: "80px",
            left: "38%",
            top: "75%",
            opacity: 1,
            borderRadius: "50%",
            blur: 300,
            rotation: 13,
        },
    },
    // State 9: для десятого текста (возврат к initial-like)
    {
        bg: { height: "85%", left: "20%", top: "50%" },
        sub: { height: "85%", left: "21%", top: "50%", opacity: 0 },
        ball: {
            height: "400px",
            width: "80px",
            left: "38%",
            top: "75%",
            opacity: 0,
            borderRadius: "50%",
            blur: 300,
            rotation: 13,
        },
    },
];

const MobileBackground = () => {
    const { currentState } = useBackground(); // Получаем из контекста
    const bgRef = useRef(null);
    const substractRef = useRef(null);
    const ballRef = useRef(null);

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
        <div className="fixed md:hidden inset-0">
            <img
                src="/getting-ready/bg2.png"
                className="absolute top-1/2 opacity-0 h-[85%] left-[21%] blur-[27.2784px] -translate-y-1/2 object-contain"
                ref={substractRef}
            />
            <div
                className="absolute w-fit top-1/2 h-[85%] left-[20%] -translate-y-1/2"
                ref={bgRef}
            >
                <div className="relative h-full">
                    <div
                        ref={ballRef}
                        className="bg-[#691C32] w-[100px] h-[100px] opacity-0 rounded-full blur-[27px] top-[10%] left-[46%] absolute -z-10"
                    ></div>
                    <img
                        src="/getting-ready/bg1.png"
                        className="h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default MobileBackground;
