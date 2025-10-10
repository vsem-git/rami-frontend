import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useHeader } from "../HeaderContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const VideoAnimation = () => {
    const blockRef = useRef(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const videoEl = useRef<HTMLVideoElement>(null);
    const tlRef = useRef<GSAPTimeline | null>(null);
    const { setHeaderColor } = useHeader();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(".logoheader", {
                scale: 2.4,
                y: () =>
                    // @ts-ignore
                    window.innerHeight / 2 -
                    // @ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 401px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(".logoheader", {
                scale: 3,
                y: () =>
                    // @ts-ignore
                    window.innerHeight / 2 -
                    // @ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 769px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(".logoheader", {
                scale: 4,
                y: () =>
                    // @ts-ignore
                    window.innerHeight / 2 -
                    // @ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 1281px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(".logoheader", {
                scale: 4,
                y: () =>
                    // @ts-ignore
                    window.innerHeight / 2 -
                    // @ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 1600px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(".logoheader", {
                scale: 4.7,
                y: () =>
                    // @ts-ignore
                    window.innerHeight / 2 -
                    // @ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        /* gsap.set([".visitheader", ".navbarheader", ".textheader"], {
            autoAlpha: 0,
            y: -100, // Пиксели вместо процентов
        }); */

        gsap.set(".firstblocktext", {
            opacity: 0,
        });

        gsap.set(".header", { opacity: 0 });

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

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "preloaderST",
                trigger: blockRef.current,
                start: "top top",
                end: "+=300%",
                scrub: true,
                pin: true,
            },
        });

        tl.to(videoRef.current, {
            opacity: 0,
            duration: 1,
        }).to(".header", { opacity: 1 }, "<");

        tl.addLabel("middle");

        /* tl.to(".visitheader", { autoAlpha: 1, y: 0, duration: 2 })
            .to(".navbarheader", { autoAlpha: 1, y: 0, duration: 2 }, "<")
            .fromTo(
                ".textheader",
                { autoAlpha: 0 },
                { autoAlpha: 1, y: 0, duration: 2 },
                "<"
            ); */

        tl.call(() => {
            setHeaderColor("#000000");
        });

        tl.to(
            ".logoheader",
            {
                scale: 1,
                x: 0,
                y: 0,
                duration: 5,
                ease: "power2.inOut",
            },
            "<"
        ).fromTo(
            ".textheader",
            { autoAlpha: 1, y: "0dvh", ease: "power2.inOut" },
            { autoAlpha: 0, y: "-20dvh", duration: 2, ease: "power2.inOut" },
            "<"
        );

        tl.call(() => {
            setHeaderColor("#000000");
        })
            .to(".textheader", { display: "block", duration: 0 })
            .to(".textheader", { display: "none", duration: 0 });

        tlRef.current = tl;
    });

    const BASE_DELAY = 2000;
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
                    video.playbackRate = 3; // попробуй начать с 3 вместо 5
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
            if (!isRepeat) {
                timer = setTimeout(() => {
                    if (content) content.style.maxHeight = "";
                    const target = document.body.offsetWidth > 768 ? 440 : 430;
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: target,
                        ease: "power1.in",
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
                video.playbackRate = 1; // вернуть нормальную скорость
                video.removeEventListener("ended", onEnded);
            }
            if (content) content.style.maxHeight = "";
        };
    }, []);


    useEffect(() => {
        const v = document.getElementById("bgVideo") as HTMLVideoElement | null;
        if (!v) return;

        const EPS = 0.06; // «почти последний» кадр, чтобы не ловить чёрный экран
        const freeze = () => {
            const d = v.duration || 0;
            // выбери, что надо: первый кадр -> 0; последний -> d - EPS
            v.currentTime = Math.max(0, d - EPS);
            v.pause();
        };

        v.addEventListener("loadedmetadata", freeze, { once: true });
        if (v.readyState >= 1) freeze(); // если кэшировано

        return () => v.removeEventListener("loadedmetadata", freeze);
    }, []);

    return (
        <>
            <div ref={blockRef} className="">
                <div ref={videoRef} className="relative h-dvh w-screen overflow-hidden transform-gpu will-change-transform">
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
                        className="h-full z-10 w-full lg:object-fill object-center">
                        <source src="/start.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="scrollblock"></div>
            </div>
        </>
    );
};

export default VideoAnimation;
