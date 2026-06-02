"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663691015196/f4B9TG3CEJDnzHER6X2dLw/hero-bg-TRRs8HR9RGhxFw7GjAxLUs.webp";

const highlights = [
  "Programación Web a medida",
  "Marketing Digital efectivo",
  "Soporte IT profesional",
];

export default function Hero3D() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (particlesRef.current.length === 0) {
        for (let i = 0; i < 55; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.12,
            r: Math.random() * 1.2 + 0.4,
            alpha: Math.random() * 0.35 + 0.08,
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
        if (dist < 160) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
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
        g.addColorStop(0, `rgba(6,182,212,${p.alpha * 0.9})`);
        g.addColorStop(0.5, `rgba(59,130,246,${p.alpha * 0.3})`);
        g.addColorStop(1, `rgba(6,182,212,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // Connections (sparse, only nearby)
      for (let i = 0; i < ps.length; i += 2) {
        for (let j = i + 1; j < ps.length; j += 2) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.12 * (1 - d / 120)})`;
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
        .hero-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
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
        .hero-overlay-1 {
          position: absolute; inset: 0;
          background: linear-gradient(105deg,
            rgba(8,10,16,0.97) 0%,
            rgba(8,10,16,0.82) 45%,
            rgba(8,10,16,0.45) 100%
          );
        }
        .hero-overlay-2 {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 20% 50%, rgba(6,182,212,0.06) 0%, transparent 70%),
                      radial-gradient(ellipse 40% 60% at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 70%);
        }
        .hero-overlay-bottom {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 200px;
          background: linear-gradient(to top, #0D1117, transparent);
        }

        /* Noise grain overlay */
        .hero-grain {
          position: absolute; inset: 0; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          pointer-events: none;
        }

        .hero-canvas {
          position: absolute; inset: 0; width: 100%; height: 100%;
          pointer-events: none; opacity: 0.85;
        }

        /* Grid line accent */
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
        }

        .hero-content {
          position: relative; z-index: 10;
          width: 100%; max-width: 1280px;
          margin: 0 auto;
          padding: 140px 24px 80px;
        }
        .hero-inner { max-width: 700px; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px 6px 8px;
          border-radius: 99px;
          border: 1px solid rgba(6,182,212,0.25);
          background: rgba(6,182,212,0.07);
          margin-bottom: 32px;
          opacity: 0;
        }
        .hero-badge-dot {
          width: 6px; height: 6px; border-radius: 99px;
          background: #06b6d4;
          box-shadow: 0 0 8px #06b6d4;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-badge-text {
          font-size: 0.75rem; font-weight: 600;
          color: #67e8f9;
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        .hero-h1 {
          font-size: clamp(2.6rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 24px;
          opacity: 0;
        }
        .hero-h1-line2 {
          display: block;
          background: linear-gradient(90deg, #22d3ee, #60a5fa, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 36px;
          opacity: 0;
        }

        .hero-checks {
          display: flex; flex-wrap: wrap; gap: 12px 24px;
          margin-bottom: 44px;
        }
        .hero-check {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.65);
          opacity: 0;
        }
        .hero-check-icon {
          width: 16px; height: 16px; flex-shrink: 0;
          color: #22d3ee;
        }

        .hero-btns {
          display: flex; flex-wrap: wrap; gap: 12px;
          opacity: 0;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0891b2 0%, #2563eb 100%);
          color: #fff;
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.2);
          position: relative; overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(6,182,212,0.4), 0 16px 40px rgba(6,182,212,0.3); }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:active { transform: translateY(0); }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          backdrop-filter: blur(8px);
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }

        .hero-scroll {
          position: absolute; bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column;
          align-items: center; gap: 8px;
          opacity: 0;
        }
        .hero-scroll-label {
          font-size: 0.6875rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }
        .hero-scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(6,182,212,0.5), transparent);
          animation: scroll-line 2s ease-in-out infinite;
        }
        @keyframes scroll-line {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(0.6); opacity: 0.3; }
        }
      `}</style>

      <section id="inicio" className="hero-section">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="hero-overlay-1" />
        <div className="hero-overlay-2" />
        <div className="hero-grid" />
        <div className="hero-grain" />

        <canvas ref={canvasRef} className="hero-canvas" />

        <div className="hero-content">
          <div className="hero-inner">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span className="hero-badge-text">Buenos Aires, Argentina</span>
            </div>

            <h1 className="hero-h1">
              Tu negocio,{" "}
              <span className="hero-h1-line2">potenciado con tecnología</span>
            </h1>

            <p className="hero-sub">
              Desarrollamos soluciones digitales a medida: programación web, marketing
              digital, publicidad para ventas y gestión de redes sociales.
            </p>

            <div className="hero-checks">
              {highlights.map((h) => (
                <span key={h} className="hero-check">
                  <CheckCircle2 className="hero-check-icon" size={16} />
                  {h}
                </span>
              ))}
            </div>

            <div className="hero-btns">
              <button
                className="btn-primary"
                onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              >
                Hablemos de tu proyecto
                <ArrowRight size={16} />
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

        <div className="hero-scroll">
          <span className="hero-scroll-label">Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
}