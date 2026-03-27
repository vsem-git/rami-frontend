import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import pb from "../services/pocketbase";

type ContentType = "text" | "richtext" | "image";

interface ContentRecord {
    id: string;
    field_id: string;
    value: string;
    type: ContentType;
}

interface ContentContextValue {
    getContent: (fieldId: string, fallback: string) => string;
    saveContent: (fieldId: string, value: string, type?: ContentType) => Promise<void>;
    resetContent: (fieldId: string) => Promise<void>;
    ready: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
    const [records, setRecords] = useState<Map<string, ContentRecord>>(new Map());
    const [ready, setReady] = useState(false);

    useEffect(() => {
        pb.collection("content")
            .getFullList<ContentRecord>({ requestKey: "content-init" })
            .then((items) => {
                const map = new Map<string, ContentRecord>();
                items.forEach((item) => map.set(item.field_id, item));
                setRecords(map);
            })
            .catch(() => {})
            .finally(() => setReady(true));
    }, []);

    const getContent = useCallback(
        (fieldId: string, fallback: string): string => {
            return records.get(fieldId)?.value ?? fallback;
        },
        [records],
    );

    const saveContent = useCallback(
        async (fieldId: string, value: string, type: ContentType = "text") => {
            const existing = records.get(fieldId);

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
        [records],
    );

    const resetContent = useCallback(
        async (fieldId: string) => {
            const existing = records.get(fieldId);
            if (!existing) return;
            await pb.collection("content").delete(existing.id);
            setRecords((prev) => {
                const next = new Map(prev);
                next.delete(fieldId);
                return next;
            });
        },
        [records],
    );

    return (
        <ContentContext.Provider value={{ getContent, saveContent, resetContent, ready }}>
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
