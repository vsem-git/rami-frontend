import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useHeader } from "../HeaderContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const VideoAnimation = () => {
    const blockRef = useRef(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const videoEl = useRef<HTMLVideoElement>(null);
    const tlRef = useRef<GSAPTimeline | null>(null);
    const { setHeaderColor } = useHeader();

    useGSAP(() => {
        setHeaderColor("#000000");
        const mm = gsap.matchMedia();

        const setLogo = (scale: number) => ({
            scale,
            y: () =>
                document.documentElement.clientHeight / 2 -
                ((document.querySelector(".logoheader") as HTMLElement | null)
                    ?.offsetHeight || 0) /
                    2,
        });

        mm.add("(min-width: 1px)", () => gsap.set(".logoheader", setLogo(3)));
        mm.add("(min-width: 401px)", () =>
            gsap.set(".logoheader", setLogo(3.8))
        );
        mm.add("(min-width: 769px)", () => gsap.set(".logoheader", setLogo(5)));
        mm.add("(min-width: 1281px)", () =>
            gsap.set(".logoheader", setLogo(5))
        );
        mm.add("(min-width: 1600px)", () =>
            gsap.set(".logoheader", setLogo(4.7))
        );

        gsap.set(".firstblocktext", { opacity: 0 });
        gsap.set(".header", { opacity: 0 });

        // Цвет шапки при скролле
        const headerTriggers = [{ ref: blockRef, color: "#000000" }];
        headerTriggers.forEach(({ ref, color }) => {
            ScrollTrigger.create({
                trigger: ref.current,
                start: "top center",
                end: "bottom center",
                onEnter: () => setHeaderColor(color),
                onEnterBack: () => setHeaderColor(color),
                onLeave: () => setHeaderColor("#000000"),
                onLeaveBack: () => setHeaderColor("#000000"),
            });
        });

        // Основная анимация видео и текста
        const tl = gsap.timeline({
            scrollTrigger: {
                id: "preloaderST",
                trigger: blockRef.current,
                start: "top top",
                end: "+=150%",
                scrub: true,
                pin: true,
            },
        });

        tl.to(videoRef.current, { opacity: 0, duration: 1 })

            .addLabel("middle")

            .to(".header", { opacity: 1 }, "<")
            .to(".logoheader", {
                scale: 1,
                x: 0,
                y: 0,
                duration: 5,
                ease: "power2.inOut",
            })

            .fromTo(
                ".textheader",
                { autoAlpha: 1, y: "0dvh", ease: "power2.inOut" },
                {
                    autoAlpha: 0,
                    y: "-20dvh",
                    duration: 2,
                    ease: "power2.inOut",
                },
                "<"
            )
            .call(() => setHeaderColor("#000000"))
            .to(".textheader", { display: "none", duration: 0 });

        tlRef.current = tl;
    });

    const BASE_DELAY = 1000;
    let postDelayMs = BASE_DELAY;

    useEffect(() => {
        const content = document.querySelector(
            "#content"
        ) as HTMLDivElement | null;
        if (content) content.style.maxHeight = "100dvh";

        const video = videoEl.current;
        let timer: ReturnType<typeof setTimeout> | null = null;
        let isRepeat = false;
        let speededUp = false;

        const speedUp = () => {
            if (video && !speededUp) {
                requestAnimationFrame(() => {
                    video.playbackRate = 10;
                    postDelayMs = Math.max(
                        300,
                        Math.round(BASE_DELAY / video.playbackRate)
                    );
                    speededUp = true;
                    removeStartListeners();
                });
            }
        };

        const onWheelOnce = () => speedUp();
        const onTouchStartOnce = () => speedUp();

        const addStartListeners = () => {
            document.addEventListener("wheel", onWheelOnce, { passive: false });
            document.addEventListener("touchstart", onTouchStartOnce, {
                passive: false,
            });
        };
        const removeStartListeners = () => {
            document.removeEventListener("wheel", onWheelOnce);
            document.removeEventListener("touchstart", onTouchStartOnce);
        };

        const onEnded = () => {
            const tl = tlRef.current;
            if (!tl) return;
            const st = tl.scrollTrigger;
            if (!st) return;
            const progress = tl.labels["middle"] / tl.duration();
            const scrollPosition = st.start + progress * (st.end - st.start);
            if (!isRepeat) {
                timer = setTimeout(() => {
                    if (content) content.style.maxHeight = "";
                    gsap.to(window, {
                        scrollTo: scrollPosition,
                        duration: 1,
                        scrub: false,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.killTweensOf(window);
                        },
                    });
                    isRepeat = true;
                }, postDelayMs);
            }
        };

        if (video) {
            const onReady = () => addStartListeners();
            video.addEventListener("ended", onEnded);
            video.addEventListener("canplay", onReady, { once: true });
            video.play().catch(() => {});
        }

        return () => {
            if (timer) clearTimeout(timer);
            removeStartListeners();
            if (video) {
                video.playbackRate = 1;
                video.removeEventListener("ended", onEnded);
            }
            if (content) content.style.maxHeight = "";
        };
    }, []);

    useEffect(() => {
        const v = document.getElementById("bgVideo") as HTMLVideoElement | null;
        if (!v) return;

        const EPS = 0.06;
        const freeze = () => {
            const d = v.duration || 0;
            v.currentTime = Math.max(0, d - EPS);
            v.pause();
        };

        v.addEventListener("loadedmetadata", freeze, { once: true });
        if (v.readyState >= 1) freeze();

        return () => v.removeEventListener("loadedmetadata", freeze);
    }, []);

    return (
        <>
            <div ref={blockRef}>
                <div
                    ref={videoRef}
                    className="relative h-dvh w-screen overflow-hidden transform-gpu will-change-transform"
                >
                    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#5c182a]">
                        <video
                            id="bgVideo"
                            muted
                            playsInline
                            preload="metadata"
                            aria-hidden="true"
                            className="h-full w-full object-cover pointer-events-none lg:hidden"
                        >
                            <source src="/startBg.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <video
                        autoPlay
                        ref={videoEl}
                        muted
                        playsInline
                        className="h-full z-10 w-full lg:object-fill object-center"
                    >
                        <source src="/start.mp4" type="video/mp4" />
                    </video>

                    <button
                        onClick={() => {
                            if (tlRef.current) tlRef.current.progress(1);
                            gsap.to(window, {
                                duration: 1,
                                scrollTo: window.innerHeight,
                                ease: "power2.inOut",
                            });
                        }}
                        className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center text-white group cursor-pointer"
                    >
                        <div className="relative overflow-hidden rounded-t-full w-[250px] h-[120px] bg-[#5c182a] flex flex-col items-center justify-center border-t border-white/20 transition-all duration-300  group-hover:scale-105">
                            <div className="text-[12px] tracking-widest uppercase mb-1  transition-all">
                                Листать вниз
                            </div>
                            <img
                                src="/icon-r.svg"
                                alt="arrow-down"
                                className="w-5 h-5 rotate-90 transition-all"
                            />
                        </div>
                    </button>
                </div>
                <div className="scrollblock"></div>
            </div>
        </>
    );
};

export default VideoAnimation;
