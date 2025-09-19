import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useHeader } from "../HeaderContext";

gsap.registerPlugin(ScrollTrigger);

const FirstAnimationBlock = () => {
    const { setHeaderColor } = useHeader();
    const containerRef = useRef(null);
    const block1Ref = useRef(null);
    const block2Ref = useRef(null);
    const block1LogoRef = useRef(null);
    const block2ContendRef = useRef(null);

    useGSAP(() => {
        gsap.set(block2Ref.current, { y: "100%" });
        gsap.set(block2ContendRef.current, { autoAlpha: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%",
                scrub: true,
                pin: true,
            },
        });

        gsap.to(block1LogoRef.current, {
            rotation: 360, // Поворот на 360 градусов
            ease: "linear", // Линейная анимация для равномерного вращения
            scrollTrigger: {
                trigger: containerRef.current, // Элемент, который запускает анимацию
                start: "top bottom", // Начало анимации, когда верх блока в 80% окна
                end: "+=500%", // Конец анимации, когда низ блока в 20% окна
                scrub: true, // Анимация синхронизируется с прокруткой
            },
        });

        tl.to(block2Ref.current, {
            y: "0%",
            duration: 1,
            ease: "power2.inOut",
        });

        tl.call(() => {
            setHeaderColor("#000000");
        })
            .call(() => {
                setHeaderColor("#ffffff");
            })
            .to(block2ContendRef.current, {
                autoAlpha: 1,
                duration: 0.1,
                ease: "power2.inOut",
            })
            .call(() => {
                setHeaderColor("#ffffff");
            });

        tl.to(
            {},
            {
                duration: 1,
            }
        ).call(() => {
            setHeaderColor("#000000");
        });
    }, []);
    return (
        <div className="h-dvh relative" ref={containerRef}>
            <div
                className="absolute top-0 px-10 left-0 w-full h-full bg-white bg-cover bg-center flex justify-center items-center z-0"
                ref={block1Ref}
            >
                <img ref={block1LogoRef} src="/rotateicon.svg" alt="icon" />
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/animationblock2.webp')] bg-cover bg-center flex justify-between items-end z-50"
                ref={block2Ref}
            >
                <div
                    className="relative h-full w-full flex flex-col justify-center md:grid grid-cols-3 bg-[#1D1D1D1A]"
                    ref={block2ContendRef}
                >
                    <div className="max-h-[120px] h-full md:h-auto md:max-h-full relative flex flex-row-reverse md:flex-col justify-between md:justify-end items-center border-b border-r-0 md:border-r border-[#FFFFFF33] group px-4 md:px-0">
                        <div className="bg-[#FFFFFF26] backdrop-blur-[50px] p-4 md:p-8 rounded-full md:mb-10">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2.5V8M8 13.5V8M8 8H13.5H2.5"
                                    stroke="white"
                                    stroke-width="1.5"
                                />
                            </svg>
                        </div>
                        <p className="uppercase font-light text-white text-[16px] md:text-[20px] 2xl:text-[28px] md:text-center md:mb-10 md:px-20">
                            эталонная пластическая хирургия
                        </p>
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-1000 inset-0 backdrop-blur-[40px] bg-[#1D1D1D4D] flex flex-col justify-center items-center md:p-20 text-center">
                            <p className="text-[16px] md:text-[20px] 2xl:text-[28px] uppercase mb-6 leading-[130%] text-white font-light">
                                Эталонная пластическая хирургия
                            </p>
                            <p className="mb-12 text-[#FFFFFF99] leading-[155%] uppercase font-extralight">
                                RAMICLINIC RESIDENCE гордится экспертной
                                командой врачей, опирающихся на международную
                                практику и возрастающий авторитет русской школы
                                пластической хирургии с уникальным эстетическим
                                почерком.
                            </p>
                            <button className="text-[#691C32] bg-white font-semibold px-8 py-5 uppercase cursor-pointer">
                                Запланировать визит
                            </button>
                        </div>
                    </div>
                    <div className="max-h-[120px] h-full md:h-auto md:max-h-full relative flex flex-row-reverse md:flex-col justify-between md:justify-end items-center border-b border-r-0 md:border-r border-[#FFFFFF33] group px-4 md:px-0">
                        <div className="bg-[#FFFFFF26] backdrop-blur-[50px] p-4 md:p-8 rounded-full md:mb-10">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2.5V8M8 13.5V8M8 8H13.5H2.5"
                                    stroke="white"
                                    stroke-width="1.5"
                                />
                            </svg>
                        </div>
                        <p className="uppercase font-light text-white text-[16px] md:text-[20px] 2xl:text-[28px] md:text-center md:mb-10 md:px-20">
                            инновационная косметология
                        </p>
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-1000 top-0 left-0 inset-0 backdrop-blur-[40px] bg-[#1D1D1D4D] flex flex-col justify-center items-center md:p-20 text-center">
                            <p className="text-[16px] md:text-[20px] 2xl:text-[28px] uppercase mb-6 leading-[130%] text-white font-light">
                                инновационная косметология
                            </p>
                            <p className="mb-12 text-[#FFFFFF99] leading-[155%] uppercase font-extralight">
                                RAMICLINIC RESIDENCE гордится экспертной
                                командой врачей, опирающихся на международную
                                практику и возрастающий авторитет русской школы
                                пластической хирургии с уникальным эстетическим
                                почерком.
                            </p>
                            <button className="text-[#691C32] bg-white font-semibold px-8 py-5 uppercase cursor-pointer">
                                Запланировать визит
                            </button>
                        </div>
                    </div>
                    <div className="max-h-[120px] h-full md:h-auto md:max-h-full relative flex flex-row-reverse md:flex-col justify-between md:justify-end items-center border-b border-r-0 md:border-r border-[#FFFFFF33] group px-4 md:px-0">
                        <div className="bg-[#FFFFFF26] backdrop-blur-[50px] p-4 md:p-8 rounded-full md:mb-10">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 2.5V8M8 13.5V8M8 8H13.5H2.5"
                                    stroke="white"
                                    stroke-width="1.5"
                                />
                            </svg>
                        </div>
                        <p className="uppercase font-light text-white text-[16px] md:text-[20px] 2xl:text-[28px] md:text-center md:mb-10 md:px-20">
                            реабилитация
                        </p>
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-1000 top-0 left-0 inset-0 backdrop-blur-[40px] bg-[#1D1D1D4D] flex flex-col justify-center items-center md:p-20 text-center">
                            <p className="text-[16px] md:text-[20px] 2xl:text-[28px] uppercase mb-6 leading-[130%] text-white font-light">
                                реабилитация
                            </p>
                            <p className="mb-12 text-[#FFFFFF99] leading-[155%] uppercase font-extralight">
                                RAMICLINIC RESIDENCE гордится экспертной
                                командой врачей, опирающихся на международную
                                практику и возрастающий авторитет русской школы
                                пластической хирургии с уникальным эстетическим
                                почерком.
                            </p>
                            <button className="text-[#691C32] bg-white font-semibold px-8 py-5 uppercase cursor-pointer">
                                Запланировать визит
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstAnimationBlock;
