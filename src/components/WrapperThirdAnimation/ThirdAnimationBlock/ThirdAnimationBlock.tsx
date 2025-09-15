import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import "swiper/css/bundle";

gsap.registerPlugin(ScrollTrigger);

const ThirdAnimationBlock = () => {
    const containerRef = useRef(null);
    const block1Ref = useRef(null);
    const block1SwiperRef = useRef(null);
    const block1TextRef = useRef(null);

    useGSAP(() => {
        gsap.set(".bgpattern1", { opacity: 0 });

        gsap.set(block1SwiperRef.current, {
            y: "50%",
        });

        gsap.set(".teamswiper .swiper-wrapper", {
            x: "-10%",
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=100%",
                scrub: true,
                pin: true,
            },
        });

        tl.to(
            block1TextRef.current,
            {
                y: "-10%",
                duration: 1,
                opacity: 0,
                ease: "power2.inOut",
            },
            "<"
        )
            .to(
                block1SwiperRef.current,
                {
                    y: "5%",
                    duration: 1,
                    ease: "power2.inOut",
                },
                "<"
            )
            .to(
                ".teamswiper .swiper-wrapper",
                {
                    x: "0%",
                    duration: 1,
                    ease: "power2.inOut",
                },
                "<"
            );
    }, []);
    return (
        <div className="h-dvh relative" ref={containerRef}>
            <div
                className="absolute min-h-dvh top-0 left-0 w-full bg-cover bg-center z-0 flex flex-col justify-center items-center"
                ref={block1Ref}
            >
                <div
                    ref={block1TextRef}
                    className="flex absolute flex-col top-0 items-center text-center gap-6 p-48 pb-0 z-10"
                >
                    <p className="text-4xl">
                        КОМАНДА <br />
                        <span className="text-[#B59158]">
                            RAMICLINIC RESIDENCE
                        </span>
                    </p>
                    <p className="max-w-[560px] uppercase">
                        Horem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nunc vulputate libero et velit interdum, ac aliquet odio
                        mattis. Class aptent taciti sociosqu ad litora torquent
                        per conubia nostra, per inceptos himenaeos.
                    </p>
                </div>
                <div className="max-w-full z-10" ref={block1SwiperRef}>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={16}
                        className="mySwiper h-full w-full teamswiper"
                        loop={true}
                        ref={block1SwiperRef}
                    >
                        {Array(5)
                            .fill("")
                            .map((_, i) => {
                                return (
                                    <SwiperSlide
                                        key={i}
                                        className="h-[640px] w-[480px] relative group"
                                    >
                                        <img src="/man.webp" alt="man" />
                                        <div className="absolute inset-0 w-full h-full bg-[url('/operation.jpg')] bg-cover bg-center saturate-0 opacity-0 transition-all group-hover:opacity-100 duration-1000"></div>
                                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 transition-all group-hover:opacity-100 duration-1000"></div>
                                        <div className="absolute inset-0 w-full h-full opacity-0 transition-all group-hover:opacity-100 duration-1000">
                                            <div className="relative h-full w-full flex flex-col items-center text-center justify-end pb-5">
                                                <button className="absolute top-0 right-0 m-2 p-6 text-[32px] bg-[#691C32] cursor-pointer">
                                                    <svg
                                                        width="32"
                                                        height="32"
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
                                                <p className="text-white mb-4 translate-y-full opacity-0 transition-all duration-1000 group-hover:translate-y-0 group-hover:opacity-100">
                                                    Врач-косметолог
                                                </p>
                                                <p className="uppercase text-2xl text-white translate-y-full opacity-0 transition-all duration-1000 group-hover:translate-y-0 group-hover:opacity-100">
                                                    ВИноградов ИВАН
                                                    Александрович
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ThirdAnimationBlock;
