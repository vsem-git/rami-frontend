import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeader } from "../HeaderContext";

gsap.registerPlugin(ScrollTrigger);

const VideoAnimation = () => {
    const blockRef = useRef(null);
    /* const videoRef = useRef<HTMLVideoElement>(null); */
    const { setHeaderColor } = useHeader();

    useGSAP(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(".logoheader", {
                scale: 2.4,
                y: () =>
                    // @ts-ignore
                    window.window.innerHeight / 2 -
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
                    window.window.innerHeight / 2 -
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
                    window.window.innerHeight / 2 -
                    // @ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        mm.add("(min-width: 1281px)", () => {
            // Desktop/Tablet: standard values
            gsap.set(".logoheader", {
                scale: 4.5,
                y: () =>
                    // @ts-ignore
                    window.window.innerHeight / 2 -
                    // @ts-ignore
                    document?.querySelector(".logoheader")?.offsetHeight / 2,
            });
        });

        gsap.set(
            [".menuheader", ".visitheader", ".navbarheader", ".textheader"],
            {
                autoAlpha: 0,
                y: -100, // Пиксели вместо процентов
            }
        );

        gsap.set(".firstblocktext", {
            opacity: 0,
        });

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
                trigger: blockRef.current,
                start: "top 80%",
                end: "+=180%",
                scrub: true,
                pin: true,
            },
        });

        /* tl.to(videoRef.current, {
            opacity: 0,
            duration: 1,
        }); */

        tl.to(".menuheader", { autoAlpha: 1, y: 0, duration: 2 }, 0)
            .to(".visitheader", { autoAlpha: 1, y: 0, duration: 2 }, "<")
            .to(".navbarheader", { autoAlpha: 1, y: 0, duration: 2 }, "<")
            .fromTo(
                ".textheader",
                { autoAlpha: 0 },
                { autoAlpha: 1, y: 0, duration: 2 },
                "<"
            );

        tl.to({}, { duration: 3 });

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
                ease: "power2.out",
            },
            "<"
        ).fromTo(
            ".textheader",
            { autoAlpha: 1, y: "0dvh" },
            { autoAlpha: 0, y: "-20dvh", duration: 2 },
            "<"
        );

        tl.call(() => {
            setHeaderColor("#000000");
        })
            .to(".textheader", { display: "block" })
            .to(".textheader", { display: "none" });
    });

    return (
        <>
            <div ref={blockRef} className="max-h-dvh bg-white mb-[100dvh]">
                {/* <video
                    ref={videoRef}
                    src="/заставка.mp4"
                    className="h-dvh w-[100vw] object-cover"
                    autoPlay
                    muted
                /> */}
            </div>
        </>
    );
};

export default VideoAnimation;
