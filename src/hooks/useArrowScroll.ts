import { RefObject, useEffect, useRef } from "react";

type Options = {
  containerRef?: RefObject<HTMLElement | null>;
  nextKeys?: string[];
  prevKeys?: string[];
  throttleMs?: number;
};

export function useArrowScroll(
  sections: RefObject<HTMLElement | null>[],
  {
    containerRef,
    nextKeys = ["ArrowDown"],
    prevKeys = ["ArrowUp"],
    throttleMs = 500,
  }: Options = {}
) {
  const indexRef = useRef(0);
  const isThrottled = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Синхронизируем индекс при ручном скролле — ищем ближайший якорь к верху контейнера
  useEffect(() => {
    const container = containerRef?.current ?? window;
    let ticking = false;

    const updateIndex = () => {
      const containerTop = containerRef?.current?.getBoundingClientRect().top ?? 0;
      let closest = 0;
      let minDist = Infinity;

      sections.forEach((r, i) => {
        const el = r.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top - containerTop; // позиция относительно контейнера
        const dist = Math.abs(top);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      indexRef.current = closest;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => {
        updateIndex();
        ticking = false;
      });
    };

    // attach
    (container as any).addEventListener?.("scroll", onScroll, { passive: true });
    // и одна инициализация
    updateIndex();

    return () => {
      (container as any).removeEventListener?.("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [sections, containerRef]);

  // Обработка клавиш
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // не реагировать, если фокус в инпуте/текстарее
      const ae = document.activeElement as HTMLElement | null;
      if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable)) return;
      if (isThrottled.current) return;

      let moved = false;
      if (nextKeys.includes(e.key)) {
        e.preventDefault();
        indexRef.current = Math.min(indexRef.current + 1, sections.length - 1);
        moved = true;
      } else if (prevKeys.includes(e.key)) {
        e.preventDefault();
        indexRef.current = Math.max(indexRef.current - 1, 0);
        moved = true;
      }

      if (!moved) return;

      isThrottled.current = true;
      const target = sections[indexRef.current]?.current;
      const container = containerRef?.current ?? document.scrollingElement ?? document.documentElement;

      if (target) {
        // Скроллим контейнер к элементу
        if (containerRef?.current) {
          const containerRect = (container as HTMLElement).getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const offsetTop = targetRect.top - containerRect.top + (container as HTMLElement).scrollTop;
          (container as HTMLElement).scrollTo({ top: offsetTop, behavior: "smooth" });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      window.setTimeout(() => {
        isThrottled.current = false;
      }, throttleMs);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sections, containerRef, JSON.stringify(nextKeys), JSON.stringify(prevKeys), throttleMs]);
}
