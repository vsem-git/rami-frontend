import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAdmin } from "../contexts/AdminContext";
import { useContentContext } from "../contexts/ContentContext";
import { uploadMedia } from "../services/media";

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    id: string;
    fallback: string;
    actionLabel?: string;
    onAction?: () => void;
}

type UploadStatus = "idle" | "uploading" | "saved" | "error";

export const EditableImage = ({
    id,
    fallback,
    alt = "",
    className,
    style,
    actionLabel,
    onAction,
    ...rest
}: EditableImageProps) => {
    const { isEditMode } = useAdmin();
    const { getContent, saveContent, resetContent } = useContentContext();
    const imgRef = useRef<HTMLImageElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(undefined);
    const [isHovered, setIsHovered] = useState(false);
    const [rect, setRect] = useState<DOMRect | null>(null);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
    const [parentAction, setParentAction] = useState<{ label: string; execute: () => void } | null>(null);

    const value = getContent(id, fallback);
    const isOverridden = value !== fallback;

    // Track position while hovered — use parent <a>/<button> if present (for small icons inside large buttons)
    useEffect(() => {
        if (!isHovered) return;
        const update = () => {
            const el = imgRef.current;
            if (el) {
                const anchor = el.closest<HTMLElement>("a[href], button");
                setRect((anchor ?? el).getBoundingClientRect());
            }
            rafRef.current = requestAnimationFrame(update);
        };
        rafRef.current = requestAnimationFrame(update);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [isHovered]);

    // Detect closest <a> ancestor, block navigation in edit mode
    useEffect(() => {
        if (!isEditMode || !imgRef.current) return;

        if (onAction) {
            setParentAction({ label: actionLabel ?? "Выполнить", execute: onAction });
            return;
        }

        const anchor = imgRef.current.closest<HTMLAnchorElement>("a[href]");
        if (anchor) {
            const href = anchor.href;
            const target = anchor.target || "_self";
            setParentAction({
                label: actionLabel ?? "Перейти",
                execute: () => window.open(href, target),
            });
            const block = (e: MouseEvent) => e.preventDefault();
            anchor.addEventListener("click", block);
            return () => anchor.removeEventListener("click", block);
        }

        setParentAction(null);
    }, [isEditMode, onAction, actionLabel]);

    const handleUpload = useCallback(async (file: File) => {
        setUploadStatus("uploading");
        try {
            const { url } = await uploadMedia(file, id, id);
            await saveContent(id, url, "image");
            setUploadStatus("saved");
            setTimeout(() => setUploadStatus("idle"), 2000);
        } catch {
            setUploadStatus("error");
            setTimeout(() => setUploadStatus("idle"), 3000);
        }
    }, [id, saveContent]);

    const handleReset = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        await resetContent(id);
        setUploadStatus("idle");
    }, [id, resetContent]);

    if (!isEditMode) {
        return <img src={value} alt={alt} className={className} style={style} {...rest} />;
    }

    // Position floating panel below (or above) the image, clamped to viewport
    const PANEL_HEIGHT = 30;
    const PANEL_GAP = 4;
    let panelTop = 0;
    let panelLeft = 0;
    let panelWidth = 0;

    if (rect) {
        const measuredWidth = panelRef.current?.offsetWidth ?? 160;
        const spaceBelow = window.innerHeight - rect.bottom;
        const fitsBelow = spaceBelow >= PANEL_HEIGHT + PANEL_GAP;

        panelTop = fitsBelow ? rect.bottom + PANEL_GAP : rect.top - PANEL_HEIGHT - PANEL_GAP;
        panelLeft = Math.min(
            Math.max(rect.left, 4),
            window.innerWidth - measuredWidth - 4,
        );
        panelWidth = measuredWidth;
        void panelWidth; // used for layout, not assigned in JSX
    }

    return (
        <>
            <img
                ref={imgRef}
                src={value}
                alt={alt}
                className={className}
                style={{
                    ...style,
                    cursor: "pointer",
                    outline: isHovered
                        ? "1px dashed #691C32"
                        : "1px dashed rgba(105,28,50,0.3)",
                    outlineOffset: "-1px",
                    transition: "outline-color 0.15s",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (uploadStatus === "idle") fileInputRef.current?.click();
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={(e) => {
                    // Keep panel open if mouse moves into the panel
                    const related = e.relatedTarget as Node | null;
                    if (panelRef.current?.contains(related)) return;
                    setIsHovered(false);
                }}
                {...rest}
            />

            {isHovered && rect && createPortal(
                <div
                    ref={panelRef}
                    style={{
                        position: "fixed",
                        top: panelTop,
                        left: panelLeft,
                        zIndex: 99990,
                    }}
                    className="flex items-center gap-1 px-2 py-1 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.14)] border border-black/10 whitespace-nowrap"
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Upload / status */}
                    {uploadStatus === "uploading" ? (
                        <span className="flex items-center gap-1 text-[10px] text-black/50">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Загрузка...
                        </span>
                    ) : uploadStatus === "saved" ? (
                        <span className="text-[10px] text-emerald-600">✓ Сохранено</span>
                    ) : uploadStatus === "error" ? (
                        <span className="text-[10px] text-red-500">Ошибка</span>
                    ) : (
                        <button
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            className="flex items-center gap-1 text-[10px] text-[#1D1D1D] hover:text-[#691C32] transition-colors cursor-pointer font-medium"
                        >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                            Заменить
                        </button>
                    )}

                    {/* Reset */}
                    {isOverridden && uploadStatus === "idle" && (
                        <>
                            <span className="w-px h-3 bg-black/10" />
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={handleReset}
                                className="flex items-center gap-1 text-[10px] text-black/40 hover:text-black/80 transition-colors cursor-pointer"
                                title="Вернуть оригинал"
                            >
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                </svg>
                                сброс
                            </button>
                        </>
                    )}

                    {/* Parent action */}
                    {parentAction && uploadStatus === "idle" && (
                        <>
                            <span className="w-px h-3 bg-black/10" />
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => { e.stopPropagation(); parentAction.execute(); }}
                                className="flex items-center gap-1 text-[10px] text-[#691C32] hover:text-[#7d2239] transition-colors cursor-pointer font-medium"
                            >
                                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                {parentAction.label}
                            </button>
                        </>
                    )}
                </div>,
                document.body,
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleUpload(file);
                    e.target.value = "";
                }}
            />
        </>
    );
};
