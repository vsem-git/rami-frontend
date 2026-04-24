import { useCallback, useEffect, useRef, useState } from "react";

type BuildStatus = "idle" | "building" | "done" | "error";

interface StatusPayload {
    status: BuildStatus;
    message?: string;
    time?: string;
}

const REBUILD_URL = import.meta.env.VITE_REBUILD_URL as string | undefined;
const REBUILD_SECRET = import.meta.env.VITE_REBUILD_SECRET as string | undefined;

const headers = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${REBUILD_SECRET}`,
});

export const RebuildButton = () => {
    const [status, setStatus] = useState<BuildStatus>("idle");
    const [message, setMessage] = useState("");
    const [showTooltip, setShowTooltip] = useState(false);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const stopPolling = useCallback(() => {
        if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    }, []);

    const pollStatus = useCallback(() => {
        if (!REBUILD_URL) return;
        fetch(`${REBUILD_URL}/status`, { headers: headers() })
            .then((r) => r.json() as Promise<StatusPayload>)
            .then((data) => {
                setStatus(data.status);
                setMessage(data.message ?? "");
                if (data.status !== "building") stopPolling();
            })
            .catch(() => { setStatus("error"); stopPolling(); });
    }, [stopPolling]);

    // Poll if building on mount (e.g. page refresh mid-build)
    useEffect(() => {
        if (!REBUILD_URL) return;
        fetch(`${REBUILD_URL}/status`, { headers: headers() })
            .then((r) => r.json() as Promise<StatusPayload>)
            .then((data) => {
                setStatus(data.status);
                setMessage(data.message ?? "");
                if (data.status === "building") {
                    pollRef.current = setInterval(pollStatus, 3000);
                }
            })
            .catch(() => {});
        return stopPolling;
    }, [pollStatus, stopPolling]);

    const handleRebuild = useCallback(async () => {
        if (!REBUILD_URL || status === "building") return;
        try {
            const res = await fetch(REBUILD_URL, { method: "POST", headers: headers() });
            if (res.status === 202) {
                setStatus("building");
                setMessage("Сборка запущена...");
                pollRef.current = setInterval(pollStatus, 3000);
            } else if (res.status === 409) {
                setStatus("building");
            }
        } catch {
            setStatus("error");
            setMessage("Нет связи с сервером");
        }
    }, [status, pollStatus]);

    if (!REBUILD_URL || !REBUILD_SECRET) return null;

    const label =
        status === "building" ? "Сборка..." :
        status === "done"     ? "Готово!" :
        status === "error"    ? "Ошибка" :
        "Rebuild";

    const color =
        status === "done"  ? "text-emerald-600 hover:text-emerald-700" :
        status === "error" ? "text-red-500 hover:text-red-600" :
        "text-[#1D1D1D]/70 hover:text-[#691C32]";

    return (
        <div className="relative">
            <button
                onClick={status === "idle" || status === "done" || status === "error" ? handleRebuild : undefined}
                onMouseEnter={() => (status === "error" || status === "done") && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                disabled={status === "building"}
                className={[
                    "text-[10px] uppercase tracking-widest transition-colors cursor-pointer px-2 py-1 hover:bg-black/4 rounded flex items-center gap-1",
                    color,
                    status === "building" ? "opacity-60 cursor-not-allowed" : "",
                ].join(" ")}
            >
                {status === "building" && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin shrink-0">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                )}
                {status === "done" && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
                {label}
            </button>
            {showTooltip && message && (
                <div className="absolute bottom-full right-0 mb-1 w-64 bg-[#1D1D1D] text-white text-[9px] px-2 py-1.5 rounded font-mono leading-relaxed whitespace-pre-wrap z-[99999]">
                    {message}
                </div>
            )}
        </div>
    );
};
