import React, { useRef } from "react";
import type {
    ExperienceItem,
    EducationItem,
    RouteItem,
    GalleryItem,
    ModalResultItem,
    Directions,
} from "../shared/types/doctor";

// ── Common styles ─────────────────────────────────────────────────────────────

const inputCls =
    "w-full border border-black/12 rounded-md px-3 py-2 text-[13px] text-[#1D1D1D] bg-white focus:outline-none focus:border-[#691C32]/50 focus:ring-1 focus:ring-[#691C32]/20 transition-colors placeholder-black/25";
const textareaCls = inputCls + " resize-none";

const DIRECTIONS_OPTIONS: Directions[] = [
    "Пересадка волос",
    "Ринопластика",
    "Пластика лица",
    "Пластика тела",
    "Интимная пластика",
    "Пластика груди",
    "Коррекция шрамов и рубцов",
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase tracking-wider text-black/40 font-semibold">
                {label}
            </label>
            {children}
        </div>
    );
}

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
                            await onUpload(f);
                        }
                        e.target.value = "";
                    }}
                />
            </div>
        </div>
    );
}

// ── Professional Dev Editor ───────────────────────────────────────────────────

interface ProfessionalDevEditorProps {
    value: ExperienceItem[];
    onChange: (value: ExperienceItem[]) => void;
}

export const ProfessionalDevEditor = ({
    value,
    onChange,
}: ProfessionalDevEditorProps) => {
    const addItem = () => {
        onChange([...value, { year: "", description: [""] }]);
    };

    const removeItem = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateYear = (index: number, year: string) => {
        const next = [...value];
        next[index] = { ...next[index], year };
        onChange(next);
    };

    const updateDescription = (index: number, desc: string) => {
        const next = [...value];
        next[index] = { ...next[index], description: desc };
        onChange(next);
    };

    return (
        <div className="flex flex-col gap-3">
            {value.map((item, i) => (
                <div key={i} className="p-3 bg-white rounded border border-black/8">
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            className={`${inputCls} w-24`}
                            placeholder="Год"
                            value={item.year ?? ""}
                            onChange={(e) => updateYear(i, e.target.value)}
                        />
                        <div className="flex-1" />
                        <RemoveButton onClick={() => removeItem(i)} />
                    </div>
                    <Field label="Описание">
                        <textarea
                            className={textareaCls}
                            rows={2}
                            placeholder="Описание места работы, должности..."
                            value={Array.isArray(item.description) ? item.description.join("\n") : item.description}
                            onChange={(e) =>
                                updateDescription(i, e.target.value)
                            }
                        />
                    </Field>
                </div>
            ))}
            <AddButton onClick={addItem}>Добавить запись</AddButton>
        </div>
    );
};

// ── Education Editor ──────────────────────────────────────────────────────────

interface EducationEditorProps {
    value: EducationItem[];
    onChange: (value: EducationItem[]) => void;
}

