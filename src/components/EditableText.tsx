import DOMPurify from "dompurify";
import { useEffect, useRef, type ElementType, type HTMLAttributes } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { useContentContext } from "../contexts/ContentContext";

interface EditableTextProps extends HTMLAttributes<HTMLElement> {
    id: string;
    fallback: string;
    tag?: ElementType;
}

export const EditableText = ({
    id,
    fallback,
    tag: Tag = "span",
    className,
    ...rest
}: EditableTextProps) => {
    const { isEditMode } = useAdmin();
    const { getContent, registerField } = useContentContext();
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        registerField(id, fallback, "richtext");
    }, [id, fallback, registerField]);

    const value = getContent(id, fallback);
    const isOverridden = value !== fallback;

    // Sync DOM when value changes externally (reset / save from ContentPanel)
    useEffect(() => {
        if (ref.current) {
            if (isOverridden) {
                ref.current.innerHTML = DOMPurify.sanitize(value);
            } else {
                ref.current.innerText = value;
            }
        }
    }, [value, isOverridden]);

    // ── View mode ──────────────────────────────────────────────────────────
    if (!isEditMode) {
        if (isOverridden) {
            return (
                <Tag
                    className={className}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
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

    // ── Edit mode — visual highlight only, no click-to-edit ───────────────
    if (isOverridden) {
        return (
            <Tag
                ref={ref}
                className={className}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }}
                data-content-id={id}
                {...rest}
            />
        );
    }

    return (
        <Tag
            ref={ref}
            className={className}
            data-content-id={id}
            {...rest}
        >
            {value}
        </Tag>
    );
};
