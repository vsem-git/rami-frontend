import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type ElementType,
    type HTMLAttributes,
} from "react";
import { useAdmin } from "../contexts/AdminContext";
import { useContentContext } from "../contexts/ContentContext";
import { EditableToolbar, type SaveStatus, type ToolbarAction } from "./EditableToolbar";

interface EditableTextProps extends HTMLAttributes<HTMLElement> {
    id: string;
    fallback: string;
    tag?: ElementType;
    /** Override the auto-detected parent action label */
    actionLabel?: string;
    /** Override or add a parent action handler (for buttons with onClick) */
    onAction?: () => void;
}

export const EditableText = ({
    id,
    fallback,
    tag: Tag = "span",
    className,
    actionLabel,
    onAction,
    ...rest
}: EditableTextProps) => {
    const { isEditMode } = useAdmin();
    const { getContent, saveContent, resetContent } = useContentContext();
    const ref = useRef<HTMLElement>(null);
    const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const blurTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const isEditingRef = useRef(false);
    const [isFocused, setIsFocused] = useState(false);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
    const [parentAction, setParentAction] = useState<ToolbarAction | null>(null);

    const value = getContent(id, fallback);
    const isOverridden = value !== fallback;

    // Detect closest interactive ancestor and intercept its click in edit mode
    useEffect(() => {
        if (!isEditMode || !ref.current) return;

        // Explicit onAction prop takes priority
        if (onAction) {
            setParentAction({ label: actionLabel ?? "Выполнить", execute: onAction });
            return;
        }

        const anchor = ref.current.closest<HTMLAnchorElement>("a[href]");
        if (anchor) {
            const href = anchor.href;
            const target = anchor.target || "_self";
            setParentAction({
                label: actionLabel ?? "Перейти",
                execute: () => window.open(href, target),
            });

            // Block navigation while in edit mode
            const block = (e: MouseEvent) => e.preventDefault();
            anchor.addEventListener("click", block);
            return () => anchor.removeEventListener("click", block);
        }

        setParentAction(null);
    }, [isEditMode, onAction, actionLabel]);

    // Sync DOM ← context when value changes externally (real-time, reset)
    // but not while user is typing
    useEffect(() => {
        if (ref.current && !isEditingRef.current) {
            if (isOverridden) {
                ref.current.innerHTML = value;
            } else {
                ref.current.innerText = value;
            }
        }
    }, [value, isOverridden]);

    const persist = useCallback(
        async (newValue: string) => {
            if (newValue === value) return;
            setSaveStatus("saving");
            try {
                await saveContent(id, newValue);
                setSaveStatus("saved");
                setTimeout(() => setSaveStatus("idle"), 2000);
            } catch {
                setSaveStatus("error");
            }
        },
        [id, saveContent, value],
    );

    const handleInput = useCallback(() => {
        if (!ref.current) return;
        const newValue = ref.current.innerHTML;
        clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => persist(newValue), 800);
    }, [persist]);

    const handleFocus = useCallback(() => {
        clearTimeout(blurTimerRef.current);
        isEditingRef.current = true;
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        blurTimerRef.current = setTimeout(() => {
            isEditingRef.current = false;
            setIsFocused(false);
            clearTimeout(saveTimer.current);
            if (ref.current) persist(ref.current.innerHTML);
        }, 200);
    }, [persist]);

    const cancelBlur = useCallback(() => {
        clearTimeout(blurTimerRef.current);
    }, []);

    const handleContentChange = useCallback(
        (html: string) => {
            clearTimeout(saveTimer.current);
            persist(html);
        },
        [persist],
    );

    const handleReset = useCallback(async () => {
        await resetContent(id);
        if (ref.current) ref.current.innerText = fallback;
        setSaveStatus("idle");
    }, [id, fallback, resetContent]);

    if (!isEditMode) {
        if (isOverridden) {
            return (
                <Tag
                    className={className}
                    dangerouslySetInnerHTML={{ __html: value }}
                    data-rich-content
                    {...rest}
                />
            );
        }
        return (
            <Tag className={className} {...rest}>
                {value}
            </Tag>
        );
    }

    return (
        <>
            <Tag
                ref={ref}
                className={[
                    className,
                    "outline outline-1 outline-dashed",
                    isFocused
                        ? "outline-[#691C32]"
                        : "outline-[#691C32]/30 hover:outline-[#691C32]/70",
                    "cursor-text transition-[outline-color] duration-150",
                ]
                    .filter(Boolean)
                    .join(" ")}
                contentEditable
                suppressContentEditableWarning
                onFocus={handleFocus}
                onBlur={handleBlur}
                onInput={handleInput}
                // Prevent bubbling to parent <a>/<button> while editing
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                data-content-id={id}
                {...rest}
            />

            {isFocused && (
                <EditableToolbar
                    targetRef={ref}
                    fieldId={id}
                    saveStatus={saveStatus}
                    isOverridden={isOverridden}
                    onReset={handleReset}
                    onKeepAlive={cancelBlur}
                    onContentChange={handleContentChange}
                    action={parentAction ?? undefined}
                />
            )}
        </>
    );
};
