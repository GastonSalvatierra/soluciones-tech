"use client";

import { useRef, useEffect } from "react";
import { Code2, TrendingUp, HardDrive, Megaphone, Share2, Headphones } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES_IMAGES = {
  web: "https://d2xsxph8kpxj0f.cloudfront.net/310519663691015196/f4B9TG3CEJDnzHER6X2dLw/services-web-jY7PDms4nYacRBXFywN4XN.webp",
  marketing: "https://d2xsxph8kpxj0f.cloudfront.net/310519663691015196/f4B9TG3CEJDnzHER6X2dLw/services-marketing-PqfhEKgvWtbZHdDow89on7.webp",
  it: "https://d2xsxph8kpxj0f.cloudfront.net/310519663691015196/f4B9TG3CEJDnzHER6X2dLw/services-it-TsBnMnKcHt2etuQKStr8jp.webp",
};

const services = [
  { id: "web", title: "Programación Web", description: "Sitios y apps a medida, desde landing pages de alto impacto hasta sistemas complejos. Código limpio, diseño responsivo, tecnologías modernas.", icon: Code2, label: "Desarrollo", image: SERVICES_IMAGES.web, accent: "#06b6d4" },
  { id: "marketing", title: "Marketing Digital", description: "Estrategias que generan resultados reales. SEO, contenido y analítica para convertir visitas en clientes.", icon: TrendingUp, label: "Marketing", image: SERVICES_IMAGES.marketing, accent: "#3b82f6" },
  { id: "it", title: "Soluciones IT", description: "Venta, instalación y soporte de equipos. Redes, servidores y mantenimiento para empresas de todos los tamaños.", icon: HardDrive, label: "IT & Hardware", image: SERVICES_IMAGES.it, accent: "#8b5cf6" },
  { id: "ads", title: "Publicidad para Ventas", description: "Google Ads y Meta Ads con segmentación precisa y optimización continua para maximizar tu ROI.", icon: Megaphone, label: "Publicidad", accent: "#f59e0b" },
  { id: "social", title: "Gestión de Redes Sociales", description: "Administración profesional de Instagram, Facebook y LinkedIn. Contenido, calendario editorial y reportes de métricas.", icon: Share2, label: "Social Media", accent: "#ec4899" },
  { id: "support", title: "Soporte Técnico", description: "Asistencia remota y presencial. Diagnóstico, reparación, recuperación de datos y mantenimiento periódico.", icon: Headphones, label: "Soporte", accent: "#10b981" },
];

export default function Services3D() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".svc-card");
    if (!cards) return;

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 48, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
          delay: (i % 3) * 0.08,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <style>{`
        .svc-section {
          padding: 120px 0;
          background: #0D1117;
          position: relative;
          overflow: hidden;
        }
        .svc-section::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent);
        }
        .svc-bg-glow {
          position: absolute;
          top: 20%; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .svc-container {
          max-width: 1280px; margin: 0 auto; padding: 0 24px;
          position: relative; z-index: 1;
        }

        .svc-header {
          margin-bottom: 72px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .svc-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 16px;
        }
        .svc-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px; height: 1px;
          background: #22d3ee;
        }
        .svc-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: #fff;
          margin: 0;
        }
        .svc-subtitle {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          max-width: 360px;
          line-height: 1.6;
        }

        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto auto;
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .svc-grid { grid-template-columns: 1fr; }
        }

        .svc-card {
          position: relative;
          padding: 36px 32px;
          background: rgba(8, 11, 18, 0.92);
          overflow: hidden;
          cursor: pointer;
          transition: background 0.3s;
        }
        .svc-card:hover { background: rgba(12, 16, 26, 0.98); }

        .svc-card-img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 24px;
          opacity: 0.85;
          transition: opacity 0.3s, transform 0.5s;
          display: block;
        }
        .svc-card:hover .svc-card-img {
          opacity: 1;
          transform: scale(1.02);
        }

        .svc-card-glow {
          position: absolute;
          top: 0; right: 0;
          width: 180px; height: 180px;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
          filter: blur(60px);
          transform: translate(40%, -40%);
        }
        .svc-card:hover .svc-card-glow { opacity: 0.25; }

        .svc-card-header {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .svc-card-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s;
        }
        .svc-card:hover .svc-card-icon { transform: scale(1.1) rotate(-3deg); }
        .svc-card-label {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.5;
        }

        .svc-card-title {
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .svc-card-desc {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.65;
        }

        .svc-card-arrow {
          position: absolute;
          bottom: 28px; right: 28px;
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: translateX(-6px);
          transition: all 0.3s;
          color: rgba(255,255,255,0.5);
        }
        .svc-card:hover .svc-card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <section id="servicios" className="svc-section" ref={sectionRef}>
        <div className="svc-bg-glow" />
        <div className="svc-container">
          <div className="svc-header">
            <div>
              <div className="svc-eyebrow">Qué hacemos</div>
              <h2 className="svc-title">Nuestros<br />Servicios</h2>
            </div>
            <p className="svc-subtitle">
              Soluciones tecnológicas integrales para que tu negocio crezca y destaque.
            </p>
          </div>

          <div className="svc-grid">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div key={svc.id} className="svc-card">
                  <div
                    className="svc-card-glow"
                    style={{ background: svc.accent }}
                  />

                  {svc.image && (
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="svc-card-img"
                      loading="lazy"
                    />
                  )}

                  <div className="svc-card-header">
                    <div
                      className="svc-card-icon"
                      style={{ background: `${svc.accent}18` }}
                    >
                      <Icon size={20} style={{ color: svc.accent }} />
                    </div>
                    <span className="svc-card-label" style={{ color: svc.accent }}>
                      {svc.label}
                    </span>
                  </div>

                  <h3 className="svc-card-title">{svc.title}</h3>
                  <p className="svc-card-desc">{svc.description}</p>

                  <div className="svc-card-arrow">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}