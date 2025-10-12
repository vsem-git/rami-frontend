import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother as ScrollSmootherClass } from "gsap/ScrollSmoother";
import { useRef } from "react";

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
                smooth: window.innerWidth > 768 ? 2 : 0, // Отключить плавный скролл для мобильных
                normalizeScroll: true,
                effects: true,
                smoothTouch: window.innerWidth > 768 ? 0.5 : 0, // Отключить smoothTouch для мобильных
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
