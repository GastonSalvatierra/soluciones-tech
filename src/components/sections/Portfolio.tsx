"use client";

import { ArrowUpRight, Quote } from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import Magnetic from "@/components/shared/Magnetic";
import { useStackSection } from "@/components/shared/useStackSection";
import { siteConfig, waIntent } from "@/lib/config";

export default function Portfolio() {
  // EFECTO: "reel" — el block de proyectos se desplaza a la derecha como una
  // tira de carrousel con parallax vertical de fila. El título queda QUIETO.
  const sectionRef = useStackSection((section) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    tl.to(section.querySelector(".grid"), { xPercent: 26, duration: 1 }, 0);
    const cards = section.querySelectorAll<HTMLElement>(".grid article");
    cards.forEach((c, i) => {
      tl.to(c, { y: (i % 3) * -10, duration: 1 }, 0);
    });
    return tl;
  });

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative flex h-full w-full flex-col justify-center overflow-hidden pt-16 pb-8"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-10 lg:px-8">
        <SectionHeading
          className="mb-6 md:mb-8"
          eyebrow="Proyectos"
          title={
            <>
              Resultados reales,{" "}
              <span className="text-accent-gradient">sin humo</span>
            </>
          }
          description="Casos reales: automatizaciones, bots e integraciones corriendo en producción, midiendo resultados."
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {siteConfig.portfolio.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-card/60 p-3.5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:bg-card sm:p-4">
                {/* Tag y métrica */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="mono-label inline-flex items-center gap-1.5 rounded-full border border-line bg-elevated px-2 py-1 text-[10px] text-muted sm:text-xs">
                    {project.category}
                  </span>
                  {project.metric && (
                    <span className="mono-label hidden items-center gap-1 rounded-full border border-accent/20 bg-accent/5 px-2 py-1 text-[10px] text-accent sm:flex sm:text-xs">
                      {project.metric}
                    </span>
                  )}
                </div>

                {/* Header icon */}
                <div className="relative mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/5 text-accent transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 sm:h-11 sm:w-11">
                  <ArrowUpRight className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                </div>

                {/* Industry */}
                {project.industry && (
                  <p className="mono-label mb-0.5 text-[10px] text-white/40 sm:text-xs">
                    {project.industry}
                  </p>
                )}
                <h3 className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent sm:text-base">
                  {project.title}
                </h3>
                <p className="mt-1.5 hidden flex-1 text-[13px] leading-relaxed text-muted sm:line-clamp-3">
                  {project.description}
                </p>

                {/* CTA */}
                <div className="mt-2.5 border-t border-line/70 pt-2 sm:mt-3 sm:pt-2.5">
                  <Magnetic strength={0.14}>
                    <a
                      href={waIntent(`Hola! Me interesa un proyecto como "${project.title}".`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent transition-colors duration-300 hover:text-white sm:text-[13px]"
                    >
                      <Quote className="h-3.5 w-3.5" />
                      Quiero algo así
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Magnetic>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}