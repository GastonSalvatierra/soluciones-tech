"use client";

import { MessageCircle, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import Magnetic from "@/components/shared/Magnetic";
import { InstagramIcon } from "@/components/shared/icons";
import { useStackSection } from "@/components/shared/useStackSection";
import { siteConfig } from "@/lib/config";

export default function Bots() {
  const { whatsapp, instagram } = siteConfig.bots;

  // EFECTO: "swing" — cada bot entra desde su lado opuesto girando levemente
  // mientras el título deriva hacia un lado (parallax de contraste).
  const sectionRef = useStackSection((section) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    const cards = section.querySelectorAll<HTMLElement>("article");
    if (cards[0]) tl.fromTo(cards[0], { x: -80, rotate: -4 }, { x: 0, rotate: 0, duration: 1 }, 0);
    if (cards[1]) tl.fromTo(cards[1], { x: 80, rotate: 4 }, { x: 0, rotate: 0, duration: 1 }, 0);
    if (cards[0]) tl.to(cards[0], { y: -10, duration: 1 }, 0);
    if (cards[1]) tl.to(cards[1], { y: 8, duration: 1 }, 0);
    tl.to(section.querySelector("[data-section-heading]"), { x: 20, duration: 1 }, 0);
    return tl;
  });

  return (
    <section
      ref={sectionRef}
      id="bots"
      className="relative flex h-full w-full flex-col justify-center overflow-hidden pt-16 pb-8"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-6 sm:px-10 lg:px-8">
        <SectionHeading
          className="mb-6 md:mb-8"
          eyebrow="Bots con IA"
          title={
            <>
              Tu WhatsApp e Instagram,{" "}
              <span className="text-accent-gradient">atendiendo solos</span>
            </>
          }
          description="IA real funcionando 24/7: responde, toma datos, agenda turnos y deriva al equipo cuando hace falta."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* WhatsApp bot */}
          <Reveal direction="left">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-5 transition-all duration-500 hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(37,211,102,0.12)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-400 transition-shadow duration-500 group-hover:shadow-[0_0_28px_rgba(37,211,102,0.35)]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/5 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
                  24/7
                </span>
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {whatsapp.title}
              </h3>
              <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {whatsapp.handle}
              </p>

              <ul className="mt-4 flex-1 space-y-2">
                {whatsapp.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Magnetic strength={0.16} className="mt-5">
                <a
                  href={whatsapp.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_36px_rgba(37,211,102,0.45)]"
                >
                  <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                  {whatsapp.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </Magnetic>
            </article>
          </Reveal>

          {/* Instagram bot */}
          <Reveal direction="right" delay={0.12}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card p-5 transition-all duration-500 hover:border-fuchsia-400/40 hover:shadow-[0_0_40px_rgba(214,41,118,0.14)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#962fbf] shadow-lg shadow-fuchsia-500/20 transition-transform duration-500 group-hover:scale-110">
                  <InstagramIcon className="h-5 w-5 text-white" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-400/25 bg-fuchsia-400/5 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-fuchsia-300">
                  <Sparkles className="h-3 w-3" />
                  IA REAL
                </span>
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                {instagram.title}
              </h3>
              <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {instagram.handle}
              </p>

              <ul className="mt-4 flex-1 space-y-2">
                {instagram.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Magnetic strength={0.16} className="mt-5">
                <a
                  href={instagram.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#962fbf] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_36px_rgba(214,41,118,0.5)]"
                >
                  <InstagramIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                  {instagram.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </Magnetic>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}