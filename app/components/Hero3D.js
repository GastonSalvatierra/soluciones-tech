"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663691015196/f4B9TG3CEJDnzHER6X2dLw/hero-bg-TRRs8HR9RGhxFw7GjAxLUs.webp";

const highlights = [
  "Webs y sistemas a medida",
  "Automatizaciones y bots con IA",
  "Marketing, Ads y soporte IT 24/7",
];

export default function Hero3D() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Particle canvas con conexiones tipo "neural mesh"
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (particlesRef.current.length === 0) {
        for (let i = 0; i < 65; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.14,
            vy: (Math.random() - 0.5) * 0.14,
            r: Math.random() * 1.3 + 0.4,
            alpha: Math.random() * 0.4 + 0.08,
          });
        }
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particlesRef.current;
      const mx = mouseRef.current.x * canvas.width;
      const my = mouseRef.current.y * canvas.height;

      ps.forEach((p) => {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 170) {
          p.vx += (dx / dist) * 0.018;
          p.vy += (dy / dist) * 0.018;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -0.7;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -0.7;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `rgba(6,182,212,${p.alpha * 0.95})`);
        g.addColorStop(0.5, `rgba(59,130,246,${p.alpha * 0.3})`);
        g.addColorStop(1, `rgba(6,182,212,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      for (let i = 0; i < ps.length; i += 2) {
        for (let j = i + 1; j < ps.length; j += 2) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.14 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(".hero-badge", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(".hero-h1", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .fromTo(".hero-check", { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
      .fromTo(".hero-btns", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
  }, []);

  return (
    <>
     <style>{`
        /* --- Estructura Principal del Hero --- */
        .hero-section { 
          position: relative; 
          min-height: 100svh; 
          display: flex; 
          align-items: center; 
          overflow: hidden; 
          background-color: #05070c;
          font-family: system-ui, -apple-system, sans-serif;
        }

        /* --- Efecto de Fondo --- */
        .hero-bg {
          position: absolute; 
          inset: 0;
          background-size: cover; 
          background-position: center 20%;
          background-repeat: no-repeat;
          transform: scale(1.04);
          transition: transform 8s ease-out;
        }
        .hero-section:hover .hero-bg { transform: scale(1); }

        /* --- Capas de Gradientes y Texturas --- */
        .hero-overlay-1 {
          position: absolute; 
          inset: 0;
          background: linear-gradient(105deg, rgba(8,10,16,0.97) 0%, rgba(8,10,16,0.85) 45%, rgba(8,10,16,0.45) 100%);
        }
        .hero-overlay-2 {
          position: absolute; 
          inset: 0;
          background: radial-gradient(ellipse 60% 50% at 20% 50%, rgba(6,182,212,0.07) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 60% at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 70%);
        }
        .hero-grain {
          position: absolute; 
          inset: 0; 
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px; 
          pointer-events: none;
        }
        .hero-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.9; }
        .hero-grid {
          position: absolute; 
          inset: 0; 
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }

        /* --- Efecto Aurora Glow Blobs --- */
        .hero-aurora {
          position: absolute; 
          inset: 0; 
          pointer-events: none;
          filter: blur(80px); 
          opacity: 0.55;
        }
        .hero-aurora::before, .hero-aurora::after {
          content: ''; 
          position: absolute; 
          border-radius: 50%;
          mix-blend-mode: screen;
        }
        .hero-aurora::before {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%);
          top: 20%; left: -10%;
          animation: aurora-1 18s ease-in-out infinite alternate;
        }
        .hero-aurora::after {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(139,92,246,0.28), transparent 70%);
          bottom: -10%; right: -10%;
          animation: aurora-2 22s ease-in-out infinite alternate;
        }
        @keyframes aurora-1 { from { transform: translate(0,0); } to { transform: translate(80px,-40px); } }
        @keyframes aurora-2 { from { transform: translate(0,0); } to { transform: translate(-100px,-60px); } }

        /* --- Contenedores Generales --- */
        .hero-content {
          position: relative; 
          z-index: 10;
          width: 100%; 
          max-width: 1280px;
          margin: 0 auto;
          padding: 100px 24px 60px; /* Padding superior corregido para mayor equilibrio */
        }
        .hero-inner { 
          max-width: 680px; /* Reducido de 720px para contener mejor las líneas de texto */
        }

        /* --- Animación de Entrada Fluida --- */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }

        /* --- Badge de Ubicación --- */
        .hero-badge {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          padding: 5px 12px 5px 8px;
          border-radius: 99px;
          border: 1px solid rgba(6,182,212,0.25);
          background: rgba(6,182,212,0.07);
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hero-badge-dot {
          width: 6px; height: 6px; 
          border-radius: 99px;
          background: #06b6d4; 
          box-shadow: 0 0 8px #06b6d4;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.8); } }
        .hero-badge-text { font-size: 0.75rem; font-weight: 600; color: #67e8f9; letter-spacing: 0.06em; text-transform: uppercase; }

        /* --- Tipografía Armónica (Ajustada) --- */
        .hero-h1 {
          font-size: clamp(2.1rem, 5.2vw, 3.4rem); /* Escalado suavizado para evitar gigantismo */
          font-weight: 800; 
          line-height: 1.15; /* Más separación entre renglones para que respire */
          letter-spacing: -0.02em;
          color: #fff; 
          margin-bottom: 20px;
        }
        .hero-h1-line2 {
          display: block;
          background: linear-gradient(90deg, #22d3ee, #60a5fa, #a78bfa);
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(0.95rem, 1.6vw, 1.05rem); /* Proporciones refinadas */
          color: rgba(255,255,255,0.65);
          line-height: 1.65; 
          max-width: 580px;
          margin-bottom: 32px;
        }

        /* --- Listado de Beneficios --- */
        .hero-checks { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-bottom: 36px; }
        .hero-check { display: flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: rgba(255,255,255,0.7); }
        .hero-check-icon { width: 14px; height: 14px; flex-shrink: 0; color: #22d3ee; }

        /* --- Botones y Acciones --- */
        .hero-btns { display: flex; flex-wrap: wrap; gap: 12px; }
        
        .btn-primary {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          padding: 11px 24px; 
          border-radius: 10px;
          background: linear-gradient(135deg, #0891b2 0%, #2563eb 100%);
          color: #fff; 
          font-size: 0.9rem; 
          font-weight: 600;
          letter-spacing: -0.01em; 
          border: none; 
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0 1px rgba(6,182,212,0.3), 0 8px 24px rgba(6,182,212,0.2);
          position: relative; 
          overflow: hidden;
        }
        .btn-primary::before {
          content: ''; 
          position: absolute; 
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent);
          opacity: 0; 
          transition: opacity 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(6,182,212,0.45), 0 12px 32px rgba(6,182,212,0.3); }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          display: inline-flex; 
          align-items: center; 
          gap: 8px;
          padding: 11px 24px; 
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.85);
          font-size: 0.9rem; 
          font-weight: 500;
          cursor: pointer; 
          transition: all 0.2s;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .btn-secondary:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.2); color: #fff; }

        /* --- Indicador Inferior de Scroll --- */
        .hero-scroll {
          position: absolute; 
          bottom: 36px; 
          left: 50%;
          transform: translateX(-50%);
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 8px;
          animation: fadeUp 0.8s ease-out 0.8s forwards;
          opacity: 0;
        }
        .hero-scroll-label { font-size: 0.6875rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .hero-scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(6,182,212,0.55), transparent);
          animation: scroll-line 2s ease-in-out infinite;
        }
        @keyframes scroll-line { 0%,100% { transform: scaleY(1); opacity: 0.7; } 50% { transform: scaleY(0.6); opacity: 0.3; } }
      `}</style>

      <section id="inicio" className="hero-section">
        {/* Capas de diseño estético de fondo */}
        <div className="hero-bg" style={{ backgroundImage: `url(${typeof HERO_BG !== 'undefined' ? HERO_BG : ''})` }} />
        <div className="hero-overlay-1" />
        <div className="hero-overlay-2" />
        <div className="hero-aurora" />
        <div className="hero-grid" />
        <div className="hero-grain" />
        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-content">
          <div className="hero-inner">
            
            {/* Badge Superior */}
            <div className="hero-badge animate-fade-up">
              <span className="hero-badge-dot" />
              <span className="hero-badge-text">Soluciones Tech · Buenos Aires</span>
            </div>

            {/* Título Principal */}
            <h1 className="hero-h1 animate-fade-up delay-1">
              Software, automatización 
              <span className="hero-h1-line2">y crecimiento digital para tu negocio</span>
            </h1>

            {/* Subtítulo descriptivo */}
            <p className="hero-sub animate-fade-up delay-2">
              Desarrollamos webs, sistemas a medida, bots con IA y automatizaciones que
              ahorran horas de trabajo. Sumá marketing, publicidad y soporte IT con un
              solo equipo que entiende tu negocio de punta a punta.
            </p>

            {/* Viñetas / Checks */}
            <div className="hero-checks animate-fade-up delay-3">
              {highlights.map((h) => (
                <span key={h} className="hero-check">
                  <CheckCircle2 className="hero-check-icon" size={14} />
                  {h}
                </span>
              ))}
            </div>

            {/* Botones de acción */}
            <div className="hero-btns animate-fade-up delay-4">
              <button
                className="btn-primary"
                onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              >
                Hablemos de tu proyecto
                <ArrowRight size={15} />
              </button>
              <button
                className="btn-secondary"
                onClick={() => document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver servicios
              </button>
            </div>

          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="hero-scroll">
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
}