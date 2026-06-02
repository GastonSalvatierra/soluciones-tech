"use client";

import Link from "next/link";
import { Instagram, MessageCircle, Mail, ArrowUpRight } from "lucide-react";

const LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663691015196/f4B9TG3CEJDnzHER6X2dLw/logo-soluciones-tech-goQkfY8zGP2oWrKQNfLJmH.webp";
const WHATSAPP_NUMBER = "5491168450118";
const INSTAGRAM_HANDLE = "soluciones_tech.ok";
const EMAIL = "contacto@solucionestech.ok";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

const serviceLinks = [
  "Programación Web",
  "Marketing Digital",
  "Publicidad para Ventas",
  "Gestión de Redes Sociales",
  "Soluciones IT",
  "Soporte Técnico",
];

const socials = [
  { icon: Instagram, href: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`, label: "Instagram", color: "#ec4899" },
  { icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", color: "#10b981" },
  { icon: Mail, href: `mailto:${EMAIL}`, label: "Email", color: "#3b82f6" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root {
          background: #070910;
          border-top: 1px solid rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
        }
        .ft-root::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6,182,212,0.2), rgba(59,130,246,0.2), transparent);
        }
        .ft-glow {
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 500px; height: 200px;
          background: radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .ft-container {
          max-width: 1280px; margin: 0 auto; padding: 0 24px;
          position: relative; z-index: 1;
        }

        /* Top */
        .ft-top {
          padding: 72px 0 56px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width: 960px) {
          .ft-top { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ft-top { grid-template-columns: 1fr; gap: 32px; }
        }

        /* Brand column */
        .ft-brand {}
        .ft-logo { height: 28px; width: auto; margin-bottom: 16px; opacity: 0.9; }
        .ft-tagline {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.35);
          line-height: 1.65;
          margin-bottom: 28px;
          max-width: 240px;
        }
        .ft-socials { display: flex; gap: 8px; }
        .ft-social {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none;
          transition: all 0.2s;
          color: rgba(255,255,255,0.45);
        }
        .ft-social:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.14);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Link columns */
        .ft-col-title {
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 20px;
        }
        .ft-link-list { display: flex; flex-direction: column; gap: 10px; }
        .ft-link {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
          display: inline-flex; align-items: center; gap: 4px;
        }
        .ft-link:hover { color: rgba(255,255,255,0.85); }

        /* Bottom */
        .ft-bottom {
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ft-copy {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.01em;
        }
        .ft-back-top {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255,255,255,0.3);
          background: none; border: none; cursor: pointer;
          transition: color 0.2s;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ft-back-top:hover { color: rgba(255,255,255,0.7); }
        .ft-back-top svg { transition: transform 0.2s; }
        .ft-back-top:hover svg { transform: translateY(-2px); }
      `}</style>

      <footer className="ft-root">
        <div className="ft-glow" />
        <div className="ft-container">
          <div className="ft-top">
            {/* Brand */}
            <div className="ft-brand">
              <img src={LOGO} alt="Soluciones Tech OK" className="ft-logo" />
              <p className="ft-tagline">
                Tu socio tecnológico en Buenos Aires. IT y servicios digitales para hacer crecer tu negocio.
              </p>
              <div className="ft-socials">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ft-social" title={s.label}>
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Nav */}
            <div>
              <div className="ft-col-title">Navegación</div>
              <div className="ft-link-list">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="ft-link">{l.label}</a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="ft-col-title">Servicios</div>
              <div className="ft-link-list">
                {serviceLinks.map((s) => (
                  <a key={s} href="#servicios" className="ft-link">{s}</a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="ft-col-title">Contacto</div>
              <div className="ft-link-list">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="ft-link">
                  WhatsApp <ArrowUpRight size={11} />
                </a>
                <a href={`https://www.instagram.com/${INSTAGRAM_HANDLE}/`} target="_blank" rel="noopener noreferrer" className="ft-link">
                  Instagram <ArrowUpRight size={11} />
                </a>
                <a href={`mailto:${EMAIL}`} className="ft-link">
                  {EMAIL}
                </a>
                <span className="ft-link" style={{ cursor: "default" }}>Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>

          <div className="ft-bottom">
            <p className="ft-copy">© 2024 Soluciones Tech OK. Todos los derechos reservados.</p>
            <button className="ft-back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Volver arriba
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}