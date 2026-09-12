"use client";

import { type FormEvent } from "react";
import { Send, Mail, MessageCircle } from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import Magnetic from "@/components/shared/Magnetic";
import { InstagramIcon } from "@/components/shared/icons";
import { useStackSection } from "@/components/shared/useStackSection";
import { siteConfig, waIntent } from "@/lib/config";

const inputClasses =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/50 transition-all duration-300 focus:border-accent/40 focus:shadow-[0_0_20px_rgba(0,255,241,0.08)] focus:outline-none";

const channelClass =
  "group flex items-center gap-4 rounded-xl border border-line bg-card/50 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-card";

export default function Contacto() {
  // EFECTO: "contra-parallax" — formulario hacia la izquierda, vías de
  // contacto hacia la derecha (simetría sobre el centro); el botón se agranda.
  const sectionRef = useStackSection((section) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    const cols = section.querySelectorAll<HTMLElement>(".grid > div");
    if (cols[0]) tl.to(cols[0], { x: -24, duration: 1 }, 0);
    if (cols[1]) tl.to(cols[1], { x: 24, duration: 1 }, 0);
    const btn = section.querySelector<HTMLElement>("form button[type='submit']");
    if (btn) tl.to(btn, { scale: 1.05, duration: 1 }, 0);
    return tl;
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = String(data.get("nombre") ?? "").trim();
    const servicio = String(data.get("servicio") ?? "");
    const mensaje = String(data.get("mensaje") ?? "").trim();
    const text = `Hola! 👋 Vengo desde la web y quiero consultar por un proyecto.\n\n${
      nombre ? `Mi nombre: ${nombre}\n` : ""
    }${servicio ? `Interés: ${servicio}\n` : ""}${mensaje ? `\n${mensaje}` : ""}`;
    window.open(waIntent(text), "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative flex h-full w-full flex-col justify-center overflow-hidden pt-16 pb-8"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-6 md:py-8">
        <SectionHeading
          eyebrow="Contacto"
          title={
            <>
              Contanos tu{" "}
              <span className="text-accent-gradient">idea</span> y arrancamos
            </>
          }
          description="Completá el formulario y seguimos por WhatsApp. Respondemos en menos de 24 horas, sin vueltas."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Formulario */}
          <Reveal direction="left">
            <div className="rounded-2xl border border-line bg-card/70 p-5 backdrop-blur-sm md:p-6">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="nombre"
                    className="mb-1.5 block text-sm font-medium text-muted"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="servicio"
                    className="mb-1.5 block text-sm font-medium text-muted"
                  >
                    ¿En qué te ayudamos?
                  </label>
                  <select id="servicio" name="servicio" className={inputClasses} defaultValue="">
                    <option value="" disabled>
                      Elegí un servicio...
                    </option>
                    <option>Web a medida</option>
                    <option>Bot de WhatsApp</option>
                    <option>Bot de Instagram con IA</option>
                    <option>Automatización</option>
                    <option>Marketing y publicidad</option>
                    <option>Soporte IT</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="mensaje"
                    className="mb-1.5 block text-sm font-medium text-muted"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={3}
                    placeholder="Contanos qué necesitás..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <Magnetic strength={0.18} className="w-full">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,255,241,0.35)] hover:brightness-110"
                  >
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Enviar por WhatsApp
                  </button>
                </Magnetic>
                <p className="text-center text-xs text-muted/70">
                  Al enviar, te redirigimos a WhatsApp para continuar la charla.
                </p>
              </form>
            </div>
          </Reveal>

          {/* Vías de contacto */}
          <Reveal direction="right" delay={0.12}>
            <div className="flex h-full flex-col justify-center gap-3">
              <p className="text-base text-muted">
                También podés escribinos directo:
              </p>

              <a
                href={siteConfig.bots.whatsapp.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/5 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-400/10">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    WhatsApp · Bot con IA
                  </p>
                  <p className="text-sm text-muted">{siteConfig.phone}</p>
                </div>
              </a>

              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClass}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#962fbf] text-white transition-transform duration-300 group-hover:scale-110">
                  <InstagramIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Instagram · Bot con IA
                  </p>
                  <p className="text-sm text-muted">
                    {siteConfig.instagramHandle}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className={channelClass}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-elevated text-foreground transition-colors duration-300 group-hover:border-accent/30 group-hover:text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted">{siteConfig.email}</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}