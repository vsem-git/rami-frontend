import { Routes, Route, Navigate, } from "react-router-dom";
import Home from "./pages/Home";
import Surgery from "./pages/Surgery";
import { Header } from "./components/Header";
import { SlideBar } from "./components/SlideBar";
import { useRef } from "react";

export default function App() {
  const scrollRef = useRef(null);
  return (
    <div
    ref={scrollRef}
      className="w-screen overflow-y-scroll"
    >
      <Header />
      <SlideBar />

      <main className="flex-1" >
        {/* <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/surgery" element={<Surgery />} /> */}

        {/* Опционально: редирект/404 */}
        {/* <Route path="/index" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<div>404 — Not Found</div>} />
                </Routes> */}
  
          <Home scrollRef={scrollRef}/>
        <Surgery />
      </main>
    </div>
  );
}
