"use client";

import { useRef, useEffect } from "react";
import { Code2, TrendingUp, Megaphone, Share2, Plug, Bot, Workflow } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "web",
    title: "Desarrollo Web a Medida",
    description: "Landing pages que convierten, e-commerce y sistemas web hechos a medida. Código limpio, performance real, diseño responsive y SEO técnico desde la base.",
    icon: Code2, label: "Desarrollo", accent: "#06b6d4"
  },
  {
    id: "automation",
    title: "Automatizaciones Inteligentes",
    description: "Conectamos tus herramientas (WhatsApp, Sheets, CRM, email, formularios) para eliminar tareas manuales. Flujos simples que ahorran horas todas las semanas.",
    icon: Workflow, label: "Automatización", accent: "#22d3ee"
  },
  {
    id: "bots",
    title: "Bots y Asistentes con IA",
    description: "Chatbots para WhatsApp, Instagram y tu web que responden 24/7, califican leads y derivan al humano cuando hace falta. Integrados a tu negocio.",
    icon: Bot, label: "IA & Bots", accent: "#a78bfa"
  },
  {
    id: "marketing",
    title: "Marketing Digital",
    description: "Estrategia, SEO, contenido y analítica con foco en métricas que importan: leads, ventas y retención. Nada de vanity metrics.",
    icon: TrendingUp, label: "Marketing", accent: "#3b82f6"
  },
  {
    id: "ads",
    title: "Publicidad para Ventas",
    description: "Campañas en Google Ads, Meta Ads y TikTok Ads con segmentación precisa, creatividades testeadas y optimización semanal para maximizar tu ROAS.",
    icon: Megaphone, label: "Publicidad", accent: "#f59e0b"
  },
  {
    id: "social",
    title: "Gestión de Redes Sociales",
    description: "Instagram, Facebook, TikTok y LinkedIn: contenido, calendario editorial, community management y reportes claros con métricas accionables.",
    icon: Share2, label: "Social Media", accent: "#ec4899"
  },
  {
    id: "integrations",
    title: "Integraciones & APIs",
    description: "Conectamos tu web, CRM, ERP, pasarelas de pago (Mercado Pago, Stripe), WhatsApp Business API, Google Sheets y +100 herramientas. Tu stack hablando entre sí, sin copy-paste.",
    icon: Plug, label: "Integraciones", accent: "#10b981"
  },
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
          duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
          delay: (i % 4) * 0.08,
        }
      );
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`;
    card.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const resetTilt = (e) => { e.currentTarget.style.transform = ""; };

  return (
    <>
      <style>{`
        .svc-section { padding: 120px 0; background: #0D1117; position: relative; overflow: hidden; }
        .svc-section::before {
          content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent);
        }
        .svc-bg-glow {
          position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
          width: 800px; height: 400px;
          background: radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .svc-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

        .svc-header { margin-bottom: 72px; display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
        .svc-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          color: #22d3ee; margin-bottom: 16px;
        }
        .svc-eyebrow::before { content: ''; display: inline-block; width: 24px; height: 1px; background: #22d3ee; }
        .svc-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #fff; margin: 0; }
        .svc-subtitle { font-size: 1rem; color: rgba(255,255,255,0.45); max-width: 400px; line-height: 1.6; }

        /* NUEVA CONFIGURACIÓN DE REJILLA EN BASE 12 */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          overflow: hidden;
        }

        /* Distribución bento box dinámica para evitar huecos */
        .svc-card {
          grid-column: span 3; /* Fila superior: 4 tarjetas de 3 columnas = 12 total */
          position: relative;
          padding: 36px 32px;
          background: rgba(8, 11, 18, 0.92);
          overflow: hidden;
          cursor: pointer;
          transition: background 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1);
          transform-style: preserve-3d;
        }

        /* Las últimas 3 tarjetas se ensanchan a 4 columnas para ocupar la fila inferior a la perfección (3 * 4 = 12) */
        .svc-card:nth-child(n+5) {
          grid-column: span 4;
        }

        @media (max-width: 1100px) { 
          .svc-card, .svc-card:nth-child(n+5) { grid-column: span 6; } /* Rejilla de 2 columnas para tablets */
        }
        @media (max-width: 640px) { 
          .svc-card, .svc-card:nth-child(n+5) { grid-column: span 12; } /* Rejilla de 1 columna para móviles */
        }

        .svc-card:hover { background: rgba(12, 16, 26, 0.98); }
        
        .svc-card::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06), transparent 40%);
          opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }
        .svc-card:hover::after { opacity: 1; }

        .svc-card-glow {
          position: absolute; top: 0; right: 0;
          width: 200px; height: 200px;
          border-radius: 50%;
          opacity: 0; transition: opacity 0.4s;
          pointer-events: none; filter: blur(60px);
          transform: translate(40%, -40%);
        }
        .svc-card:hover .svc-card-glow { opacity: 0.3; }

        .svc-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .svc-card-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.3s;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .svc-card:hover .svc-card-icon { transform: scale(1.1) rotate(-3deg); }
        .svc-card-label {
          font-size: 0.625rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.55;
        }

        .svc-card-title { font-size: 1.125rem; font-weight: 700; letter-spacing: -0.02em; color: #fff; margin-bottom: 12px; line-height: 1.3; }
        .svc-card-desc { font-size: 0.875rem; color: rgba(255,255,255,0.5); line-height: 1.6; }
      `}</style>

      <section id="servicios" className="svc-section" ref={sectionRef}>
        <div className="svc-bg-glow" />
        <div className="svc-container">
          <div className="svc-header">
            <div>
              <div className="svc-eyebrow">Qué hacemos</div>
              <h2 className="svc-title">Soluciones de punta<br />a punta</h2>
            </div>
            <p className="svc-subtitle">
              Desde el desarrollo y la automatización hasta el marketing y el soporte: un único equipo que se ocupa de toda la parte tecnológica de tu negocio.
            </p>
          </div>

          <div className="svc-grid">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <div
                  key={svc.id}
                  className="svc-card"
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                >
                  <div className="svc-card-glow" style={{ background: svc.accent }} />

                  <div className="svc-card-header">
                    <div className="svc-card-icon" style={{ background: `${svc.accent}1a` }}>
                      <Icon size={20} style={{ color: svc.accent }} />
                    </div>
                    <span className="svc-card-label" style={{ color: svc.accent }}>{svc.label}</span>
                  </div>

                  <h3 className="svc-card-title">{svc.title}</h3>
                  <p className="svc-card-desc">{svc.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}