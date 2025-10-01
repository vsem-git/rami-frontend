import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Hair from "../Lines/Hair";
import Correction from "../Lines/Correction";
import Plastic from "../Lines/Plastic";
import Grud from "../Lines/Grud";
import Intim from "../Lines/Intim";
import Body from "../Lines/Body";

const AnimationBlock = () => {
    const containerRef = useRef(null);
    const runningStroke = useRef(null);
    const imageRef = useRef(null);
    const firstText = useRef(null);
    const secondText = useRef(null);
    const thirdText = useRef(null);
    const fourthText = useRef(null);

    useGSAP(() => {
        gsap.set(
            [
                firstText.current,
                secondText.current,
                thirdText.current,
                fourthText.current,
            ],
            {
                opacity: 0,
                filter: "blur(10px)",
            }
        );

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1000%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: true,
            },
        });

        tl.fromTo(
            firstText.current,
            {
                opacity: 0,
                duration: 1,
                ease: "none",
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "none",
            }
        );

        tl.to({}, { duration: 1, ease: "none" });

        tl.fromTo(
            runningStroke.current,
            {
                y: "0%",
                opacity: 1,
            },
            {
                y: "-100%",
                opacity: 0,
                duration: 1,
                ease: "none",
            }
        )
            .to(
                imageRef.current,
                {
                    height: "145%",
                    duration: 2,
                    ease: "none",
                },
                "<"
            )
            .fromTo(
                firstText.current,
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                    y: -20,
                    duration: 1,
                    ease: "none",
                },
                "<"
            );

        tl.fromTo(
            secondText.current,
            {
                opacity: 0,
                ease: "none",
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                filter: "blur(0px)",
                ease: "none",
            }
        );

        tl.to({}, { duration: 2, ease: "none" });

        tl.fromTo(
            secondText.current,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "none",
            }
        );

        tl.fromTo(
            thirdText.current,
            {
                opacity: 0,
                ease: "none",
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                filter: "blur(0px)",
                ease: "none",
            }
        );

        tl.to({}, { duration: 2, ease: "none" });

        tl.fromTo(
            thirdText.current,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "none",
            }
        );

        tl.fromTo(
            fourthText.current,
            {
                opacity: 0,
                ease: "none",
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                filter: "blur(0px)",
                ease: "none",
            }
        );

        tl.to({}, { duration: 2, ease: "none" });

        tl.fromTo(
            fourthText.current,
            {
                opacity: 1,
            },
            {
                opacity: 0,
                y: -20,
                duration: 1,
                ease: "none",
            }
        );
    });

    return (
        <div
            ref={containerRef}
            className="overflow-hidden relative min-h-dvh text-white  bg-[#080808] before:z-[-1] before:absolute before:h-dvh before:bottom-0 before:left-20 before:w-[calc(90%)] "
        >
            <div className="absolute inset-0">
                <Hair className="absolute bottom-[540px] left-[455px]" />
            </div>
            <div className="absolute z-[-1] h-dvh w-full bg-[#080808]">
                <img
                    src="/plasticbg.jpg"
                    className="absolute bottom-0 left-0 aspect-[4096/2777] h-[120%] object-cover object-bottom"
                    alt=""
                    ref={imageRef}
                />
            </div>
            <div
                className="absolute top-[132px] left-0 w-full overflow-hidden"
                ref={runningStroke}
            >
                <div className="marquee flex whitespace-nowrap text-[130px] mix-blend-difference">
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                    <span className="px-8">ПЛАСТИЧЕСКАЯ ХИРУРГИЯ</span>
                </div>
            </div>
            <div
                ref={firstText}
                className="absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col gap-4 p-[115px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="mt-30">
                    Пластический хирург – как скульптор – кончиками пальцев,
                    умом и сердцем – творит новый образ пациента, восстанавливая
                    гармонию между внешним и внутренним возрастом человека.
                </p>

                <p>
                    Мы не только продлеваем молодость, но и меняем качество
                    жизни, давая возможность ежедневно наслаждаться собственным
                    преображением, ощущением свободы и обретением духовной силы.
                </p>
            </div>
            <div
                ref={secondText}
                className="absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col p-[80px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <div className="mb-10 text-[21px]">
                    Команде пластических хирургов RAMICLINIC RESIDENCE –
                    мастеров мирового уровня – под силу{" "}
                    <span className="font-bold">
                        все операции на самом сложном уровне
                    </span>
                    :
                </div>
                <div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            01
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Реконструктивные операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            02
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Эстетические операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            03
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Онкопластические операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            04
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Повторные операции
                        </div>
                    </div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            05
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Мужская пластика
                        </div>
                    </div>
                </div>
            </div>
            <div
                ref={thirdText}
                className="absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col gap-4 p-[110px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-[36px] mb-6">Наш подход</p>
                <p>
                    Мы не только продлеваем молодость, но и{" "}
                    <span className="font-bold">меняем качество жизни</span>,
                    давая возможность ежедневно наслаждаться собственным
                    преображением, ощущением свободы и обретением духовной силы.
                </p>
            </div>
            <div
                ref={fourthText}
                className="absolute scale-50 opacity-0 h-full right-0 z-10 flex flex-col p-[110px] text-lg uppercase justify-center w-full lg:max-w-[420px] xl:max-w-[560px] 2xl:max-w-[800px]"
            >
                <p className="text-[36px] mb-10">
                    Преимущества пациент-центрированного подхода:
                </p>
                <div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            01
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Реконструктивные операции
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            02
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Антиэйдж-сопровождение
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center">
                        <div className="aspect-square bg-[#FFFFFF1A] flex justify-center items-center rounded-full">
                            03
                        </div>
                        <div className="text-lg font-medium uppercase">
                            Персонализированная «дорожная карта
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-[48px_1fr] gap-6 items-center mb-4">
                        <div className="aspect-square flex justify-center items-center rounded-full"></div>
                        <div className="text-lg uppercase text-[#FFFFFF99]">
                            С логистикой всех этапов эстетического преображения:
                            от подготовки к операции до предсказуемых сценариев
                            реабилитационной программы.
                        </div>
                    </div>
                </div>
            </div>
            {/* <Hair className="absolute hairplastic" />
            <Correction className="absolute correctionplastic" />
            <Plastic className="absolute plasticplastic" />
            <Grud className="absolute grudplastic" />
            <Intim className="absolute intimplastic" />
            <Body className="absolute bodyplastic" /> */}
        </div>
    );
};

export default AnimationBlock;
