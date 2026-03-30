import DOMPurify from "dompurify";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
    useContentContext,
    type ContentType,
    type DisplayField,
} from "../contexts/ContentContext";
import { uploadMedia } from "../services/media";
import { SelectionToolbar } from "./SelectionToolbar";

function scanHintFields(registerField: (id: string, fallback: string, type: ContentType) => void) {
    document.querySelectorAll<HTMLElement>("[data-content-hint]").forEach((el) => {
        const id = el.getAttribute("data-content-hint");
        if (!id) return;
        const hintType = (el.dataset.contentHintType as ContentType) || "text";
        let fallback: string;
        if (hintType === "image") {
            if (el.tagName === "IMG") {
                fallback = el.getAttribute("src") ?? "";
            } else {
                // extract last url() from backgroundImage (handles "gradient, url()" format)
                const bg = el.style.backgroundImage;
                const matches = [...bg.matchAll(/url\(['"]?([^'")\s]+)['"]?\)/g)];
                fallback = matches.length > 0 ? matches[matches.length - 1][1] : "";
            }
        } else if (hintType === "richtext") {
            fallback = el.innerHTML;
        } else {
            fallback = el.textContent?.trim() ?? "";
        }
        registerField(id, fallback, hintType);
    });
}

interface ContentPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";
type UploadStatus = "idle" | "uploading" | "saved" | "error";

const MAX_FILE_BYTES = 15 * 1024 * 1024;

// ── Single editable row ──────────────────────────────────────────────────────

