import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    createNewsItem,
    deleteNewsItem,
    fetchAllNews,
    updateNewsItem,
    uploadNewsImage,
    type GalleryImageRecord,
    type NewsItem,
    type SpeakerRecord,
} from "../services/news";

// ── Constants ─────────────────────────────────────────────────────────────────

const MONTHS = [
    "январь", "февраль", "март", "апрель", "май", "июнь",
    "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь",
];

const DIRECTIONS = ["мероприятие", "услуга", "врач"] as const;
const MAX_FILE_BYTES = 15 * 1024 * 1024;

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const DIRECTION_COLORS: Record<string, string> = {
    "мероприятие": "bg-purple-50 text-purple-600",
    "услуга": "bg-blue-50 text-blue-600",
    "врач": "bg-green-50 text-green-600",
};

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
    title: string;
    day: string;
    month: string;
    author: string;
    direction: "мероприятие" | "услуга" | "врач";
    image: string;
    positionImage: string;
    positionDay: string;
    isDarkened: boolean;
    mainTexts: string[];
    secondaryTexts: string[];
    speakersData: SpeakerRecord[];
    galleryImages: GalleryImageRecord[];
    sortOrder: string;
}

const emptyForm = (): FormState => ({
    title: "",
    day: "",
    month: "октябрь",
    author: "",
    direction: "мероприятие",
    image: "",
    positionImage: "",
    positionDay: "",
    isDarkened: false,
    mainTexts: [""],
    secondaryTexts: [],
    speakersData: [],
    galleryImages: [],
    sortOrder: "0",
});

