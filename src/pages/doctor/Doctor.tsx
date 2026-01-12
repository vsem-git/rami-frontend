import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorAge } from "../../components/DoctorAge/DoctorAge";
import { DoctorCardsSection } from "../../components/DoctorCardsSection/DoctorCardsSection";
import { DoctorGallery } from "../../components/DoctorGallery/DoctorGallery";
import { WelcomeDoctor } from "../../components/welcome-doctor/WelcomeDoctor";
import { DOCTORS_DATA } from "../../shared/data/doctor";
import mes from "../../shared/icons/mes.svg";
import { TabItem } from "../Doctors/Doctors";
import DoctorResults from "../../components/DoctorResults/DoctorResults";

gsap.registerPlugin(ScrollTrigger);

export const Doctor = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { id } = useParams();

    const doctor = DOCTORS_DATA.find((d) => d.id === id);

    if (!doctor) {
        return <div>Доктор не найден</div>;
    }

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
            <WelcomeDoctor doctor={doctor} />
            <DoctorResults
                directions={doctor.directions}
                results={doctor.modal_result}
            />
            <div id="next-section-doctor2">
                <DoctorCardsSection doctor={doctor} />
            </div>

            <section
                ref={sectionRef}
                className="relative w-full h-auto min-h-[640px] lg:min-h-[720px] flex items-center justify-center px-4 xl:px-10 overflow-hidden"
            >
                {/* <div className='bgpattern1 fixed top-0 right-0 h-[130%] hidden sm:block z-[0]'>
					<img
						src='/pattern1.svg'
						alt='teambg'
						className='h-full object-cover overflow-visible'
					/>
				</div>
				<div className='bgpattern2 fixed top-0 left-0 h-[130%] hidden sm:block z-[0]'>
					<img
						src='/pattern2.svg'
						alt='teambg'
						className='h-full object-cover overflow-visible'
					/>
				</div> */}

                <div className="flex items-start flex-col sm:flex-row gap-4 lg:gap-5 2xl:gap-10">
                    <img
                        src={mes}
                        alt="mes"
                        className="w-[40px] xl:w-[56px] h-[33px] xl:h-[46px] -mt-4 xl:-mt-7 flex-shrink-0"
                    />
                    <div className="space-y-2 md:space-y-6 max-w-[480px] lg:max-w-[560px] xl:max-w-[780px]">
                        {doctor.quote}
                        <a
                            href={doctor.linkQuote}
                            className="text-[11px] md:text-[clamp(0.875rem,1.2vw,1rem)] font-semibold uppercase text-[#1D1D1D] cursor-pointer"
                        >
                            Читать статью
                        </a>
                    </div>
                </div>
            </section>

            <DoctorGallery doctor={doctor} />
            <DoctorAge doctor={doctor} />

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
                    <source src={doctor.videoFooterIm} type="video/webm" />
                    <source src={doctor.videoFooterMp} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    );
};
