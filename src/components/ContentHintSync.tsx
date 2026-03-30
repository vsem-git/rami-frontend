import { useEffect, useRef } from "react";
import { useContentContext, type ContentType } from "../contexts/ContentContext";

// ── helpers ───────────────────────────────────────────────────────────────────

function extractBgUrl(style: string): string {
    const matches = [...style.matchAll(/url\(['"]?([^'")\s]+)['"]?\)/g)];
    return matches.length > 0 ? matches[matches.length - 1][1] : "";
}

function buildBgValue(url: string, prefix?: string): string {
    const inner = `url('${url}')`;
    return prefix ? `${prefix}, ${inner}` : inner;
}

function getElementFallback(el: HTMLElement, hintType: string): string {
    if (hintType === "image") {
        if (el.tagName === "IMG") return el.getAttribute("src") ?? "";
        return extractBgUrl(el.style.backgroundImage);
    }
    if (hintType === "richtext") return el.innerHTML;
    return el.textContent?.trim() ?? "";
}

function applyRecord(el: HTMLElement, value: string) {
    const hintType = el.dataset.contentHintType || "text";
    const bgPrefix = el.dataset.contentHintBgPrefix;

    if (hintType === "image") {
        if (el.tagName === "IMG") {
            if ((el as HTMLImageElement).src !== value)
                (el as HTMLImageElement).src = value;
        } else {
            const next = buildBgValue(value, bgPrefix);
            if (el.style.backgroundImage !== next)
                el.style.backgroundImage = next;
        }
    } else {
        if (el.innerHTML !== value) el.innerHTML = value;
    }
}

function restoreOriginal(el: HTMLElement) {
    const hintType = el.dataset.contentHintType || "text";
    const bgPrefix = el.dataset.contentHintBgPrefix;
    const original = el.dataset.hintOriginal ?? "";

    if (hintType === "image") {
        if (el.tagName === "IMG") {
            if ((el as HTMLImageElement).src !== original)
                (el as HTMLImageElement).src = original;
        } else {
            const restored = original ? buildBgValue(original, bgPrefix) : "";
            if (el.style.backgroundImage !== restored)
                el.style.backgroundImage = restored;
        }
    } else {
        if (el.innerHTML !== original) el.innerHTML = original;
    }
}

// ── component ─────────────────────────────────────────────────────────────────

/**
 * Syncs [data-content-hint] DOM elements with saved DB values.
 *
 * Works in two modes:
 * 1. Reactive: re-syncs whenever allRecords changes (e.g. after save/reset).
 * 2. Observing: MutationObserver registers newly-mounted elements (lazy routes,
 *    GSAP components) so they get synced even if they appeared after DB loaded.
 */
export const ContentHintSync = () => {
    const { allRecords, registerField } = useContentContext();

    // Keep a stable ref so the MutationObserver callback always sees latest records
    const allRecordsRef = useRef(allRecords);
    useEffect(() => { allRecordsRef.current = allRecords; }, [allRecords]);

    // ── core sync: apply DB values to all currently-mounted hint elements ──
    useEffect(() => {
        document.querySelectorAll<HTMLElement>("[data-content-hint]").forEach((el) => {
            const id = el.getAttribute("data-content-hint");
            if (!id) return;

            const hintType = (el.dataset.contentHintType as ContentType) || "text";

            // Save original on first encounter
            if (!el.dataset.hintOriginal) {
                el.dataset.hintOriginal = getElementFallback(el, hintType);
            }

            // Register so ContentPanel can list this field
            if (!el.dataset.hintRegistered) {
                el.dataset.hintRegistered = "1";
                registerField(id, el.dataset.hintOriginal!, hintType);
            }

            const record = allRecords.find((r) => r.field_id === id);
            if (record?.value) {
                applyRecord(el, record.value);
            } else {
                restoreOriginal(el);
            }
        });
    }, [allRecords, registerField]);

    // ── observer: catch elements that mount after DB has already loaded ──
    useEffect(() => {
        const handle = () => {
            document.querySelectorAll<HTMLElement>(
                "[data-content-hint]:not([data-hint-registered])",
            ).forEach((el) => {
                const id = el.getAttribute("data-content-hint");
                if (!id) return;

                const hintType = (el.dataset.contentHintType as ContentType) || "text";

                if (!el.dataset.hintOriginal) {
                    el.dataset.hintOriginal = getElementFallback(el, hintType);
                }
                el.dataset.hintRegistered = "1";

                // Registering triggers ContentProvider re-render →
                // allRecords reference changes → core sync effect re-fires
                registerField(id, el.dataset.hintOriginal!, hintType);

                // Also apply immediately with current records
                const record = allRecordsRef.current.find((r) => r.field_id === id);
                if (record?.value) {
                    applyRecord(el, record.value);
                }
            });
        };

        const observer = new MutationObserver(handle);
        observer.observe(document.body, { childList: true, subtree: true });

        // Run once for any elements already in DOM
        handle();

        return () => observer.disconnect();
    }, [registerField]);

    return null;
};
