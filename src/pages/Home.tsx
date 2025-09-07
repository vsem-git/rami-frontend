import { useRef } from "react";
import { Screensaver } from "./Screensaver"
import { AboutServices } from "./Surgery";
import { useArrowScroll } from "../hooks/useArrowScroll";

interface HomeProps {
  scrollRef: React.RefObject<HTMLElement>;
}
export const Home = ({ scrollRef }: HomeProps) => {
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  // "якоря" для стрелочной прокрутки
  const homeAnchor = useRef<HTMLDivElement | null>(null);
  const surgeryAnchor = useRef<HTMLDivElement | null>(null);
  const sections = [homeAnchor, surgeryAnchor];

  useArrowScroll(sections, {
    containerRef: scrollRef,
    nextKeys: ["ArrowRight"],
    prevKeys: ["ArrowLeft"],
    throttleMs: 700,
  });
  return (
    <>
      <Screensaver scrollRef={scrollRef} />
      <AboutServices scrollRef={scrollRef} />

      <div ref={homeAnchor} style={{ height: vh }} />
      <div ref={surgeryAnchor} style={{ height: vh }} />
    </>
  )
}