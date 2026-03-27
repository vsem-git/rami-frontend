import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useHeader } from "../../../../components/HeaderContext";

gsap.registerPlugin(ScrollTrigger);

const FirstAnimationBlock = () => {
    const { setHeaderColor } = useHeader();
    const containerRef = useRef(null);
    const block1Ref = useRef(null);
    const block2Ref = useRef(null);
    const block2TextRef = useRef(null);
    const block2LogoRef = useRef(null);
    const block3Ref = useRef(null);
    const block3BlurRef = useRef(null);
    const block3TextRef = useRef(null);
    const block4Ref = useRef(null);
    const block5Ref = useRef(null);
    const block6Ref = useRef(null);
    const block7Ref = useRef(null);
    const block8Ref = useRef(null);
    const block9Ref = useRef(null);

    useGSAP(() => {
        gsap.set(block2TextRef.current, { opacity: 0 });
        gsap.set(block3TextRef.current, { opacity: 0 });
        gsap.set(block3BlurRef.current, { opacity: 0 });
        gsap.set(block2LogoRef.current, { x: "-100%" });
        gsap.set(block5Ref.current, { opacity: 0 });
        gsap.set(block6Ref.current, { opacity: 0 });
        gsap.set(block4Ref.current, { y: "100%" });
        gsap.set(block9Ref.current, { y: "100%" });

        gsap.to(".firstblocktext", {
            autoAlpha: 1,
            duration: 1,
            scrollTrigger: {
                trigger: block1Ref.current,
                start: "top center",
                end: "bottom bottom",
                scrub: true,
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=800%", // Test shorter
                scrub: 1, // Smoother scrub
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: true,
            },
        });

        tl.to(
            {},
            {
                duration: 0.01,
                onStart: () => setHeaderColor("#000000"),
            }
        );

        tl.to(
            {},
            {
                duration: 0.01,
                onStart: () => setHeaderColor("#ffffff"),
            }
        );

        tl.to({}, { duration: 1 }).call(() => {
            setHeaderColor("#ffffff");
        });

        // Исчезновение первого блока
        tl.to([block1Ref.current, ".firstblocktext"], {
            opacity: 0,
            duration: 0.5,
        })
            .call(() => {
                setHeaderColor("#ffffff");
                /* console.log("Ставлю навбар"); */
                /* setNavbarColor(""); */
            })
            .call(() => {
                setHeaderColor("#000000");
                /* setNavbarColor("#ffffff"); */
            });

        // Появление второго блока (лого и текст) и установка черного цвета хедера
        tl.to(block2LogoRef.current, {
            x: "0%",
            duration: 1,
            ease: "power2.out",
        });

        tl.to(block2TextRef.current, {
            opacity: 1,
            duration: 1,
        });

        // Исчезновение второго блока
        tl.call(() => {
            /* setNavbarColor("#ffffff"); */
            setHeaderColor("#000000");
        })
            .call(() => {
                /* setNavbarColor(""); */
                setHeaderColor("#ffffff");
            })
            .to(block2Ref.current, {
                opacity: 0,
                duration: 1,
            });

        // Остальные анимации без изменений
        tl.to([block3TextRef.current, block3BlurRef.current], {
            opacity: 1,
            duration: 1,
        });

        tl.to(block4Ref.current, {
            y: "0%",
            duration: 1,
            ease: "power1.inOut",
        });

        tl.to(block3Ref.current, { opacity: 0, duration: 0 });

        tl.to(block5Ref.current, { opacity: 1, duration: 0 });

        tl.to(block6Ref.current, { opacity: 1, duration: 0 });

        tl.to(block4Ref.current, {
            x: "-100%",
            duration: 2,
            ease: "power2.in",
        });

        tl.to(block5Ref.current, {
            x: "-100%",
            duration: 2,
            ease: "power2.in",
        });

        tl.to(block6Ref.current, {
            x: "-100%",
            duration: 2,
            ease: "power3.in",
        });

        tl.to(block7Ref.current, {
            x: "-100%",
            duration: 2,
            ease: "power3.in",
        });

        tl.to(block9Ref.current, {
            y: "0%",
            duration: 2,
            ease: "power2.inOut",
        })
            .call(() => setHeaderColor("#ffffff"), [], "-=0.7")
            .call(() => setHeaderColor("#000000"), [], "-=0.5");
    });
    return (
        <div className="min-h-dvh relative overflow-hidden" ref={containerRef}>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/1slide.webp')] bg-cover bg-center z-50"
                ref={block1Ref}
            >
                <div className="relative h-full w-full flex justify-end items-end overflow-hidden">
                    <div className="absolute w-[600px] h-[600px] -bottom-0 -right-10 bg-[#1D1D1D9D] blur-[250px] hidden md:block" />
                    <div className="absolute w-full md:w-[600px] h-[200px] md:h-[600px] right-0 md:-right-20 -bottom-10 md:-top-30 bg-[#1D1D1D9D] blur-[20px] md:blur-[250px]" />
                </div>
            </div>
            <div
                className="absolute top-0 left-0 w-full min-h-full bg-white flex flex-col-reverse md:flex-row justify-between items-center md:items-end z-40"
                ref={block2Ref}
            >
                <img
                    src="/logo.svg"
                    alt="logo"
                    ref={block2LogoRef}
                    className=" max-w-[360px] sm:max-w-[400px] md:max-w-[570px] xl:max-w-[782px] 2xl:max-w-[1000px]"
                />
                <p
                    className="text-black mt-25 m-4 sm:m-10 sm:mt-25 uppercase text-[13px] md:text-sm 2xl:text-[21px] 2xl:max-w-[720px] md:max-w-[400px] sm:max-w-[400px] max-w-full"
                    ref={block2TextRef}
                >
                    <span className="mb-8 text-[20px] md:text-[24px] 2xl:text-[36px]">
                        RAMICLINIC RESIDENCE
                    </span>
                    <br />
                    <span className="whitespace-nowrap">
                        {" "}
                        клиника-резиденция
                    </span>{" "}
                    высокотехнологичной пластической хирургии и эстетической
                    косметологии для искушенных пациентов, склонных к
                    поддержанию индивидуальной красоты и внешней
                    привлекательности с гарантией эталонных стандартов
                    безопасности в медицине, полной анонимностью, сервисом и
                    приватностью, достойными первых лиц государств
                </p>
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/2slide.webp')] bg-cover bg-center z-30"
                ref={block3Ref}
            >
                <div className="relative h-full w-full flex justify-start items-start md:items-center">
                    <div className="absolute w-[600px] h-[600px] top-1/2 -translate-y-1/2 left-20 bg-[#1D1D1D]/50 blur-[250px] hidden md:block" />
                    <div className="absolute w-full md:w-[600px] h-[250px] md:h-[600px] right-0 md:-right-30 top-0 md:-top-40 bg-[#1D1D1D9D] blur-[80px] md:blur-[200px]" />
                    <p
                        className="text-white text-sm 2xl:text-[21px] ml-[24px] mt-[110px] sm:mt-[96px] md:ml-[120px] md:mt-0 xl:ml-[120px] 2xl:ml-[200px] max-w-[312px] sm:max-w-[288px] md:max-w-[360px] xl:max-w-[360px] 2xl:max-w-[560px] uppercase z-10"
                        ref={block3TextRef}
                    >
                        <span className="font-bold">Расположена</span> в
                        живописной и престижной локации Санкт-Петербурга – в
                        дельте Невы, на
                        <span className="font-bold"> Крестовском острове</span>,
                        в историческом особняке, окруженном старинным парком
                    </p>
                </div>
            </div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence1.webp')] bg-cover bg-center flex justify-center items-center z-50"
                ref={block4Ref}
            ></div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence2.webp')] bg-cover bg-center flex justify-center items-center z-40"
                ref={block5Ref}
            ></div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence3.webp')] bg-cover bg-center flex justify-center items-center z-30"
                ref={block6Ref}
            ></div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence4.webp')] bg-cover bg-center flex justify-center items-center z-20"
                ref={block7Ref}
            ></div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence5.webp')] bg-cover bg-center flex justify-center items-center z-10"
                ref={block8Ref}
            ></div>
            <div
                className="absolute top-0 left-0 w-full h-full bg-[url('/residence6.webp')] [background-position:80%_100%] [background-size:_176%] [background-repeat:no-repeat] bg-[#F9F7F8] md::bg-cover md:[background-position-x:70%] md:bg-cover md:bg-center z-20"
                ref={block9Ref}
            >
                <div className="relative w-full h-full flex justify-start pl-[16px] md:pl-[80px] xl:pl-[120px] 2xl:pl-[200px] items-start pt-[110px] sm:pt-[110px] md:pt-0 md:items-center">
                    <div>
                        <div className="text-[#1D1D1D99] text-[20px] md:text-[24px] 2xl:text-[36px] uppercase mb-7">
                            манифест искренности
                        </div>
                        <div className="flex gap-6">
                            <img
                                src="/quotes.webp"
                                alt=""
                                className="w-[80px] h-[66px]"
                            />
                            <p className="max-w-[264px] sm:max-w-[376px] 2xl:max-w-[640px] leading-[155%] mt-0 sm:mt-4 2xl:mt-10 uppercase text-[11px] md:text-xs 2xl:text-lg">
                                <span className="font-bold text-[#691C32]">
                                    RAMICLINIC RESIDENCE
                                </span>{" "}
                                – проект, в котором, объединив накопленный опыт,
                                компетенции, энергию и знания наших талантливых
                                врачей, мы создали уникальную для России Клинику
                                пластической хирургии и косметологии, чтобы
                                внедрить и утвердить новые профессиональные
                                стандарты эстетической медицины и сервиса в
                                повседневную жизнь
                            </p>
                        </div>
                    </div>
                    <div className="uppercase absolute bottom-6 text-white right-6 md:right-[clamp(4.938rem,_-2.938rem_+_16.41vw,_16.75rem)]">
                        <p className="font-bold mb-1 text-sm 2xl:text-[21px]">
                            Галина Резник
                        </p>
                        <p className="text-xs 2xl:text-lg">
                            Генеральный директор
                        </p>
                    </div>
                    <div className="absolute hidden sm:block sm:left-4 sm:bottom-6 md:bottom-auto md:left-auto md:top-32 md:right-8">
                        <img
                            src="/ceo_logo.webp"
                            alt=""
                            width={228}
                            height={218}
                            className="w-[160px] h-[153px] 2xl:w-[228px] 2xl:h-[218px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstAnimationBlock;
