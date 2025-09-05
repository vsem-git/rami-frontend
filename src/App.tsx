import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Surgery from "./pages/Surgery";

export default function App() {
    return (
        <div className="min-h-dvh flex flex-col">
            <header className="border-b px-4 py-3 flex gap-4">
                <Link to="/" className="font-semibold hover:underline">Index</Link>
                <Link to="/surgery" className="hover:underline">Surgery</Link>
            </header>

            <main className="flex-1 p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/surgery" element={<Surgery />} />

                    {/* Опционально: редирект/404 */}
                    <Route path="/index" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<div>404 — Not Found</div>} />
                </Routes>
            </main>
        </div>
    );
}
