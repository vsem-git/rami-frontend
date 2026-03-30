import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

type ContentType = "text" | "richtext" | "image";

export interface ActiveField {
    id: string;
    type: ContentType;
    el: HTMLElement;
}

interface EditingContextValue {
    active: ActiveField | null;
    open: (id: string, el: HTMLElement, type?: ContentType) => void;
    close: () => void;
}

const EditingContext = createContext<EditingContextValue | null>(null);

export const EditingProvider = ({ children }: { children: ReactNode }) => {
    const [active, setActive] = useState<ActiveField | null>(null);

    const open = useCallback(
        (id: string, el: HTMLElement, type: ContentType = "text") => {
            setActive({ id, type, el });
        },
        [],
    );

    const close = useCallback(() => setActive(null), []);

    return (
        <EditingContext.Provider value={{ active, open, close }}>
            {children}
        </EditingContext.Provider>
    );
};

export const useEditing = () => {
    const ctx = useContext(EditingContext);
    if (!ctx) throw new Error("useEditing must be used within EditingProvider");
    return ctx;
};
