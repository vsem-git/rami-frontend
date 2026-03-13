import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    value: string;
    options: string[];
    placeholder: string;
    onChange: (val: string) => void;
    formatLabel?: (val: string) => string;
}

export const Dropdown = ({
    value,
    options,
    placeholder,
    onChange,
    formatLabel,
}: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const isActive = value !== "все";
    const label = isActive
        ? formatLabel
            ? formatLabel(value)
            : value
        : placeholder;

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen((o) => !o)}
                className={`flex items-center gap-2 border text-xs font-semibold uppercase px-4 py-2 transition-all duration-300 outline-none
                    ${isActive ? "border-[#1D1D1D] text-[#1D1D1D]" : "border-[#1D1D1D]/20 text-[#1D1D1D]/60"}
                    hover:border-[#1D1D1D] hover:text-[#1D1D1D]`}
            >
                {label}
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                >
                    <path
                        d="M1 1L5 5L9 1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            <div
                className={`absolute top-full left-0 mt-1 z-50 bg-white border border-[#1D1D1D]/10 min-w-full
                overflow-hidden transition-all duration-300 ease-out origin-top
                ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}`}
            >
                {options.map((opt, i) => (
                    <button
                        key={opt}
                        onClick={() => {
                            onChange(opt);
                            setOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold uppercase whitespace-nowrap
                            transition-all duration-200 hover:bg-[#1D1D1D]/5
                            ${opt === value ? "text-[#691C32]" : "text-[#1D1D1D]/70"}
                            ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
                        style={{
                            transitionDelay: open ? `${i * 30}ms` : "0ms",
                        }}
                    >
                        {formatLabel ? formatLabel(opt) : opt}
                    </button>
                ))}
            </div>
        </div>
    );
};
