"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663691015196/f4B9TG3CEJDnzHER6X2dLw/about-team-9vwZMBumgDr9z7AvgK3k86.webp";

const stats = [
  { value: "100%", label: "Clientes satisfechos", color: "#06b6d4" },
  { value: "24/7", label: "Soporte disponible", color: "#3b82f6" },
  { value: "5+", label: "Servicios especializados", color: "#8b5cf6" },
  { value: "BA", label: "Buenos Aires", color: "#10b981" },
];

const values = [
  { title: "Resultados reales", description: "Nos enfocamos en métricas concretas que impactan tu negocio.", num: "01" },
  { title: "Respuesta rápida", description: "Soluciones ágiles sin sacrificar calidad.", num: "02" },
  { title: "Trato personalizado", description: "Cada solución adaptada a tus necesidades únicas.", num: "03" },
  { title: "Calidad garantizada", description: "Estándares profesionales en cada proyecto.", num: "04" },
];

export default function About3D() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll("[data-reveal]");
    if (!els) return;
    els.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style>{`
        .abt-section {
          padding: 120px 0;
          background: linear-gradient(180deg, #0a0c12 0%, #0D1117 100%);
          position: relative;
          overflow: hidden;
        }
        .abt-section::before {
          content: '';
          position: absolute; top: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent);
        }
        .abt-container {
          max-width: 1280px; margin: 0 auto; padding: 0 24px;
          position: relative; z-index: 1;
        }

        /* Split layout */
        .abt-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          margin-bottom: 100px;
        }
        @media (max-width: 860px) {
          .abt-split { grid-template-columns: 1fr; gap: 48px; }
        }

        /* Image side */
        .abt-img-wrap {
          position: relative;
        }
        .abt-img-frame {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }
        .abt-img-frame::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(8,10,16,0.7) 100%);
        }
        .abt-img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }
        .abt-img-frame:hover .abt-img { transform: scale(1.03); }

        /* Floating tag */
        .abt-img-tag {
          position: absolute;
          bottom: 20px; left: 20px;
          z-index: 2;
          padding: 10px 16px;
          border-radius: 10px;
          background: rgba(10,12,18,0.85);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; gap: 8px;
        }
        .abt-img-tag-dot {
          width: 6px; height: 6px; border-radius: 99px;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        .abt-img-tag-text {
          font-size: 0.75rem; font-weight: 600;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.02em;
        }

        /* Accent line */
        .abt-img-accent {
          position: absolute;
          top: -16px; right: -16px;
          width: 80px; height: 80px;
          border-top: 2px solid rgba(6,182,212,0.4);
          border-right: 2px solid rgba(6,182,212,0.4);
          border-radius: 0 12px 0 0;
        }
        .abt-img-accent2 {
          position: absolute;
          bottom: -16px; left: -16px;
          width: 80px; height: 80px;
          border-bottom: 2px solid rgba(139,92,246,0.4);
          border-left: 2px solid rgba(139,92,246,0.4);
          border-radius: 0 0 0 12px;
        }

        /* Text side */
        .abt-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 20px;
        }
        .abt-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px; height: 1px;
          background: #22d3ee;
        }
        .abt-title {
          font-size: clamp(1.8rem, 3.5vw, 2.75rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #fff;
          margin-bottom: 24px;
        }
        .abt-body {
          font-size: 0.9375rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          margin-bottom: 16px;
        }

        /* Stats row */
        .abt-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 100px;
        }
        @media (max-width: 640px) {
          .abt-stats { grid-template-columns: repeat(2, 1fr); }
        }
        .abt-stat {
          padding: 36px 24px;
          background: rgba(8,11,18,0.92);
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .abt-stat:hover { background: rgba(12,16,26,0.98); }
        .abt-stat-glow {
          position: absolute;
          bottom: -20px; left: 50%; transform: translateX(-50%);
          width: 80px; height: 80px;
          border-radius: 50%;
          filter: blur(24px);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .abt-stat:hover .abt-stat-glow { opacity: 0.4; }
        .abt-stat-value {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 6px;
          line-height: 1;
        }
        .abt-stat-label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        /* Values */
        .abt-values-header {
          text-align: center;
          margin-bottom: 56px;
        }
        .abt-values-title {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #fff;
        }
        .abt-values-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .abt-values-grid { grid-template-columns: 1fr; }
        }
        .abt-value-card {
          padding: 36px;
          background: rgba(8,11,18,0.92);
          display: flex; gap: 20px;
          transition: background 0.3s;
        }
        .abt-value-card:hover { background: rgba(12,16,26,0.98); }
        .abt-value-num {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.15);
          margin-top: 4px;
          flex-shrink: 0;
          width: 28px;
        }
        .abt-value-content {}
        .abt-value-title {
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 8px;
        }
        .abt-value-desc {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }
      `}</style>

      <section id="nosotros" className="abt-section" ref={sectionRef}>
        <div className="abt-container">

          {/* Split */}
          <div className="abt-split">
            <div className="abt-img-wrap" data-reveal>
              <div className="abt-img-accent" />
              <div className="abt-img-accent2" />
              <div className="abt-img-frame">
                <img src={ABOUT_IMAGE} alt="Equipo Soluciones Tech OK" className="abt-img" loading="lazy" />
                <div className="abt-img-tag">
                  <span className="abt-img-tag-dot" />
                  <span className="abt-img-tag-text">Equipo activo · Buenos Aires</span>
                </div>
              </div>
            </div>

            <div data-reveal>
              <div className="abt-eyebrow">Quiénes somos</div>
              <h2 className="abt-title">Tecnología que impulsa tu negocio</h2>
              <p className="abt-body">
                Somos un equipo apasionado por la tecnología con base en Buenos Aires. Nos especializamos en brindar soluciones IT integrales y servicios digitales que ayudan a empresas y emprendedores a crecer en el mundo digital.
              </p>
              <p className="abt-body">
                Desde el desarrollo de tu sitio web hasta la gestión de tus redes sociales, somos tu socio tecnológico de confianza. Trabajamos con dedicación, transparencia y un compromiso real con los resultados de cada cliente.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="abt-stats" data-reveal>
            {stats.map((s, i) => (
              <div key={i} className="abt-stat">
                <div className="abt-stat-glow" style={{ background: s.color }} />
                <div className="abt-stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="abt-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="abt-values-header" data-reveal>
            <h3 className="abt-values-title">Nuestros Valores</h3>
          </div>
          <div className="abt-values-grid">
            {values.map((v, i) => (
              <div key={i} className="abt-value-card" data-reveal>
                <span className="abt-value-num">{v.num}</span>
                <div className="abt-value-content">
                  <h4 className="abt-value-title">{v.title}</h4>
                  <p className="abt-value-desc">{v.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}