import { Routes, Route, Navigate, } from "react-router-dom";
import { Header } from "./components/Header";
import { SlideBar } from "./components/SlideBar";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Home } from "./pages/Home";

export default function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll({ container: scrollRef });

  // Порог = высота экрана → от 0 до vh
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const color = useTransform(scrollY, [0, vh], ["#000000", "#ffffff"]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header textColor={color} />
      <SlideBar textColor={color} />

      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto h-screen scroll-smooth relative"
      >
        <Routes>
          <Route path="/" element={<Home scrollRef={scrollRef} />} />
          {/* <Route path="/surgery" element={<Surgery />} /> */}

          {/* Опционально: редирект/404 */}
          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<div>404 — Not Found</div>} />
        </Routes>
      </main>
    </div>
  );
}
