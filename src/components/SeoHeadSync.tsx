import { useEffect, useRef } from "react";
import { useContentContext } from "../contexts/ContentContext";

const pathToKey = (pathname: string) =>
    pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\//g, ".");

function applySeo(records: Array<{ field_id: string; value: string }>, pathname: string) {
    const pageKey = pathToKey(pathname);

    const getPage = (suffix: string) =>
        records.find((r) => r.field_id === `seo.${pageKey}.${suffix}`)?.value ?? "";
    const getGlobal = (suffix: string) =>
        records.find((r) => r.field_id === `seo.global.${suffix}`)?.value ?? "";

    // Title: apply template if available
    const pageTitle = getPage("title");
    const titleTemplate = getGlobal("title_template");
    let title = "";
    if (pageTitle && titleTemplate?.includes("%s")) {
        title = titleTemplate.replace("%s", pageTitle);
    } else if (pageTitle) {
        title = pageTitle;
    } else if (titleTemplate) {
        // No page title — strip %s placeholder gracefully
        title = titleTemplate.replace(/\s*[|—\-–]\s*%s|%s\s*[|—\-–]\s*|%s/g, "").trim();
    }

    const description = getPage("description") || getGlobal("description");
    const ogTitle = getPage("og_title") || title;
    const ogDescription = getPage("og_description") || description;
    const ogImage = getPage("og_image") || getGlobal("og_image");
    const ogType = getPage("og_type") || getGlobal("og_type") || "website";
    const robots = getPage("robots") || getGlobal("robots");
    const keywords = getPage("keywords");
    const siteName = getGlobal("site_name");
    const canonicalBase = getGlobal("canonical_base");
    const pageCanonical = getPage("canonical");

    const canonicalUrl =
        pageCanonical ||
        (canonicalBase
            ? canonicalBase.replace(/\/$/, "") + pathname
            : window.location.href);

    const setMeta = (selector: string, content: string) => {
        if (!content) return;
        const el = document.querySelector<HTMLMetaElement>(selector);
        if (el) el.content = content;
    };
    const setLink = (selector: string, href: string) => {
        if (!href) return;
        const el = document.querySelector<HTMLLinkElement>(selector);
        if (el) el.href = href;
    };

    if (title) document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[name="robots"]', robots);
    setMeta('meta[name="keywords"]', keywords);
    setMeta('meta[property="og:title"]', ogTitle);
    setMeta('meta[property="og:description"]', ogDescription);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:site_name"]', siteName);
    setMeta('meta[name="twitter:title"]', ogTitle);
    setMeta('meta[name="twitter:description"]', ogDescription);
    setMeta('meta[name="twitter:image"]', ogImage);
    setLink('link[rel="canonical"]', canonicalUrl);
}

/**
 * Reads SEO fields for the current page from ContentContext and applies them
 * to <head> meta tags. Global settings (seo.global.*) are used as fallbacks.
 * Fires a `seo-ready` DOM event used by vite-plugin-prerender to snapshot the page.
 */
export const SeoHeadSync = () => {
    const { allRecords, ready } = useContentContext();
    const allRecordsRef = useRef(allRecords);
    useEffect(() => { allRecordsRef.current = allRecords; }, [allRecords]);

    // Apply on initial load / after ContentContext fetches from PocketBase
    useEffect(() => {
        if (!ready) return;
        applySeo(allRecords, window.location.pathname);
        document.dispatchEvent(new Event("seo-ready"));
    }, [ready, allRecords]);

    // Re-apply on SPA navigation (back/forward + pushState)
    useEffect(() => {
        const onNav = () => applySeo(allRecordsRef.current, window.location.pathname);

        window.addEventListener("popstate", onNav);

        const origPush = history.pushState.bind(history);
        history.pushState = (...args) => {
            origPush(...args);
            setTimeout(onNav, 0);
        };

        return () => {
            window.removeEventListener("popstate", onNav);
            history.pushState = origPush;
        };
    }, []);

    return null;
};
