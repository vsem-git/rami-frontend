import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";

export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, isEditMode } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode) navigate("/");
    }, [isEditMode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            navigate("/");
        } catch {
            setError("Неверный email или пароль");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1D1D1D] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="mb-10">
                    <img src="/logo.svg" alt="Ramiclinic" className="h-8 mb-8 opacity-80" />
                    <h1 className="text-white text-xl font-semibold uppercase tracking-[0.15em]">
                        Панель управления
                    </h1>
                    <p className="text-white/40 text-sm mt-2 uppercase tracking-widest">
                        Режим редактирования
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 text-white placeholder:text-white/30 border border-white/15 px-4 py-3 text-sm focus:outline-none focus:border-[#691C32] transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/5 text-white placeholder:text-white/30 border border-white/15 px-4 py-3 text-sm focus:outline-none focus:border-[#691C32] transition-colors"
                    />

                    {error && (
                        <p className="text-red-400 text-xs tracking-wide">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-[#691C32] text-white uppercase text-xs font-semibold tracking-[0.2em] py-4 hover:bg-[#7d2239] transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loading ? "Вход..." : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
};
