import React, { useState, useEffect } from "react";

const Preloader = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    const [videoDone, setVideoDone] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {
        // Timer for minimum video duration of 6 seconds
        const timer = setTimeout(() => {
            setVideoDone(true);
        }, 8000);

        // Check for content loading
        const handleLoad = () => {
            setContentLoaded(true);
        };

        if (document.readyState === "complete") {
            setContentLoaded(true);
        } else {
            window.addEventListener("load", handleLoad);
        }

        // Lock scroll
        document.body.style.overflow = "hidden";

        return () => {
            clearTimeout(timer);
            window.removeEventListener("load", handleLoad);
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (videoDone && contentLoaded) {
            setIsLoading(false);
        }
    }, [videoDone, contentLoaded]);

    const handleTransitionEnd = () => {
        if (!isLoading) {
            setIsVisible(false);
            document.body.style.overflow = ""; // Unlock scroll after hiding
        }
    };

    return (
        <>
            {children}
            {isVisible && (
                <div
                    className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#5c182a] transition-opacity duration-1000 ${
                        isLoading ? "opacity-100" : "opacity-0"
                    }`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <video
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-auto object-cover"
                    >
                        <source src="/заставка.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </>
    );
};

export default Preloader;
