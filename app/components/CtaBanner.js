"use client";

import { ArrowRight, Instagram } from "lucide-react";

const WHATSAPP_NUMBER = "5491168450118";
const INSTAGRAM_HANDLE = "soluciones_tech.ok";

export default function CtaBanner() {
  return (
    <>
      <style>{`
        .cta-section { padding: 110px 0; background: #0D1117; position: relative; overflow: hidden; }
        .cta-section::before { content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent); }
        .cta-section::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent); }

        .cta-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 700px; height: 340px;
          background: radial-gradient(ellipse, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.06) 40%, transparent 70%);
          pointer-events: none; animation: cta-pulse 6s ease-in-out infinite;
        }
        @keyframes cta-pulse { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }

        .cta-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 80% at center, black, transparent);
          pointer-events: none;
        }

        .cta-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; text-align: center; }

        .cta-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #22d3ee; margin-bottom: 24px;
        }
        .cta-eyebrow::before, .cta-eyebrow::after { content: ''; display: inline-block; width: 32px; height: 1px; background: rgba(6,182,212,0.4); }

        .cta-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800; letter-spacing: -0.04em;
          line-height: 1.05; color: #fff; margin-bottom: 20px;
        }
        .cta-title span {
          background: linear-gradient(90deg, #22d3ee, #60a5fa, #a78bfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .cta-sub { font-size: 1.0625rem; color: rgba(255,255,255,0.5); max-width: 520px; margin: 0 auto 44px; line-height: 1.65; }

        .cta-btns { display: inline-flex; flex-wrap: wrap; gap: 12px; justify-content: center; }

        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 32px; border-radius: 14px;
          background: linear-gradient(135deg, #0891b2, #2563eb);
          color: #fff; font-size: 1rem; font-weight: 700; letter-spacing: -0.01em;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0 1px rgba(6,182,212,0.3), 0 12px 40px rgba(6,182,212,0.3);
          position: relative; overflow: hidden;
        }
        .cta-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.18), transparent); opacity: 0; transition: opacity 0.2s; }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 0 0 1px rgba(6,182,212,0.5), 0 20px 60px rgba(6,182,212,0.4); }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn-icon { display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; background: rgba(255,255,255,0.18); transition: transform 0.2s; }
        .cta-btn:hover .cta-btn-icon { transform: translateX(3px); }

        .cta-btn-ig {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px; border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.9);
          font-size: 0.9375rem; font-weight: 600;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: all 0.2s;
        }
        .cta-btn-ig:hover { background: rgba(236,72,153,0.1); border-color: rgba(236,72,153,0.4); color: #fff; transform: translateY(-2px); }
        .cta-btn-ig svg { color: #ec4899; }
      `}</style>

      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-grid" />
        <div className="cta-container">
          <div className="cta-eyebrow">Empezamos cuando quieras</div>
          <h2 className="cta-title">
            Tu próximo paso digital<br />
            <span>arranca esta semana.</span>
          </h2>
          <p className="cta-sub">
            Te escuchamos, evaluamos tu caso y te proponemos qué sirve y qué no.
            Sin compromiso, sin tecnicismos innecesarios.
          </p>

          <div className="cta-btns">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="cta-btn">
              Escribinos por WhatsApp
              <span className="cta-btn-icon"><ArrowRight size={14} /></span>
            </a>
            <a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noopener noreferrer" className="cta-btn-ig">
              <Instagram size={18} />
              Seguinos en Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}