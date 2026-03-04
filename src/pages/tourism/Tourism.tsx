import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FormTourism } from "../../components/FormTourism";
import { GeniusLociSpeech } from "../../components/GeniusLociSpeech";
import { InfoSafetyNew } from "../../components/InfoSafetyNew";
import { MedicalTourProgram } from "../../components/MedicalTourProgram";
import { MedicineCultureHub } from "../../components/MedicineCultureHub ";
import { RecommendedExperience } from "../../components/RecommendedExperience";
import SecondAnimationBlock from "../../components/SecondAnimationBlock/SecondAnimationBlock";
import ThirdAndSecondAnimation from "../../components/ThirdAnimationWrapper/ThirdBlock";
import { TourismSafety } from "../../components/TourismSafety";
import { WelcomeTourism } from "../../components/WelcomeTourism";
import {
    tourismAdvantagesData,
    tourismSafetyCards,
    tourismSecondBlockData,
} from "../../shared/data/tourism";
import { MedicalTourProgramMobile } from '../../components/MedicalTourProgramMobile'

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const Tourism = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const safetyContainerRef = useRef<HTMLDivElement>(null);
    const block3Ref = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const safetyTlRef = useRef<gsap.core.Timeline | null>(null);

    const customGradient =
        "linear-gradient(180deg, rgba(29, 29, 29, 0.54) 0%, rgba(29, 29, 29, .20) 100%)";

    useGSAP(() => {
        if (!containerRef.current) return;

        tlRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: true,
            },
        });
    }, []);

    useGSAP(() => {
        if (!safetyContainerRef.current) return;

        if (window.innerWidth <= 768) return;

        const items = gsap.utils.toArray(".safety-item") as Element[];

        gsap.set(items, { opacity: 0, x: -50 });

        safetyTlRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: safetyContainerRef.current,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                fastScrollEnd: true,
            },
        });

        items.forEach((item, index) => {
            safetyTlRef.current?.to(
                item,
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.2,
                    ease: "power1.out",
                },
                index * 0.15,
            );
        });
    }, []);

    return (
        <div>
            <WelcomeTourism />
            <MedicineCultureHub />
            <GeniusLociSpeech />

            <div className="mt-20 2xl:my-50">
                <ThirdAndSecondAnimation
                    isShowBlockDoctors={false}
                    cardsData={tourismAdvantagesData}
                    classNameTop='h-[100px]! '
                />
                <img
                    src="tourism/running-stroke-logo.png"
                    alt="Running Stroke Logo"
                    className="w-full max-w-50 mx-auto mt-8"
                />
            </div>

            <MedicalTourProgram />
            <MedicalTourProgramMobile />
            <div
                ref={containerRef}
                className="min-h-screen will-change-transform relative overflow-hidden"
            >
                <SecondAnimationBlock
                    ref={block3Ref as React.RefObject<HTMLDivElement>}
                    sections={tourismSecondBlockData}
                />
            </div>

            <div className="relative min-h-screen">
                <div className="relative z-10">
                    <ThirdAndSecondAnimation
                        isShowBlockCards={false}
                        isTeamDescription={false}
                    />
                </div>
                <img
                    src="/pattern1.svg"
                    alt=""
                    className="w-1/2 md:w-[40%] xl:w-[30%] absolute right-0 top-0 hidden sm:block"
                />
                <img
                    src="/pattern2.svg"
                    alt=""
                    className="w-full sm:w-1/2 md:w-[40%] xl:w-[30%] absolute left-0 top-0 "
                />
            </div>

            <div
                ref={safetyContainerRef}
                className="min-h-[85vh] sm:min-h-[90vh] md:min-h-screen will-change-transform relative overflow-hidden"
            >
                <TourismSafety />
            </div>

            <InfoSafetyNew
                cards={tourismSafetyCards}
                overlayGradient={customGradient}
            />

            <RecommendedExperience />
            <FormTourism />
        </div>
    );
};
