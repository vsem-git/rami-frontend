import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Swiper } from "swiper";
// @ts-ignore
import "swiper/css/bundle";
import { useHeader } from "../../HeaderContext";

const images = [
    [
        "/swiper1.png",
        "/swiper1_over.jpg",
        "Маммолог",
        "Телишевский Антон Валентинович",
    ],
    [
        "/swiper2.webp",
        "/swiper2_over.webp",
        "Маммолог",
        "Телишевский Антон Валентинович",
    ],
    [
        "/swiper3.webp",
        "/swiper3_over.webp",
        "Маммолог",
        "Телишевский Антон Валентинович",
    ],
    [
        "/swiper4.webp",
        "/swiper1_over.jpg",
        "Маммолог",
        "Телишевский Антон Валентинович",
    ],
    [
        "/swiper5.webp",
        "/swiper2_over.webp",
        "Маммолог",
        "Телишевский Антон Валентинович",
    ],
];

gsap.registerPlugin(ScrollTrigger);

const ThirdAnimationBlock = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const block1Ref = useRef<HTMLDivElement | null>(null);
    const swiperContainerRef = useRef<HTMLDivElement | null>(null);
    const block1TextRef = useRef<HTMLDivElement | null>(null);
    const swiperRef = useRef<Swiper | null>(null);
    const isSwiperReady = useRef(false);
    const tlRef = useRef<gsap.core.Timeline | null>(null); // To kill/recreate if needed
    const { setHeaderColor } = useHeader();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(swiperContainerRef.current, { y: "60%" });
            gsap.set(".teamswiper .swiper-wrapper", { x: "0%" });
        });

        mm.add("(max-width: 767px)", () => {
            // Mobile: smaller shift
            gsap.set(swiperContainerRef.current, { y: "45%" });
            gsap.set(".teamswiper .swiper-wrapper", { x: "0%" });
        });
        // Initial setup only (no timeline yet)
    }, []);

    // Function to create timeline (called when ready)
    const createTimeline = () => {
        if (tlRef.current) {
            tlRef.current.kill(); // Убиваем старый timeline
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=300%",
                scrub: true,
                pin: true,
            },
        });

        tl.call(
            () => {
                setHeaderColor("#ffffff");
            },
            [],
            "-=1.5"
        );

        tl.call(
            () => {
                setHeaderColor("#000000");
            },
            [],
            "-=1.4"
        );

        tl.to({}, { duration: 1 });

        tl.to(
            block1TextRef.current,
            {
                y: "-60%",
                duration: 1,
                opacity: 0,
                ease: "power2.inOut",
            },
            "<"
        )
            .to(
                swiperContainerRef.current,
                {
                    y: "5%",
                    duration: 1,
                    ease: "power2.inOut",
                },
                "<"
            )
            .fromTo(
                ".logoheader",
                {
                    yPercent: 0,
                },
                {
                    yPercent: -300,
                    duration: 1,
                    ease: "power2.inOut",
                },
                "<"
            );

        const swiper = swiperRef.current;
        if (!swiper || !swiper.wrapperEl || !swiperContainerRef.current) {
            console.log("Swiper or container not ready for calculation");
            return;
        }

        const wrapper = swiper.wrapperEl;
        const container = swiperContainerRef.current;
        const wrapperWidth = wrapper.scrollWidth;
        const containerWidth = container.clientWidth;
        const totalMovement = wrapperWidth - containerWidth;

        console.log(`Wrapper Width: ${wrapperWidth}px`);
        console.log(`Container Width: ${containerWidth}px`);
        console.log(`Total Movement: ${totalMovement}px`);

        // ✅ Применяем движение только если экран шире 768px
        if (window.matchMedia("(min-width: 768px)").matches) {
            tl.to(".teamswiper .swiper-wrapper", {
                x: `-${totalMovement + 32}px`,
                duration: 1,
                ease: "power2.inOut",
            });
        }

        tlRef.current = tl;
    };

    // Optional: Ensure images are loaded before calculating (if needed)
    const ensureImagesLoaded = (swiper: Swiper) => {
        const images = swiper.slides.flatMap((slide) =>
            Array.from(slide.querySelectorAll("img"))
        );
        if (images.length === 0) {
            createTimeline();
            return;
        }

        let loadedCount = 0;
        images.forEach((img) => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener("load", () => {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        createTimeline();
                    }
                });
            }
        });

        if (loadedCount === images.length) {
            createTimeline();
        }
    };

    return (
        <div className="h-dvh relative" ref={containerRef}>
            <div
                className="absolute min-h-dvh top-0 left-0 w-full bg-cover bg-center z-0 flex flex-col justify-center items-center"
                ref={block1Ref}
            >
                <div
                    ref={block1TextRef}
                    className="flex absolute flex-col top-0 items-center text-center gap-6  pt-24 px-4 md:pt-48 pb-0 z-10"
                >
                    <p className="text-xl md:text-2xl 2xl:text-4xl">
                        КОМАНДА <br />
                        <span className="text-[#B59158]">
                            RAMICLINIC RESIDENCE
                        </span>
                    </p>
                    <p className="sm:max-w-[420px] 2xl:max-w-[560px] uppercase text-[11px] md:text-[12px] 2xl:text-[16px] w-full">
                        Ядро команды RAMICLINIC RESIDENCE – специалисты с
                        многолетним опытом, которые стоят у истоков бренда РАМИ.
                        Рядом с признанными мастерами – молодые амбициозные
                        коллеги с новаторским складом ума.
                    </p>
                </div>
                <div className="max-w-full z-10" ref={swiperContainerRef}>
                    <SwiperComponent
                        slidesPerView={1.2}
                        spaceBetween={16}
                        slidesOffsetBefore={20}
                        className="mySwiper h-full w-full teamswiper"
                        loop={false}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            isSwiperReady.current = true;
                            // Delay slightly for DOM settling, then ensure images and create TL
                            setTimeout(() => {
                                ensureImagesLoaded(swiper);
                            }, 100);
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2.2,
                            },
                            992: {
                                slidesPerView: 2.5,
                            },
                            1280: {
                                slidesPerView: 3.5,
                            },
                            1440: {
                                slidesPerView: 3.8,
                            },
                        }}
                    >
                        {images.map((el, i) => {
                            return (
                                <SwiperSlide
                                    key={i}
                                    className="h-[640px] w-[480px] relative group"
                                >
                                    <img src={el[0]} alt="man" />
                                    <div
                                        style={{
                                            backgroundImage: `url(${el[1]})`,
                                        }}
                                        className="absolute inset-0 w-full h-full bg-cover bg-center saturate-0 opacity-0 transition-all group-hover:opacity-100 group-active:opacity-100 duration-1000"
                                    ></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 transition-all group-hover:opacity-100 group-active:opacity-100 duration-1000"></div>
                                    <div className="absolute inset-0 w-full h-full opacity-0 transition-all group-hover:opacity-100 group-active:opacity-100 duration-1000">
                                        <div className="relative h-full w-full flex flex-col items-center text-center justify-end pb-5">
                                            <button className="absolute top-0 right-0 m-1 sm:m-2 p-4 md:p-5 2xl:p-8 text-[32px] bg-[#691C32] cursor-pointer">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        className="transition-all"
                                                        d="M16 5V16M16 27V16M16 16H27H5"
                                                        stroke="#fff"
                                                        stroke-width="1.5"
                                                    />
                                                </svg>
                                            </button>
                                            <p className="text-white text-base md:text-[17px] 2xl:text-[24px] mb-2 2xl:mb-3 translate-y-full opacity-0 transition-all duration-1000 group-hover:translate-y-0 group-active:translate-y-0 group-hover:opacity-100 group-active:opacity-100">
                                                Врач-косметолог
                                            </p>
                                            <p className="uppercase text-[13px] md:text-sm 2xl:text-[21px] leading-[120%] text-white translate-y-full opacity-0 transition-all duration-1000 group-hover:translate-y-0 group-active:translate-y-0 group-hover:opacity-100 group-active:opacity-100">
                                                ВИноградов ИВАН Александрович
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </SwiperComponent>
                </div>
            </div>
        </div>
    );
};

export default ThirdAnimationBlock;
