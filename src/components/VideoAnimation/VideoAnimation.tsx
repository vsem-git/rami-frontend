import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useCallback } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useHeader } from "../HeaderContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const VideoAnimation = () => {
    const blockRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const videoEl = useRef<HTMLVideoElement>(null);
    const tlRef = useRef<GSAPTimeline | null>(null);
    const { setHeaderColor } = useHeader();

    // Refs для флагов (глобальные для компонента)
    const isRepeatRef = useRef<boolean>(false);
    const isScrollingDownRef = useRef<boolean>(false);
    const touchStartYRef = useRef<number>(0);

    // Стабильные callbacks за пределами useEffect
    const handleScroll = useCallback((video: HTMLVideoElement) => {
        video.currentTime += 0.5;
        console.log("scrolled");
    }, []);

    const handleWheel = useCallback(
        (e: WheelEvent, video: HTMLVideoElement | null) => {
            e.preventDefault(); // Опционально: если хотите заблокировать дефолтный скролл
            if (!isRepeatRef.current && video) {
                handleScroll(video);
            }
        },
        [handleScroll]
    );

    const handleTouchStart = useCallback((e: TouchEvent) => {
        touchStartYRef.current = e.touches[0].clientY;
        isScrollingDownRef.current = false;
    }, []);

    const handleTouchMove = useCallback(
        (e: TouchEvent, video: HTMLVideoElement | null) => {
            const touchCurrentY = e.touches[0].clientY;
            const deltaY = touchStartYRef.current - touchCurrentY;

            if (
                deltaY > 0 &&
                !isRepeatRef.current &&
                !isScrollingDownRef.current &&
                video
            ) {
                handleScroll(video);
                isScrollingDownRef.current = true;
            }
        },
        [handleScroll]
    );

    const handleTouchEnd = useCallback(() => {
        isScrollingDownRef.current = false;
        touchStartYRef.current = 0;
    }, []);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1px)", () => {
            gsap.set(".logoheader", {
                scale: 2.4,
                y: () =>
                    window.innerHeight / 2 -
                    //@ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 401px)", () => {
            gsap.set(".logoheader", {
                scale: 3,
                y: () =>
                    window.innerHeight / 2 -
                    //@ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 769px)", () => {
            gsap.set(".logoheader", {
                scale: 4,
                y: () =>
                    window.innerHeight / 2 -
                    //@ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 1281px)", () => {
            gsap.set(".logoheader", {
                scale: 4.5,
                y: () =>
                    window.innerHeight / 2 -
                    //@ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

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
                end: "+=200%",
                scrub: true,
                pin: true,
            },
        });

        tl.to(videoRef.current, {
            opacity: 0,
            duration: 1,
        }).to(".header", { opacity: 1 }, "<");

        tl.addLabel("middle");

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

    useEffect(() => {
        const content = document.querySelector("#content") as HTMLDivElement;
        content.style.maxHeight = "100dvh";

        const video = videoEl.current;

        let timer: ReturnType<typeof setTimeout>;

        const handleVideoEnd = useCallback(() => {
            if (!isRepeatRef.current) {
                timer = setTimeout(() => {
                    content.style.maxHeight = "";

                    // Сброс скролла перед анимацией
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;

                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: 300,
                            autoKill: false,
                        },
                        ease: "power2.inOut",
                    });
                    isRepeatRef.current = true;
                }, 2000);
            }
        }, [content]); // deps для content, но оно stable

        if (video) {
            video.play();

            // Добавляем слушатели с передачей video
            const wheelHandler = (e: WheelEvent) => handleWheel(e, video);
            const touchMoveHandler = (e: TouchEvent) =>
                handleTouchMove(e, video);

            document.addEventListener("wheel", wheelHandler, {
                passive: false,
            });
            document.addEventListener("touchstart", handleTouchStart, {
                passive: true,
            });
            document.addEventListener("touchmove", touchMoveHandler, {
                passive: true,
            });
            document.addEventListener("touchend", handleTouchEnd, {
                passive: true,
            });

            video.addEventListener("ended", handleVideoEnd);

            return () => {
                clearTimeout(timer);
                document.removeEventListener("wheel", wheelHandler);
                document.removeEventListener("touchstart", handleTouchStart);
                document.removeEventListener("touchmove", touchMoveHandler);
                document.removeEventListener("touchend", handleTouchEnd);
                video.removeEventListener("ended", handleVideoEnd);
                video.pause();
            };
        }

        return () => {
            clearTimeout(timer);
        };
    }, [
        handleWheel,
        handleTouchMove,
        handleTouchStart,
        handleTouchEnd,
        handleScroll,
    ]); // Все stable callbacks в deps

    return (
        <>
            <div ref={blockRef} className="min-h-dvh max-w-full">
                <div ref={videoRef} className="h-dvh w-[100vw] bg-[#5c182a]">
                    <video
                        autoPlay
                        ref={videoEl}
                        muted
                        playsInline
                        className="h-dvh w-[100vw] object-contain"
                    >
                        <source src="/заставка.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="scrollblock"></div>
            </div>
        </>
    );
};

export default VideoAnimation;
