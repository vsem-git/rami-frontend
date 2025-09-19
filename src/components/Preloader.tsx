import React, { useState, useEffect } from "react";

const Preloader = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
<<<<<<< HEAD
=======
    const [timeoutError, setTimeoutError] = useState(false);
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
    const [videoDone, setVideoDone] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
<<<<<<< HEAD
        // Timer for minimum video duration of 6 seconds
=======
        // Таймер для минимального времени 6 секунд
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
        const timer = setTimeout(() => {
            setVideoDone(true);
        }, 6000);

<<<<<<< HEAD
        // Check for content loading
=======
        // Проверка загрузки контента
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
        const handleLoad = () => {
            setContentLoaded(true);
        };

        if (document.readyState === "complete") {
            setContentLoaded(true);
        } else {
            window.addEventListener("load", handleLoad);
        }

<<<<<<< HEAD
        // Lock scroll
=======
        // Блокировка скролла
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
        document.body.style.overflow = "hidden";

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", handleLoad);
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
<<<<<<< HEAD
        if (videoDone && contentLoaded) {
            setIsLoading(false);
        }
    }, [videoDone, contentLoaded]);

    const handleTransitionEnd = () => {
        if (!isLoading) {
            setIsVisible(false);
            document.body.style.overflow = ""; // Unlock scroll after hiding
=======
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
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
        }
    };

    return (
        <>
            {children}
<<<<<<< HEAD
            {isVisible && (
                <div
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#5c182a] transition-opacity duration-1000 ${
=======
            {isVisible && !timeoutError && (
                <div
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-1000 ${
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
                        isLoading ? "opacity-100" : "opacity-0"
                    }`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <video
                        autoPlay
                        muted
                        playsInline
<<<<<<< HEAD
                        className="w-full h-auto object-cover"
=======
                        className="w-full h-full object-cover"
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
                    >
                        <source src="/заставка.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
<<<<<<< HEAD
=======
            {timeoutError && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white text-2xl">
                    Загрузка заняла слишком много времени. Пожалуйста,
                    попробуйте обновить страницу.
                </div>
            )}
>>>>>>> 2bc749acb85bb64ef425842cd79cebdb7a0972c1
        </>
    );
};

export default Preloader;
