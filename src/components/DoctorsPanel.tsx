import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    createDoctor,
    deleteDoctor,
    fetchAllDoctors,
    updateDoctor,
    uploadDoctorImage,
} from "../services/doctors";
import type {
    DoctorCreateData,
    DoctorRecord,
    ExperienceItem,
    EducationItem,
    RouteItem,
    GalleryItem,
    ModalResultItem,
} from "../shared/types/doctor";
import {
    ProfessionalDevEditor,
    EducationEditor,
    RouteEditor,
    GalleryEditor,
    ModalResultEditor,
} from "./DoctorFormEditors";

// ── Constants ─────────────────────────────────────────────────────────────────

const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB (videos can be large)

const DEFAULT_DIRECTIONS_OPTIONS = [
    "Пересадка волос",
    "Ринопластика",
    "Пластика лица",
    "Пластика тела",
    "Интимная пластика",
    "Пластика груди",
    "Коррекция шрамов и рубцов",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const safeArray = <T,>(val: unknown): T[] => {
    if (Array.isArray(val)) return val as T[];
    if (typeof val === "string") {
        try {
            const p = JSON.parse(val);
            return Array.isArray(p) ? p : [];
        } catch {
            return [];
        }
    }
    return [];
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
    slug: string;
    lastName: string;
    firstName: string;
    specialties: string[];
    directions: string[];
    image: string;
    shadow: string;
    video: string;
    videoFooterIm: string;
    videoFooterMp: string;
    bgDesktop: string;
    bgMobile: string;
    welcomeDescription: string;
    quoteText: string;
    titleGallery: string;
    isSpecialites: boolean;
    sortOrder: string;
    modalProfessionalDev: ExperienceItem[];
    modalEducation: EducationItem[];
    route: RouteItem[];
    gallery: GalleryItem[];
    modalResult: ModalResultItem[];
}

interface FormErrors {
    slug?: string;
    lastName?: string;
    firstName?: string;
    specialties?: string;
    image?: string;
}

const emptyForm = (): FormState => ({
    slug: "",
    lastName: "",
    firstName: "",
    specialties: [""],
    directions: [],
    image: "",
    shadow: "",
    video: "",
    videoFooterIm: "",
    videoFooterMp: "",
    bgDesktop: "",
    bgMobile: "",
    welcomeDescription: "",
    quoteText: "",
    titleGallery: "",
    isSpecialites: false,
    sortOrder: "0",
    modalProfessionalDev: [],
    modalEducation: [],
    route: [],
    gallery: [],
    modalResult: [],
});

const recordToForm = (item: DoctorRecord): FormState => ({
    slug: item.slug,
    lastName: item.lastName,
    firstName: item.firstName,
    specialties: safeArray<string>(item.specialties).length
        ? safeArray<string>(item.specialties)
        : [""],
    directions: safeArray<string>(item.directions),
    image: item.image ?? "",
    shadow: item.shadow ?? "",
    video: item.video ?? "",
    videoFooterIm: item.videoFooterIm ?? "",
    videoFooterMp: item.videoFooterMp ?? "",
    bgDesktop: item.bgDesktop ?? "",
    bgMobile: item.bgMobile ?? "",
    welcomeDescription: item.welcomeDescription ?? "",
    quoteText: item.quoteText ?? "",
    titleGallery: item.titleGallery ?? "",
    isSpecialites: item.isSpecialites ?? false,
    sortOrder: String(item.sortOrder ?? 0),
    modalProfessionalDev: item.modalProfessionalDev ?? [],
    modalEducation: item.modalEducation ?? [],
    route: item.route ?? [],
    gallery: item.gallery ?? [],
    modalResult: item.modal_result ?? [],
});

const validate = (form: FormState): FormErrors => {
    const errors: FormErrors = {};
    if (!form.slug.trim()) {
        errors.slug = "Обязательное поле";
    } else if (!/^[a-z0-9-]+$/.test(form.slug.trim())) {
        errors.slug = "Только a-z, 0-9 и дефис";
    }
    if (!form.lastName.trim()) errors.lastName = "Обязательное поле";
    if (!form.firstName.trim()) errors.firstName = "Обязательное поле";
    if (!form.specialties.some((s) => s.trim())) {
        errors.specialties = "Укажите хотя бы одну специальность";
    }
    if (!form.image.trim()) errors.image = "Фото обязательно";
    return errors;
};

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
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-black/3 transition-colors cursor-pointer"
            >
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
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
                <div className="px-4 pb-4 flex flex-col gap-3">{children}</div>
            )}
        </div>
    );
}

