"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";

interface StackApi {
  top: number;
  count: number;
  step: number;
  positions: number[];
  anchors: Record<string, number>;
}

/**
 * Conecta la animación de componentes DENTRO de una sección del stack al
 * scroll de SU unidad. Cada sección define su propio timeline (efecto
 * distinto: drift, abanico, swing, carga de energía, cascada, contra-
 * parallax...). El progreso avanza durante la fase estática de la unidad
 * (55% del paso); cuando arranca el carry, la sección ya quedó animada.
 */
export function useStackSection(
  build: (section: HTMLElement) => gsap.core.Timeline | null,
  deps: unknown[] = [],
  onFrame?: (section: HTMLElement, p: number) => void
): RefObject<HTMLElement | null> {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const tl = build(section);

    let raf = 0;
    const update = () => {
      raf = 0;
      const stack = (window as unknown as { __stack?: StackApi }).__stack;
      if (!stack || stack.step <= 0 || !stack.positions?.length) return;
      const host = section.closest("[data-stack-index]");
      const idx = host ? Number(host.getAttribute("data-stack-index")) : -1;
      if (idx < 0) return;
      const pos = stack.positions[idx];
      if (pos === undefined) return;
      // La fase estática coincide con CARRY_AT de StackFlow (0.62): el efecto
      // avanza todo lo que dura la sección quieta y termina justo cuando
      // arranca el carry. Más extensa = el efecto se ve más lento de a poco.
      const staticWindow = stack.step * 0.62;
      const p = Math.min(
        Math.max((window.scrollY - pos) / staticWindow, 0),
        1
      );
      tl?.progress(p);
      onFrame?.(section, p);
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const lenis = (window as unknown as {
      __lenis?: {
        on?: (e: "scroll", cb: () => void) => void;
        off?: (e: "scroll", cb: () => void) => void;
      };
    }).__lenis;
    lenis?.on?.("scroll", schedule);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      lenis?.off?.("scroll", schedule);
      tl?.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return sectionRef;
}