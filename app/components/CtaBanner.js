"use client";

import { ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "5491168450118";

export default function CtaBanner() {
  return (
    <>
      <style>{`
        .cta-section {
          padding: 100px 0;
          background: #0D1117;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute; top: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent);
        }
        .cta-section::after {
          content: '';
          position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent);
        }

        /* Big blurred glow center */
        .cta-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.05) 40%, transparent 70%);
          pointer-events: none;
        }

        /* Grid */
        .cta-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 80% at center, black, transparent);
          pointer-events: none;
        }

        .cta-container {
          max-width: 1280px; margin: 0 auto; padding: 0 24px;
          position: relative; z-index: 1;
          text-align: center;
        }

        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #22d3ee;
          margin-bottom: 24px;
        }
        .cta-eyebrow::before, .cta-eyebrow::after {
          content: '';
          display: inline-block;
          width: 32px; height: 1px;
          background: rgba(6,182,212,0.4);
        }

        .cta-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.05;
          color: #fff;
          margin-bottom: 20px;
        }
        .cta-title span {
          background: linear-gradient(90deg, #22d3ee, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-sub {
          font-size: 1.0625rem;
          color: rgba(255,255,255,0.4);
          max-width: 460px;
          margin: 0 auto 44px;
          line-height: 1.65;
        }

        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 36px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0891b2, #2563eb);
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0 1px rgba(6,182,212,0.3), 0 12px 40px rgba(6,182,212,0.25);
          position: relative; overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 0 1px rgba(6,182,212,0.5), 0 20px 60px rgba(6,182,212,0.35);
        }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn:active { transform: translateY(-1px); }
        .cta-btn-icon {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(255,255,255,0.15);
          transition: transform 0.2s;
        }
        .cta-btn:hover .cta-btn-icon { transform: translateX(3px); }
      `}</style>

      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-grid" />
        <div className="cta-container">
          <div className="cta-eyebrow">
            Empezamos cuando quieras
          </div>
          <h2 className="cta-title">
            ¿Esperando qué?<br />
            <span>Tu competencia no espera.</span>
          </h2>
          <p className="cta-sub">
            Contactanos y empezamos a trabajar en tu proyecto esta semana.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            Empezar ahora
            <span className="cta-btn-icon">
              <ArrowRight size={14} />
            </span>
          </a>
        </div>
      </section>
    </>
  );
}