const RecordRow = ({ field }: { field: DisplayField }) => {
    const { saveContent, resetContent } = useContentContext();
    const [expanded, setExpanded] = useState(false);
    const [draft, setDraft] = useState(field.value);
    const [status, setStatus] = useState<SaveStatus>("idle");
    const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
    const uploadTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const handleImageUpload = useCallback(async (file: File) => {
        if (file.size > MAX_FILE_BYTES) {
            setUploadStatus("error");
            uploadTimerRef.current = setTimeout(() => setUploadStatus("idle"), 3000);
            return;
        }
        setUploadStatus("uploading");
        try {
            const { url } = await uploadMedia(file, field.field_id, field.field_id);
            await saveContent(field.field_id, url, "image");
            setUploadStatus("saved");
            uploadTimerRef.current = setTimeout(() => setUploadStatus("idle"), 2000);
        } catch {
            setUploadStatus("error");
            uploadTimerRef.current = setTimeout(() => setUploadStatus("idle"), 3000);
        }
    }, [field.field_id, saveContent]);

    useEffect(() => () => clearTimeout(uploadTimerRef.current), []);

    // Keep draft in sync if value changes externally (save/reset from other panel)
    useEffect(() => {
        setDraft(field.value);
    }, [field.value]);

    // Init editor content when expanded
    useEffect(() => {
        if (expanded && field.type !== "image" && editorRef.current) {
            editorRef.current.innerHTML = DOMPurify.sanitize(field.value);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expanded, field.type]);

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const persist = useCallback(
        async (value: string) => {
            setStatus("saving");
            try {
                await saveContent(field.field_id, value, field.type);
                setStatus("saved");
                timerRef.current = setTimeout(() => setStatus("idle"), 2000);
            } catch {
                setStatus("error");
            }
        },
        [field.field_id, field.type, saveContent],
    );

    const scheduleAutoSave = useCallback(
        (value: string) => {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => persist(value), 800);
        },
        [persist],
    );

    const handleReset = useCallback(async () => {
        clearTimeout(timerRef.current);
        await resetContent(field.field_id);
        setStatus("idle");
        setExpanded(false);
    }, [field.field_id, resetContent]);

    const typeColors: Record<ContentType, string> = {
        text: "bg-blue-50 text-blue-600",
        richtext: "bg-purple-50 text-purple-600",
        image: "bg-amber-50 text-amber-600",
    };

    return (
        <div className="border-b border-black/6 last:border-0">
            {/* Row header */}
            <button
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-black/3 transition-colors cursor-pointer"
                onClick={() => setExpanded((v) => !v)}
            >
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    className={`shrink-0 text-black/30 transition-transform duration-150 ${expanded ? "rotate-90" : ""}`}
                    fill="currentColor"
                >
                    <path d="M3 2l4 3-4 3V2z" />
                </svg>
                <span className="font-mono text-[11px] text-[#1D1D1D] truncate flex-1 min-w-0">
                    {field.field_id}
                </span>
                {!field.isOverridden && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black/15 shrink-0" title="Не изменено" />
                )}
                <span
                    className={`font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0 ${typeColors[field.type]}`}
                >
                    {field.type}
                </span>
            </button>

            {/* Expanded editor */}
            {expanded && (
                <div className="px-4 pb-3 flex flex-col gap-2">
                    {field.type === "image" ? (
                        <div className="flex flex-col gap-2">
                            {/* Drop / upload zone */}
                            <div
                                className="w-full border-2 border-dashed border-black/15 rounded cursor-pointer hover:border-[#691C32]/40 transition-colors overflow-hidden"
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file?.type.startsWith("image/")) handleImageUpload(file);
                                }}
                            >
                                {field.value ? (
                                    <img src={field.value} alt="" className="w-full h-28 object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-1.5 py-6">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#691C32" strokeWidth="1.5" className="opacity-35">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="17 8 12 3 7 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                        <span className="text-[10px] text-black/35">Нажмите или перетащите файл</span>
                                    </div>
                                )}
                            </div>

                            {/* Actions row */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadStatus === "uploading"}
                                    className="flex items-center gap-1.5 text-[10px] font-medium bg-black/5 hover:bg-black/10 transition-colors px-2.5 py-1.5 rounded cursor-pointer disabled:opacity-40"
                                >
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                        <polyline points="17 8 12 3 7 8"/>
                                        <line x1="12" y1="3" x2="12" y2="15"/>
                                    </svg>
                                    {uploadStatus === "uploading" ? "Загрузка..." : "Загрузить с ПК"}
                                </button>
                                {uploadStatus === "saved" && <span className="text-[10px] text-emerald-600">✓ Сохранено</span>}
                                {uploadStatus === "error" && <span className="text-[10px] text-red-500">Ошибка (макс. 15 МБ)</span>}
                            </div>

                            {/* URL input */}
                            <input
                                type="text"
                                defaultValue={field.value}
                                onBlur={(e) => {
                                    const val = e.target.value.trim();
                                    if (val !== field.value) scheduleAutoSave(val);
                                }}
                                placeholder="или вставьте URL..."
                                className="w-full text-[10px] font-mono border border-black/10 bg-white px-2 py-1.5 outline-none focus:border-[#691C32] transition-colors placeholder:text-black/20"
                            />

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
                    ) : (
                        <>
                            <SelectionToolbar
                                editorRef={editorRef}
                                onContentChange={(html) => {
                                    setDraft(html);
                                    scheduleAutoSave(html);
                                }}
                            />
                            <div
                                ref={editorRef}
                                contentEditable
                                suppressContentEditableWarning
                                className={[
                                    "w-full text-[12px] border border-black/10 bg-white px-2.5 py-2 outline-none focus:border-[#691C32] transition-colors min-h-[60px] max-h-[160px] overflow-y-auto overscroll-contain",
                                    !field.isOverridden ? "text-black/40" : "",
                                ].join(" ")}
                                onInput={() => {
                                    const html = editorRef.current?.innerHTML ?? "";
                                    setDraft(html);
                                    scheduleAutoSave(html);
                                }}
                            />
                        </>
                    )}

                    <div className="flex items-center justify-between">
                        {field.isOverridden ? (
                            <button
                                onClick={handleReset}
                                className="flex items-center gap-1 text-[10px] text-black/35 hover:text-red-500 transition-colors cursor-pointer"
                                title="Удалить из базы, вернуть к дефолту"
                            >
                                <svg
                                    width="9"
                                    height="9"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                </svg>
                                сброс
                            </button>
                        ) : (
                            <span className="text-[10px] text-black/25 italic">дефолт</span>
                        )}
                        <span
                            className={[
                                "text-[10px] transition-opacity duration-200",
                                status === "idle" ? "opacity-0" : "",
                                status === "saving" ? "text-black/40" : "",
                                status === "saved" ? "text-emerald-600" : "",
                                status === "error" ? "text-red-500" : "",
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            {status === "saving" && "сохранение..."}
                            {status === "saved" && "✓ сохранено"}
                            {status === "error" && "ошибка"}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

// ── Add new field form ───────────────────────────────────────────────────────

const AddFieldForm = () => {
    const { saveContent } = useContentContext();
    const [fieldId, setFieldId] = useState("");
    const [type, setType] = useState<ContentType>("text");
    const [value, setValue] = useState("");
    const [status, setStatus] = useState<SaveStatus>("idle");
    const [open, setOpen] = useState(false);

    const handleSave = async () => {
        if (!fieldId.trim() || !value.trim()) return;
        setStatus("saving");
        try {
            await saveContent(fieldId.trim(), value, type);
            setStatus("saved");
            setFieldId("");
            setValue("");
            setType("text");
            setTimeout(() => {
                setStatus("idle");
                setOpen(false);
            }, 1200);
        } catch {
            setStatus("error");
        }
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="w-full flex items-center gap-2 px-4 py-3 text-[11px] text-black/40 hover:text-[#691C32] hover:bg-[#691C32]/4 transition-colors cursor-pointer border-t border-black/6"
            >
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
                Добавить поле вручную
            </button>
        );
    }

    return (
        <div className="border-t border-black/6 px-4 py-3 flex flex-col gap-2.5 bg-black/2">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#1D1D1D]">
                    Новое поле
                </span>
                <button
                    onClick={() => setOpen(false)}
                    className="text-[10px] text-black/30 hover:text-black/60 cursor-pointer transition-colors"
                >
                    отмена
                </button>
            </div>

            <input
                type="text"
                placeholder="page.section.field"
                value={fieldId}
                onChange={(e) => setFieldId(e.target.value)}
                className="font-mono text-[11px] border border-black/10 bg-white px-2.5 py-1.5 outline-none focus:border-[#691C32] transition-colors w-full"
            />

            <div className="flex gap-2">
                {(["text", "richtext", "image"] as ContentType[]).map((t) => (
                    <button
                        key={t}
                        onClick={() => setType(t)}
                        className={[
                            "text-[10px] px-2 py-1 border cursor-pointer transition-colors",
                            type === t
                                ? "bg-[#691C32] text-white border-[#691C32]"
                                : "bg-white text-black/50 border-black/10 hover:border-black/30",
                        ].join(" ")}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <textarea
                placeholder="Значение..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full resize-none text-[12px] border border-black/10 bg-white px-2.5 py-2 outline-none focus:border-[#691C32] transition-colors min-h-[60px] font-mono"
            />

            <button
                onClick={handleSave}
                disabled={!fieldId.trim() || !value.trim() || status === "saving"}
                className="self-end text-[11px] bg-[#691C32] text-white px-3 py-1.5 cursor-pointer hover:bg-[#7d2239] transition-colors disabled:opacity-40 disabled:cursor-default"
            >
                {status === "saving"
                    ? "Сохранение..."
                    : status === "saved"
                      ? "✓ Сохранено"
                      : "Сохранить"}
            </button>
        </div>
    );
};

// ── Main panel ───────────────────────────────────────────────────────────────

export const ContentPanel = ({ isOpen, onClose }: ContentPanelProps) => {
    const { allFields, registerField } = useContentContext();
    const [search, setSearch] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setSearch("");
            scanHintFields(registerField);
            setTimeout(() => searchRef.current?.focus(), 100);
        }
    }, [isOpen, registerField]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest("button,input")) return;
        e.preventDefault();
        const rect = panelRef.current!.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        const onMove = (ev: MouseEvent) => {
            const x = Math.max(0, Math.min(window.innerWidth - rect.width, ev.clientX - offsetX));
            const y = Math.max(0, Math.min(window.innerHeight - 40, ev.clientY - offsetY));
            setPos({ x, y });
        };
        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    }, []);

    const q = search.toLowerCase();
    const filtered = allFields.filter(
        (f) =>
            f.field_id.toLowerCase().includes(q) ||
            f.fallback.toLowerCase().includes(q),
    );

    const panelStyle: CSSProperties = pos
        ? { position: "fixed", left: pos.x, top: pos.y }
        : { position: "fixed", top: 80, right: 24 };

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={panelRef}
            style={{ ...panelStyle, zIndex: 99999, width: 360, maxHeight: "calc(100vh - 48px)" }}
            className="bg-[#f8f7f6] border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.18)] rounded-lg flex flex-col overflow-hidden select-none"
        >
            {/* Drag handle / header */}
            <div
                onMouseDown={handleDragStart}
                className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-black/8 cursor-grab active:cursor-grabbing shrink-0"
            >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="text-black/20 shrink-0">
                    <circle cx="2" cy="2" r="1"/><circle cx="5" cy="2" r="1"/><circle cx="8" cy="2" r="1"/>
                    <circle cx="2" cy="5" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="8" cy="5" r="1"/>
                    <circle cx="2" cy="8" r="1"/><circle cx="5" cy="8" r="1"/><circle cx="8" cy="8" r="1"/>
                </svg>

                <span className="text-[12px] font-semibold text-[#1D1D1D] uppercase tracking-wider flex-1">
                    Контент
                </span>
                <span className="text-[10px] text-black/30 bg-black/6 px-1.5 py-0.5 rounded">
                    {allFields.length}
                </span>

                {/* Search inline */}
                <div className="flex items-center gap-1.5 border border-black/10 bg-[#f8f7f6] px-2 py-1 focus-within:border-[#691C32] transition-colors rounded ml-2 w-[130px]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/30 shrink-0">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Поиск..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full text-[11px] bg-transparent outline-none font-mono placeholder:text-black/25"
                    />
                    {search && (
                        <button onClick={() => setSearch("")} className="text-black/25 hover:text-black/50 cursor-pointer text-[9px] shrink-0">✕</button>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="w-6 h-6 flex items-center justify-center text-black/30 hover:text-black/70 transition-colors cursor-pointer shrink-0 ml-1"
                    title="Закрыть (Esc)"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Records list */}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain bg-white" onWheel={(e) => e.stopPropagation()}>
                {filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center text-[11px] text-black/30">
                        {search ? "Ничего не найдено" : "Нет зарегистрированных полей"}
                    </div>
                ) : (
                    filtered.map((field) => (
                        <RecordRow key={field.field_id} field={field} />
                    ))
                )}
            </div>

            {/* Add field */}
            <div className="shrink-0">
                <AddFieldForm />
            </div>
        </div>,
        document.body,
    );
};