function Field({
    label,
    error,
    required,
    children,
}: {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-black/40 font-semibold flex items-center gap-1">
                {label}
                {required && <span className="text-[#691C32]">*</span>}
            </label>
            {children}
            {error && (
                <p className="text-[10px] text-red-500 leading-tight">{error}</p>
            )}
        </div>
    );
}

const inputCls =
    "w-full border border-black/12 rounded-md px-3 py-2 text-[13px] text-[#1D1D1D] bg-white focus:outline-none focus:border-[#691C32]/50 focus:ring-1 focus:ring-[#691C32]/20 transition-colors placeholder-black/25";
const inputErrCls =
    "w-full border border-red-300 rounded-md px-3 py-2 text-[13px] text-[#1D1D1D] bg-white focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200 transition-colors placeholder-black/25";
const textareaCls = inputCls + " resize-none";

function AddButton({
    onClick,
    children,
}: {
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-1.5 text-[10px] text-[#691C32] hover:text-[#7d2039] font-semibold uppercase tracking-wider cursor-pointer"
        >
            <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            {children}
        </button>
    );
}

function RemoveButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-6 h-6 flex items-center justify-center text-black/20 hover:text-red-400 transition-colors cursor-pointer shrink-0"
        >
            <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    );
}

/** URL-input + кнопка «Загрузить с компа» */
function UploadableInput({
    value,
    onChange,
    onUpload,
    uploading,
    placeholder,
    accept = "image/*",
}: {
    value: string;
    onChange: (v: string) => void;
    onUpload: (file: File) => Promise<void>;
    uploading?: boolean;
    placeholder?: string;
    accept?: string;
}) {
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1">
                <input
                    className={inputCls}
                    placeholder={placeholder ?? "URL или загрузите файл"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => ref.current?.click()}
                    disabled={uploading}
                    title="Загрузить с компа"
                    className="shrink-0 w-9 h-9 flex items-center justify-center border border-black/12 rounded-md bg-white hover:border-[#691C32]/40 hover:text-[#691C32] text-black/40 transition-colors cursor-pointer disabled:opacity-40"
                >
                    {uploading ? (
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="animate-spin"
                        >
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                    ) : (
                        <svg
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    )}
                </button>
                <input
                    ref={ref}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                            if (f.size > MAX_FILE_BYTES) {
                                alert("Файл слишком большой (макс. 50 МБ)");
                                return;
                            }
                            await onUpload(f);
                        }
                        e.target.value = "";
                    }}
                />
            </div>
        </div>
    );
}

// ── DoctorsPanel ──────────────────────────────────────────────────────────────

interface DoctorsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const DoctorsPanel = ({ isOpen, onClose }: DoctorsPanelProps) => {
    const [view, setView] = useState<"list" | "form">("list");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [items, setItems] = useState<DoctorRecord[]>([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm());
    const [errors, setErrors] = useState<FormErrors>({});
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    // uploading state per field key
    const [uploading, setUploading] = useState<Record<string, boolean>>({});
    // Available directions (default + custom from all doctors)
    const [directionsOptions, setDirectionsOptions] = useState<string[]>(DEFAULT_DIRECTIONS_OPTIONS);
    const [newDirection, setNewDirection] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);

