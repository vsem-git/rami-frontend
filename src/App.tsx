import { Routes, Route, Navigate } from "react-router-dom";


export default function App() {


  return (
    <div className="w-screen h-screen flex flex-col">
       <main
        className="flex-1 overflow-y-auto h-screen scroll-smooth relative"
      >
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Опционально: редирект/404 */}
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<div>404 — Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
