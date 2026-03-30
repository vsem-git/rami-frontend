import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface SelectionToolbarProps {
    editorRef: React.RefObject<HTMLDivElement | null>;
    onContentChange: (html: string) => void;
}

export const SelectionToolbar = ({ editorRef, onContentChange }: SelectionToolbarProps) => {
    const toolbarRef = useRef<HTMLDivElement>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);
    const savedRangeRef = useRef<Range | null>(null);

    const [selRect, setSelRect] = useState<{
        top: number;
        bottom: number;
        centerX: number;
    } | null>(null);
    const [formats, setFormats] = useState({ bold: false, italic: false, underline: false, strike: false });
    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState("");

    useEffect(() => {
        const onSelChange = () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed || !editorRef.current?.contains(sel.anchorNode)) {
                if (document.activeElement !== linkInputRef.current) {
                    setSelRect(null);
                    setIsLinkOpen(false);
                }
                return;
            }
            const r = sel.getRangeAt(0).getBoundingClientRect();
            setSelRect({ top: r.top, bottom: r.bottom, centerX: r.left + r.width / 2 });
            try {
                setFormats({
                    bold: document.queryCommandState("bold"),
                    italic: document.queryCommandState("italic"),
                    underline: document.queryCommandState("underline"),
                    strike: document.queryCommandState("strikeThrough"),
                });
            } catch { /* ignore */ }
        };
        document.addEventListener("selectionchange", onSelChange);
        return () => document.removeEventListener("selectionchange", onSelChange);
    }, [editorRef]);

    if (!selRect) return null;

    const toolbarW = toolbarRef.current?.offsetWidth ?? 220;
    const toolbarH = isLinkOpen ? 72 : 36;
    const showBelow = selRect.top - toolbarH - 8 < 4;
    const top = showBelow ? selRect.bottom + 8 : selRect.top - toolbarH - 8;
    const left = Math.max(8, Math.min(selRect.centerX - toolbarW / 2, window.innerWidth - toolbarW - 8));

    const exec = (cmd: string) => {
        editorRef.current?.focus();
        document.execCommand(cmd);
        if (editorRef.current) onContentChange(editorRef.current.innerHTML);
    };

    const handleLinkMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeRef.current = sel.getRangeAt(0).cloneRange();
        if (isLinkOpen) { setIsLinkOpen(false); return; }
        setLinkUrl("");
        setIsLinkOpen(true);
        setTimeout(() => linkInputRef.current?.focus(), 30);
    };

    const applyLink = () => {
        const url = linkUrl.trim();
        if (!url || !editorRef.current || !savedRangeRef.current) { setIsLinkOpen(false); return; }
        const fullUrl = url.startsWith("http") ? url : `https://${url}`;
        if (/^(javascript|data|vbscript):/i.test(fullUrl)) { setIsLinkOpen(false); return; }
        editorRef.current.focus();
        const sel = window.getSelection();
        if (sel && savedRangeRef.current) { sel.removeAllRanges(); sel.addRange(savedRangeRef.current); }
        document.execCommand("createLink", false, fullUrl);
        editorRef.current.querySelectorAll("a:not([target])").forEach((a) => {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
        });
        onContentChange(editorRef.current.innerHTML);
        setIsLinkOpen(false);
        savedRangeRef.current = null;
    };

    const removeLink = () => {
        if (!editorRef.current) return;
        editorRef.current.focus();
        if (savedRangeRef.current) {
            const sel = window.getSelection();
            if (sel) { sel.removeAllRanges(); sel.addRange(savedRangeRef.current); }
        }
        document.execCommand("unlink");
        onContentChange(editorRef.current.innerHTML);
        setIsLinkOpen(false);
        savedRangeRef.current = null;
    };

    const btn = "w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-colors cursor-pointer select-none";
    const off = "text-white/75 hover:text-white hover:bg-white/12";
    const on = "bg-white/15 text-white";

    return createPortal(
        <div
            ref={toolbarRef}
            style={{ position: "fixed", top, left, zIndex: 100000, pointerEvents: "auto" }}
            className="flex flex-col bg-[#1D1D1D]/95 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden"
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className="flex items-center gap-0.5 px-1.5 py-1">
                <button onMouseDown={(e) => { e.preventDefault(); exec("bold"); }} className={`${btn} ${formats.bold ? on : off} font-bold`} title="Жирный (Ctrl+B)">B</button>
                <button onMouseDown={(e) => { e.preventDefault(); exec("italic"); }} className={`${btn} ${formats.italic ? on : off} italic`} title="Курсив (Ctrl+I)">I</button>
                <button onMouseDown={(e) => { e.preventDefault(); exec("underline"); }} className={`${btn} ${formats.underline ? on : off} underline`} title="Подчёркнутый (Ctrl+U)">U</button>
                <button onMouseDown={(e) => { e.preventDefault(); exec("strikeThrough"); }} className={`${btn} ${formats.strike ? on : off} line-through`} title="Зачёркнутый">S</button>
                <span className="w-px h-4 bg-white/15 mx-0.5" />
                <button onMouseDown={handleLinkMouseDown} className={`${btn} ${isLinkOpen ? on : off}`} title="Ссылка">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                </button>
            </div>
            {isLinkOpen && (
                <div className="flex items-center gap-1.5 px-2 pb-2 pt-0 border-t border-white/10">
                    <input
                        ref={linkInputRef}
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { e.preventDefault(); applyLink(); }
                            if (e.key === "Escape") setIsLinkOpen(false);
                        }}
                        placeholder="https://..."
                        className="w-[160px] text-[11px] bg-white/10 text-white border border-white/20 px-2 py-1 outline-none focus:border-white/50 transition-colors rounded"
                    />
                    <button onClick={applyLink} className="text-[10px] bg-white text-[#1D1D1D] px-2 py-1 cursor-pointer hover:bg-white/90 transition-colors rounded font-medium shrink-0">ОК</button>
                    <button onClick={removeLink} className="text-[10px] text-white/40 hover:text-white/70 cursor-pointer px-1 shrink-0 transition-colors" title="Удалить ссылку">✕</button>
                </div>
            )}
        </div>,
        document.body,
    );
};
