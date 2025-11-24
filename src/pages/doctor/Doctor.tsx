import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { DoctorAge } from "../../components/DoctorAge/DoctorAge";
import { DoctorCardsSection } from "../../components/DoctorCardsSection/DoctorCardsSection";
import { DoctorGallery } from "../../components/DoctorGallery/DoctorGallery";
import { WelcomeDoctor } from "../../components/welcome-doctor/WelcomeDoctor";
import mes from "../../shared/icons/mes.svg";

gsap.registerPlugin(ScrollTrigger);

export const Doctor = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (window.innerWidth <= 768 || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 4,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });

        gsap.fromTo(
            ".bgpattern1",
            { xPercent: 120 },
            {
                xPercent: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top-=500 bottom",
                    end: "top top+=450",
                    scrub: true,
                },
            }
        );
        gsap.fromTo(
            ".bgpattern2",
            { xPercent: -120 },
            {
                xPercent: 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top-=500 bottom",
                    end: "top top+=50",
                    scrub: true,
                },
            }
        );

        gsap.fromTo(
            ".bgpattern1",
            { xPercent: 0 },
            {
                xPercent: 120,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom+=200 top",
                    scrub: true,
                },
            }
        );
        gsap.fromTo(
            ".bgpattern2",
            { xPercent: 0 },
            {
                xPercent: -120,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom+=200 top",
                    scrub: true,
                },
            }
        );

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleScroll = () => {
            const rect = video.getBoundingClientRect();
            const isInViewport =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                    (window.innerHeight ||
                        document.documentElement.clientHeight) &&
                rect.right <=
                    (window.innerWidth || document.documentElement.clientWidth);

            if (isInViewport && video.paused) {
                video.play().catch(console.error);
            }
        };

        video.addEventListener("loadeddata", () => {
            video.play().catch(console.error);
        });

        window.addEventListener("scroll", handleScroll);

        handleScroll();

        const bgpattern1 = document.querySelector(".bgpattern1") as HTMLElement;
        const bgpattern2 = document.querySelector(".bgpattern2") as HTMLElement;
        setTimeout(() => {
            bgpattern1.style.transform = "translate(120%, 0%)";
            bgpattern2.style.transform = "translate(-120%, 0%)";
            console.log("cleaned");
        }, 500);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <WelcomeDoctor />
            <div id="next-section-doctor2">
                <DoctorCardsSection />
            </div>

            <section
                ref={sectionRef}
                className="relative w-full h-auto min-h-[640px] lg:min-h-[720px] flex items-center justify-center px-4 xl:px-10 overflow-hidden"
            >
                <div className="flex items-start flex-col sm:flex-row gap-4 lg:gap-5 2xl:gap-10">
                    <img
                        src={mes}
                        alt="mes"
                        className="w-[40px] xl:w-[56px] h-[33px] xl:h-[46px] -mt-4 xl:-mt-7 flex-shrink-0"
                    />
                    <div className="space-y-2 md:space-y-6 max-w-[480px] lg:max-w-[560px] xl:max-w-[780px]">
                        <p className="text-[clamp(0.875rem,1.5vw,21px)]/[155%] text-[#1D1D1D] font-normal uppercase">
                            Красота и жизнь нераздельно сплетены друг с другом,
                            и хирург – лишь одна из нитей той непостижимой
                            ткани, где сплелись солнечный свет, звездная пыль и
                            неведомое чудо. Та радость и гордость, которые
                            появляются в душе пациенток после пластической
                            операции, достойны того, чтобы пройти этот путь. Их
                            улыбки становятся ярче, глаза излучают особенный
                            свет, а уверенность в себе транслируется всему
                            окружению. Красота – это не просто слово. Это
                            обещание счастья! Это сила, способная изменить мир к
                            лучшему.
                        </p>
                        <button className="text-[11px] md:text-[clamp(0.875rem,1.2vw,1rem)] font-semibold uppercase text-[#1D1D1D] cursor-pointer">
                            Читать статью
                        </button>
                    </div>
                </div>
            </section>

            <DoctorGallery />
            <DoctorAge />

            <div
                id="doctor-video-section"
                className="w-full h-[640px] lg:h-[720px] xl:h-screen"
            >
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                >
                    <source src="/serb-short.webm" type="video/webm" />
                    <source src="/serb-short.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    );
};
