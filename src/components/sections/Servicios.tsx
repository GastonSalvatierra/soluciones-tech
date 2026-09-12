"use client";

import { useRef, type MouseEvent } from "react";
import { gsap } from "gsap";
import {
  Zap,
  Bot,
  Plug,
  Globe,
  Megaphone,
  Share2,
  TrendingUp,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import { useStackSection } from "@/components/shared/useStackSection";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Megaphone,
  Share2,
  Globe,
  Plug,
  Zap,
  Bot,
};

const marqueeItems = [
  "Marketing Digital",
  "Gestión de Redes",
  "Desarrollo Web",
  "Integraciones",
  "Automatizaciones",
  "Bots con IA",
  "Sistemas a Medida",
  "APIs",
];

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  metric: string;
  idx: number;
}

function ServiceCard({ icon: Icon, title, description, metric, idx }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "spotlight-card card-sheen group relative h-full overflow-hidden rounded-2xl border border-line bg-card p-4",
        "transition-all duration-500 hover:-translate-y-1 hover:border-accent/40",
        "hover:shadow-[0_12px_48px_rgba(0,0,0,0.55),0_0_28px_rgba(0,255,241,0.06)]"
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-elevated text-accent transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_24px_rgba(0,255,241,0.25)]">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <span className="mono-label text-white/25">
          {String(idx + 1).padStart(2, "0")} <span className="text-accent/60">/</span> 0{siteConfig.services.length}
        </span>
      </div>
      <h3 className="mb-1.5 text-[15px] font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="line-clamp-2 text-[13px] leading-relaxed text-muted">
        {description}
      </p>

      <div className="mt-3 flex items-center gap-1.5 border-t border-line/70 pt-2.5">
        <TrendingUp className="h-3.5 w-3.5 text-accent" />
        <span className="mono-label text-accent">
          {metric}
        </span>
      </div>
    </div>
  );
}

function MarqueeEnergy() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="border-y border-line/60 py-2.5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max items-center animate-marquee">
        {row.map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
          >
            {item}
            <Zap className="h-3 w-3 text-accent/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Servicios() {
  // EFECTO: "carrousel infinito" — los servicios corren en UNA sola fila
  // horizontal y, al scrollear la sección, la tira se desplaza hacia la
  // izquierda repartido en TODA la unidad (las 6 tarjetas están duplicadas,
  // así el bucle es imperceptible). El desplazamiento se re-mide cada frame,
  // así es responsive a cualquier breakpoint.
  const sectionRef = useStackSection(
    () => null,
    [],
    (section) => {
      const strip = section.querySelector<HTMLElement>("[data-servicios-strip]");
      if (!strip) return;
      const stack = (window as unknown as { __stack?: { step: number; positions: number[] } }).__stack;
      const host = section.closest("[data-stack-index]");
      const idx = host ? Number(host.getAttribute("data-stack-index")) : -1;
      const pos = stack?.positions?.[idx];
      if (!stack || stack.step <= 0 || pos === undefined) return;
      // Ventana PROPIA sobre la UNIDAD COMPLETA de la sección (paso entero,
      // no solo la fase estática): así el recorrido para ver las 6 tarjetas
      // se reparte en todo el scroll de la sección y se mantiene lento
      // (~1 card por vuelta de rueda) sin que queden tarjetas sin ver.
      const p = Math.min(Math.max((window.scrollY - pos) / stack.step, 0), 1);
      const cards = section.querySelectorAll<HTMLElement>(".spotlight-card");
      // Recorrido total: 5 tarjetas (de la 1ª a la 5ª) -> todas las 6 pasan
      // por delante aunque el viewport sea angosto (tablet/móvil).
      const travel =
        cards.length >= 6 && cards[1]
          ? cards[5].getBoundingClientRect().left - cards[0].getBoundingClientRect().left || strip.scrollWidth / 2.4
          : strip.scrollWidth / 2.4;
      // Smoothstep: arranque y frenado suaves (se siente más lento).
      const e = p * p * (3 - 2 * p);
      gsap.set(strip, { x: -travel * e });
      // El título queda QUIETO: solo se mueve la tira de servicios.
    }
  );

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative flex h-full w-full flex-col justify-center overflow-hidden pt-16 pb-8"
    >
      <MarqueeEnergy />
      <div className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-10 lg:px-8">
        <SectionHeading
          className="mb-6 md:mb-8"
          eyebrow="Servicios"
          title={
            <>
              Lo que construimos,{" "}
              <span className="text-accent-gradient">por dentro</span>
            </>
          }
          description="Cada área es un módulo del mismo sistema: estrategia, creatividad y tecnología para llevar tu negocio al siguiente nivel."
        />
      </div>

      {/* Carrousel horizontal: una fila que se desplaza con el scroll de la
          sección. Contenido duplicado para que el bucle sea imperceptible.
          Las tarjetas de los bordes quedan SIEMPRE completas: no hay máscara
          que las desvanezca y la tira tiene gaps simétricos a ambos lados
          (el padding líder/tralero es el mismo, así el seam exacto se
          conserva: card5 en p=1 queda donde card0 en p=0). */}
      <div className="relative w-full pb-4">
        <div className="pointer-events-none relative overflow-hidden py-2">
          <div
            data-servicios-strip
            className="relative flex w-max items-stretch gap-3 px-6 sm:px-10 lg:px-14"
          >
            {siteConfig.services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap;
              return (
                <div
                  key={service.title}
                  className="w-72 shrink-0 sm:w-80 lg:w-96"
                >
                  <Reveal delay={(i % 3) * 0.07}>
                    <ServiceCard
                      icon={Icon}
                      title={service.title}
                      description={service.description}
                      metric={service.metric}
                      idx={i}
                    />
                  </Reveal>
                </div>
              );
            })}
            {siteConfig.services.map((service, i) => {
              const Icon = iconMap[service.icon] ?? Zap;
              return (
                <div
                  key={`dup-${service.title}`}
                  aria-hidden="true"
                  className="w-72 shrink-0 sm:w-80 lg:w-96"
                >
                  <ServiceCard
                    icon={Icon}
                    title={service.title}
                    description={service.description}
                    metric={service.metric}
                    idx={i}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}