// src/UnderConstruction.tsx
import { useEffect } from "react";

function toggleBypass() {
    const key = "uc_bypass";
    const on = localStorage.getItem(key) === "1";
    if (on) localStorage.removeItem(key);
    else localStorage.setItem(key, "1");
    location.reload();
}

export default function UnderConstruction() {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const ctrlOrCmd = e.ctrlKey || e.metaKey;
            if (ctrlOrCmd && e.altKey && e.key.toLowerCase() === "u") {
                e.preventDefault();
                toggleBypass();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center px-6">
                <img
                    src="/logo.svg"
                    alt="Logo"
                    className="mx-auto mb-6 w-28 h-28 object-contain"
                    loading="eager"
                />
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-black">
                    Сайт в разработке
                </h1>
                <p className="mt-2 text-[#7A7A7A]">Мы скоро вернёмся с обновлениями.</p>
            </div>
        </main>
    );
}
