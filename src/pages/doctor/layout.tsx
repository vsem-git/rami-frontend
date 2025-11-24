import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ContactPopUp from "../../components/ContactPopUp";
import { DoctorCardModal } from "../../components/DoctorCardModal";
import { DoctorResultEffect } from "../../components/DoctorResultEffect";
import EducationPanel from "../../components/EducationPanel";
import ExperiencePanel from "../../components/ExperiencePanel";
import Footer from "../../components/Footer";
import { HeaderProvider } from "../../components/HeaderContext";
import HeaderUpdate from "../../components/HeaderUpdate";
import { PopupProvider, usePopup } from "../../components/PopupContext";
import ScrollSmoother from "../../components/ScrollSmoother";
import { POPUP_NAMES } from "../../constants/popupNames";

gsap.registerPlugin(ScrollTrigger);

const LayoutContent = () => {
    const { isOpen } = usePopup();
    const [useWhiteText, setUseWhiteText] = useState(false);

    const isAnyPopupOpen =
        isOpen(POPUP_NAMES.CONTACT) ||
        isOpen(POPUP_NAMES.DOCTOR_CARD) ||
        isOpen(POPUP_NAMES.DOCTORS_EDUCATION) ||
        isOpen(POPUP_NAMES.DOCTORS_EXPERIENCE);

    useEffect(() => {
        const welcomeSection = document.querySelector(
            '[aria-label="Приветствие и информация о докторе"]'
        );
        const cardsSection = document.querySelector(
            '[aria-label="Фоновое изображение"]'
        );
        const videoSection = document.querySelector("video");
        const contactFooterSection = document.querySelector(
            ".contact-footer-trigger"
        );
        const footerSection = document.querySelector(".footer-content");
        const smootherWrapper = document.querySelector(".smooth-wrapper");

        if (!welcomeSection) return;

        const triggers: ScrollTrigger[] = [];

        triggers.push(
            ScrollTrigger.create({
                trigger: welcomeSection,
                start: "top top",
                end: "bottom top",
                onEnter: () => setUseWhiteText(false),
                onLeaveBack: () => setUseWhiteText(true),
                scroller: smootherWrapper,
            })
        );

        if (cardsSection) {
            triggers.push(
                ScrollTrigger.create({
                    trigger: cardsSection,
                    start: "center center",
                    end: "bottom top",
                    onEnter: () => setUseWhiteText(true),
                    onLeaveBack: () => setUseWhiteText(true),
                    scroller: smootherWrapper,
                })
            );
        }

        if (videoSection) {
            triggers.push(
                ScrollTrigger.create({
                    trigger: videoSection,
                    start: "top center",
                    onEnter: () => setUseWhiteText(true),
                    onLeaveBack: () => setUseWhiteText(false),
                    scroller: smootherWrapper,
                })
            );
        }

        if (contactFooterSection) {
            triggers.push(
                ScrollTrigger.create({
                    trigger: contactFooterSection,
                    start: "top center",
                    onEnter: () => setUseWhiteText(false),
                    onLeaveBack: () => setUseWhiteText(true),
                    scroller: smootherWrapper,
                })
            );
        }

        if (footerSection) {
            triggers.push(
                ScrollTrigger.create({
                    trigger: footerSection,
                    start: "top center",
                    onEnter: () => setUseWhiteText(true),
                    onLeaveBack: () => setUseWhiteText(false),
                    scroller: smootherWrapper,
                })
            );
        }

        return () => {
            triggers.forEach((t) => t.kill());
        };
    }, []);

    const location = useLocation();

    useEffect(() => {}, [location.pathname]);

    return (
        <>
            <div className="bgpattern1 fixed top-0 right-0 h-full hidden sm:block z-[0]">
                <img
                    src="/pattern1.svg"
                    alt="teambg"
                    className="h-full object-cover overflow-visible"
                />
            </div>
            <div className="bgpattern2 fixed top-0 left-0 h-full hidden sm:block z-[0]">
                <img
                    src="/pattern2.svg"
                    alt="teambg"
                    className="h-full object-cover overflow-visible"
                />
            </div>
            <ContactPopUp />
            <DoctorCardModal />
            <DoctorResultEffect />
            <EducationPanel />
            <ExperiencePanel />

            {!isAnyPopupOpen && <HeaderUpdate useWhiteText={useWhiteText} />}

            <ScrollSmoother>
                <Outlet />
                <Footer />
            </ScrollSmoother>
        </>
    );
};

const Layout = () => {
    return (
        <PopupProvider>
            <HeaderProvider>
                <LayoutContent />
            </HeaderProvider>
        </PopupProvider>
    );
};

export default Layout;
