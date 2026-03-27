import { useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface ToolbarAction {
    label: string;
    execute: () => void;
}

interface EditableToolbarProps {
    targetRef: RefObject<HTMLElement | null>;
    fieldId: string;
    saveStatus: SaveStatus;
    isOverridden: boolean;
    onReset: () => void;
    onKeepAlive: () => void;
    onContentChange: (html: string) => void;
    action?: ToolbarAction;
}

export const EditableToolbar = ({
    targetRef,
    fieldId,
    saveStatus,
    isOverridden,
    onReset,
    onKeepAlive,
    onContentChange,
    action,
}: EditableToolbarProps) => {
    const [rect, setRect] = useState<DOMRect | null>(null);
    const rafRef = useRef<number>(undefined);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const [toolbarWidth, setToolbarWidth] = useState(360);

    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);

    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");
    const savedRangeRef = useRef<Range | null>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);

    // Track element position
    useEffect(() => {
        const update = () => {
            if (targetRef.current) {
                setRect(targetRef.current.getBoundingClientRect());
            }
            rafRef.current = requestAnimationFrame(update);
        };
        rafRef.current = requestAnimationFrame(update);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [targetRef]);

    // Track format state on selection change
    useEffect(() => {
        const updateFormats = () => {
            try {
                setIsBold(document.queryCommandState("bold"));
                setIsItalic(document.queryCommandState("italic"));
                setIsUnderline(document.queryCommandState("underline"));
            } catch {
                // ignore in case document is not editable
            }
        };
        document.addEventListener("selectionchange", updateFormats);
        return () => document.removeEventListener("selectionchange", updateFormats);
    }, []);

    if (!rect) return null;

    const toolbarHeight = isLinkOpen ? 76 : 38;
    const top = rect.top - toolbarHeight - 6;
    const isAboveViewport = top < 4;
    const finalTop = isAboveViewport ? rect.bottom + 6 : top;
    const finalLeft = Math.min(Math.max(rect.left, 4), window.innerWidth - toolbarWidth - 4);

    const execFormat = (command: string) => {
        targetRef.current?.focus();
        document.execCommand(command);
        if (targetRef.current) onContentChange(targetRef.current.innerHTML);
    };

    const handleLinkMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            savedRangeRef.current = sel.getRangeAt(0).cloneRange();
        }
        if (isLinkOpen) {
            setIsLinkOpen(false);
            return;
        }
        setLinkUrl("");
        setIsLinkOpen(true);
        setTimeout(() => linkInputRef.current?.focus(), 30);
    };

    const applyLink = () => {
        const url = linkUrl.trim();
        if (!url || !targetRef.current || !savedRangeRef.current || savedRangeRef.current.collapsed) {
            setIsLinkOpen(false);
            return;
        }
        const fullUrl = url.startsWith("http") ? url : `https://${url}`;

        targetRef.current.focus();
        const sel = window.getSelection();
        if (sel && savedRangeRef.current) {
            sel.removeAllRanges();
            sel.addRange(savedRangeRef.current);
        }
        document.execCommand("createLink", false, fullUrl);

        // Set target="_blank" on newly created links without it
        targetRef.current.querySelectorAll("a:not([target])").forEach((a) => {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
        });

        onContentChange(targetRef.current.innerHTML);
        setIsLinkOpen(false);
        savedRangeRef.current = null;
    };

    const removeLink = () => {
        if (!targetRef.current) return;
        targetRef.current.focus();
        if (savedRangeRef.current) {
            const sel = window.getSelection();
            if (sel) {
                sel.removeAllRanges();
                sel.addRange(savedRangeRef.current);
            }
        }
        document.execCommand("unlink");
        onContentChange(targetRef.current.innerHTML);
        setIsLinkOpen(false);
        savedRangeRef.current = null;
    };

    const btn =
        "w-6 h-6 flex items-center justify-center rounded text-xs font-medium transition-colors cursor-pointer select-none";
    const btnOff = "text-[#1D1D1D] hover:bg-black/8";
    const btnOn = "bg-[#691C32] text-white";

    return createPortal(
        <div
            ref={(node) => {
                (toolbarRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                if (node) setToolbarWidth(node.offsetWidth);
            }}
            style={{
                position: "fixed",
                top: finalTop,
                left: finalLeft,
                zIndex: 99998,
                pointerEvents: "auto",
            }}
            className="flex flex-col bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] border border-black/10 whitespace-nowrap"
            onMouseDown={(e) => e.preventDefault()}
        >
            {/* Main row */}
            <div className="flex items-center gap-1 px-2 py-1.5">
                {/* Field ID */}
                <span className="font-mono text-[9px] text-white bg-[#1D1D1D] px-1.5 py-0.5 rounded leading-none">
                    {fieldId}
                </span>

                <span className="w-px h-4 bg-black/10 mx-0.5" />

                {/* Bold */}
                <button
                    onMouseDown={(e) => { e.preventDefault(); execFormat("bold"); }}
                    className={`${btn} ${isBold ? btnOn : btnOff} font-bold`}
                    title="Жирный (Ctrl+B)"
                >
                    B
                </button>
                {/* Italic */}
                <button
                    onMouseDown={(e) => { e.preventDefault(); execFormat("italic"); }}
                    className={`${btn} ${isItalic ? btnOn : btnOff} italic`}
                    title="Курсив (Ctrl+I)"
                >
                    I
                </button>
                {/* Underline */}
                <button
                    onMouseDown={(e) => { e.preventDefault(); execFormat("underline"); }}
                    className={`${btn} ${isUnderline ? btnOn : btnOff} underline`}
                    title="Подчёркнутый (Ctrl+U)"
                >
                    U
                </button>

                <span className="w-px h-4 bg-black/10 mx-0.5" />

                {/* Link */}
                <button
                    onMouseDown={handleLinkMouseDown}
                    className={`${btn} ${isLinkOpen ? btnOn : btnOff}`}
                    title="Вставить ссылку"
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </button>

                <span className="w-px h-4 bg-black/10 mx-0.5" />

                {/* Save status */}
                <span
                    className={[
                        "text-[10px] transition-opacity duration-300 min-w-[64px]",
                        saveStatus === "idle" && "opacity-0",
                        saveStatus === "saving" && "text-black/40",
                        saveStatus === "saved" && "text-emerald-600",
                        saveStatus === "error" && "text-red-500",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    {saveStatus === "saving" && "сохранение..."}
                    {saveStatus === "saved" && "✓ сохранено"}
                    {saveStatus === "error" && "ошибка"}
                </span>

                {/* Reset */}
                {isOverridden && (
                    <>
                        <span className="w-px h-4 bg-black/10 mx-0.5" />
                        <button
                            onClick={onReset}
                            className="text-black/40 hover:text-black/80 transition-colors cursor-pointer flex items-center gap-1 text-[10px]"
                            title="Вернуть оригинальный текст"
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                            </svg>
                            сброс
                        </button>
                    </>
                )}

                {/* Action (parent link/button) */}
                {action && (
                    <>
                        <span className="w-px h-4 bg-black/10 mx-0.5" />
                        <button
                            onClick={action.execute}
                            className="text-[#691C32] hover:text-[#7d2239] transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-medium"
                            title={action.label}
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            {action.label}
                        </button>
                    </>
                )}
            </div>

            {/* Link input row */}
            {isLinkOpen && (
                <div className="flex items-center gap-1.5 px-2 pb-2 pt-1 border-t border-black/8">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#691C32" strokeWidth="2.2" className="shrink-0">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <input
                        ref={linkInputRef}
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onFocus={onKeepAlive}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { e.preventDefault(); applyLink(); }
                            if (e.key === "Escape") setIsLinkOpen(false);
                        }}
                        placeholder="https://..."
                        className="w-[180px] text-[11px] bg-black/4 border border-black/12 px-2 py-1 outline-none focus:border-[#691C32] transition-colors"
                    />
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={applyLink}
                        className="text-[10px] bg-[#691C32] text-white px-2 py-1 cursor-pointer hover:bg-[#7d2239] transition-colors shrink-0 font-medium"
                    >
                        ОК
                    </button>
                    <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={removeLink}
                        className="text-[10px] text-black/35 hover:text-black/70 cursor-pointer px-1 shrink-0 transition-colors"
                        title="Удалить ссылку из выделенного"
                    >
                        ✕ ссылку
                    </button>
                </div>
            )}
        </div>,
        document.body,
    );
};
