import { useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother as ScrollSmootherClass } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollSmootherClass);

export default function ScrollSmoother({
    children,
}: {
    children: React.ReactNode;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    useGSAP(
        () => {
            if (!wrapperRef.current || !contentRef.current) return;

            const smoother = ScrollSmootherClass.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                smooth: 2,
                normalizeScroll: true,
                effects: true,
                smoothTouch: 0.5,
            });

            return () => {
                smoother?.kill();
            };
        },
        { scope: wrapperRef }
    );

    return (
        <div id="wrapper" ref={wrapperRef}>
            <div id="content" ref={contentRef}>
                {children}
            </div>
        </div>
    );
}
