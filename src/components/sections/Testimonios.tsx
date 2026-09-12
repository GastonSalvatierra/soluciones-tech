"use client";

import { Star } from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import { useStackSection } from "@/components/shared/useStackSection";
import { siteConfig } from "@/lib/config";

export default function Testimonios() {
  // EFECTO: "cascada" — las citas ascienden cada una a distinta velocidad y
  // distancia (escalera vertical), con el título desplazándose al otro lado.
  const sectionRef = useStackSection((section) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    const cards = section.querySelectorAll<HTMLElement>("figure");
    cards.forEach((c, i) => {
      tl.to(c, { y: -(12 + i * 18), duration: 1 }, 0);
    });
    tl.to(section.querySelector("[data-section-heading]"), { x: 22, duration: 1 }, 0);
    return tl;
  });

  return (
    <section
      ref={sectionRef}
      id="testimonios"
      className="relative flex h-full w-full flex-col justify-center overflow-hidden pt-16 pb-8"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-6 sm:px-10 lg:px-8">
        <SectionHeading
          className="mb-6 md:mb-8"
          eyebrow="Testimonios"
          title={
            <>
              Empresas que ya{" "}
              <span className="text-accent-gradient">operan en el sistema</span>
            </>
          }
          description="No vendemos ideas: entregamos soluciones medidas. Así fue para quienes ya trabajan con nosotros."
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {siteConfig.testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-card/60 p-5 backdrop-blur-sm transition-all duration-500 hover:border-accent/25 hover:bg-card">
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="line-clamp-4 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/5 font-mono text-xs font-semibold text-accent">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}