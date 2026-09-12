"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface FlowPanel {
  node: ReactNode;
  id?: string;
}

interface StackFlowProps {
  panels: FlowPanel[];
  className?: string;
}

// Timing (en unidades de scroll, cada sección = 1 unidad):
//  - la sección queda quieta MUCHO tiempo antes de moverse (más margen),
//  - luego arranca un "carry" vertical largo: la sección actual sale hacia
//    arriba mientras la siguiente sube desde abajo en el MISMO intervalo y con
//    la MISMA ease (sin fades), como un paneo de pantalla continua al estilo
//    Locomotive. El carry termina exacto en el límite de la unidad (snap).
// Cuanto más alto CARRY_AT, más scroll necesita el usuario para destapar la
// siguiente sección: más intriga, "que pase más lento".
const CARRY_AT = 0.62;
const CARRY_DUR = 0.38;
const CARRY_EASE = "power2.inOut";

// Alto total del contenedor: cada sección ocupa 145vh de scroll para dar
// más aire y más tiempo quieto entre transiciones (los efectos internos
// respiran lento: una ruedita de scroll ≈ media o una card del carrousel).
const UNIT_VH = 145;

/**
 * StackFlow: pila de secciones a pantalla completa con scroll scrubeado.
 * Transición LOCA: un "carry" vertical puro (sin opacidad) — la sección que
 * sale sube hacia arriba a la vez que la siguiente sube desde abajo en el
 * mismo arco: contiguas, como si toda la página huyera en cámara una pantalla.
 * `scrub` alto + mucho tiempo estático por sección deja respirar cada pantalla.
 */
export default function StackFlow({ panels, className }: StackFlowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = elRefs.current;
    const total = panels.length;
    if (total === 0 || els.length !== total) return;

    const setPointer = (i: number, mode: "auto" | "none") => {
      const el = els[i];
      if (el) el.style.pointerEvents = mode;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        snap: {
          snapTo: 1 / total,
          duration: { min: 0.08, max: 0.3 },
          ease: "power2.inOut",
        },
      },
      defaults: { ease: "none" },
    });

    // El timeline debe durar exactamente `total` unidades para que el snap
    // 1/total caiga en cada sección ya asentada.
    const dummy = { v: 0 };
    tl.to(dummy, { v: 1, duration: total, ease: "none" }, 0);

    // Panel 0 clicable desde el inicio.
    tl.call(() => setPointer(0, "auto"), undefined, 0);

    for (let i = 1; i < total; i++) {
      const base = i - 1; // unidad donde panel (i-1) firma y panel i se levanta

      // CARRY vertical contiguo: panel anterior sube hacia arriba a la vez
      // que el nuevo sube desde abajo, con el mismo arco y ease. Sin fades.
      tl.to(
        els[i - 1],
        { yPercent: -100, duration: CARRY_DUR, ease: CARRY_EASE },
        base + CARRY_AT
      );
      tl.fromTo(
        els[i],
        { yPercent: 100 },
        { yPercent: 0, duration: CARRY_DUR, ease: CARRY_EASE },
        base + CARRY_AT
      );

      // Interactividad: la sección activa es clicable cuando está firme y deja
      // de interceptar clicks en cuanto arranca el carry. Sin esto, los paneles
      // con yPercent 100 (y mayor z-index) tapan los clicks de la activa.
      tl.call(() => setPointer(i - 1, "none"), undefined, base + CARRY_AT);
      tl.call(() => setPointer(i, "auto"), undefined, base + 1);
    }

    // Exponer anclas del stack para que el navbar navegue a cada sección.
    const api = {
      top: 0,
      count: total,
      step: 0,
      positions: [] as number[],
      anchors: {} as Record<string, number>,
    };
    (window as unknown as { __stack?: typeof api }).__stack = api;

    const measure = () => {
      const rect = container.getBoundingClientRect();
      api.top = rect.top + window.scrollY;
      // El scroll range real del stack es (alto - viewport); ScrollTrigger
      // "bottom bottom" termina ahí. El paso por sección es ese rango / total,
      // que coincide con el grid del snap (1/total) y con cada sección firme.
      api.step = Math.max((rect.height - window.innerHeight) / total, 1);
      api.positions = Array.from({ length: total }, (_, i) => api.top + i * api.step);
      for (const key of Object.keys(api.anchors)) {
        const idx = panels.findIndex((p) => p.id === key);
        if (idx >= 0) api.anchors[key] = api.positions[idx];
      }
    };
    panels.forEach((p) => {
      if (p.id) api.anchors[p.id] = 0;
    });
    measure();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", measure);
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("resize", measure);
      if (
        (window as unknown as { __stack?: typeof api }).__stack === api
      ) {
        (window as unknown as { __stack?: typeof api }).__stack = undefined;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = panels.length;

  return (
    <div
      ref={containerRef}
      className={cn("relative bg-background", className)}
      style={{ height: `${total * UNIT_VH}vh` }}
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-background">
        {panels.map((panel, i) => (
          <div
            key={i}
            data-stack-index={i}
            data-stack-id={panel.id}
            ref={(el) => {
              elRefs.current[i] = el;
            }}
            className="absolute inset-0 will-change-transform"
            style={{ zIndex: i, pointerEvents: i === 0 ? "auto" : "none" }}
          >
            <div className="absolute inset-0 overflow-hidden bg-background">
              {panel.node}
            </div>
          </div>
        ))}
        <Rail total={total} />
      </div>
    </div>
  );
}

function Rail({ total }: { total: number }) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      const stack = (window as unknown as {
        __stack?: { top: number; count: number; step: number };
      }).__stack;
      if (!stack || stack.step <= 0) return;
      // Calculamos el índice por posición de scroll dentro del stack:
      // sección i cuando scrollY está entre top + i*step y top + (i+1)*step.
      const local = window.scrollY - stack.top;
      const idx = Math.min(
        Math.max(Math.floor(local / stack.step), 0),
        stack.count - 1
      );
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const lenis = (window as unknown as { __lenis?: { on?: (e: "scroll", cb: () => void) => void; off?: (e: "scroll", cb: () => void) => void } }).__lenis;
    lenis?.on?.("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.off?.("scroll", onScroll);
    };
  }, [total]);

  const goTo = (i: number) => {
    const stack = (window as unknown as {
      __stack?: { positions: number[] };
      __lenis?: { scrollTo: (y: number, opts?: Record<string, unknown>) => void };
    }).__stack;
    const lenis = (window as unknown as {
      __lenis?: { scrollTo: (y: number, opts?: Record<string, unknown>) => void };
    }).__lenis;
    if (!stack || !stack.positions?.[i] || !lenis) return;
    lenis.scrollTo(stack.positions[i], { duration: 1.6, ease: "power2.inOut" });
  };

  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => goTo(i)}
          aria-label={`Ir a la sección ${i + 1}`}
          className={cn(
            "pointer-events-auto cursor-pointer rounded-full transition-all duration-500",
            i === active
              ? "h-1.5 w-6 bg-accent shadow-[0_0_10px_rgba(0,255,241,0.8)]"
              : "h-1.5 w-1.5 bg-white/20 hover:bg-white/50"
          )}
        />
      ))}
    </div>
  );
}