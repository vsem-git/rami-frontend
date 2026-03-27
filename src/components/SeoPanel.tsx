import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useContentContext } from "../contexts/ContentContext";
import { uploadMedia } from "../services/media";

interface SeoPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const pathToKey = (pathname: string) =>
    pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\//g, ".");

const setMeta = (selector: string, content: string) => {
    const el = document.querySelector<HTMLMetaElement>(selector);
    if (el) el.content = content;
};
const setLink = (selector: string, href: string) => {
    const el = document.querySelector<HTMLLinkElement>(selector);
    if (el) el.href = href;
};

type Tab = "basic" | "social" | "advanced";

const TAB_LABELS: Record<Tab, string> = {
    basic: "Основное",
    social: "Соцсети",
    advanced: "Дополнительно",
};

export const SeoPanel = ({ isOpen, onClose }: SeoPanelProps) => {
    const { getContent, saveContent } = useContentContext();
    const [pageKey, setPageKey] = useState(() => pathToKey(window.location.pathname));
    const [tab, setTab] = useState<Tab>("basic");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setPageKey(pathToKey(window.location.pathname));
            setSaved(false);
            setTab("basic");
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) setTimeout(() => titleRef.current?.focus(), 320);
    }, [isOpen]);

    const ids = {
        title: `seo.${pageKey}.title`,
        description: `seo.${pageKey}.description`,
        ogTitle: `seo.${pageKey}.og_title`,
        ogDescription: `seo.${pageKey}.og_description`,
        ogImage: `seo.${pageKey}.og_image`,
        ogType: `seo.${pageKey}.og_type`,
        canonical: `seo.${pageKey}.canonical`,
        robots: `seo.${pageKey}.robots`,
        keywords: `seo.${pageKey}.keywords`,
    };

    const [f, setF] = useState({
        title: "",
        description: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        ogType: "website",
        canonical: "",
        robots: "index, follow",
        keywords: "",
    });

    useEffect(() => {
        setF({
            title: getContent(ids.title, ""),
            description: getContent(ids.description, ""),
            ogTitle: getContent(ids.ogTitle, ""),
            ogDescription: getContent(ids.ogDescription, ""),
            ogImage: getContent(ids.ogImage, ""),
            ogType: getContent(ids.ogType, "website"),
            canonical: getContent(ids.canonical, ""),
            robots: getContent(ids.robots, "index, follow"),
            keywords: getContent(ids.keywords, ""),
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageKey, isOpen]);

    const set = (key: keyof typeof f) => (v: string) => setF((prev) => ({ ...prev, [key]: v }));

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        try {
            const { url } = await uploadMedia(file, `seo-og-${pageKey}`, `seo.${pageKey}`);
            set("ogImage")(url);
        } catch (e) {
            console.error("Upload failed", e);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const entries = Object.entries(ids) as [keyof typeof ids, string][];
            await Promise.all(
                entries.map(([key, id]) => f[key] ? saveContent(id, f[key]) : Promise.resolve())
            );

            // Apply to <head>
            const title = f.title || document.title;
            const ogTitle = f.ogTitle || f.title || title;
            const ogDesc = f.ogDescription || f.description;

            document.title = title;
            setMeta('meta[name="description"]', f.description);
            setMeta('meta[name="robots"]', f.robots);
            setMeta('meta[name="keywords"]', f.keywords);
            setLink('link[rel="canonical"]', f.canonical || window.location.href);

            setMeta('meta[property="og:title"]', ogTitle);
            setMeta('meta[property="og:description"]', ogDesc);
            setMeta('meta[property="og:image"]', f.ogImage);
            setMeta('meta[property="og:url"]', f.canonical || window.location.href);
            setMeta('meta[property="og:type"]', f.ogType);

            setMeta('meta[name="twitter:title"]', ogTitle);
            setMeta('meta[name="twitter:description"]', ogDesc);
            setMeta('meta[name="twitter:image"]', f.ogImage);

            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } finally {
            setSaving(false);
        }
    };

    const displayTitle = f.title || "Заголовок страницы";
    const displayDesc = f.description || "Описание страницы появится здесь — краткое и информативное.";
    const displayUrl = f.canonical || window.location.href;
    const ogTitle = f.ogTitle || f.title || "Заголовок для соцсетей";
    const ogDesc = f.ogDescription || f.description || "Описание для соцсетей";

    return createPortal(
        <>
            <div
                className="fixed inset-0 z-[99998] transition-opacity duration-300"
                style={{
                    background: "rgba(0,0,0,0.3)",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                }}
                onClick={onClose}
            />

            <div
                className="fixed top-0 right-0 h-full w-[400px] bg-[#f8f7f6] z-[99999] flex flex-col"
                style={{
                    boxShadow: "-4px 0 32px rgba(0,0,0,0.15)",
                    transform: isOpen ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-black/8 shrink-0">
                    <div className="flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#691C32" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1D1D1D]">SEO</span>
                        <span className="font-mono text-[10px] text-black/30 bg-black/5 px-1.5 py-0.5 rounded">
                            /{pageKey === "home" ? "" : pageKey.replace(/\./g, "/")}
                        </span>
                    </div>
                    <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-black/35 hover:text-black/70 transition-colors cursor-pointer">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-black/8 bg-white shrink-0">
                    {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={[
                                "flex-1 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors cursor-pointer border-b-2",
                                tab === t
                                    ? "border-[#691C32] text-[#691C32]"
                                    : "border-transparent text-black/40 hover:text-black/60",
                            ].join(" ")}
                        >
                            {TAB_LABELS[t]}
                        </button>
                    ))}
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto">

                    {/* ── BASIC ── */}
                    {tab === "basic" && (
                        <div className="px-5 py-5 flex flex-col gap-5">
                            {/* SERP Preview */}
                            <div className="bg-white border border-black/8 rounded p-3.5">
                                <p className="text-[9px] uppercase tracking-[0.12em] text-black/30 font-semibold mb-2.5">Предпросмотр в Google</p>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <div className="w-4 h-4 rounded-full bg-black/10 shrink-0" />
                                    <div>
                                        <p className="text-[11px] text-black/40 leading-none">RAMI Clinic</p>
                                        <p className="text-[9px] text-black/25 truncate max-w-[280px]">{displayUrl}</p>
                                    </div>
                                </div>
                                <p className="text-[15px] text-[#1a0dab] leading-snug mb-0.5 line-clamp-1">{displayTitle}</p>
                                <p className="text-[12px] text-[#4d5156] leading-[1.4] line-clamp-2">{displayDesc}</p>
                            </div>

                            <SeoField
                                label="Title"
                                hint={{ min: 50, max: 60 }}
                                value={f.title}
                                onChange={set("title")}
                                inputRef={titleRef}
                                maxLength={120}
                                placeholder="RAMI Clinic — пластическая хирургия в СПб"
                            />
                            <SeoField
                                label="Description"
                                hint={{ min: 150, max: 160 }}
                                value={f.description}
                                onChange={set("description")}
                                textarea
                                maxLength={320}
                                placeholder="Краткое описание страницы для поисковиков. Напишите, что найдёт пользователь..."
                            />
                            <SeoField
                                label="Keywords"
                                value={f.keywords}
                                onChange={set("keywords")}
                                placeholder="пластическая хирургия, медицина, СПб"
                                hint="через запятую"
                            />
                        </div>
                    )}

                    {/* ── SOCIAL ── */}
                    {tab === "social" && (
                        <div className="px-5 py-5 flex flex-col gap-5">
                            {/* Social card preview */}
                            <div className="bg-white border border-black/8 rounded overflow-hidden">
                                <p className="text-[9px] uppercase tracking-[0.12em] text-black/30 font-semibold px-3 pt-3 mb-2">Предпросмотр карточки</p>
                                {f.ogImage ? (
                                    <img src={f.ogImage} alt="" className="w-full aspect-[1.91/1] object-cover" />
                                ) : (
                                    <div className="w-full aspect-[1.91/1] bg-black/5 flex items-center justify-center">
                                        <span className="text-[10px] text-black/25">нет изображения</span>
                                    </div>
                                )}
                                <div className="px-3 py-2.5 border-t border-black/8">
                                    <p className="text-[9px] uppercase text-black/30 mb-0.5 tracking-wide">ramiclinic.ru</p>
                                    <p className="text-[13px] font-semibold text-[#1D1D1D] leading-snug line-clamp-1">{ogTitle}</p>
                                    <p className="text-[11px] text-black/50 leading-[1.4] line-clamp-2 mt-0.5">{ogDesc}</p>
                                </div>
                            </div>

                            {/* OG Image upload */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex items-baseline justify-between">
                                    <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">OG Image</label>
                                    <span className="text-[10px] text-black/30">1200 × 630 px</span>
                                </div>
                                {f.ogImage ? (
                                    <div className="relative group">
                                        <img src={f.ogImage} alt="" className="w-full aspect-[1.91/1] object-cover border border-black/8" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                            <button onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-white text-[10px] font-semibold uppercase cursor-pointer">Заменить</button>
                                            <button onClick={() => set("ogImage")("")} className="px-3 py-1.5 bg-white text-[10px] font-semibold uppercase cursor-pointer">Удалить</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="w-full aspect-[1.91/1] border-2 border-dashed border-black/15 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#691C32]/40 hover:bg-white transition-colors rounded"
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const file = e.dataTransfer.files[0];
                                            if (file?.type.startsWith("image/")) handleImageUpload(file);
                                        }}
                                    >
                                        {uploading ? (
                                            <span className="text-[11px] text-black/40">Загрузка...</span>
                                        ) : (
                                            <>
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#691C32" strokeWidth="1.5" className="opacity-35">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="17 8 12 3 7 8" />
                                                    <line x1="12" y1="3" x2="12" y2="15" />
                                                </svg>
                                                <span className="text-[11px] text-black/35">Нажмите или перетащите</span>
                                                <span className="text-[10px] text-black/20">JPG, PNG, WebP · рек. 1200×630</span>
                                            </>
                                        )}
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                    onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); e.target.value = ""; }}
                                />
                                <input
                                    value={f.ogImage}
                                    onChange={(e) => set("ogImage")(e.target.value)}
                                    placeholder="или вставьте URL..."
                                    className="w-full bg-white border border-black/10 px-3 py-1.5 text-[11px] outline-none focus:border-[#691C32] transition-colors placeholder:text-black/20"
                                />
                            </div>

                            <SeoField
                                label="OG Title"
                                hint="если отличается от Title"
                                value={f.ogTitle}
                                onChange={set("ogTitle")}
                                maxLength={95}
                                placeholder={f.title || "Заголовок для соцсетей..."}
                            />
                            <SeoField
                                label="OG Description"
                                hint="если отличается от Description"
                                value={f.ogDescription}
                                onChange={set("ogDescription")}
                                textarea
                                maxLength={200}
                                placeholder={f.description || "Описание для соцсетей..."}
                            />

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">OG Type</label>
                                <select
                                    value={f.ogType}
                                    onChange={(e) => set("ogType")(e.target.value)}
                                    className="w-full bg-white border border-black/10 px-3 py-2 text-[12px] outline-none focus:border-[#691C32] transition-colors text-[#1D1D1D] cursor-pointer"
                                >
                                    <option value="website">website</option>
                                    <option value="article">article</option>
                                    <option value="profile">profile</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* ── ADVANCED ── */}
                    {tab === "advanced" && (
                        <div className="px-5 py-5 flex flex-col gap-5">
                            <SeoField
                                label="Canonical URL"
                                value={f.canonical}
                                onChange={set("canonical")}
                                placeholder={window.location.href}
                            />

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">Robots</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        ["index, follow", "Индексировать"],
                                        ["noindex, follow", "Не индексировать"],
                                        ["index, nofollow", "Не следовать по ссылкам"],
                                        ["noindex, nofollow", "Полностью скрыть"],
                                    ].map(([value, label]) => (
                                        <button
                                            key={value}
                                            onClick={() => set("robots")(value)}
                                            className={[
                                                "px-3 py-2 text-[10px] text-left border transition-colors cursor-pointer",
                                                f.robots === value
                                                    ? "bg-[#691C32] text-white border-[#691C32]"
                                                    : "bg-white text-black/50 border-black/10 hover:border-black/25",
                                            ].join(" ")}
                                        >
                                            <span className="font-mono block text-[9px] mb-0.5 opacity-70">{value}</span>
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Info box */}
                            <div className="bg-amber-50 border border-amber-200/60 rounded p-3">
                                <p className="text-[10px] text-amber-700 leading-[1.5]">
                                    <strong>Canonical</strong> — указывает поисковику основной URL страницы, если у неё несколько адресов.<br /><br />
                                    <strong>Robots</strong> — управляет индексацией. По умолчанию: <code className="bg-amber-100 px-0.5">index, follow</code>.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 py-3.5 border-t border-black/8 bg-white flex items-center gap-3 shrink-0">
                    <button
                        onClick={handleSave}
                        disabled={saving || uploading}
                        className="flex-1 h-9 bg-[#691C32] text-white text-[10px] font-semibold uppercase tracking-widest cursor-pointer hover:bg-[#7d2239] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {saving ? (
                            <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                                Сохранение...
                            </>
                        ) : "Сохранить"}
                    </button>
                    {saved && (
                        <span className="text-emerald-600 text-[11px] font-medium flex items-center gap-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                            Сохранено
                        </span>
                    )}
                </div>
            </div>
        </>,
        document.body,
    );
};