    const loadDoctors = useCallback(async () => {
        setLoading(true);
        try {
            const docs = await fetchAllDoctors();
            setItems(docs);
            
            // Собираем все уникальные направления из всех врачей
            const allDirections = new Set<string>(DEFAULT_DIRECTIONS_OPTIONS);
            docs.forEach((doc) => {
                doc.directions?.forEach((dir) => allDirections.add(dir));
            });
            setDirectionsOptions(Array.from(allDirections));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadDoctors();
            setView("list");
        }
    }, [isOpen, loadDoctors]);

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

    // ── Upload helper ─────────────────────────────────────────────────────────

    const makeUploader =
        (fieldKey: keyof FormState) =>
        async (file: File): Promise<void> => {
            setUploading((u) => ({ ...u, [fieldKey]: true }));
            try {
                const url = await uploadDoctorImage(
                    file,
                    editingId ?? undefined,
                );
                setForm((f) => ({ ...f, [fieldKey]: url }));
            } finally {
                setUploading((u) => ({ ...u, [fieldKey]: false }));
            }
        };

    const makeGalleryUploader =
        (groupIndex: number, col: "left" | "center" | "right", imgIndex: number) =>
        async (file: File) => {
            const key = `gallery_${groupIndex}_${col}_${imgIndex}`;
            setUploading((u) => ({ ...u, [key]: true }));
            try {
                const url = await uploadDoctorImage(file, editingId ?? undefined);
                setForm((f) => {
                    const gallery = [...f.gallery];
                    const group = { ...gallery[groupIndex] };
                    const colKey =
                        col === "left"
                            ? "leftColumnImages"
                            : col === "center"
                              ? "centerColumnImages"
                              : "rightColumnImages";
                    const imgs = [...(group[colKey] ?? [])];
                    imgs[imgIndex] = url;
                    group[colKey] = imgs;
                    gallery[groupIndex] = group;
                    return { ...f, gallery };
                });
            } finally {
                setUploading((u) => ({ ...u, [key]: false }));
            }
        };

    const makeRouteUploader = (index: number) => async (file: File) => {
        const key = `route_${index}`;
        setUploading((u) => ({ ...u, [key]: true }));
        try {
            const url = await uploadDoctorImage(file, editingId ?? undefined);
            setForm((f) => {
                const arr = [...f.route];
                arr[index] = { ...arr[index], image: url };
                return { ...f, route: arr };
            });
        } finally {
            setUploading((u) => ({ ...u, [key]: false }));
        }
    };

    // ── Actions ───────────────────────────────────────────────────────────────

    const startCreate = () => {
        setEditingId(null);
        setForm(emptyForm());
        setErrors({});
        setSaveError(null);
        setView("form");
        setTimeout(() => scrollRef.current?.scrollTo(0, 0), 50);
    };

    const startEdit = (item: DoctorRecord) => {
        setEditingId(item.id);
        setForm(recordToForm(item));
        setErrors({});
        setSaveError(null);
        setView("form");
        setTimeout(() => scrollRef.current?.scrollTo(0, 0), 50);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Удалить этого врача?")) return;
        setDeleting(id);
        try {
            await deleteDoctor(id);
            setItems((prev) => prev.filter((i) => i.id !== id));
            if (view === "form") setView("list");
        } finally {
            setDeleting(null);
        }
    };

