"use client";

import { MessageSquare, Code2, Rocket } from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import { useStackSection } from "@/components/shared/useStackSection";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const stepIcons = [MessageSquare, Code2, Rocket];

export default function Proceso() {
  // EFECTO: "carga de energía" — la línea central se carga de arriba a abajo
  // (scaleY) y cada paso se incorpora en secuencia. El título queda QUIETO.
  const sectionRef = useStackSection((section) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    const line = section.querySelector<HTMLElement>("[data-proceso-line]");
    if (line) {
      line.style.transformOrigin = "top";
      tl.fromTo(line, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "power1.inOut" }, 0);
    }
    const steps = section.querySelectorAll<HTMLElement>("[data-proceso-step]");
    steps.forEach((s, i) => {
      const at = i / steps.length;
      tl.fromTo(s, { y: 36, scale: 0.95 }, { y: 0, scale: 1, duration: 1 }, at);
    });
    return tl;
  });

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative flex h-full w-full flex-col justify-center overflow-hidden pt-16 pb-8"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-5 md:py-6">
        <SectionHeading
          className="mb-5 md:mb-6"
          eyebrow="Proceso"
          title={
            <>
              De la idea al resultado,{" "}
              <span className="text-accent-gradient">en tres etapas</span>
            </>
          }
          description="Un método claro. Cada fase activa una parte del sistema hasta que tu negocio queda operando solo."
        />

        <div className="relative">
          {/* Línea de energía central (la energía fluye al scrollear) */}
          <div
            data-proceso-line
            className="energy-line absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-line to-transparent md:left-1/2"
          />

          <div className="space-y-5 md:space-y-6">
            {siteConfig.process.map((step, i) => {
              const Icon = stepIcons[i] ?? Code2;
              const isLeft = i % 2 === 0;

              return (
                <div key={step.step} data-proceso-step className="relative">
                  {/* Nodo */}
                  <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-background text-accent md:left-1/2 md:-translate-x-1/2">
                    <Icon className="h-4 w-4" />
                  </div>

                  <Reveal
                    className={cn(
                      "pl-16 md:w-[calc(50%-3rem)] md:pl-0",
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    )}
                    direction={isLeft ? "left" : "right"}
                  >
                    <div
                      className={cn(
                        "rounded-2xl border border-line bg-card/60 p-4 backdrop-blur-sm",
                        "transition-all duration-500 hover:border-accent/25 hover:bg-card"
                      )}
                    >
                      <span className="mono-label text-accent">
                        {step.tag ?? `PASO ${step.step.toString().padStart(2, "0")}`}
                      </span>
                      <h3 className="mt-1 text-[17px] font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}