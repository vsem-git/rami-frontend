import { useState } from "react";
import { useAdmin } from "../contexts/AdminContext";
import { SeoPanel } from "./SeoPanel";

export const AdminBar = () => {
    const { isEditMode, user, logout } = useAdmin();
    const [isSeoOpen, setIsSeoOpen] = useState(false);

    if (!isEditMode) return null;

    return (
        <>
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[99997] flex items-center gap-3 px-4 py-2 bg-[#691C32]/60 backdrop-blur-md text-white select-none rounded-full opacity-30 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                    Редактирование
                </span>

                <span className="w-px h-3 bg-white/30" />

                <button
                    onClick={() => setIsSeoOpen(true)}
                    className="text-[10px] text-white/70 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                >
                    SEO
                </button>

                <span className="w-px h-3 bg-white/30" />

                {user?.email && (
                    <>
                        <span className="text-[10px] text-white/50 hidden sm:block max-w-[160px] truncate">
                            {user.email}
                        </span>
                        <span className="w-px h-3 bg-white/30 hidden sm:block" />
                    </>
                )}

                <button
                    onClick={logout}
                    className="text-[10px] text-white/70 hover:text-white uppercase tracking-widest transition-colors cursor-pointer"
                >
                    Выйти
                </button>
            </div>

            <SeoPanel isOpen={isSeoOpen} onClose={() => setIsSeoOpen(false)} />
        </>
    );
};