    const handleSave = async () => {
        const errs = validate(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setSaving(true);
        setSaveError(null);
        try {
            const data: DoctorCreateData = {
                slug: form.slug.trim(),
                lastName: form.lastName.trim(),
                firstName: form.firstName.trim(),
                specialties: form.specialties.filter((s) => s.trim()),
                directions: form.directions,
                image: form.image,
                shadow: form.shadow || undefined,
                video: form.video,
                videoFooterIm: form.videoFooterIm || undefined,
                videoFooterMp: form.videoFooterMp || undefined,
                bgDesktop: form.bgDesktop || undefined,
                bgMobile: form.bgMobile || undefined,
                welcomeDescription: form.welcomeDescription || undefined,
                quoteText: form.quoteText || undefined,
                titleGallery: form.titleGallery || undefined,
                isSpecialites: form.isSpecialites,
                sortOrder: parseInt(form.sortOrder) || 0,
                modalProfessionalDev: form.modalProfessionalDev.length > 0 ? form.modalProfessionalDev : [],
                modalEducation: form.modalEducation.length > 0 ? form.modalEducation : [],
                route: form.route.length > 0 ? form.route : [],
                gallery: form.gallery.length > 0 ? form.gallery : [],
                modal_result: form.modalResult.length > 0 ? form.modalResult : [],
                modalCardEducation: [],
                modalCardPath: [],
            };

            if (editingId) {
                const updated = await updateDoctor(editingId, data);
                setItems((prev) =>
                    prev.map((i) => (i.id === editingId ? updated : i)),
                );
            } else {
                const created = await createDoctor(data);
                setItems((prev) => [...prev, created]);
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
        setForm((f) => ({ ...f, [key]: value }));

    const clearError = (key: keyof FormErrors) =>
        setErrors((e) => {
            const next = { ...e };
            delete next[key];
            return next;
        });

    const updateSpecialty = (index: number, value: string) =>
        setForm((f) => {
            const arr = [...f.specialties];
            arr[index] = value;
            return { ...f, specialties: arr };
        });

    const removeSpecialty = (index: number) =>
        setForm((f) => ({
            ...f,
            specialties: f.specialties.filter((_, i) => i !== index),
        }));

    const toggleDirection = (dir: string) =>
        setForm((f) => ({
            ...f,
            directions: f.directions.includes(dir)
                ? f.directions.filter((d) => d !== dir)
                : [...f.directions, dir],
        }));

    const addNewDirection = () => {
        const trimmed = newDirection.trim();
        if (trimmed && !form.directions.includes(trimmed)) {
            setForm((f) => ({
                ...f,
                directions: [...f.directions, trimmed],
            }));
            if (!directionsOptions.includes(trimmed)) {
                setDirectionsOptions((prev) => [...prev, trimmed]);
            }
            setNewDirection("");
        }
    };

    const handleNewDirectionKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewDirection();
        }
    };

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
                style={{ width: 500, zIndex: 99996 }}
            >
                {/* Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-black/8 shrink-0">
                    {view === "form" && (
                        <button
                            onClick={() => setView("list")}
                            className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/8 transition-colors cursor-pointer text-black/40 hover:text-black/70"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                    )}

                    <span className="text-[12px] font-semibold text-[#1D1D1D] uppercase tracking-wider flex-1">
                        {view === "list"
                            ? "Врачи"
                            : editingId
                              ? "Редактировать врача"
                              : "Новый врач"}
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
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto" onWheel={(e) => e.stopPropagation()}>

                    {/* ── List view ── */}
                    {view === "list" && (
                        <div className="flex flex-col">
                            <div className="px-4 py-3 border-b border-black/6">
                                <button
                                    onClick={startCreate}
                                    className="w-full py-2 bg-[#691C32] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#7d2239] transition-colors cursor-pointer rounded"
                                >
                                    + Добавить врача
                                </button>
                            </div>

                            {loading ? (
                                <div className="px-4 py-8 text-center text-[12px] text-black/30 uppercase tracking-wider">
                                    Загрузка…
                                </div>
                            ) : items.length === 0 ? (
                                <div className="px-4 py-8 text-center text-[12px] text-black/30 uppercase tracking-wider">
                                    Врачи не найдены
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 px-4 py-3 border-b border-black/6 hover:bg-white/60 transition-colors group"
                                    >
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-10 h-10 object-cover rounded shrink-0 bg-black/5"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] font-semibold text-[#1D1D1D] truncate">
                                                {item.lastName} {item.firstName}
                                            </p>
                                            <p className="text-[10px] text-black/40 truncate">
                                                {safeArray<string>(item.specialties)[0] ?? "—"}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => startEdit(item)}
                                                className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/8 transition-colors cursor-pointer text-black/40 hover:text-[#691C32]"
                                                title="Редактировать"
                                            >
                                                <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                disabled={deleting === item.id}
                                                className="w-7 h-7 flex items-center justify-center rounded hover:bg-black/8 transition-colors cursor-pointer text-black/40 hover:text-red-500 disabled:opacity-40"
                                                title="Удалить"
                                            >
                                                <svg
                                                    width="13"
                                                    height="13"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6l-1 14H6L5 6" />
                                                    <path d="M10 11v6M14 11v6" />
                                                    <path d="M9 6V4h6v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* ── Form view ── */}
                    {view === "form" && (
                        <div className="flex flex-col pb-4">

                            {/* Основное */}
                            <Section title="Основное" defaultOpen>
                                <Field
                                    label="Slug (URL-идентификатор)"
                                    error={errors.slug}
                                    required
                                >
                                    <input
                                        className={errors.slug ? inputErrCls : inputCls}
                                        placeholder="serb-irina"
                                        value={form.slug}
                                        onChange={(e) => {
                                            setField("slug", slugify(e.target.value));
                                            clearError("slug");
                                        }}
                                    />
                                    <p className="text-[10px] text-black/30">
                                        Используется в URL: /doctor/serb-irina
                                    </p>
                                </Field>

                                <div className="grid grid-cols-2 gap-2">
                                    <Field
                                        label="Фамилия"
                                        error={errors.lastName}
                                        required
                                    >
                                        <input
                                            className={errors.lastName ? inputErrCls : inputCls}
                                            placeholder="Серб"
                                            value={form.lastName}
                                            onChange={(e) => {
                                                setField("lastName", e.target.value);
                                                clearError("lastName");
                                            }}
                                        />
                                    </Field>
                                    <Field
                                        label="Имя Отчество"
                                        error={errors.firstName}
                                        required
                                    >
                                        <input
                                            className={errors.firstName ? inputErrCls : inputCls}
                                            placeholder="Ирина Анатольевна"
                                            value={form.firstName}
                                            onChange={(e) => {
                                                setField("firstName", e.target.value);
                                                clearError("firstName");
                                            }}
                                        />
                                    </Field>
                                </div>

                                <Field
                                    label={`Специальности (${form.specialties.filter((s) => s.trim()).length})`}
                                    error={errors.specialties}
                                    required
                                >
                                    <div className="flex flex-col gap-1.5">
                                        {form.specialties.map((s, i) => (
                                            <div key={i} className="flex gap-1 items-center">
                                                <input
                                                    className={inputCls}
                                                    placeholder={
                                                        i === 0
                                                            ? "Пластический хирург"
                                                            : "ГЛАВНЫЙ ВРАЧ"
                                                    }
                                                    value={s}
                                                    onChange={(e) => {
                                                        updateSpecialty(i, e.target.value);
                                                        clearError("specialties");
                                                    }}
                                                />
                                                {form.specialties.length > 1 && (
                                                    <RemoveButton
                                                        onClick={() => removeSpecialty(i)}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <AddButton
                                            onClick={() =>
                                                setField("specialties", [
                                                    ...form.specialties,
                                                    "",
                                                ])
                                            }
                                        >
                                            Добавить специальность
                                        </AddButton>
                                    </div>
                                </Field>

                                <Field label="Направления">
                                    <div className="flex flex-wrap gap-1.5 mb-3 max-h-48 overflow-y-auto p-1">
                                        {directionsOptions.map((dir) => (
                                            <button
                                                key={dir}
                                                type="button"
                                                onClick={() => toggleDirection(dir)}
                                                className={`text-[10px] px-2 py-1 rounded border cursor-pointer transition-colors shrink-0 ${
                                                    form.directions.includes(dir)
                                                        ? "bg-[#691C32] text-white border-[#691C32]"
                                                        : "bg-white text-black/50 border-black/12 hover:border-[#691C32]/40"
                                                }`}
                                            >
                                                {dir}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <input
                                            className={inputCls}
                                            placeholder="Введите новое направление"
                                            value={newDirection}
                                            onChange={(e) => setNewDirection(e.target.value)}
                                            onKeyDown={handleNewDirectionKeyDown}
                                        />
                                        <button
                                            type="button"
                                            onClick={addNewDirection}
                                            className="shrink-0 w-9 h-9 flex items-center justify-center border border-black/12 rounded-md bg-white hover:border-[#691C32]/40 hover:text-[#691C32] text-black/40 transition-colors cursor-pointer"
                                            title="Добавить направление"
                                        >
                                            <svg
                                                width="13"
                                                height="13"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                            >
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-[9px] text-black/30">
                                        Нажмите Enter или кнопку + для добавления
                                    </p>
                                </Field>

                                <div className="grid grid-cols-2 gap-2">
                                    <Field label="Порядок сортировки">
                                        <input
                                            type="number"
                                            className={inputCls}
                                            value={form.sortOrder}
                                            onChange={(e) =>
                                                setField("sortOrder", e.target.value)
                                            }
                                        />
                                    </Field>
                                    <Field label="isSpecialites">
                                        <label className="flex items-center gap-2 cursor-pointer mt-2">
                                            <input
                                                type="checkbox"
                                                checked={form.isSpecialites}
                                                onChange={(e) =>
                                                    setField("isSpecialites", e.target.checked)
                                                }
                                                className="accent-[#691C32]"
                                            />
                                            <span className="text-[12px] text-[#1D1D1D]">
                                                Включить
                                            </span>
                                        </label>
                                    </Field>
                                </div>
                            </Section>

                            {/* Медиа */}
                            <Section title="Медиа">
                                <Field label="Фото (image)" error={errors.image} required>
                                    <UploadableInput
                                        value={form.image}
                                        onChange={(v) => {
                                            setField("image", v);
                                            clearError("image");
                                        }}
                                        onUpload={makeUploader("image")}
                                        uploading={uploading["image"]}
                                        placeholder="/swiper1.webp"
                                    />
                                    {form.image && (
                                        <img
                                            src={form.image}
                                            alt=""
                                            className="w-full max-h-32 object-cover rounded border border-black/8 mt-1"
                                        />
                                    )}
                                </Field>

                                <Field label="Тень (shadow)">
                                    <UploadableInput
                                        value={form.shadow}
                                        onChange={(v) => setField("shadow", v)}
                                        onUpload={makeUploader("shadow")}
                                        uploading={uploading["shadow"]}
                                        placeholder="/swiper1-shadow.webp"
                                    />
                                </Field>

                                <Field label="Видео на карточке (video)">
                                    <UploadableInput
                                        value={form.video}
                                        onChange={(v) => setField("video", v)}
                                        onUpload={makeUploader("video")}
                                        uploading={uploading["video"]}
                                        placeholder="/serb.gif"
                                        accept="image/gif,video/*"
                                    />
                                </Field>

                                <Field label="Видео для футера (WebM)">
                                    <UploadableInput
                                        value={form.videoFooterIm}
                                        onChange={(v) => setField("videoFooterIm", v)}
                                        onUpload={makeUploader("videoFooterIm")}
                                        uploading={uploading["videoFooterIm"]}
                                        placeholder="/serb-short.webm"
                                        accept="video/webm,video/*"
                                    />
                                </Field>

                                <Field label="Видео для футера (MP4)">
                                    <UploadableInput
                                        value={form.videoFooterMp}
                                        onChange={(v) => setField("videoFooterMp", v)}
                                        onUpload={makeUploader("videoFooterMp")}
                                        uploading={uploading["videoFooterMp"]}
                                        placeholder="/serb-short.mp4"
                                        accept="video/mp4,video/*"
                                    />
                                </Field>

                                <Field label="Фон десктоп">
                                    <UploadableInput
                                        value={form.bgDesktop}
                                        onChange={(v) => setField("bgDesktop", v)}
                                        onUpload={makeUploader("bgDesktop")}
                                        uploading={uploading["bgDesktop"]}
                                        placeholder="/doctor-screen/bg.webp"
                                    />
                                </Field>

                                <Field label="Фон мобайл">
                                    <UploadableInput
                                        value={form.bgMobile}
                                        onChange={(v) => setField("bgMobile", v)}
                                        onUpload={makeUploader("bgMobile")}
                                        uploading={uploading["bgMobile"]}
                                        placeholder="/doctor-screen/serb1.webp"
                                    />
                                </Field>
                            </Section>

                            {/* Текст */}
                            <Section title="Текст">
                                <Field label="Описание врача">
                                    <textarea
                                        className={textareaCls}
                                        rows={4}
                                        placeholder="Профессионал со стажем работы в специальности..."
                                        value={form.welcomeDescription}
                                        onChange={(e) =>
                                            setField("welcomeDescription", e.target.value)
                                        }
                                    />
                                    <p className="text-[10px] text-black/30">
                                        Макс. рекомендуется ~400 символов
                                    </p>
                                </Field>

                                <Field label="Цитата">
                                    <textarea
                                        className={textareaCls}
                                        rows={4}
                                        placeholder="Красота и жизнь нераздельно сплетены..."
                                        value={form.quoteText}
                                        onChange={(e) =>
                                            setField("quoteText", e.target.value)
                                        }
                                    />
                                </Field>

                                <Field label="Заголовок галереи">
                                    <input
                                        className={inputCls}
                                        placeholder="Красота как стиль жизни"
                                        value={form.titleGallery}
                                        onChange={(e) =>
                                            setField("titleGallery", e.target.value)
                                        }
                                    />
                                </Field>
                            </Section>

                            {/* Опыт работы */}
                            <Section title="Опыт работы">
                                <ProfessionalDevEditor
                                    value={form.modalProfessionalDev}
                                    onChange={(val) =>
                                        setField("modalProfessionalDev", val)
                                    }
                                />
                            </Section>

                            {/* Образование */}
                            <Section title="Образование">
                                <EducationEditor
                                    value={form.modalEducation}
                                    onChange={(val) => setField("modalEducation", val)}
                                />
                            </Section>

                            {/* Маршрут */}
                            <Section title="Хронология / Маршрут">
                                <RouteEditor
                                    value={form.route}
                                    onChange={(val) => setField("route", val)}
                                    uploading={uploading}
                                    onUpload={async (index, file) => {
                                        await makeRouteUploader(index)(file);
                                    }}
                                />
                            </Section>

                            {/* Галерея */}
                            <Section title="Галерея">
                                <GalleryEditor
                                    value={form.gallery}
                                    onChange={(val) => setField("gallery", val)}
                                    uploading={uploading}
                                    onUpload={async (groupIndex, col, imgIndex, file) => {
                                        await makeGalleryUploader(groupIndex, col, imgIndex)(file);
                                    }}
                                />
                            </Section>

                            {/* Результаты */}
                            <Section title="Результаты операций">
                                <ModalResultEditor
                                    value={form.modalResult}
                                    onChange={(val) => setField("modalResult", val)}
                                    uploading={uploading}
                                    uploadDoctorImage={uploadDoctorImage}
                                    setUploading={setUploading}
                                />
                            </Section>
                        </div>
                    )}
                </div>

                {/* Footer (form actions) */}
                {view === "form" && (
                    <div className="shrink-0 border-t border-black/8 bg-white px-4 py-3 flex flex-col gap-2">
                        {Object.keys(errors).length > 0 && (
                            <p className="text-[11px] text-red-500 leading-tight">
                                Заполните обязательные поля (отмечены *)
                            </p>
                        )}
                        {saveError && (
                            <p className="text-[11px] text-red-500 leading-tight">
                                {saveError}
                            </p>
                        )}
                        <div className="flex gap-2">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(editingId)}
                                    disabled={saving || deleting === editingId}
                                    className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer disabled:opacity-40"
                                >
                                    Удалить
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setView("list")}
                                className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-black/40 hover:text-black/70 hover:bg-black/4 rounded transition-colors cursor-pointer"
                            >
                                Отмена
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="flex-1 py-2 bg-[#691C32] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#7d2239] transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed rounded"
                            >
                                {saving
                                    ? "Сохранение…"
                                    : editingId
                                      ? "Сохранить"
                                      : "Создать"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>,
        document.body,
    );
};
