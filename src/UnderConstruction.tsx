// src/UnderConstruction.tsx
import { useEffect } from "react";

function toggleBypass() {
    const k = "uc_bypass";
    const on = localStorage.getItem(k) === "1";
    if (on) localStorage.removeItem(k);
    else localStorage.setItem(k, "1");
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
        window.addEventListener("keydown", onKey, { passive: false });
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center bg-white text-black antialiased">
            <style>{`
  /* Более сильный зум с мягким оверсутом */
  @keyframes uc-logo-intro {
    0%   { opacity: 0; transform: translateY(12px) scale(0.86); filter: blur(4px); }
    55%  { opacity: 1; transform: translateY(0)    scale(1.08); filter: blur(0.3px); }
    100% { opacity: 1; transform: translateY(0)    scale(1.00); filter: blur(0); }
  }
  /* Чуть заметное «дыхание» после появления — чуть сильнее */
  @keyframes uc-logo-idle {
    0%   { transform: translateY(0px) scale(1.000); }
    100% { transform: translateY(-1.5px) scale(1.020); }
  }

  @keyframes uc-text-up {
    0%   { opacity: 0; transform: translateY(8px); letter-spacing: 0.02em; }
    100% { opacity: 1; transform: translateY(0);   letter-spacing: 0.01em; }
  }
  @keyframes uc-sub-up {
    0%   { opacity: 0; transform: translateY(6px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .uc-logo {
    animation:
      uc-logo-intro 1700ms cubic-bezier(.16,.64,.24,1) both,
      uc-logo-idle  5200ms ease-in-out 1900ms infinite alternate;
    will-change: transform, opacity, filter;
  }
  .uc-h1 { animation: uc-text-up 950ms cubic-bezier(.16,.64,.24,1) 340ms both; }
  .uc-p  { animation: uc-sub-up  950ms ease-out 620ms both; }

  .uc-black-soft { color: rgba(0,0,0,0.9); }

  @media (prefers-reduced-motion: reduce) {
    .uc-logo, .uc-h1, .uc-p { animation: none !important; }
    .uc-logo { filter: none !important; transform: none !important; opacity: 1 !important; }
  }
`}</style>

            <div className="text-center px-6">
                <img
                    src="/logo_black.webp"
                    alt="Logo"
                    className="uc-logo mx-auto mb-8 w-44 h-44 md:w-52 md:h-52 object-contain"
                    loading="eager"
                    decoding="async"
                />

                <h1 className="uc-h1 uc-black-soft uppercase text-[30px] md:text-[34px] font-medium tracking-[0.01em] leading-tight">
                    Сайт в разработке
                </h1>
                <p className="uc-p mt-3 text-[#7A7A7A] uppercase text-[15px] md:text-[16px] leading-relaxed">
                    Мы скоро вернёмся с обновлениями.
                </p>
            </div>
        </main>
    );
}
