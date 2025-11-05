import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useCallback, useLayoutEffect, useRef } from "react";
import { usePopup } from "./PopupContext";

interface ModalPanelProps {
    popupName: string;
    title: string;
    content: React.ReactNode;
}

const ModalPanel = ({ popupName, title, content }: ModalPanelProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const { isOpen, closePopup } = usePopup();
    const isModalOpen = isOpen(popupName);

    const handleClose = useCallback(() => {
        closePopup(popupName);
    }, [closePopup, popupName]);

    const handleOverlayClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) handleClose();
        },
        [handleClose]
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
            }
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
            // ⛔ Блокируем фоновый скролл ScrollSmoother
            smoother?.paused(true);
            document.body.style.overflow = "hidden";
            showModal();
        } else {
            // ✅ Возобновляем ScrollSmoother
            smoother?.paused(false);
            document.body.style.overflow = "";
            hideModal();
        }
    }, [isModalOpen, showModal, hideModal]);

    return (
        <div
            ref={modalRef}
            className="fixed top-0 left-0 w-full h-screen hidden z-50"
        >
            <div
                className="absolute top-0 left-0 w-full h-full bg-[#1D1D1D80]"
                onClick={handleOverlayClick}
            />

            <div
                ref={panelRef}
                className="relative z-10 w-full max-w-full sm:max-w-[384px] md:max-w-[496px] lg:max-w-[640px] xl:max-w-[960px] h-full bg-[#691C32] ml-auto flex flex-col overscroll-contain"
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 sm:top-1/2 right-4 sm:-left-10 transform -translate-y-none sm:-translate-y-1/2 -translate-x-none sm:-translate-x-1/2 flex items-center justify-center rounded-full border border-white border-opacity-20 cursor-pointer z-20 w-8 sm:w-16 h-8 sm:h-16"
                    aria-label="Закрыть модальное окно"
                >
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.5"
                            y="0.5"
                            width="47"
                            height="47"
                            rx="23.5"
                            stroke="white"
                            strokeOpacity="0.1"
                        />
                        <path
                            d="M30.75 17.25L24 24M17.25 30.75L24 24M24 24L17.25 17.25L30.75 30.75"
                            stroke="white"
                            strokeWidth="1.5"
                        />
                    </svg>
                </button>

                {/* Внутренняя прокрутка */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-4 md:px-16 lg:px-20 xl:px-[120px]">
                    <h3 className="text-[20px] md:text-[24px] xl:text-[36px] text-white leading-[125%] uppercase mt-16 md:mt-[80px] mb-12 xl:mb-20">
                        {title}
                    </h3>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ModalPanel;
