import { useCallback, useEffect, useRef, useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { ContentPanel } from "./ContentPanel";
import { DoctorsPanel } from "./DoctorsPanel";
import { NewsPanel } from "./NewsPanel";
import { SeoPanel } from "./SeoPanel";
import { NavigationPanel } from "./NavigationPanel";
import { RebuildButton } from "./RebuildButton";

// ── Floating labels overlay ───────────────────────────────────────────────────


// ── AdminBar ──────────────────────────────────────────────────────────────────

export const AdminBar = () => {
    const { isEditMode, user, logout } = useAdmin();
    const [isSeoOpen, setIsSeoOpen] = useState(false);
    const [isContentOpen, setIsContentOpen] = useState(false);
    const [isNewsOpen, setIsNewsOpen] = useState(false);
    const [isDoctorsOpen, setIsDoctorsOpen] = useState(false);
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [hintsVisible, setHintsVisible] = useState(true);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Copy ID on click when hints are visible
    useEffect(() => {
        if (!isEditMode) return;
        const handler = (e: MouseEvent) => {
            if (!document.body.classList.contains("edit-hints-hidden")) {
                const el = (e.target as HTMLElement).closest<HTMLElement>(
                    "[data-content-id], [data-content-hint]",
                );
                if (el && !el.closest("[data-admin-ui]")) {
                    const id = el.getAttribute("data-content-id") || el.getAttribute("data-content-hint");
                    if (id) navigator.clipboard.writeText(id).catch(() => {});
                }
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, [isEditMode]);

    const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.preventDefault();

        const rect = panelRef.current!.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const onMove = (ev: MouseEvent) => {
            const x = Math.max(0, Math.min(window.innerWidth - rect.width, ev.clientX - offsetX));
            const y = Math.max(0, Math.min(window.innerHeight - rect.height, ev.clientY - offsetY));
            setPos({ x, y });
        };
        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    }, []);

    if (!isEditMode) return null;

    const panelStyle: React.CSSProperties = pos
        ? { position: "fixed", left: pos.x, top: pos.y }
        : { position: "fixed", bottom: 24, right: 24 };

    return (
        <>
            <style>{`
                [data-content-hint], [data-content-id] {
                    outline: 1.5px dashed rgba(105,28,50,0.45);
                    outline-offset: 1px;
                    cursor: copy;
                }
                /* position:relative only for text nodes — image containers are already
                   absolute/fixed and must not be overridden */
                [data-content-hint]:not([data-content-hint-type="image"]),
                [data-content-id] {
                    position: relative;
                }
                [data-content-hint]:not([data-content-hint-type="image"])::before {
                    content: attr(data-content-hint);
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    margin-bottom: 2px;
                    background: #1D1D1D;
                    color: #fff;
                    font-family: monospace;
                    font-size: 8px;
                    line-height: 1;
                    padding: 2px 6px;
                    border-radius: 2px;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 99990;
                }
                /* image containers are already positioned — label sits inside top-left */
                [data-content-hint][data-content-hint-type="image"]::before {
                    content: attr(data-content-hint);
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    background: #1D1D1D;
                    color: #fff;
                    font-family: monospace;
                    font-size: 8px;
                    line-height: 1;
                    padding: 2px 6px;
                    border-radius: 2px;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 99990;
                }
                [data-content-id]::before {
                    content: attr(data-content-id);
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    margin-bottom: 2px;
                    background: #1D1D1D;
                    color: #fff;
                    font-family: monospace;
                    font-size: 8px;
                    line-height: 1;
                    padding: 2px 6px;
                    border-radius: 2px;
                    white-space: nowrap;
                    pointer-events: none;
                    z-index: 99990;
                }
                body.edit-hints-hidden [data-content-hint],
                body.edit-hints-hidden [data-content-id] {
                    outline: none;
                    cursor: auto;
                }
                body.edit-hints-hidden [data-content-hint]::before,
                body.edit-hints-hidden [data-content-id]::before {
                    display: none;
                }
            `}</style>

            <div
                ref={panelRef}
                data-admin-ui
                style={{ ...panelStyle, zIndex: 99997, minWidth: 220 }}
                className="bg-white border border-black/12 shadow-[0_4px_20px_rgba(0,0,0,0.18)] rounded-lg overflow-hidden select-none"
            >
                {/* Drag handle / header */}
                <div
                    onMouseDown={handleDragStart}
                    className="flex items-center gap-2 px-3 py-2 bg-[#691C32] cursor-grab active:cursor-grabbing"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white" className="opacity-50 shrink-0">
                        <circle cx="2" cy="2" r="1"/><circle cx="5" cy="2" r="1"/><circle cx="8" cy="2" r="1"/>
                        <circle cx="2" cy="5" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="8" cy="5" r="1"/>
                        <circle cx="2" cy="8" r="1"/><circle cx="5" cy="8" r="1"/><circle cx="8" cy="8" r="1"/>
                    </svg>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white flex-1">
                        Редактирование
                    </span>

                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />

                    <button
                        onClick={() => setCollapsed((v) => !v)}
                        className="w-5 h-5 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
                        title={collapsed ? "Развернуть" : "Свернуть"}
                    >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                            {collapsed ? <path d="M2 7l3-4 3 4" /> : <path d="M2 3l3 4 3-4" />}
                        </svg>
                    </button>
                </div>

                {/* Body */}
                {!collapsed && (
                    <div className="flex items-center gap-1 px-2 py-2">
                        <button
                            onClick={() => setIsContentOpen(true)}
                            className="text-[10px] text-[#1D1D1D]/70 hover:text-[#691C32] uppercase tracking-widest transition-colors cursor-pointer px-2 py-1 hover:bg-black/4 rounded"
                        >
                            Контент
                        </button>

                        <button
                            onClick={() => setIsSeoOpen(true)}
                            className="text-[10px] text-[#1D1D1D]/70 hover:text-[#691C32] uppercase tracking-widest transition-colors cursor-pointer px-2 py-1 hover:bg-black/4 rounded"
                        >
                            SEO
                        </button>

                        <button
                            onClick={() => setIsNewsOpen(true)}
                            className="text-[10px] text-[#1D1D1D]/70 hover:text-[#691C32] uppercase tracking-widest transition-colors cursor-pointer px-2 py-1 hover:bg-black/4 rounded"
                        >
                            Новости
                        </button>

                        <button
                            onClick={() => setIsDoctorsOpen(true)}
                            className="text-[10px] text-[#1D1D1D]/70 hover:text-[#691C32] uppercase tracking-widest transition-colors cursor-pointer px-2 py-1 hover:bg-black/4 rounded"
                        >
                            Врачи
                        </button>

                        <button
                            onClick={() => setIsNavigationOpen(true)}
                            className="text-[10px] text-[#1D1D1D]/70 hover:text-[#691C32] uppercase tracking-widest transition-colors cursor-pointer px-2 py-1 hover:bg-black/4 rounded"
                        >
                            Навигация
                        </button>

                        {/* Hints toggle */}
                        <button
                            onClick={() => {
                                const next = !hintsVisible;
                                setHintsVisible(next);
                                document.body.classList.toggle("edit-hints-hidden", !next);
                            }}
                            title={hintsVisible ? "Скрыть метки" : "Показать метки"}
                            className={[
                                "w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer ml-1",
                                hintsVisible
                                    ? "text-[#691C32] bg-[#691C32]/8"
                                    : "text-black/30 hover:text-black/60 hover:bg-black/4",
                            ].join(" ")}
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {hintsVisible ? (
                                    <><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M9 8h1v8H9M13 8h2.5a2.5 2.5 0 0 1 0 5H13"/></>
                                ) : (
                                    <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="2" y1="2" x2="22" y2="22"/></>
                                )}
                            </svg>
                        </button>

                        <RebuildButton />

                        <span className="flex-1" />

                        {user?.email && (
                            <span className="text-[9px] text-black/30 max-w-[100px] truncate hidden sm:block">
                                {user.email}
                            </span>
                        )}

                        <button
                            onClick={logout}
                            className="text-[10px] text-[#1D1D1D]/40 hover:text-red-500 uppercase tracking-widest transition-colors cursor-pointer px-2 py-1 hover:bg-black/4 rounded"
                        >
                            Выйти
                        </button>
                    </div>
                )}
            </div>

            <ContentPanel isOpen={isContentOpen} onClose={() => setIsContentOpen(false)} />
            <SeoPanel isOpen={isSeoOpen} onClose={() => setIsSeoOpen(false)} />
            <NewsPanel isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
            <DoctorsPanel isOpen={isDoctorsOpen} onClose={() => setIsDoctorsOpen(false)} />
            <NavigationPanel isOpen={isNavigationOpen} onClose={() => setIsNavigationOpen(false)} />
        </>
    );
};
