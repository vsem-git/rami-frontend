import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, type RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

export const useDoctorAnimation = (
    sectionRef: RefObject<HTMLElement | null>,
    backgroundRef: RefObject<HTMLDivElement | null>,
    defaultContentRef: RefObject<HTMLDivElement | null>,
    doctorContentRef: RefObject<HTMLDivElement | null>,
    isMobile?: boolean
) => {
    useEffect(() => {
        if (isMobile || window.innerWidth <= 768) return;
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const sectionElement = sectionRef.current;
            const backgroundElement = backgroundRef.current;
            const defaultContentElement = defaultContentRef.current;
            const doctorContentElement = doctorContentRef.current;

            if (
                !sectionElement ||
                !backgroundElement ||
                !defaultContentElement ||
                !doctorContentElement
            )
                return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionElement,
                    start: "top top",
                    end: "+=450%",
                    scrub: 1,
                    pin: true,
                },
            });

            gsap.set(doctorContentElement, { y: "90vh", opacity: 0 });

            // 1. Убираем старый контент
            tl.to(
                defaultContentElement,
                {
                    y: "-100vh",
                    opacity: 0,
                    duration: 2,
                    ease: "power2.inOut",
                },
                0
            );

            // 2. Анимация фона (длится 4 секунды)
            tl.to(
                backgroundElement,
                {
                    backgroundPosition: "50% 70%",
                    duration: 4,
                    ease: "power2.inOut",
                },
                0
            );
            tl.to(
                doctorContentElement,
                {
                    y: "0vh",
                    opacity: 1,
                    duration: 2,
                    ease: "power2.out",
                },
                1
            );

            return () => {
                tl.kill();
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        }, sectionRef.current);

        return () => ctx.revert();
    }, [
        sectionRef,
        backgroundRef,
        defaultContentRef,
        doctorContentRef,
        isMobile,
    ]);
};
