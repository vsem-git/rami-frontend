import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePopup } from "../PopupContext";

gsap.registerPlugin(ScrollTrigger);

const FirstAnimationBlock = ({
    ref,
}: {
    ref: React.RefObject<HTMLDivElement>;
}) => {
    /* const { setScrollToServices } = useScroll(); */
    const { openPopup } = usePopup();
    /* const { setHeaderColor } = useHeader();
    const containerRef = useRef(null);  */
    /* const block1Ref = useRef(null); */
    /* const block2Ref = useRef(null); */
    /* const block1LogoRef = useRef(null); */
    /* const block2ContendRef = useRef(null); */
    /* const tlRef = useRef<gsap.core.Timeline | null>(null); */

    useGSAP(() => {
        /* const mm = gsap.matchMedia();

        /* gsap.set(block2Ref.current, { y: "100%" }); */
        /* gsap.set(block2ContendRef.current, { autoAlpha: 0 }); */
        /* mm.add("(max-width: 768px)", () => {
            gsap.fromTo(
                ".logoheader",
                {
                    yPercent: 0,
                },
                {
                    yPercent: -300,
                    duration: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top+=100 top",
                        end: "top+=300 top",
                        scrub: true,
                    },
                }
            );
        });

        mm.add("(min-width: 769px)", () => {
            gsap.fromTo(
                ".logoheader",
                {
                    yPercent: 0,
                },
                {
                    yPercent: -300,
                    duration: 1,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top+=180 top",
                        end: "top+=350 top",
                        scrub: true,
                    },
                }
            );
        });
 */
        /* ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 10%", // когда верх блока достигает 80% высоты экрана
            onEnter: () => setHeaderColor("#ffffff"),
            onLeaveBack: () => setHeaderColor("#000000"),
        });

        mm.add("(max-width: 768px)", () => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "100% top", // когда 50% блока ушло за верх экрана
                onEnter: () => setHeaderColor("#000000"),
                onLeaveBack: () => setHeaderColor("#ffffff"),
            });
        });

        mm.add("(min-width: 769px)", () => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "150% top", // когда 50% блока ушло за верх экрана
                onEnter: () => setHeaderColor("#000000"),
                onLeaveBack: () => setHeaderColor("#ffffff"),
            });
        }); */
        /* const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=20%",
                toggleActions: "play none play reverse",
                pin: true,
            },
        }); */
        /* gsap.to(block1LogoRef.current, {
            rotation: 360, // Поворот на 360 градусов
            ease: "linear", // Линейная анимация для равномерного вращения
            scrollTrigger: {
                trigger: containerRef.current, // Элемент, который запускает анимацию
                start: "top bottom", // Начало анимации, когда верх блока в 80% окна
                end: "+=500%", // Конец анимации, когда низ блока в 20% окна
                scrub: true, // Анимация синхронизируется с прокруткой
            },
        }); */
        /* tl.call(
            () => {
                setHeaderColor("#000000");
            },
            [],
            "-=5"
        ).call(
            () => {
                setHeaderColor("#ffffff");
            },
            [],
            "-=4"
        ); */
        /* tl.to(block2ContendRef.current, {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
        });

        tl.addLabel("start");

        tlRef.current = tl; */
    }, []);

    /* const handleScrollTo = () => {
        const tl = tlRef.current;
        if (!tl) return;
        const st = tl.scrollTrigger;
        if (!st) return;
        const progress = tl.labels["start"] / tl.duration();
        const scrollPosition = st.start + progress * (st.end - st.start);
        gsap.to(window, {
            scrollTo: scrollPosition,
            duration: 1,
            scrub: false,
            ease: "power2.inOut",
        });
    }; */

    /* useEffect(() => {
        setScrollToServices(() => handleScrollTo);

        return () => {
            setScrollToServices(() => {});
        };
    }, []); */
    return (
        <div ref={ref} className="absolute top-0 left-0 w-full h-full z-30">
            <div id="services" className="h-dvh relative overflow-hidden">
                {/* <div
                className="absolute top-0 px-10 left-0 w-full h-full bg-white bg-cover bg-center flex justify-center items-center z-0"
                ref={block1Ref}
            >
                <img
                    ref={block1LogoRef}
                    src="/rotateicon.svg"
                    className="scale-[0.7] 2xl:scale-[0.8]"
                    alt="icon"
                />
            </div> */}
                <div className="absolute top-0 left-0 w-full h-dvh bg-[url('/animationblock2.jpg')] bg-cover bg-top flex justify-between items-end z-50">
                    <div className="relative h-full w-full flex flex-col justify-center md:grid grid-cols-3">
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
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <p className="uppercase text-white text-[16px] md:text-[20px] 2xl:text-[28px] md:text-center md:mb-10 md:px-15 2xl:px-20">
                                эталонная <br />
                                пластическая хирургия
                            </p>
                            <div
                                className="absolute w-full h-full z-10 md:hidden"
                                onClick={() => {
                                    openPopup("secondsection1");
                                }}
                            ></div>
                            <div className="absolute hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-1000 inset-0 backdrop-blur-[40px] bg-[#1D1D1D4D]  flex-col justify-center items-center md:p-6 2xl:p-20 text-center">
                                <p className="text-[20px] 2xl:text-[28px] uppercase mb-4 2xl:mb-6 leading-[130%] text-white">
                                    Эталонная <br />
                                    пластическая хирургия
                                </p>
                                <p className="mb-8 2xl:mb-12 text-[#FFFFFF99] leading-[155%] uppercase font-extralight text-sm 2xl:text-base">
                                    RAMICLINIC RESIDENCE гордится экспертной
                                    командой врачей, опирающихся на
                                    международную практику и возрастающий
                                    авторитет русской школы пластической
                                    хирургии с уникальным эстетическим почерком
                                </p>
                                <a
                                    href="/plastic"
                                    className="text-[#691C32] bg-white font-semibold px-8 py-5 uppercase cursor-pointer text-sm 2xl:text-base"
                                >
                                    Подробнее
                                </a>
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
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <p className="uppercase md:pb-[2ch] text-white text-[16px] md:text-[20px] 2xl:text-[28px] md:text-center md:mb-10 md:px-20">
                                Стратегия управления возрастом
                            </p>
                            <div
                                className="absolute w-full h-full z-10 md:hidden"
                                onClick={() => {
                                    openPopup("secondsection3");
                                    console.log("secondsection3");
                                }}
                            ></div>
                            <div className="absolute hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-1000 top-0 left-0 inset-0 backdrop-blur-[40px] bg-[#1D1D1D4D] flex-col justify-center items-center md:p-6 2xl:p-20 text-center">
                                <p className="text-[20px] 2xl:text-[28px] uppercase mb-4 2xl:mb-6 leading-[130%] text-white">
                                    Стратегия управления возрастом
                                </p>
                                <p className="mb-8 2xl:mb-12 text-[#FFFFFF99] leading-[155%] uppercase font-extralight text-sm 2xl:text-base">
                                    Работа на результат начинается задолго до
                                    операционной. Для каждого пациента
                                    оформляется генетический паспорт кожи с
                                    целью детализированного прогноза
                                    послеоперационного периода, разрабатывается
                                    индивидуальный план восстановительных
                                    косметологических процедур
                                </p>
                                <a
                                    href="/reabilitation"
                                    className="text-[#691C32] bg-white font-semibold px-8 py-5 uppercase cursor-pointer text-sm 2xl:text-base"
                                >
                                    Подробнее
                                </a>
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
                                        strokeWidth="1.5"
                                    />
                                </svg>
                            </div>
                            <p className="uppercase text-white text-[16px] md:text-[20px] 2xl:text-[28px] md:text-center md:mb-10 md:px-20">
                                интеллектуальная косметология
                            </p>
                            <div
                                className="absolute w-full h-full z-10 md:hidden"
                                onClick={() => {
                                    openPopup("secondsection2");
                                    console.log("secondsection2");
                                }}
                            ></div>
                            <div className="absolute hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-1000 top-0 left-0 inset-0 backdrop-blur-[40px] bg-[#1D1D1D4D] flex-col justify-center items-center md:p-6 2xl:p-20 text-center">
                                <p className="text-[20px] 2xl:text-[28px] uppercase mb-4 2xl:mb-6 leading-[130%] text-white">
                                    интеллектуальная косметология
                                </p>
                                <p className="mb-8 2xl:mb-12 text-[#FFFFFF99] leading-[155%] uppercase font-extralight text-sm 2xl:text-base">
                                    Опытные врачи-косметологи,
                                    высокотехнологичный парк инновационного
                                    оборудования, достижения в сфере антиэйдж,
                                    биохакинга и регенеративной медицины – вот
                                    составляющие успеха, из которых складываются
                                    блестящие эстетические результаты пациентов
                                </p>
                                <a
                                    href="/cosmetology"
                                    className="text-[#691C32] bg-white font-semibold px-8 py-5 uppercase cursor-pointer text-sm 2xl:text-base"
                                >
                                    Подробнее
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstAnimationBlock;
