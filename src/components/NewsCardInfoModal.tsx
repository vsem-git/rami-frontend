import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import close from "../../public/close-n.svg";
import type { NewsItem } from "../services/news";
import { CardNewsDetail } from "./CardNewsDetail";
import { usePopup } from "./PopupContext";

export const NewsCardInfoModal = () => {
    const modalRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { isOpen, closePopup, getPopupData } = usePopup();
    const popupName = "newsCardInfo";
    const isModalOpen = isOpen(popupName);
    const newsItem: NewsItem | undefined = getPopupData(popupName)?.news;
    const [galleryExpanded, setGalleryExpanded] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const activeMainTexts = newsItem?.mainTexts ?? [];
    const activeSecondaryTexts = newsItem?.secondaryTexts ?? [];
    const activeSpeakers = newsItem?.speakersData ?? [];
    const activeGallery = (newsItem?.galleryImages ?? []).map(g => ({
        src: g.src,
        className: g.className ?? "w-full h-full object-cover",
    }));

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
                className="w-full max-w-[659px] lg:max-w-[847px] 2xl:max-w-[1253px] h-full bg-[#EAE6E0] flex flex-col translate-x-full"
            >
                <div
                    ref={scrollRef}
                    className="flex-1 min-h-0 overflow-y-auto overscroll-contain custom-scrollbar p-6 lg:p-15"
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
                        <h2 className="max-[600px]:text-[60px] text-[90px] md:text-[110px] font-normal text-[#691C32] uppercase leading-[100%]">
                            {newsItem?.day ?? "16"}
                        </h2>
                        <span className="text-[15px] font-normal text-[#691C32] uppercase">
                            {newsItem?.month ?? "октябрь"}
                        </span>
                    </div>
                </header>

                <div className="max-[600px]:mt-8 mt-[50px] xl:mt-[100px]">
                    <h3 className="max-[600px]:text-lg text-2xl lg:text-[32px] text-[#1D1D1D] font-normal uppercase max-w-[833px] leading-[125%]">
                        {newsItem?.title ?? "Откровенно о сокровенном»: public-talk с экспертами Клиники РАМИ"}
                    </h3>

                    <div className="w-full h-px bg-[#1D1D1D1F] my-4 lg:my-[30px]" />

                    {(newsItem?.image) && (
                        <img src={newsItem.image} alt="" className="w-full" />
                    )}

                    {activeMainTexts.length > 0 && (
                        <div className="w-full flex justify-start mt-12 md:mt-16 xl:mt-20">
                            <div className="w-full max-w-[520px] text-base text-[#1D1D1D] uppercase font-suisse font-semibold space-y-8 leading-[170%] max-[600px]:space-y-5 max-[600px]:text-xs">
                                {activeMainTexts.map((text, index) => (
                                    <p key={index}>{text}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {activeSpeakers.length > 0 && (
                    <div className="mt-12 xl:mt-[100px]">
                        <h4 className="max-[600px]:text-xs text-base font-suisse uppercase text-[#1D1D1D] mb-4 md:mb-7.5">
                            Темы выступлений и спикеры
                        </h4>

                        <div className="flex flex-col gap-4 md:gap-7.5">
                            {activeSpeakers.map((speaker, index) => (
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

                        {activeSecondaryTexts.length > 0 && (
                            <div className="w-full flex justify-start mt-12">
                                <div className="w-full max-w-[510px] text-base text-[#1D1D1D] uppercase font-suisse font-semibold space-y-8 leading-[170%] max-[600px]:space-y-5 max-[600px]:text-xs">
                                    {activeSecondaryTexts.map((text, index) => (
                                        <p key={index}>{text}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeGallery.length > 0 && (
                    <div className="mt-20 sm:mt-[100px]">
                        <h4 className="text-base font-suisse uppercase text-[#1D1D1D] mb-7.5">
                            галерея
                        </h4>

                        <div className="flex max-[600px]:flex-col gap-2 2xl:gap-5 max-[600px]:h-auto h-[339px] lg:h-[403px] 2xl:h-[620px]">
                            <div className={activeGallery[0].className}>
                                <img
                                    src={activeGallery[0].src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {activeGallery.length > 1 && (
                                <div className="max-[600px]:w-full w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-2 2xl:gap-5">
                                    {activeGallery.slice(1, 4).map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.src}
                                            alt=""
                                            className={image.className}
                                        />
                                    ))}
                                    {activeGallery.length > 4 && (
                                        <button
                                            onClick={() => setGalleryExpanded(true)}
                                            className="w-full h-full flex items-center justify-center border border-[#1414141F] cursor-pointer
                            relative overflow-hidden
                            before:absolute before:inset-0 before:bg-[#691C32] before:opacity-0
                            hover:before:opacity-10 before:transition-opacity before:duration-300"
                                        >
                                            <span className="text-2xl font-medium text-[#1D1D1D] relative z-10 hover:text-[#691C32] transition-colors duration-300">
                                                {activeGallery.length - 4}+
                                            </span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Expanded Gallery Modal */}
                {galleryExpanded && (
                    <div
                        className="fixed inset-0 bg-black/90 z-[100000] flex items-center justify-center p-4"
                        onClick={() => setGalleryExpanded(false)}
                    >
                        <button
                            onClick={() => setGalleryExpanded(false)}
                            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors z-10"
                        >
                            <img src={close} alt="" className="w-6 h-6 invert" />
                        </button>

                        <div
                            className="w-full max-w-6xl h-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 2xl:gap-5 p-4">
                                {activeGallery.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                                        onClick={() => setSelectedImage(image.src)}
                                    >
                                        <img
                                            src={image.src}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Fullscreen Image Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/95 z-[100001] flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors z-10"
                        >
                            <img src={close} alt="" className="w-6 h-6 invert" />
                        </button>

                        <img
                            src={selectedImage}
                            alt=""
                            className="max-w-full max-h-full w-auto h-auto object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};
