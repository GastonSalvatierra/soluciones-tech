"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // Anchors internos -> scroll suave con offset del navbar. Las secciones del
    // StackFlow viven dentro de un contenedor sticky, así que navegamos con el
    // mapa de anclas que expone StackFlow (índice * viewportHeight).
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const stack = (window as unknown as {
        __stack?: { top: number; count: number; anchors: Record<string, number> };
      }).__stack;

      const anchorY = stack?.anchors?.[hash.slice(1)];
      if (typeof anchorY === "number") {
        e.preventDefault();
        lenis.scrollTo(anchorY, { offset: 0, duration: 1.4 });
        return;
      }

      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
      }
    };

    document.addEventListener("click", onClick);

    // Exponer para que otros componentes (HeroVideo) escuchen el scroll real
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}