// ── Field component ──────────────────────────────────────────────────────────

interface SeoFieldProps {
    label: string;
    hint?: string | { min: number; max: number };
    value: string;
    onChange: (v: string) => void;
    textarea?: boolean;
    maxLength?: number;
    placeholder?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}

const SeoField = ({ label, hint, value, onChange, textarea, maxLength, placeholder, inputRef }: SeoFieldProps) => {
    const len = value.length;
    const isRange = hint && typeof hint === "object";
    const rangeColor = isRange
        ? len === 0 ? "text-black/25"
        : len < hint.min ? "text-amber-500"
        : len <= hint.max ? "text-emerald-600"
        : "text-red-500"
        : "text-black/25";

    const cls = "w-full bg-white border border-black/10 px-3 py-2 text-[12px] outline-none focus:border-[#691C32] transition-colors resize-none text-[#1D1D1D] placeholder:text-black/20";

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">{label}</label>
                {hint && (
                    <span className={`text-[10px] ${typeof hint === "string" ? "text-black/30" : rangeColor}`}>
                        {typeof hint === "string" ? hint : `${len} / ${hint.max}`}
                    </span>
                )}
            </div>
            {textarea ? (
                <textarea value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} placeholder={placeholder} rows={3} className={cls} />
            ) : (
                <input ref={inputRef} value={value} onChange={(e) => onChange(e.target.value)} maxLength={maxLength} placeholder={placeholder} className={cls} />
            )}
            {isRange && (
                <div className="h-0.5 bg-black/5 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all ${rangeColor.replace("text-", "bg-")}`}
                        style={{ width: `${Math.min((len / (hint.max * 1.3)) * 100, 100)}%` }}
                    />
                </div>
            )}
        </div>
    );
};
