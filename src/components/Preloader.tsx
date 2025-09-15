import React, { useState, useEffect } from "react";

const Preloader = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [timeoutError, setTimeoutError] = useState(false);
    const [videoDone, setVideoDone] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        // Таймер для минимального времени 6 секунд
        const timer = setTimeout(() => {
            setVideoDone(true);
        }, 6000);

        // Проверка загрузки контента
        const handleLoad = () => {
            setContentLoaded(true);
        };

        if (document.readyState === "complete") {
            setContentLoaded(true);
        } else {
            window.addEventListener("load", handleLoad);
        }

        // Блокировка скролла
        document.body.style.overflow = "hidden";

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", handleLoad);
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (videoDone) {
            if (contentLoaded) {
                setIsLoading(false);
            } else {
                setTimeoutError(true);
                document.body.style.overflow = ""; // Разблокировать скролл при ошибке, если нужно
            }
        }
    }, [videoDone, contentLoaded]);

    useEffect(() => {
        if (contentLoaded && videoDone) {
            setIsLoading(false);
        }
    }, [contentLoaded, videoDone]);

    const handleTransitionEnd = () => {
        if (!isLoading) {
            setIsVisible(false);
            document.body.style.overflow = ""; // Разблокировать скролл после скрытия
        }
    };

    return (
        <>
            {children}
            {isVisible && !timeoutError && (
                <div
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${
                        isLoading ? "opacity-100" : "opacity-0"
                    }`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/заставка.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            {timeoutError && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white text-2xl">
                    Загрузка заняла слишком много времени. Пожалуйста,
                    попробуйте обновить страницу.
                </div>
            )}
        </>
    );
};

export default Preloader;
