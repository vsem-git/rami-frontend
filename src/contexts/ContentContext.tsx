import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";
import pb from "../services/pocketbase";

export type ContentType = "text" | "richtext" | "image";

export interface ContentRecord {
    id: string;
    field_id: string;
    value: string;
    type: ContentType;
}

/** All known editable fields — from registry (data-editable) merged with DB values */
export interface DisplayField {
    field_id: string;
    fallback: string;
    /** DB value if overridden, otherwise equals fallback */
    value: string;
    type: ContentType;
    isOverridden: boolean;
}

interface FieldMeta { fallback: string; type: ContentType }

interface ContentContextValue {
    getContent: (fieldId: string, fallback: string) => string;
    saveContent: (fieldId: string, value: string, type?: ContentType) => Promise<void>;
    resetContent: (fieldId: string) => Promise<void>;
    registerField: (id: string, fallback: string, type: ContentType) => void;
    allRecords: ContentRecord[];
    allFields: DisplayField[];
    ready: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [records, setRecords] = useState<Map<string, ContentRecord>>(new Map());
    const recordsRef = useRef<Map<string, ContentRecord>>(new Map());
    const [fieldRegistry, setFieldRegistry] = useState<Map<string, FieldMeta>>(new Map());
    const [ready, setReady] = useState(false);

    // Keep ref in sync so callbacks always see the latest state without stale closure
    useEffect(() => {
        recordsRef.current = records;
    }, [records]);

    useEffect(() => {
        pb.collection("content")
            .getFullList<ContentRecord>({ requestKey: "content-init" })
            .then((items) => {
                const map = new Map<string, ContentRecord>();
                items.forEach((item) => map.set(item.field_id, item));
                setRecords(map);
            })
            .catch((err) => {
                console.error("[ContentContext] Failed to load content:", err);
            })
            .finally(() => setReady(true));
    }, []);

    const registerField = useCallback(
        (id: string, fallback: string, type: ContentType) => {
            setFieldRegistry((prev) => {
                const existing = prev.get(id);
                if (existing?.fallback === fallback && existing?.type === type) return prev;
                const next = new Map(prev);
                next.set(id, { fallback, type });
                return next;
            });
        },
        [],
    );

    const getContent = useCallback(
        (fieldId: string, fallback: string): string => {
            return records.get(fieldId)?.value ?? fallback;
        },
        [records],
    );

    const saveContent = useCallback(
        async (fieldId: string, value: string, type: ContentType = "text") => {
            // Use ref to avoid stale closure — prevents double-create race condition
            const existing = recordsRef.current.get(fieldId);

            if (existing) {
                await pb.collection("content").update(existing.id, { value });
                setRecords((prev) => {
                    const next = new Map(prev);
                    next.set(fieldId, { ...existing, value });
                    return next;
                });
            } else {
                const created = await pb
                    .collection("content")
                    .create<ContentRecord>({ field_id: fieldId, value, type });
                setRecords((prev) => {
                    const next = new Map(prev);
                    next.set(fieldId, created);
                    return next;
                });
            }
        },
        [],
    );

    const resetContent = useCallback(
        async (fieldId: string) => {
            const existing = recordsRef.current.get(fieldId);
            if (!existing) return;
            await pb.collection("content").delete(existing.id);
            setRecords((prev) => {
                const next = new Map(prev);
                next.delete(fieldId);
                return next;
            });
        },
        [],
    );

    const allRecords = Array.from(records.values()).sort((a, b) =>
        a.field_id.localeCompare(b.field_id),
    );

    const allFields: DisplayField[] = Array.from(fieldRegistry.entries())
        .map(([field_id, { fallback, type }]) => {
            const rec = records.get(field_id);
            return {
                field_id,
                fallback,
                value: rec?.value ?? fallback,
                type: rec?.type ?? type,
                isOverridden: !!rec,
            };
        })
        .sort((a, b) => a.field_id.localeCompare(b.field_id));

    return (
        <ContentContext.Provider value={{ getContent, saveContent, resetContent, registerField, allRecords, allFields, ready }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContentContext = () => {
    const ctx = useContext(ContentContext);
    if (!ctx)
        throw new Error("useContentContext must be used within ContentProvider");
    return ctx;
};