export const EducationEditor = ({
    value,
    onChange,
}: EducationEditorProps) => {
    const addItem = () => {
        onChange([...value, { year: "", description: "", specializations: [] }]);
    };

    const removeItem = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateYear = (index: number, year: string) => {
        const next = [...value];
        next[index] = { ...next[index], year } as EducationItem;
        onChange(next);
    };

    const updateDescription = (index: number, desc: string) => {
        const next = [...value];
        next[index] = { ...next[index], description: desc } as EducationItem;
        onChange(next);
    };

    const toggleSpecialization = (index: number, spec: string) => {
        const item = value[index];
        const specs = (item.specializations as string[]) ?? [];
        const nextSpecs = specs.includes(spec)
            ? specs.filter((s) => s !== spec)
            : [...specs, spec];
        const next = [...value];
        next[index] = { ...item, specializations: nextSpecs } as EducationItem;
        onChange(next);
    };

    return (
        <div className="flex flex-col gap-3">
            {value.map((item, i) => (
                <div key={i} className="p-3 bg-white rounded border border-black/8">
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            className={`${inputCls} w-24`}
                            placeholder="Год"
                            value={"year" in item && item.year ? item.year : ""}
                            onChange={(e) => updateYear(i, e.target.value)}
                        />
                        <div className="flex-1" />
                        <RemoveButton onClick={() => removeItem(i)} />
                    </div>
                    <Field label="Описание">
                        <textarea
                            className={textareaCls}
                            rows={2}
                            placeholder="Учебное заведение, специальность..."
                            value={item.description}
                            onChange={(e) =>
                                updateDescription(i, e.target.value)
                            }
                        />
                    </Field>
                    <div className="mt-2">
                        <p className="text-[10px] uppercase tracking-wider text-black/40 font-semibold mb-1">
                            Специализации
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {DIRECTIONS_OPTIONS.map((spec) => (
                                <button
                                    key={spec}
                                    type="button"
                                    onClick={() => toggleSpecialization(i, spec)}
                                    className={`text-[9px] px-1.5 py-0.5 rounded border cursor-pointer transition-colors ${
                                        (item.specializations ?? []).includes(spec)
                                            ? "bg-[#691C32] text-white border-[#691C32]"
                                            : "bg-white text-black/50 border-black/12 hover:border-[#691C32]/40"
                                    }`}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
            <AddButton onClick={addItem}>Добавить запись</AddButton>
        </div>
    );
};

// ── Route Editor ──────────────────────────────────────────────────────────────

interface RouteEditorProps {
    value: RouteItem[];
    onChange: (value: RouteItem[]) => void;
    uploading: Record<string, boolean>;
    onUpload: (index: number, file: File) => Promise<void>;
}

export const RouteEditor = ({
    value,
    onChange,
    uploading,
    onUpload,
}: RouteEditorProps) => {
    const addItem = () => {
        onChange([
            ...value,
            {
                year: "",
                title: "",
                description: "",
                image: "",
                backgroundYear: "",
                imageClassName: "",
            },
        ]);
    };

    const removeItem = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateField = (
        index: number,
        field: keyof RouteItem,
        val: string,
    ) => {
        const next = [...value];
        next[index] = { ...next[index], [field]: val };
        onChange(next);
    };

    return (
        <div className="flex flex-col gap-3">
            {value.map((item, i) => (
                <div key={i} className="p-3 bg-white rounded border border-black/8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-black/40">
                            Запись #{i + 1}
                        </span>
                        <div className="flex-1" />
                        <RemoveButton onClick={() => removeItem(i)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <Field label="Год">
                            <input
                                className={inputCls}
                                placeholder="2025"
                                value={item.year}
                                onChange={(e) => updateField(i, "year", e.target.value)}
                            />
                        </Field>
                        <Field label="Фон года">
                            <input
                                className={inputCls}
                                placeholder="2025"
                                value={item.backgroundYear}
                                onChange={(e) =>
                                    updateField(i, "backgroundYear", e.target.value)
                                }
                            />
                        </Field>
                    </div>
                    <Field label="Заголовок">
                        <input
                            className={inputCls}
                            placeholder="Открытие клиники"
                            value={item.title}
                            onChange={(e) => updateField(i, "title", e.target.value)}
                        />
                    </Field>
                    <Field label="Описание">
                        <textarea
                            className={textareaCls}
                            rows={2}
                            placeholder="Краткое описание события..."
                            value={item.description}
                            onChange={(e) =>
                                updateField(i, "description", e.target.value)
                            }
                        />
                    </Field>
                    <Field label="Изображение">
                        <UploadableInput
                            value={item.image}
                            onChange={(v) => updateField(i, "image", v)}
                            onUpload={(f) => onUpload(i, f)}
                            uploading={uploading[`route_${i}`]}
                            placeholder="/doctor-screen/route1.webp"
                        />
                        {item.image && (
                            <img
                                src={item.image}
                                alt=""
                                className="w-full max-h-24 object-cover rounded border border-black/8 mt-1"
                            />
                        )}
                    </Field>
                    <Field label="CSS класс изображения">
                        <input
                            className={inputCls}
                            placeholder="w-[200px]"
                            value={item.imageClassName}
                            onChange={(e) =>
                                updateField(i, "imageClassName", e.target.value)
                            }
                        />
                    </Field>
                </div>
            ))}
            <AddButton onClick={addItem}>Добавить запись</AddButton>
        </div>
    );
};

// ── Gallery Editor ────────────────────────────────────────────────────────────

interface GalleryEditorProps {
    value: GalleryItem[];
    onChange: (value: GalleryItem[]) => void;
    uploading: Record<string, boolean>;
    onUpload: (groupIndex: number, col: "left" | "center" | "right", imgIndex: number, file: File) => Promise<void>;
}

export const GalleryEditor = ({
    value,
    onChange,
    uploading,
    onUpload,
}: GalleryEditorProps) => {
    const addGallery = () => {
        onChange([
            ...value,
            { leftColumnImages: [], centerColumnImages: [], rightColumnImages: [] },
        ]);
    };

    const removeGallery = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const addImage = (groupIndex: number, col: "left" | "center" | "right") => {
        const next = [...value];
        const key = col === "left" ? "leftColumnImages" : col === "center" ? "centerColumnImages" : "rightColumnImages";
        next[groupIndex] = {
            ...next[groupIndex],
            [key]: [...(next[groupIndex][key] ?? []), ""],
        };
        onChange(next);
    };

    const updateImage = (
        groupIndex: number,
        col: "left" | "center" | "right",
        imgIndex: number,
        url: string,
    ) => {
        const next = [...value];
        const key = col === "left" ? "leftColumnImages" : col === "center" ? "centerColumnImages" : "rightColumnImages";
        const arr = [...(next[groupIndex][key] ?? [])];
        arr[imgIndex] = url;
        next[groupIndex] = { ...next[groupIndex], [key]: arr };
        onChange(next);
    };

    const removeImage = (
        groupIndex: number,
        col: "left" | "center" | "right",
        imgIndex: number,
    ) => {
        const next = [...value];
        const key = col === "left" ? "leftColumnImages" : col === "center" ? "centerColumnImages" : "rightColumnImages";
        next[groupIndex] = {
            ...next[groupIndex],
            [key]: (next[groupIndex][key] ?? []).filter((_, i) => i !== imgIndex),
        };
        onChange(next);
    };

    const Column = ({
        title,
        col,
        images,
        groupIndex,
    }: {
        title: string;
        col: "left" | "center" | "right";
        images: string[];
        groupIndex: number;
    }) => (
        <div className="flex flex-col gap-1">
            <p className="text-[10px] font-semibold text-black/40 uppercase">{title}</p>
            <div className="flex flex-col gap-2">
                {images.map((img, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                            <input
                                className={inputCls}
                                placeholder="/gallery/img1.webp"
                                value={img}
                                onChange={(e) => updateImage(groupIndex, col, i, e.target.value)}
                            />
                            <RemoveButton onClick={() => removeImage(groupIndex, col, i)} />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.accept = 'image/*';
                                input.onchange = async (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) {
                                        await onUpload(groupIndex, col, i, file);
                                    }
                                };
                                input.click();
                            }}
                            disabled={uploading[`gallery_${groupIndex}_${col}_${i}`]}
                            className="text-[9px] px-1.5 py-0.5 bg-[#691C32] text-white rounded hover:bg-[#7d2239] transition-colors cursor-pointer disabled:opacity-40 self-start"
                        >
                            {uploading[`gallery_${groupIndex}_${col}_${i}`] ? 'Загрузка...' : 'Загрузить'}
                        </button>
                        {img && (
                            <img
                                src={img}
                                alt=""
                                className="w-full max-h-24 object-cover rounded border border-black/8"
                            />
                        )}
                    </div>
                ))}
                <AddButton onClick={() => addImage(groupIndex, col)}>
                    Добавить фото
                </AddButton>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-3">
            {value.map((g, i) => (
                <div key={i} className="p-3 bg-white rounded border border-black/8">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-semibold text-black/40">
                            Галерея #{i + 1}
                        </span>
                        <div className="flex-1" />
                        <RemoveButton onClick={() => removeGallery(i)} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <Column
                            title="Левая колонка"
                            col="left"
                            images={g.leftColumnImages ?? []}
                            groupIndex={i}
                        />
                        <Column
                            title="Центр"
                            col="center"
                            images={g.centerColumnImages ?? []}
                            groupIndex={i}
                        />
                        <Column
                            title="Правая колонка"
                            col="right"
                            images={g.rightColumnImages ?? []}
                            groupIndex={i}
                        />
                    </div>
                </div>
            ))}
            <AddButton onClick={addGallery}>Добавить галерею</AddButton>
        </div>
    );
};

// ── Modal Result Editor ───────────────────────────────────────────────────────

interface ModalResultEditorProps {
    value: ModalResultItem[];
    onChange: (value: ModalResultItem[]) => void;
    uploading: Record<string, boolean>;
    onUpload: (resultIndex: number, imgIndex: number, file: File) => Promise<void>;
}

export const ModalResultEditor = ({
    value,
    onChange,
    uploading,
    onUpload,
}: ModalResultEditorProps) => {
    const addResult = () => {
        const maxId = value.reduce((max, r) => Math.max(max, r.id), 0);
        onChange([
            ...value,
            { id: maxId + 1, type: "Пластика лица", description: "", images: [] },
        ]);
    };

    const removeResult = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const updateField = <K extends keyof ModalResultItem>(
        index: number,
        field: K,
        val: ModalResultItem[K],
    ) => {
        const next = [...value];
        next[index] = { ...next[index], [field]: val };
        onChange(next);
    };

    const addImage = (index: number) => {
        const next = [...value];
        next[index] = { ...next[index], images: [...next[index].images, ""] };
        onChange(next);
    };

    const updateImage = (index: number, imgIndex: number, url: string) => {
        const next = [...value];
        const imgs = [...next[index].images];
        imgs[imgIndex] = url;
        next[index] = { ...next[index], images: imgs };
        onChange(next);
    };

    const removeImage = (index: number, imgIndex: number) => {
        const next = [...value];
        next[index] = {
            ...next[index],
            images: next[index].images.filter((_, i) => i !== imgIndex),
        };
        onChange(next);
    };

    return (
        <div className="flex flex-col gap-3">
            {value.map((result, i) => (
                <div key={i} className="p-3 bg-white rounded border border-black/8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-semibold text-black/40">
                            Результат #{i + 1}
                        </span>
                        <div className="flex-1" />
                        <RemoveButton onClick={() => removeResult(i)} />
                    </div>
                    <Field label="Тип операции">
                        <select
                            className={inputCls}
                            value={result.type}
                            onChange={(e) =>
                                updateField(i, "type", e.target.value as Directions)
                            }
                        >
                            {DIRECTIONS_OPTIONS.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Описание">
                        <textarea
                            className={textareaCls}
                            rows={2}
                            placeholder="Описание результата..."
                            value={result.description}
                            onChange={(e) =>
                                updateField(i, "description", e.target.value)
                            }
                        />
                    </Field>
                    <Field label="Фотографии">
                        <div className="flex flex-col gap-2">
                            {result.images.map((img, imgI) => (
                                <div key={imgI} className="flex flex-col gap-1">
                                    <div className="flex gap-1 items-center">
                                        <input
                                            className={inputCls}
                                            placeholder="/results/img1.webp"
                                            value={img}
                                            onChange={(e) =>
                                                updateImage(i, imgI, e.target.value)
                                            }
                                        />
                                        <RemoveButton
                                            onClick={() => removeImage(i, imgI)}
                                        />
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const input = document.createElement('input');
                                                input.type = 'file';
                                                input.accept = 'image/*';
                                                input.onchange = async (e) => {
                                                    const file = (e.target as HTMLInputElement).files?.[0];
                                                    if (file) {
                                                        await onUpload(i, imgI, file);
                                                    }
                                                };
                                                input.click();
                                            }}
                                            disabled={uploading[`result_${i}_${imgI}`]}
                                            className="text-[10px] px-2 py-1 bg-[#691C32] text-white rounded hover:bg-[#7d2239] transition-colors cursor-pointer disabled:opacity-40"
                                        >
                                            {uploading[`result_${i}_${imgI}`] ? 'Загрузка...' : 'Загрузить фото'}
                                        </button>
                                    </div>
                                    {img && (
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full max-h-32 object-cover rounded border border-black/8"
                                        />
                                    )}
                                </div>
                            ))}
                            <AddButton onClick={() => addImage(i)}>
                                Добавить фото
                            </AddButton>
                        </div>
                    </Field>
                </div>
            ))}
            <AddButton onClick={addResult}>Добавить результат</AddButton>
        </div>
    );
};
