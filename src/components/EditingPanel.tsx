import DOMPurify from "dompurify";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useContentContext } from "../contexts/ContentContext";
import { useEditing } from "../contexts/EditingContext";
import { uploadMedia } from "../services/media";
import { SelectionToolbar } from "./SelectionToolbar";

type SaveStatus = "idle" | "saving" | "saved" | "error";
type UploadStatus = "idle" | "uploading" | "saved" | "error";

const PANEL_WIDTH = 340;
const PANEL_GAP = 8;
const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB

// ── Main EditingPanel ─────────────────────────────────────────────────────────

export const EditingPanel = () => {
    const { active, close } = useEditing();
    const { getContent, saveContent, resetContent } = useContentContext();

    const panelRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const uploadTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const rafRef = useRef<number>(undefined);

    const [rect, setRect] = useState<DOMRect | null>(null);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

    // ── Position tracking ──────────────────────────────────────────────────
    useEffect(() => {
        if (!active) {
            setRect(null);
            return;
        }
        const update = () => {
            setRect(active.el.getBoundingClientRect());
            rafRef.current = requestAnimationFrame(update);
        };
        rafRef.current = requestAnimationFrame(update);
        return () => {
            if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
        };
    }, [active]);

    // ── Reset status when a new field opens ────────────────────────────────
    useEffect(() => {
        if (!active) return;
        setSaveStatus("idle");
        setUploadStatus("idle");
        clearTimeout(saveTimerRef.current);
        clearTimeout(uploadTimerRef.current);
    }, [active?.id]);

    // ── Init richtext editor ───────────────────────────────────────────────
    useEffect(() => {
        if (active?.type !== "richtext" || !editorRef.current) return;
        editorRef.current.innerHTML = DOMPurify.sanitize(getContent(active.id, ""));
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        editorRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active?.id, active?.type]);

    // ── Keyboard & click-outside close ────────────────────────────────────
    useEffect(() => {
        if (!active) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        const onMouseDown = (e: MouseEvent) => {
            const t = e.target as Node;
            if (panelRef.current?.contains(t)) return;
            if (active.el.contains(t)) return;
            close();
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("mousedown", onMouseDown);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("mousedown", onMouseDown);
        };
    }, [active, close]);

    // ── Cleanup timers ─────────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            clearTimeout(saveTimerRef.current);
            clearTimeout(uploadTimerRef.current);
        };
    }, [active?.id]);

    // ── Save ───────────────────────────────────────────────────────────────
    const persist = useCallback(
        async (value: string) => {
            if (!active) return;
            setSaveStatus("saving");
            try {
                await saveContent(active.id, value, active.type);
                setSaveStatus("saved");
                saveTimerRef.current = setTimeout(() => setSaveStatus("idle"), 2000);
            } catch {
                setSaveStatus("error");
            }
        },
        [active, saveContent],
    );

    const scheduleAutoSave = useCallback(
        (value: string) => {
            clearTimeout(saveTimerRef.current);
            saveTimerRef.current = setTimeout(() => persist(value), 800);
        },
        [persist],
    );

    const handleContentChange = useCallback(
        (html: string) => {
            clearTimeout(saveTimerRef.current);
            persist(html);
        },
        [persist],
    );

    // ── Reset ──────────────────────────────────────────────────────────────
    const handleReset = useCallback(async () => {
        if (!active) return;
        clearTimeout(saveTimerRef.current);
        await resetContent(active.id);
        if (active.type === "richtext" && editorRef.current) {
            editorRef.current.innerHTML = "";
        }
        setSaveStatus("idle");
    }, [active, resetContent]);

    // ── Image upload ───────────────────────────────────────────────────────
    const handleImageUpload = useCallback(
        async (file: File) => {
            if (!active) return;
            if (file.size > MAX_FILE_BYTES) {
                setUploadStatus("error");
                uploadTimerRef.current = setTimeout(() => setUploadStatus("idle"), 3000);
                return;
            }
            setUploadStatus("uploading");
            try {
                const { url } = await uploadMedia(file, active.id, active.id);
                await saveContent(active.id, url, "image");
                setUploadStatus("saved");
                uploadTimerRef.current = setTimeout(() => setUploadStatus("idle"), 2000);
            } catch {
                setUploadStatus("error");
                uploadTimerRef.current = setTimeout(() => setUploadStatus("idle"), 3000);
            }
        },
        [active, saveContent],
    );

    if (!active || !rect) return null;

    const value = getContent(active.id, "");
    const isOverridden = value !== "";

    // ── Positioning ────────────────────────────────────────────────────────
    const panelHeight = panelRef.current?.offsetHeight ?? 180;
    const spaceAbove = rect.top - PANEL_GAP;
    const top =
        spaceAbove >= panelHeight
            ? rect.top - panelHeight - PANEL_GAP
            : rect.bottom + PANEL_GAP;
    const left = Math.min(Math.max(rect.left, 4), window.innerWidth - PANEL_WIDTH - 4);

    return (
        <>
            {active.type === "richtext" && (
                <SelectionToolbar
                    editorRef={editorRef}
                    onContentChange={handleContentChange}
                />
            )}

            {createPortal(
                <div
                    ref={panelRef}
                    style={{
                        position: "fixed",
                        top,
                        left,
                        width: PANEL_WIDTH,
                        zIndex: 99999,
                    }}
                    className="bg-white shadow-[0_4px_24px_rgba(0,0,0,0.18)] border border-black/10 flex flex-col"
                >
                    {/* ── Header ── */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-black/8">
                        <span className="font-mono text-[9px] text-white bg-[#1D1D1D] px-1.5 py-0.5 rounded leading-none shrink-0 max-w-[180px] truncate">
                            {active.id}
                        </span>
                        <span className="font-mono text-[9px] text-[#691C32] bg-[#691C32]/10 px-1.5 py-0.5 rounded leading-none">
                            {active.type}
                        </span>
                        <span className="flex-1" />
                        <button
                            onClick={close}
                            className="w-5 h-5 flex items-center justify-center text-black/30 hover:text-black/70 transition-colors cursor-pointer shrink-0"
                            title="Закрыть (Esc)"
                        >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* ── Content ── */}
                    {active.type === "image" ? (
                        <div className="p-3 flex flex-col gap-2.5">
                            {value && (
                                <img src={value} alt="" className="w-full h-28 object-cover rounded border border-black/8" />
                            )}
                            {uploadStatus === "uploading" ? (
                                <div className="flex items-center gap-1.5 text-[11px] text-black/50">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Загрузка...
                                </div>
                            ) : uploadStatus === "saved" ? (
                                <span className="text-[11px] text-emerald-600">✓ Сохранено</span>
                            ) : uploadStatus === "error" ? (
                                <span className="text-[11px] text-red-500">Ошибка (макс. 15 МБ)</span>
                            ) : (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center justify-center gap-1.5 text-[11px] font-medium bg-black/4 hover:bg-black/8 transition-colors px-3 py-2 cursor-pointer rounded"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                        <circle cx="12" cy="13" r="4" />
                                    </svg>
                                    Выбрать файл
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload(file);
                                    e.target.value = "";
                                }}
                            />
                        </div>
                    ) : active.type === "richtext" ? (
                        <div
                            ref={editorRef}
                            key={active.id}
                            contentEditable
                            suppressContentEditableWarning
                            className="min-h-[80px] max-h-[200px] overflow-y-auto overscroll-contain p-3 text-sm outline-none"
                            onInput={() => {
                                if (editorRef.current) scheduleAutoSave(editorRef.current.innerHTML);
                            }}
                        />
                    ) : (
                        <textarea
                            key={active.id}
                            defaultValue={value}
                            className="resize-none p-3 text-sm outline-none min-h-[80px] max-h-[200px] w-full"
                            placeholder="Введите текст..."
                            onChange={(e) => scheduleAutoSave(e.target.value)}
                            autoFocus
                        />
                    )}

                    {/* ── Footer ── */}
                    <div className="flex items-center gap-2 px-3 py-2 border-t border-black/8 min-h-[36px]">
                        {isOverridden && (
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1 text-[10px] text-black/40 hover:text-black/80 transition-colors cursor-pointer"
                                title="Вернуть оригинальный текст"
                            >
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                </svg>
                                сброс
                            </button>
                        )}
                        <span className="flex-1" />
                        {active.type !== "image" && (
                            <span
                                className={[
                                    "text-[10px] transition-opacity duration-300",
                                    saveStatus === "idle" ? "opacity-0" : "",
                                    saveStatus === "saving" ? "text-black/40" : "",
                                    saveStatus === "saved" ? "text-emerald-600" : "",
                                    saveStatus === "error" ? "text-red-500" : "",
                                ].filter(Boolean).join(" ")}
                            >
                                {saveStatus === "saving" && "сохранение..."}
                                {saveStatus === "saved" && "✓ сохранено"}
                                {saveStatus === "error" && "ошибка"}
                            </span>
                        )}
                    </div>
                </div>,
                document.body,
            )}
        </>
    );
};
