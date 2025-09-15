import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeader } from "../HeaderContext";

gsap.registerPlugin(ScrollTrigger);

const VideoAnimation = () => {
    const blockRef = useRef(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setHeaderColor } = useHeader();

    useGSAP(() => {
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
                start: "top top",
                end: "+=100%",
                scrub: true,
                pin: true,
            },
        });

        tl.to(videoRef.current, {
            opacity: 0,
            duration: 1,
        });
    });

    return (
        <div ref={blockRef} className="max-h-dvh bg-white">
            <video
                ref={videoRef}
                src="/заставка.mp4"
                className="h-dvh w-[100vw] object-cover"
                autoPlay
                muted
            />
        </div>
    );
};

export default VideoAnimation;
