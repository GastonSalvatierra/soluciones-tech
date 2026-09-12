"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import Magnetic from "@/components/shared/Magnetic";
import { siteConfig } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

// Duración total de la línea de scroll del hero (unidades virtuales del timeline)
const TOTAL = 4;

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const blackoutRef = useRef<HTMLDivElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLAnchorElement | null>(null);
  const insideRef = useRef<HTMLDivElement | null>(null);
  const durationRef = useRef(0);
  const desiredRef = useRef(0);
  const lastWrittenRef = useRef(0);
  const lastSeekRef = useRef(0);
  const [videoError, setVideoError] = useState(false);

  // Intro: al cargar la página el video se reproduce completo UNA vez y,
  // cuando termina, pasa a modo scrub (respeta el scroll).
  const introRef = useRef(true);
  const introFiredRef = useRef(false);

  // Rebel extrapolado (sin re-render): blur/brightness los anima GSAP y se aplican en cada frame
  const fxRef = useRef({ blur: 0, brightness: 1 });

  // Ensamble de la intro: reproduce el video completo UNA vez. Se llama desde
  // un effect (NO desde eventos media de React, que pueden perderse si el
  // video termina de cargar antes de la hidratación) y chequea readyState.
  const ensureIntro = useCallback(() => {
    const v = videoRef.current;
    if (!v || introFiredRef.current) return;
    introFiredRef.current = true;
    const run = () => {
      const el = videoRef.current;
      if (!el) return;
      try {
        el.currentTime = 0;
        const p = el.play();
        p?.catch(() => {
          // Autoplay bloqueado: volvemos a modo scrub mostrando un frame
          introRef.current = false;
          try {
            el.currentTime = 0.001;
          } catch {
            /* no-op */
          }
        });
      } catch {
        introRef.current = false;
      }
    };
    if (v.readyState >= 2) run();
    else v.addEventListener("loadeddata", run, { once: true });
  }, []);

  const syncDuration = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const d = v.duration;
    if (Number.isFinite(d) && d > 0) {
      durationRef.current = d;
      ensureIntro();
    }
  }, [ensureIntro]);

  // Al terminar la intro: cede el control al scroll y vuelve al frame 0
  const onIntroEnded = useCallback(() => {
    introRef.current = false;
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0.001;
      } catch {
        /* no-op */
      }
    }
    desiredRef.current = 0;
    lastWrittenRef.current = 0;
  }, []);

  // Conecta la intro al elemento real (efecto, no eventos media de React):
  // chequea readyState ya cargado y escucha `ended` directamente.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onEnded = () => onIntroEnded();
    const onLateData = () => ensureIntro();
    if (v.readyState >= 2) ensureIntro();
    else v.addEventListener("loadeddata", onLateData, { once: true });
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("loadeddata", onLateData);
    };
  }, [ensureIntro, onIntroEnded]);

  // SCRUB PAUSADO, motor anti-jank:
  //  1) target alineado al grid del video (24fps)
  //  2) easing progresivo hacia el target
  //  3) un seek como máximo cada 30ms, solo si avanzó ≥1 frame
  useEffect(() => {
    const videoProbe = { value: 0 };

    const applyScrub = (p: number) => {
      const v = videoRef.current;
      if (v && !introRef.current) {
        if (durationRef.current <= 0 || !Number.isFinite(durationRef.current)) {
          syncDuration();
        }
        const d = durationRef.current;
        const fps = 24;
        if (d > 0 && Number.isFinite(d)) {
          const grid = Math.round(Math.min(Math.max(p, 0), 1) * d * fps) / fps;
          desiredRef.current += (grid - desiredRef.current) * 0.65;
          const now = performance.now();
          if (
            now - lastSeekRef.current >= 30 &&
            Math.abs(desiredRef.current - lastWrittenRef.current) >= 1 / fps
          ) {
            lastWrittenRef.current = desiredRef.current;
            lastSeekRef.current = now;
            try {
              v.currentTime = desiredRef.current;
              if (!v.paused) v.pause();
            } catch {
              /* no-op */
            }
          }
        }
      }

      // "Cámara": el desenfoque/profundidad animados viven en el proxy fx
      if (videoWrapRef.current) {
        const fx = fxRef.current;
        videoWrapRef.current.style.filter = `blur(${fx.blur.toFixed(1)}px) brightness(${fx.brightness.toFixed(2)})`;
      }
    };

    const videoWrap = videoWrapRef.current;
    const videoEl = videoRef.current;
    const blackout = blackoutRef.current;
    const hud = hudRef.current;
    const hint = hintRef.current;
    const inside = insideRef.current;
    const section = sectionRef.current;
    if (!videoWrap || !videoEl || !section) return;

    const fx = fxRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      defaults: { ease: "none" },
    });

    // Sonda de video: sigue EXACTAMENTE la línea scrubeada y arrastra el frame
    tl.to(videoProbe, { value: 1, duration: TOTAL, ease: "none" }, 0);
    tl.eventCallback("onUpdate", () => applyScrub(videoProbe.value));

    // Respiro inicial de cámara, luego el DIVE (aceleración progresiva)
    tl.to(videoWrap, { scale: 1.06, duration: 1.1, ease: "power1.out" }, 0);
    tl.to(videoWrap, { scale: 6.6, duration: 2.8, ease: "power2.in" }, 0.9);

    // HUD: el texto se retira antes de la inmersión
    if (hud) tl.to(hud, { opacity: 0, y: -70, duration: 0.9, ease: "power2.in" }, 0.06);
    if (hint) tl.to(hint, { opacity: 0, duration: 0.35, ease: "power1.out" }, 0.12);

    // Profundidad de inmersión (blur + contenido se apaga), transición al color de fondo
    tl.to(fx, { blur: 15, duration: 2, ease: "power1.in" }, 1);
    tl.to(fx, { brightness: 0.7, duration: 2, ease: "power1.in" }, 0.9);
    if (blackout) tl.to(blackout, { opacity: 1, duration: 1.1, ease: "power1.inOut" }, 2.5);

    // Micro-checkpoint final dentro de la máquina, encima del fondo
    if (inside) {
      tl.fromTo(inside, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }, 2.6);
      tl.to(inside, { opacity: 0, duration: 0.4, ease: "power1.in" }, 3.45);
    }
    tl.to(videoWrap, { scale: 7.4, duration: 1.1, ease: "power3.in" }, 2.9);

    applyScrub(0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Entrada inicial suave (stagger), independiente del scroll
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>("[data-hero-fx]");
    if (!els.length) return;
    const intro = gsap.fromTo(
      els,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.09, delay: 0.15 }
    );
    return () => {
      intro.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-background">
      {/* Contenedor sticky */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* Fallback mientras carga / si falla el video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0a0f] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,241,0.05),transparent_62%)]" />

        {/* VIDEO — protagonista visual; escala y profundidad las conduce GSAP */}
        {!videoError && (
          <div ref={videoWrapRef} className="absolute inset-0 z-10 will-change-transform">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/notebook-scrub.mp4"
              muted
              playsInline
              preload="auto"
              onError={() => setVideoError(true)}
            />
          </div>
        )}

        {/* Scrim superior: legibilidad del header */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-44 bg-gradient-to-b from-black/60 to-transparent" />
        {/* Scrim inferior: profundidad para el bloque de texto */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-80 bg-gradient-to-t from-[#050508]/85 via-[#050508]/35 to-transparent" />
        {/* Vignette sutil */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.6)_100%)]" />

        {/* Oscurece hacia el color de fondo de la marca (#0a0a0f) */}
        <div
          ref={blackoutRef}
          className="pointer-events-none absolute inset-0 z-40 bg-background opacity-0"
        />

        {/* ---------- TEXTO: protagonista comunicacional, abajo a la izquierda ---------- */}
        <div ref={hudRef} className="absolute inset-x-0 bottom-0 z-30">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 sm:px-10 md:pb-14">
            <div className="max-w-3xl">
              <p
                data-hero-fx
                className="eyebrow mb-6 flex items-center gap-3 text-accent"
              >
                <span className="h-px w-7 bg-accent/60" />
                Software, Engineered.
              </p>

              <h1
                data-hero-fx
                className="text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-white"
              >
                <span className="block text-gradient">Soluciones</span>
                <span className="block">
                  Tech<span className="text-accent">.</span>
                </span>
              </h1>

              <p
                data-hero-fx
                className="mt-6 max-w-lg text-[15px] leading-relaxed text-white/65 sm:text-base"
              >
                {siteConfig.description}
              </p>

              <div data-hero-fx className="mt-8 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.18}>
                  <a
                    href="#contacto"
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#050508] transition-all duration-300 hover:shadow-[0_0_36px_rgba(0,255,241,0.4)] hover:brightness-110"
                  >
                    Contactanos
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <a
                    href="#portfolio"
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-medium text-white/85 transition-colors duration-300 hover:border-white/35 hover:text-white"
                  >
                    Ver proyectos
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <a
          ref={hintRef}
          href="#servicios"
          className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/45 transition-colors hover:text-accent md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em]">
            Scroll para sumergir
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-white/15">
            <span className="absolute left-0 top-0 h-3 w-px animate-hint-drop bg-accent" />
          </span>
          <ChevronDown className="h-4 w-4" />
        </a>

        {/* Micro-checkpoint final: entrar dentro de la máquina */}
        <div
          ref={insideRef}
          className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center gap-3 opacity-0"
        >
          <div className="h-px w-24 bg-accent/60" />
          <p className="font-mono text-xs uppercase tracking-[0.45em] text-white/75">
            La máquina, por dentro
          </p>
        </div>
      </div>
    </section>
  );
}