import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useCallback, useLayoutEffect, useRef } from "react";
import close from "../../public/close-n.svg";
import {
    galleryImages,
    headerDate,
    mainTexts,
    secondaryTexts,
    speakersData,
} from "../shared/data/news";
import { CardNewsDetail } from "./CardNewsDetail";
import { usePopup } from "./PopupContext";

export const NewsCardInfoModal = () => {
    const modalRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const { isOpen, closePopup } = usePopup();
    const popupName = "newsCardInfo";
    const isModalOpen = isOpen(popupName);

    const handleClose = useCallback(() => {
        closePopup(popupName);
    }, [closePopup, popupName]);

    const handleOverlayClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) handleClose();
        },
        [handleClose],
    );

    const showModal = useCallback(() => {
        const modal = modalRef.current;
        const panel = panelRef.current;
        if (!modal || !panel) return;

        gsap.set(modal, { display: "flex" });
        gsap.fromTo(
            panel,
            { x: "100%" },
            {
                x: "0%",
                duration: 0.5,
                ease: "power2.out",
            },
        );
    }, []);

    const hideModal = useCallback(() => {
        const modal = modalRef.current;
        const panel = panelRef.current;
        if (!modal || !panel) return;

        gsap.to(panel, {
            x: "100%",
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                gsap.set(modal, { display: "none" });
            },
        });
    }, []);

    useLayoutEffect(() => {
        const smoother = ScrollSmoother.get();

        if (isModalOpen) {
            smoother?.paused(true);
            document.body.style.overflow = "hidden";
            showModal();
        } else {
            smoother?.paused(false);
            document.body.style.overflow = "";
            hideModal();
        }
    }, [isModalOpen, showModal, hideModal]);

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 bg-black/50 z-99999 justify-end hidden"
            onClick={handleOverlayClick}
        >
            <div
                ref={panelRef}
                className="w-full max-w-[1253px] bg-[#EAE6E0] p-15 overflow-scroll custom-scrollbar translate-x-full"
            >
                <header className="flex items-center justify-between">
                    <button
                        onClick={handleClose}
                        className="group w-12 h-12 rounded-full bg-[#1414140D] flex items-center justify-center cursor-pointer p-1 
             hover:bg-[#691C32] hover:scale-102 hover:rotate-90 transition-all duration-500"
                    >
                        <img
                            src={close}
                            alt=""
                            className="transition-all duration-500 group-hover:brightness-0 group-hover:invert group-hover:scale-90"
                        />
                    </button>

                    <div className="text-end">
                        <h2 className="text-[110px] font-normal text-[#691C32] uppercase leading-[100%]">
                            {headerDate.day}
                        </h2>
                        <span className="text-[15px] font-normal text-[#691C32] uppercase">
                            {headerDate.month}
                        </span>
                    </div>
                </header>

                <div className="mt-[100px]">
                    <h3 className="text-[32px] text-[#1D1D1D] font-normal uppercase max-w-[833px] leading-[125%]">
                        Откровенно о сокровенном»: public-talk с экспертами
                        Клиники РАМИ
                    </h3>

                    <div className="w-full h-px bg-[#1D1D1D1F] my-[30px]" />

                    <img src="news/5.webp" alt="" className="w-full" />

                    <div className="w-full flex justify-end mt-20 ">
                        <div className="w-full max-w-[520px] text-base text-[#1D1D1D] uppercase font-suisse font-semibold space-y-8">
                            {mainTexts.map((text, index) => (
                                <p key={index}>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-[100px]">
                    <h4 className="text-base font-suisse uppercase text-[#1D1D1D] mb-7.5">
                        Темы выступлений и спикеры
                    </h4>

                    <div className="flex flex-col gap-7.5">
                        {speakersData.map((speaker, index) => (
                            <div key={index}>
                                <CardNewsDetail
                                    type="number"
                                    number={speaker.number}
                                    title={speaker.title}
                                />

                                <CardNewsDetail
                                    type="avatar"
                                    avatarSrc={speaker.avatar}
                                    name={speaker.name}
                                    description={speaker.description}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="w-full flex justify-end mt-12 ">
                        <div className="w-full max-w-[510px] text-base text-[#1D1D1D] uppercase font-suisse font-semibold space-y-8">
                            {secondaryTexts.map((text, index) => (
                                <p key={index}>{text}</p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-[100px]">
                    <h4 className="text-base font-suisse uppercase text-[#1D1D1D] mb-7.5">
                        галерея
                    </h4>

                    <div className="flex gap-5 h-[620px] overflow-hidden">
                        <div className={galleryImages[0].className}>
                            <img
                                src={galleryImages[0].src}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-5">
                            {galleryImages.slice(1).map((image, index) => (
                                <img
                                    key={index}
                                    src={image.src}
                                    alt=""
                                    className={image.className}
                                />
                            ))}
                            <div
                                className="w-full h-full flex items-center justify-center border border-[#1414141F] cursor-pointer 
                relative overflow-hidden
                before:absolute before:inset-0 before:bg-[#691C32] before:opacity-0 
                hover:before:opacity-10 before:transition-opacity before:duration-300"
                            >
                                <span
                                    className="text-2xl font-medium text-[#1D1D1D] relative z-10 
                   hover:text-[#691C32] transition-colors duration-300"
                                >
                                    22+
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
