import gsap from "gsap";
import { useEffect, useRef, type RefObject } from "react";

export const useMobileTextAnimation = (
    textRefMobile: RefObject<HTMLHeadingElement | null>,
    isMobile: boolean
) => {
    const animationRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (!textRefMobile.current) return;

        const textElement = textRefMobile.current;

        if (isMobile) {
            gsap.set(textElement, {
                x: "100%",
                y: "0%",
                opacity: 1,
                whiteSpace: "nowrap",
            });

            const tl = gsap.timeline({
                repeat: -1,
                ease: "none",
            });

            tl.to(textElement, {
                x: "-100%",
                duration: 20,
                ease: "linear",
            });

            tl.to(textElement, {
                x: "100%",
                duration: 0,
            });

            animationRef.current = tl;
        } else {
            gsap.set(textElement, {
                x: "100%",
                y: "0%",
                opacity: 1,
                whiteSpace: "nowrap",
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.set(textElement, {
                        y: "-130vw",
                        x: "0%",
                    });
                },
            });

            tl.to(textElement, {
                x: "0%",
                duration: 3,
                ease: "power2.out",
            });

            tl.to(textElement, {
                duration: 1.5,
            });

            tl.to(textElement, {
                y: "-150vw",
                duration: 2,
                ease: "power2.inOut",
            });

            animationRef.current = tl;
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [isMobile, textRefMobile]);
};
