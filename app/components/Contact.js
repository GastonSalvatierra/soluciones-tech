"use client";

import { useState } from "react";
import { MessageCircle, Instagram, Mail, MapPin, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "5491168450118";
const EMAIL = "contacto@solucionestech.ok";
const INSTAGRAM = "soluciones_tech.ok";

const contacts = [
  { icon: MessageCircle, label: "WhatsApp", sub: "Escribinos directamente", color: "#10b981", bg: "rgba(16,185,129,0.1)", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { icon: Instagram, label: "Instagram", sub: `@${INSTAGRAM}`, color: "#ec4899", bg: "rgba(236,72,153,0.1)", href: `https://www.instagram.com/${INSTAGRAM}/` },
  { icon: Mail, label: "Email", sub: EMAIL, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Ubicación", sub: "Buenos Aires, Argentina", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)", href: null },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }
    const msg = `Hola, me llamo ${formData.name}\n\nEmail: ${formData.email}\nServicio: ${formData.service || "No especificado"}\n\nMensaje: ${formData.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <>
      <style>{`
        .ct-section {
          padding: 120px 0;
          background: linear-gradient(180deg, #0a0c12 0%, #0D1117 100%);
          position: relative;
          overflow: hidden;
        }
        .ct-section::before {
          content: '';
          position: absolute; top: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent);
        }
        .ct-container {
          max-width: 1280px; margin: 0 auto; padding: 0 24px;
          position: relative; z-index: 1;
        }

        .ct-header {
          margin-bottom: 72px;
        }
        .ct-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.6875rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #22d3ee; margin-bottom: 16px;
        }
        .ct-eyebrow::before {
          content: '';
          display: inline-block;
          width: 24px; height: 1px; background: #22d3ee;
        }
        .ct-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; letter-spacing: -0.03em;
          line-height: 1.1; color: #fff; margin-bottom: 16px;
        }
        .ct-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          max-width: 400px; line-height: 1.65;
        }

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .ct-grid { grid-template-columns: 1fr; }
        }

        /* Contact cards */
        .ct-cards { display: flex; flex-direction: column; gap: 10px; }
        .ct-card {
          display: flex; align-items: center; gap: 16px;
          padding: 18px 20px;
          border-radius: 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          text-decoration: none;
          transition: all 0.25s;
          cursor: pointer;
        }
        .ct-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.12);
          transform: translateX(4px);
        }
        .ct-card-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s;
        }
        .ct-card:hover .ct-card-icon { transform: scale(1.1); }
        .ct-card-info { flex: 1; min-width: 0; }
        .ct-card-label {
          font-size: 0.875rem; font-weight: 600;
          color: #fff; margin-bottom: 2px;
        }
        .ct-card-sub {
          font-size: 0.75rem; color: rgba(255,255,255,0.4);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .ct-card-arrow {
          color: rgba(255,255,255,0.2);
          transition: all 0.25s;
          flex-shrink: 0;
        }
        .ct-card:hover .ct-card-arrow {
          color: rgba(255,255,255,0.5);
          transform: translateX(3px);
        }

        /* Form */
        .ct-form-wrap {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 40px;
        }
        .ct-form-title {
          font-size: 1.125rem; font-weight: 700;
          letter-spacing: -0.02em; color: #fff;
          margin-bottom: 28px;
        }
        .ct-form { display: flex; flex-direction: column; gap: 16px; }
        .ct-field { display: flex; flex-direction: column; gap: 6px; }
        .ct-label {
          font-size: 0.75rem; font-weight: 600;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.04em; text-transform: uppercase;
        }

        .ct-input-wrap { position: relative; }
        .ct-input, .ct-select, .ct-textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 11px 14px;
          color: #fff;
          font-size: 0.9rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .ct-input::placeholder, .ct-textarea::placeholder { color: rgba(255,255,255,0.2); }
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color: rgba(6,182,212,0.5);
          background: rgba(6,182,212,0.04);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.08);
        }
        .ct-select option { background: #0D1117; color: #fff; }
        .ct-textarea { resize: none; }

        .ct-submit {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 24px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0891b2, #2563eb);
          color: #fff;
          font-size: 0.9375rem; font-weight: 700;
          letter-spacing: -0.01em;
          border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.2);
          margin-top: 4px;
          position: relative; overflow: hidden;
        }
        .ct-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          opacity: 0; transition: opacity 0.2s;
        }
        .ct-submit:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(6,182,212,0.4), 0 16px 40px rgba(6,182,212,0.3); }
        .ct-submit:hover::before { opacity: 1; }
        .ct-submit:active { transform: translateY(0); }

        .ct-note {
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.25);
          text-align: center;
          margin-top: 4px;
          line-height: 1.5;
        }
      `}</style>

      <section id="contacto" className="ct-section">
        <div className="ct-container">
          <div className="ct-header">
            <div className="ct-eyebrow">Contacto</div>
            <h2 className="ct-title">¿Listo para empezar?</h2>
            <p className="ct-sub">Contanos tu proyecto y te respondemos a la brevedad con una propuesta personalizada.</p>
          </div>

          <div className="ct-grid">
            {/* Left: contact methods */}
            <div className="ct-cards">
              {contacts.map((c, i) => {
                const Icon = c.icon;
                const Tag = c.href ? "a" : "div";
                return (
                  <Tag
                    key={i}
                    className="ct-card"
                    {...(c.href ? { href: c.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <div className="ct-card-icon" style={{ background: c.bg }}>
                      <Icon size={20} style={{ color: c.color }} />
                    </div>
                    <div className="ct-card-info">
                      <div className="ct-card-label">{c.label}</div>
                      <div className="ct-card-sub">{c.sub}</div>
                    </div>
                    {c.href && (
                      <ArrowRight size={16} className="ct-card-arrow" />
                    )}
                  </Tag>
                );
              })}
            </div>

            {/* Right: form */}
            <div className="ct-form-wrap">
              <div className="ct-form-title">Envianos un mensaje</div>
              <form className="ct-form" onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="ct-field">
                    <label className="ct-label">Nombre *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tu nombre" className="ct-input" required />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" className="ct-input" required />
                  </div>
                </div>
                <div className="ct-field">
                  <label className="ct-label">Servicio de interés</label>
                  <select name="service" value={formData.service} onChange={handleChange} className="ct-select">
                    <option value="">Seleccioná un servicio...</option>
                    <option>Programación Web</option>
                    <option>Marketing Digital</option>
                    <option>Publicidad para Ventas</option>
                    <option>Gestión de Redes Sociales</option>
                    <option>Soluciones IT</option>
                    <option>Soporte Técnico</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="ct-field">
                  <label className="ct-label">Mensaje *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Contanos sobre tu proyecto..." rows={4} className="ct-textarea" required />
                </div>
                <button type="submit" className="ct-submit">
                  Enviar mensaje
                  <ArrowRight size={16} />
                </button>
                <p className="ct-note">Al enviar serás redirigido a WhatsApp para continuar la conversación.</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}