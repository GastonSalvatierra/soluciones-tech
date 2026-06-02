"use client";

/**
 * Carrusel infinito de logos del stack tecnológico.
 * Estilo "marquee" doble con fade en los bordes (como axiomait.com).
 * Logos servidos desde cdn.simpleicons.org (sin instalar nada).
 */

const techs = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "JavaScript", slug: "javascript", color: "F7DF1E" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "PHP", slug: "php", color: "777BB4" },
  { name: "Laravel", slug: "laravel", color: "FF2D20" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "Shopify", slug: "shopify", color: "7AB55C" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MySQL", slug: "mysql", color: "4479A1" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Firebase", slug: "firebase", color: "DD2C00" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "AWS", slug: "amazonwebservices", color: "FF9900" },
  { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "GitHub", slug: "github", color: "FFFFFF" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "WhatsApp", slug: "whatsapp", color: "25D366" },
  { name: "Meta", slug: "meta", color: "0467DF" },
  { name: "Google Ads", slug: "googleads", color: "4285F4" },
  { name: "OpenAI", slug: "openai", color: "FFFFFF" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Zapier", slug: "zapier", color: "FF4F00" },
  { name: "Notion", slug: "notion", color: "FFFFFF" },
  { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
];

const half = techs.slice(0, Math.ceil(techs.length / 2));
const otherHalf = techs.slice(Math.ceil(techs.length / 2));

function Row({ items, reverse = false, duration = 40 }) {
  const loop = [...items, ...items];
  return (
    <div className="ts-row">
      <div
        className="ts-track"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map((t, i) => (
          <div className="ts-item" key={`${t.slug}-${i}`} title={t.name}>
            <img
              src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
              alt={t.name}
              loading="lazy"
              draggable={false}
            />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <>
      <style>{`
        .ts-section {
          padding: 100px 0;
          background: #0D1117;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .ts-glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 280px;
          background: radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .ts-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
        .ts-header { text-align: center; margin-bottom: 56px; }
        .ts-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #22d3ee; margin-bottom: 16px;
        }
        .ts-eyebrow::before, .ts-eyebrow::after {
          content: ''; display: inline-block; width: 28px; height: 1px; background: rgba(6,182,212,0.45);
        }
        .ts-title {
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 800; letter-spacing: -0.03em;
          color: #fff; margin: 0 0 14px;
        }
        .ts-sub {
          font-size: 0.9375rem; color: rgba(255,255,255,0.45);
          max-width: 560px; margin: 0 auto; line-height: 1.65;
        }

        .ts-marquee {
          position: relative;
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
        .ts-row { overflow: hidden; padding: 12px 0; }
        .ts-track {
          display: flex; gap: 18px;
          width: max-content;
          animation: ts-scroll linear infinite;
        }
        .ts-row:hover .ts-track { animation-play-state: paused; }
        @keyframes ts-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .ts-item {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 20px;
          border-radius: 12px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.25s;
          backdrop-filter: blur(8px);
        }
        .ts-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(6,182,212,0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.15);
        }
        .ts-item img {
          width: 22px; height: 22px;
          object-fit: contain;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.4));
        }
        .ts-item span {
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgba(255,255,255,0.75);
          letter-spacing: -0.005em;
          white-space: nowrap;
        }

        .ts-note {
          text-align: center;
          margin-top: 36px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.04em;
        }
      `}</style>

      <section className="ts-section" id="tecnologias">
        <div className="ts-glow" />
        <div className="ts-container">
          <div className="ts-header">
            <div className="ts-eyebrow">Stack tecnológico</div>
            <h2 className="ts-title">Trabajamos con tecnologías líderes de la industria</h2>
            <p className="ts-sub">
              Elegimos para cada proyecto las herramientas que mejor se adaptan: lenguajes, frameworks, bases de datos, cloud, IA y plataformas de automatización.
            </p>
          </div>

          <div className="ts-marquee">
            <Row items={half} duration={45} />
            <Row items={otherHalf} duration={55} reverse />
          </div>

          <p className="ts-note">
            + integraciones con tus herramientas actuales (CRM, ERP, Sheets, APIs).
          </p>
        </div>
      </section>
    </>
  );
}