const newsToForm = (item: NewsItem): FormState => ({
    title: item.title,
    day: String(item.day),
    month: item.month.toLowerCase(),
    author: item.author,
    direction: item.direction,
    image: item.image,
    positionImage: item.positionImage ?? "",
    positionDay: item.positionDay ?? "",
    isDarkened: item.isDarkened ?? false,
    mainTexts: item.mainTexts?.length ? item.mainTexts : [""],
    secondaryTexts: item.secondaryTexts ?? [],
    speakersData: item.speakersData ?? [],
    galleryImages: item.galleryImages ?? [],
    sortOrder: String(item.sortOrder ?? 0),
});

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({
    title,
    children,
    defaultOpen = false,
    badge,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    badge?: number;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-t border-black/8">
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-black/3 transition-colors cursor-pointer"
            >
                <svg
                    width="10" height="10" viewBox="0 0 10 10"
                    className={`shrink-0 text-black/30 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
                    fill="currentColor"
                >
                    <path d="M3 2l4 3-4 3V2z" />
                </svg>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1D] flex-1">
                    {title}
                </span>
                {badge !== undefined && badge > 0 && (
                    <span className="text-[9px] bg-[#691C32]/10 text-[#691C32] px-1.5 py-0.5 rounded font-mono">
                        {badge}
                    </span>
                )}
            </button>
            {open && (
                <div className="px-4 pb-4 flex flex-col gap-3">
                    {children}
                </div>
            )}
        </div>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-black/40 font-semibold">
                {label}
            </label>
            {children}
        </div>
    );
}

const inputCls =
    "w-full border border-black/12 rounded-md px-3 py-2 text-[13px] text-[#1D1D1D] bg-white focus:outline-none focus:border-[#691C32]/50 focus:ring-1 focus:ring-[#691C32]/20 transition-colors placeholder-black/25";
const textareaCls = inputCls + " resize-none";

// ── AddButton ─────────────────────────────────────────────────────────────────

function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-1.5 text-[10px] text-[#691C32] hover:text-[#7d2039] font-semibold uppercase tracking-wider cursor-pointer"
        >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {children}
        </button>
    );
}

// ── RemoveButton ──────────────────────────────────────────────────────────────

function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-6 h-6 flex items-center justify-center text-black/20 hover:text-red-400 transition-colors cursor-pointer shrink-0"
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    );
}

// ── NewsPanel ─────────────────────────────────────────────────────────────────

interface NewsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewsPanel = ({ isOpen, onClose }: NewsPanelProps) => {
    const [view, setView] = useState<"list" | "form">("list");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [items, setItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm());
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [imageUploading, setImageUploading] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const speakerAvatarRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

    const loadNews = useCallback(async () => {
        setLoading(true);
        try {
            setItems(await fetchAllNews());
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadNews();
            setView("list");
        }
    }, [isOpen, loadNews]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (view === "form") setView("list");
                else onClose();
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, view, onClose]);

    // ── Actions ───────────────────────────────────────────────────────────────

    const startCreate = () => {
        setEditingId(null);
        setForm(emptyForm());
        setView("form");
    };

    const startEdit = (item: NewsItem) => {
        setEditingId(item.id);
        setForm(newsToForm(item));
        setView("form");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Удалить эту новость?")) return;
        setDeleting(id);
        try {
            await deleteNewsItem(id);
            setItems(prev => prev.filter(i => i.id !== id));
            if (view === "form") setView("list");
        } finally {
            setDeleting(null);
        }
    };

    const handleImageUpload = async (file: File) => {
        if (file.size > MAX_FILE_BYTES) return;
        setImageUploading(true);
        try {
            const url = await uploadNewsImage(file, editingId ?? undefined);
            setForm(f => ({ ...f, image: url }));
        } finally {
            setImageUploading(false);
        }
    };

    const handleGalleryUpload = async (files: FileList) => {
        const uploaded: GalleryImageRecord[] = [];
        for (const file of Array.from(files)) {
            if (file.size > MAX_FILE_BYTES) continue;
            try {
                const url = await uploadNewsImage(file, editingId ?? undefined);
                uploaded.push({ src: url });
            } catch { /* skip */ }
        }
        setForm(f => ({ ...f, galleryImages: [...f.galleryImages, ...uploaded] }));
    };

    const handleSpeakerAvatarUpload = async (file: File, index: number) => {
        if (file.size > MAX_FILE_BYTES) return;
        try {
            const url = await uploadNewsImage(file, editingId ?? undefined);
            setForm(f => {
                const speakers = [...f.speakersData];
                speakers[index] = { ...speakers[index], avatar: url };
                return { ...f, speakersData: speakers };
            });
        } catch { /* skip */ }
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.day || !form.author.trim()) return;
        setSaving(true);
        setSaveError(null);
        try {
            const data: Record<string, unknown> = {
                title: form.title.trim(),
                day: parseInt(form.day) || 1,
                month: form.month,
                author: form.author.trim(),
                direction: form.direction,
                image: form.image,
                isDarkened: form.isDarkened,
                mainTexts: form.mainTexts.filter(t => t.trim()),
                secondaryTexts: form.secondaryTexts.filter(t => t.trim()),
                speakersData: form.speakersData.filter(s => s.name.trim()),
                galleryImages: form.galleryImages.filter(g => g.src),
            };
            if (form.positionImage) data.positionImage = form.positionImage;
            if (form.positionDay) data.positionDay = form.positionDay;

            if (editingId) {
                const updated = await updateNewsItem(editingId, data as never);
                setItems(prev => prev.map(i => i.id === editingId ? updated : i));
            } else {
                const created = await createNewsItem(data as never);
                setItems(prev => [created, ...prev]);
            }
            setView("list");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            setSaveError(msg);
        } finally {
            setSaving(false);
        }
    };

    // ── Form helpers ──────────────────────────────────────────────────────────

    const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
        setForm(f => ({ ...f, [key]: value }));

    const updateTextArray = (key: "mainTexts" | "secondaryTexts", index: number, value: string) =>
        setForm(f => {
            const arr = [...f[key]];
            arr[index] = value;
            return { ...f, [key]: arr };
        });

    const removeTextItem = (key: "mainTexts" | "secondaryTexts", index: number) =>
        setForm(f => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }));

    const addTextItem = (key: "mainTexts" | "secondaryTexts") =>
        setForm(f => ({ ...f, [key]: [...f[key], ""] }));

    const updateSpeaker = (index: number, key: keyof SpeakerRecord, value: string) =>
        setForm(f => {
            const speakers = [...f.speakersData];
            speakers[index] = { ...speakers[index], [key]: value };
            return { ...f, speakersData: speakers };
        });

    const addSpeaker = () =>
        setForm(f => ({
            ...f,
            speakersData: [
                ...f.speakersData,
                {
                    number: String(f.speakersData.length + 1).padStart(2, "0"),
                    title: "",
                    avatar: "",
                    name: "",
                    description: "",
                },
            ],
        }));

    const removeSpeaker = (index: number) =>
        setForm(f => ({ ...f, speakersData: f.speakersData.filter((_, i) => i !== index) }));

    const removeGalleryImage = (index: number) =>
        setForm(f => ({ ...f, galleryImages: f.galleryImages.filter((_, i) => i !== index) }));

    // ── Render ────────────────────────────────────────────────────────────────

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                style={{ zIndex: 99995 }}
                onClick={() => (view === "form" ? setView("list") : onClose())}
            />

            {/* Panel */}
            <div
                className={`fixed top-0 right-0 h-full bg-[#f8f7f6] border-l border-black/10 shadow-2xl flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{ width: 480, zIndex: 99996 }}
            >
                {/* ── Header ── */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-black/8 shrink-0">
                    {view === "form" && (
                        <button
                            onClick={() => setView("list")}
                            className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/8 transition-colors cursor-pointer text-black/40 hover:text-black/70"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    <span className="text-[12px] font-semibold text-[#1D1D1D] uppercase tracking-wider flex-1">
                        {view === "list" ? "Новости" : (editingId ? "Редактировать" : "Новая новость")}
                    </span>

                    {view === "list" && (
                        <span className="text-[10px] text-black/30 bg-black/6 px-1.5 py-0.5 rounded font-mono">
                            {items.length}
                        </span>
                    )}

                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/8 transition-colors cursor-pointer text-black/40 hover:text-black/70"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* ── Body ── */}
                <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
                    {view === "list" ? (
                        /* ── LIST ── */
                        <div className="flex flex-col">
                            <div className="px-4 py-3 border-b border-black/6">
                                <button
                                    onClick={startCreate}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#691C32] text-white text-[11px] font-semibold uppercase tracking-wider rounded-lg hover:bg-[#7d2039] transition-colors cursor-pointer"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    Добавить новость
                                </button>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center py-16">
                                    <div className="w-6 h-6 border-2 border-[#691C32]/20 border-t-[#691C32] rounded-full animate-spin" />
                                </div>
                            ) : items.length === 0 ? (
                                <div className="py-16 text-center flex flex-col items-center gap-2">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-black/15">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M8 7h8M8 11h8M8 15h5" />
                                    </svg>
                                    <p className="text-[12px] text-black/30 uppercase tracking-widest">Нет новостей</p>
                                    <p className="text-[10px] text-black/20">Создайте первую</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-black/6">
                                    {items.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/60 group transition-colors"
                                        >
                                            {/* Thumbnail */}
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/5 shrink-0">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/20">
                                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                                            <polyline points="21 15 16 10 5 21" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[12px] font-medium text-[#1D1D1D] truncate leading-tight">
                                                    {item.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-black/40">
                                                        {item.day} {capitalize(item.month)}
                                                    </span>
                                                    <span
                                                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${DIRECTION_COLORS[item.direction] ?? "bg-black/6 text-black/40"}`}
                                                    >
                                                        {item.direction}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-black/30 truncate mt-0.5">
                                                    {item.author}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                <button
                                                    onClick={() => startEdit(item)}
                                                    title="Редактировать"
                                                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/8 transition-colors cursor-pointer text-black/40 hover:text-[#691C32]"
                                                >
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={deleting === item.id}
                                                    title="Удалить"
                                                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-50 transition-colors cursor-pointer text-black/30 hover:text-red-500 disabled:opacity-40"
                                                >
                                                    {deleting === item.id ? (
                                                        <div className="w-3 h-3 border border-red-400 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* ── FORM ── */
                        <div className="flex flex-col">
                            {/* Basic fields */}
                            <div className="px-4 py-4 flex flex-col gap-4">
                                <Field label="Заголовок">
                                    <textarea
                                        className={textareaCls}
                                        rows={2}
                                        value={form.title}
                                        onChange={e => setField("title", e.target.value)}
                                        placeholder="Название новости"
                                        autoFocus
                                    />
                                </Field>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="День">
                                        <input
                                            type="number"
                                            min={1}
                                            max={31}
                                            className={inputCls}
                                            value={form.day}
                                            onChange={e => setField("day", e.target.value)}
                                            placeholder="17"
                                        />
                                    </Field>
                                    <Field label="Месяц">
                                        <select
                                            className={inputCls}
                                            value={form.month}
                                            onChange={e => setField("month", e.target.value)}
                                        >
                                            {MONTHS.map(m => (
                                                <option key={m} value={m}>{capitalize(m)}</option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Field label="Автор">
                                        <input
                                            type="text"
                                            className={inputCls}
                                            value={form.author}
                                            onChange={e => setField("author", e.target.value)}
                                            placeholder="Имя Фамилия"
                                        />
                                    </Field>
                                    <Field label="Направление">
                                        <select
                                            className={inputCls}
                                            value={form.direction}
                                            onChange={e => setField("direction", e.target.value as typeof form.direction)}
                                        >
                                            {DIRECTIONS.map(d => (
                                                <option key={d} value={d}>{capitalize(d)}</option>
                                            ))}
                                        </select>
                                    </Field>
                                </div>

                                {/* Image upload */}
                                <Field label="Обложка">
                                    <div
                                        className="w-full border-2 border-dashed border-black/15 rounded-lg cursor-pointer hover:border-[#691C32]/40 transition-colors overflow-hidden"
                                        onClick={() => imageInputRef.current?.click()}
                                        onDragOver={e => e.preventDefault()}
                                        onDrop={e => {
                                            e.preventDefault();
                                            const file = e.dataTransfer.files[0];
                                            if (file?.type.startsWith("image/")) handleImageUpload(file);
                                        }}
                                    >
                                        {form.image ? (
                                            <div className="relative group/img">
                                                <img
                                                    src={form.image}
                                                    alt=""
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/25 transition-colors flex items-center justify-center">
                                                    <span className="text-white text-[11px] font-semibold bg-black/60 px-3 py-1.5 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                        Заменить
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-2 py-10">
                                                {imageUploading ? (
                                                    <div className="w-5 h-5 border-2 border-[#691C32]/20 border-t-[#691C32] rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#691C32" strokeWidth="1.5" className="opacity-30">
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                            <polyline points="17 8 12 3 7 8" />
                                                            <line x1="12" y1="3" x2="12" y2="15" />
                                                        </svg>
                                                        <span className="text-[11px] text-black/30">
                                                            Нажмите или перетащите изображение
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={imageInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) handleImageUpload(file);
                                            e.target.value = "";
                                        }}
                                    />
                                </Field>
                            </div>

                            {/* Main texts */}
                            <Section
                                title="Основной текст"
                                badge={form.mainTexts.filter(t => t.trim()).length}
                                defaultOpen
                            >
                                {form.mainTexts.map((text, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <textarea
                                            className={`${textareaCls} flex-1`}
                                            rows={3}
                                            value={text}
                                            onChange={e => updateTextArray("mainTexts", i, e.target.value)}
                                            placeholder={`Параграф ${i + 1}`}
                                        />
                                        <div className="mt-2">
                                            <RemoveButton onClick={() => removeTextItem("mainTexts", i)} />
                                        </div>
                                    </div>
                                ))}
                                <AddButton onClick={() => addTextItem("mainTexts")}>
                                    Добавить параграф
                                </AddButton>
                            </Section>

                            {/* Secondary texts */}
                            <Section
                                title="Заключительный текст"
                                badge={form.secondaryTexts.filter(t => t.trim()).length}
                            >
                                {form.secondaryTexts.map((text, i) => (
                                    <div key={i} className="flex gap-2 items-start">
                                        <textarea
                                            className={`${textareaCls} flex-1`}
                                            rows={3}
                                            value={text}
                                            onChange={e => updateTextArray("secondaryTexts", i, e.target.value)}
                                            placeholder={`Параграф ${i + 1}`}
                                        />
                                        <div className="mt-2">
                                            <RemoveButton onClick={() => removeTextItem("secondaryTexts", i)} />
                                        </div>
                                    </div>
                                ))}
                                <AddButton onClick={() => addTextItem("secondaryTexts")}>
                                    Добавить параграф
                                </AddButton>
                            </Section>

                            {/* Speakers */}
                            <Section
                                title="Спикеры"
                                badge={form.speakersData.filter(s => s.name.trim()).length}
                            >
                                {form.speakersData.map((speaker, i) => (
                                    <div key={i} className="border border-black/8 rounded-lg p-3 flex flex-col gap-3 bg-white">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-mono text-black/30">
                                                СПИКЕР {speaker.number || String(i + 1).padStart(2, "0")}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => removeSpeaker(i)}
                                                className="text-[9px] text-red-400 hover:text-red-500 uppercase cursor-pointer tracking-wide"
                                            >
                                                Удалить
                                            </button>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            {/* Avatar */}
                                            <div
                                                className="w-14 h-14 rounded-full overflow-hidden bg-black/5 border-2 border-dashed border-black/10 cursor-pointer hover:border-[#691C32]/30 transition-colors shrink-0"
                                                onClick={() => speakerAvatarRefs.current[i]?.click()}
                                            >
                                                {speaker.avatar ? (
                                                    <img src={speaker.avatar} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/20">
                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                            <circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                ref={el => { speakerAvatarRefs.current[i] = el; }}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={e => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleSpeakerAvatarUpload(file, i);
                                                    e.target.value = "";
                                                }}
                                            />

                                            <div className="flex-1 flex flex-col gap-2">
                                                <input
                                                    type="text"
                                                    className={inputCls}
                                                    value={speaker.number}
                                                    onChange={e => updateSpeaker(i, "number", e.target.value)}
                                                    placeholder="01"
                                                />
                                                <input
                                                    type="text"
                                                    className={inputCls}
                                                    value={speaker.title}
                                                    onChange={e => updateSpeaker(i, "title", e.target.value)}
                                                    placeholder="Тема выступления"
                                                />
                                            </div>
                                        </div>

                                        <input
                                            type="text"
                                            className={inputCls}
                                            value={speaker.name}
                                            onChange={e => updateSpeaker(i, "name", e.target.value)}
                                            placeholder="ФИО спикера"
                                        />
                                        <input
                                            type="text"
                                            className={inputCls}
                                            value={speaker.description}
                                            onChange={e => updateSpeaker(i, "description", e.target.value)}
                                            placeholder="Должность / специализация"
                                        />
                                    </div>
                                ))}
                                <AddButton onClick={addSpeaker}>Добавить спикера</AddButton>
                            </Section>

                            {/* Gallery */}
                            <Section title="Галерея" badge={form.galleryImages.length}>
                                {form.galleryImages.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2">
                                        {form.galleryImages.map((img, i) => (
                                            <div key={i} className="relative aspect-square rounded-lg overflow-hidden group/gal">
                                                <img
                                                    src={img.src}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(i)}
                                                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover/gal:opacity-100 transition-opacity cursor-pointer"
                                                >
                                                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div
                                    className="border-2 border-dashed border-black/12 rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-[#691C32]/30 transition-colors"
                                    onClick={() => galleryInputRef.current?.click()}
                                    onDragOver={e => e.preventDefault()}
                                    onDrop={e => {
                                        e.preventDefault();
                                        handleGalleryUpload(e.dataTransfer.files);
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/30">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    <span className="text-[10px] text-black/30">Загрузить фотографии</span>
                                </div>
                                <input
                                    ref={galleryInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={e => {
                                        if (e.target.files?.length) handleGalleryUpload(e.target.files);
                                        e.target.value = "";
                                    }}
                                />
                            </Section>

                            {/* Advanced */}
                            <Section title="Дополнительно">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isDarkened}
                                        onChange={e => setField("isDarkened", e.target.checked)}
                                        className="w-3.5 h-3.5 accent-[#691C32] cursor-pointer"
                                    />
                                    <span className="text-[11px] text-[#1D1D1D]">Затемнить изображение</span>
                                </label>
                                <Field label="CSS-классы для изображения">
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={form.positionImage}
                                        onChange={e => setField("positionImage", e.target.value)}
                                        placeholder="!object-[0_0px] grayscale"
                                    />
                                </Field>
                                <Field label="CSS-классы для даты">
                                    <input
                                        type="text"
                                        className={inputCls}
                                        value={form.positionDay}
                                        onChange={e => setField("positionDay", e.target.value)}
                                        placeholder="!-bottom-[51px]"
                                    />
                                </Field>
                                <Field label="Порядок сортировки">
                                    <input
                                        type="number"
                                        className={inputCls}
                                        value={form.sortOrder}
                                        onChange={e => setField("sortOrder", e.target.value)}
                                        placeholder="0"
                                    />
                                </Field>
                            </Section>

                            {/* Extra bottom padding for footer */}
                            <div className="h-4" />
                        </div>
                    )}
                </div>

                {/* ── Footer (form only) ── */}
                {view === "form" && (
                    <div className="border-t border-black/8 bg-white shrink-0">
                        {saveError && (
                            <div className="px-4 py-2 text-[10px] text-red-500 bg-red-50 border-b border-red-100 leading-snug">
                                {saveError}
                            </div>
                        )}
                    <div className="px-4 py-3 flex items-center gap-2">
                        {editingId && (
                            <button
                                type="button"
                                onClick={() => handleDelete(editingId)}
                                disabled={saving || deleting === editingId}
                                className="flex items-center gap-1.5 text-[11px] text-red-400 hover:text-red-600 uppercase tracking-wider cursor-pointer disabled:opacity-40 mr-auto"
                            >
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                                Удалить
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => setView("list")}
                            disabled={saving}
                            className="px-4 py-2 text-[11px] text-black/50 hover:text-black/70 uppercase tracking-wider cursor-pointer disabled:opacity-40"
                        >
                            Отмена
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving || !form.title.trim() || !form.day || !form.author.trim()}
                            className="flex items-center gap-1.5 px-5 py-2 bg-[#691C32] text-white text-[11px] font-semibold uppercase tracking-wider rounded-lg hover:bg-[#7d2039] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {saving && (
                                <div className="w-3 h-3 border border-white/40 border-t-white rounded-full animate-spin" />
                            )}
                            {editingId ? "Сохранить" : "Создать"}
                        </button>
                    </div>
                    </div>
                )}
            </div>
        </>,
        document.body,
    );
};
