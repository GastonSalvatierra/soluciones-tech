"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Workflow, Send, User, Sparkles, CheckCircle2, Loader2, ArrowRight, MessageCircle, Mail, Database, Zap } from "lucide-react";

const WHATSAPP_NUMBER = "5491168450118";

/* ============================================================
   BOT — usa text.pollinations.ai (gratis, sin API key)
   ============================================================ */
function BotDemo() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "¡Hola! 👋 Soy un asistente de Soluciones Tech. Probá preguntarme algo sobre nuestros servicios (web, automatizaciones, bots, ads...)." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (e) => {
    e?.preventDefault();
    const q = input.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);

    try {
      const systemPrompt = "Sos un asistente de 'Soluciones Tech', una empresa argentina que ofrece: desarrollo web a medida, automatizaciones, bots con IA, integraciones, marketing digital, Google/Meta Ads, redes sociales y soluciones IT. Respondé en español rioplatense mejor ubicado en Buenos Aires, breve (máx 3 oraciones), amable y profesional. No des tiempos de desarrollo ni precios precisos, lleva la charla para que se comuniquen directamente por whatsapp si despeja dudas basicas y si preguntan cosas que no tienen nada que ver con lo que ofrecemos no contestes eso y guia la conversacion para que compre nuestros servicios.";
      const prompt = `${systemPrompt}\n\nUsuario: ${q}\nAsistente:`;
      const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai`;
      const res = await fetch(url);
      const text = await res.text();
      const clean = text.trim().replace(/^Asistente:\s*/i, "");
      setMessages((m) => [...m, { role: "bot", text: clean || "Disculpá, no pude generar una respuesta. Probá de nuevo." }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "bot", text: "Hubo un error de conexión. Probá nuevamente en un momento." }]);
    } finally {
      setLoading(false);
    }
  };

  const quick = ["¿Cuánto tarda una web?", "¿Hacen bots para WhatsApp?", "¿Qué incluye una automatización?"];

  return (
    <div className="ld-bot">
      <div className="ld-bot-header">
        <div className="ld-bot-avatar"><Bot size={18} /></div>
        <div>
          <div className="ld-bot-name">Asistente Soluciones Tech</div>
          <div className="ld-bot-status"><span className="ld-dot" /> En línea · Powered by IA</div>
        </div>
      </div>

      <div className="ld-bot-scroll" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`ld-msg ld-msg-${m.role}`}>
            <div className="ld-msg-icon">{m.role === "bot" ? <Bot size={14} /> : <User size={14} />}</div>
            <div className="ld-msg-bubble">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="ld-msg ld-msg-bot">
            <div className="ld-msg-icon"><Bot size={14} /></div>
            <div className="ld-msg-bubble ld-typing"><span /><span /><span /></div>
          </div>
        )}
      </div>

      <div className="ld-quick">
        {quick.map((q) => (
          <button key={q} className="ld-quick-btn" onClick={() => setInput(q)} disabled={loading}>{q}</button>
        ))}
      </div>

      <form className="ld-bot-form" onSubmit={send}>
        <input
          className="ld-bot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí tu pregunta..."
          disabled={loading}
        />
        <button className="ld-bot-send" type="submit" disabled={loading || !input.trim()}>
          {loading ? <Loader2 size={16} className="ld-spin" /> : <Send size={16} />}
        </button>
      </form>
    </div>
  );
}

/* ============================================================
   AUTOMATIZACIÓN — flujo visual simulado
   ============================================================ */
const flowSteps = [
  { icon: Zap, title: "Trigger: nuevo lead", desc: "Se recibe el formulario", color: "#22d3ee" },
  { icon: CheckCircle2, title: "Validar datos", desc: "Email y nombre OK", color: "#10b981" },
  { icon: Database, title: "Guardar en CRM", desc: "Fila creada en Sheets/Notion", color: "#3b82f6" },
  { icon: Mail, title: "Email de bienvenida", desc: "Plantilla enviada", color: "#8b5cf6" },
  { icon: MessageCircle, title: "Notificar por WhatsApp", desc: "Mensaje al equipo", color: "#10b981" },
];

function AutomationDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState(-1); // -1 idle, 0..n running, n+1 done
  const [done, setDone] = useState(false);

  const run = async () => {
    if (!name.trim() || !email.trim() || active >= 0) return;
    setDone(false);
    for (let i = 0; i < flowSteps.length; i++) {
      setActive(i);
      await new Promise((r) => setTimeout(r, 900));
    }
    setActive(flowSteps.length);
    setDone(true);
  };

  const sendWhatsapp = () => {
    const msg = `🤖 Demo de automatización ejecutada\n\n👤 Nombre: ${name}\n📧 Email: ${email}\n\nQuiero saber más sobre las soluciones.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const reset = () => { setActive(-1); setDone(false); };

  return (
    <div className="ld-auto">
      <div className="ld-auto-form">
        <div className="ld-auto-row">
          <input className="ld-auto-input" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} disabled={active >= 0 && !done} />
          <input className="ld-auto-input" placeholder="Tu email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={active >= 0 && !done} />
        </div>
        {!done ? (
          <button className="ld-auto-run" onClick={run} disabled={!name.trim() || !email.trim() || active >= 0}>
            {active >= 0 && active < flowSteps.length ? (<><Loader2 size={16} className="ld-spin" /> Ejecutando flujo...</>) : (<><Sparkles size={16} /> Ejecutar automatización</>)}
          </button>
        ) : (
          <div className="ld-auto-actions">
            <button className="ld-auto-wa" onClick={sendWhatsapp}><MessageCircle size={16} /> Recibir por WhatsApp</button>
            <button className="ld-auto-reset" onClick={reset}>Reiniciar</button>
          </div>
        )}
      </div>

      <div className="ld-flow">
        {flowSteps.map((s, i) => {
          const Icon = s.icon;
          const state = active > i ? "done" : active === i ? "running" : "idle";
          return (
            <div key={i} className={`ld-step ld-step-${state}`}>
              <div className="ld-step-line" style={{ background: state !== "idle" ? s.color : "rgba(255,255,255,0.08)" }} />
              <div className="ld-step-icon" style={{ background: state !== "idle" ? `${s.color}22` : "rgba(255,255,255,0.04)", borderColor: state !== "idle" ? s.color : "rgba(255,255,255,0.08)", color: state !== "idle" ? s.color : "rgba(255,255,255,0.4)" }}>
                {state === "running" ? <Loader2 size={16} className="ld-spin" /> : state === "done" ? <CheckCircle2 size={16} /> : <Icon size={16} />}
              </div>
              <div className="ld-step-body">
                <div className="ld-step-title">{s.title}</div>
                <div className="ld-step-desc">{s.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */
export default function LiveDemo() {
  const [tab, setTab] = useState("bot");

  return (
    <>
      <style>{`
        .ld-section { padding: 120px 0; background: linear-gradient(180deg, #0D1117 0%, #0a0c12 100%); position: relative; overflow: hidden; }
        .ld-section::before { content: ''; position: absolute; top: -1px; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent); }
        .ld-glow { position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 700px; height: 400px; background: radial-gradient(ellipse, rgba(34,211,238,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%); pointer-events: none; filter: blur(40px); }
        .ld-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

        .ld-header { text-align: center; margin-bottom: 56px; }
        .ld-eyebrow { display: inline-flex; align-items: center; gap: 8px; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #22d3ee; margin-bottom: 16px; }
        .ld-eyebrow::before, .ld-eyebrow::after { content: ''; display: inline-block; width: 24px; height: 1px; background: rgba(34,211,238,0.4); }
        .ld-title { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #fff; margin-bottom: 16px; }
        .ld-title span { background: linear-gradient(90deg, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ld-sub { font-size: 1rem; color: rgba(255,255,255,0.55); max-width: 600px; margin: 0 auto; line-height: 1.65; }

        .ld-tabs { display: inline-flex; gap: 4px; padding: 4px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; margin: 0 auto 40px; }
        .ld-tabs-wrap { display: flex; justify-content: center; }
        .ld-tab { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px; border: none; background: transparent; color: rgba(255,255,255,0.5); font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.25s; }
        .ld-tab:hover { color: #fff; }
        .ld-tab.active { background: linear-gradient(135deg, rgba(34,211,238,0.18), rgba(139,92,246,0.18)); color: #fff; box-shadow: 0 0 0 1px rgba(34,211,238,0.25); }

        .ld-panel { max-width: 760px; margin: 0 auto; background: rgba(13,17,23,0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; overflow: hidden; backdrop-filter: blur(20px); box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(34,211,238,0.05); }

        /* ===== BOT ===== */
        .ld-bot { display: flex; flex-direction: column; height: 540px; }
        .ld-bot-header { display: flex; align-items: center; gap: 12px; padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); }
        .ld-bot-avatar { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; background: linear-gradient(135deg, #22d3ee, #a78bfa); color: #0a0c12; }
        .ld-bot-name { font-size: 0.875rem; font-weight: 600; color: #fff; }
        .ld-bot-status { font-size: 0.6875rem; color: rgba(255,255,255,0.45); display: flex; align-items: center; gap: 6px; margin-top: 2px; }
        .ld-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px #10b981; animation: ld-pulse 2s ease-in-out infinite; }
        @keyframes ld-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .ld-bot-scroll { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
        .ld-msg { display: flex; gap: 10px; max-width: 85%; }
        .ld-msg-user { align-self: flex-end; flex-direction: row-reverse; }
        .ld-msg-icon { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; flex-shrink: 0; }
        .ld-msg-bot .ld-msg-icon { background: rgba(34,211,238,0.15); color: #22d3ee; }
        .ld-msg-user .ld-msg-icon { background: rgba(139,92,246,0.15); color: #a78bfa; }
        .ld-msg-bubble { padding: 10px 14px; border-radius: 12px; font-size: 0.875rem; line-height: 1.55; color: rgba(255,255,255,0.9); }
        .ld-msg-bot .ld-msg-bubble { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.06); border-top-left-radius: 4px; }
        .ld-msg-user .ld-msg-bubble { background: linear-gradient(135deg, rgba(34,211,238,0.18), rgba(139,92,246,0.18)); border: 1px solid rgba(34,211,238,0.2); border-top-right-radius: 4px; color: #fff; }
        .ld-typing { display: inline-flex; gap: 4px; align-items: center; padding: 14px; }
        .ld-typing span { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.5); animation: ld-typ 1.2s infinite; }
        .ld-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ld-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes ld-typ { 0%,60%,100% { opacity: 0.3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }

        .ld-quick { display: flex; gap: 6px; padding: 0 20px 12px; flex-wrap: wrap; }
        .ld-quick-btn { font-size: 0.75rem; padding: 6px 10px; border-radius: 999px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); cursor: pointer; transition: all 0.2s; }
        .ld-quick-btn:hover:not(:disabled) { background: rgba(34,211,238,0.1); border-color: rgba(34,211,238,0.3); color: #22d3ee; }
        .ld-quick-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .ld-bot-form { display: flex; gap: 8px; padding: 14px 16px; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(255,255,255,0.02); }
        .ld-bot-input { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #fff; padding: 10px 14px; border-radius: 10px; font-size: 0.875rem; outline: none; transition: all 0.2s; }
        .ld-bot-input:focus { border-color: rgba(34,211,238,0.4); background: rgba(255,255,255,0.06); }
        .ld-bot-send { width: 40px; height: 40px; border-radius: 10px; border: none; background: linear-gradient(135deg, #22d3ee, #a78bfa); color: #0a0c12; cursor: pointer; display: grid; place-items: center; transition: all 0.2s; }
        .ld-bot-send:hover:not(:disabled) { transform: scale(1.05); }
        .ld-bot-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .ld-spin { animation: ld-spin 1s linear infinite; }
        @keyframes ld-spin { to { transform: rotate(360deg); } }

        /* ===== AUTOMATIZACIÓN ===== */
        .ld-auto { padding: 28px; }
        .ld-auto-form { margin-bottom: 28px; }
        .ld-auto-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
        @media (max-width: 560px) { .ld-auto-row { grid-template-columns: 1fr; } }
        .ld-auto-input { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #fff; padding: 12px 14px; border-radius: 10px; font-size: 0.875rem; outline: none; transition: all 0.2s; }
        .ld-auto-input:focus { border-color: rgba(34,211,238,0.4); background: rgba(255,255,255,0.06); }
        .ld-auto-input:disabled { opacity: 0.6; }
        .ld-auto-run, .ld-auto-wa, .ld-auto-reset { width: 100%; padding: 12px; border-radius: 10px; font-size: 0.875rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: none; transition: all 0.25s; }
        .ld-auto-run { background: linear-gradient(135deg, #22d3ee, #a78bfa); color: #0a0c12; }
        .ld-auto-run:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(34,211,238,0.3); }
        .ld-auto-run:disabled { opacity: 0.6; cursor: not-allowed; }
        .ld-auto-actions { display: grid; grid-template-columns: 2fr 1fr; gap: 10px; }
        .ld-auto-wa { background: linear-gradient(135deg, #10b981, #059669); color: #fff; }
        .ld-auto-wa:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(16,185,129,0.3); }
        .ld-auto-reset { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.08); }
        .ld-auto-reset:hover { background: rgba(255,255,255,0.08); color: #fff; }

        .ld-flow { display: flex; flex-direction: column; gap: 4px; }
        .ld-step { display: grid; grid-template-columns: 4px 36px 1fr; gap: 14px; align-items: center; padding: 10px 0; position: relative; transition: all 0.4s; }
        .ld-step-line { width: 3px; height: 100%; border-radius: 2px; transition: background 0.4s; }
        .ld-step-icon { width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; border: 1px solid; transition: all 0.4s; }
        .ld-step-title { font-size: 0.875rem; font-weight: 600; color: #fff; }
        .ld-step-desc { font-size: 0.75rem; color: rgba(255,255,255,0.5); margin-top: 2px; }
        .ld-step-idle { opacity: 0.55; }
        .ld-step-running { background: rgba(255,255,255,0.02); border-radius: 10px; padding-left: 8px; padding-right: 8px; }
        .ld-step-done { opacity: 1; }
      `}</style>

      <section className="ld-section" id="demo">
        <div className="ld-glow" />
        <div className="ld-container">
          <div className="ld-header">
            <div className="ld-eyebrow">Probalo en vivo</div>
            <h2 className="ld-title">Mirá un <span>bot</span> y una <span>automatización</span> funcionando</h2>
            <p className="ld-sub">No son maquetas: el bot responde con IA real y la automatización ejecuta un flujo paso a paso. Así trabajamos con nuestros clientes.</p>
          </div>

          <div className="ld-tabs-wrap">
            <div className="ld-tabs">
              <button className={`ld-tab ${tab === "bot" ? "active" : ""}`} onClick={() => setTab("bot")}><Bot size={16} /> Bot IA</button>
              <button className={`ld-tab ${tab === "auto" ? "active" : ""}`} onClick={() => setTab("auto")}><Workflow size={16} /> Automatización</button>
            </div>
          </div>

          <div className="ld-panel">
            {tab === "bot" ? <BotDemo /> : <AutomationDemo />}
          </div>
        </div>
      </section>
    </>
  );
}
