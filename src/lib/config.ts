const WHATSAPP_NUMBER = "5491168450118";

export const waIntent = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const siteConfig = {
  name: "Soluciones Tech",
  logo: "/logo-soluciones-tech.png",
  tagline: "Tecnología que impulsa tu negocio",
  description:
    "Conectamos tecnología, estrategia y automatización para convertir ideas en resultados. Un sistema propio que piensa, construye y opera tu negocio.",
  cta: "Contactanos",
  phone: "+54 9 11 6845-0118",
  whatsappLink: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: "solucionestech2025@gmail.com",
  instagram: "https://www.instagram.com/soluciones_tech.ok/",
  instagramHandle: "@soluciones_tech.ok",
  social: {
    instagram: "https://www.instagram.com/soluciones_tech.ok/",
    whatsapp: `https://wa.me/${WHATSAPP_NUMBER}`,
    email: "mailto:solucionestech2025@gmail.com",
  },
  colors: {
    primary: "#00fff1",
    background: "#0a0a0f",
    surface: "#111118",
    card: "#16161f",
  },
  stats: [
    { value: "+40%", label: "consultas capturadas por IA" },
    { value: "24/7", label: "operación automatizada" },
    { value: "5", label: "áreas integradas en un solo core" },
  ],
  heroStats: [
    { label: "+20H AHORRADAS / SEM" },
    { label: "RESPUESTA < 24H" },
    { label: "SOPORTE CONTINUO" },
  ],
  services: [
    {
      title: "Marketing Digital",
      description:
        "Campañas que hablan con datos: generamos demanda, medimos cada peso y escalamos lo que funciona.",
      icon: "Megaphone",
      metric: "+180% en oportunidades",
    },
    {
      title: "Gestión de Redes",
      description:
        "Contenido, comunidad y publicaciones con una estética que refuerza tu marca en cada canal.",
      icon: "Share2",
      metric: "3x más alcance",
    },
    {
      title: "Desarrollo Web",
      description:
        "Webs premium, rápidas y con identidad propia, construidas para convertir visitas en clientes.",
      icon: "Globe",
      metric: "+62% de conversión",
    },
    {
      title: "Integraciones",
      description:
        "Conectamos tus herramientas para que la información fluya sola entre sistemas.",
      icon: "Plug",
      metric: "5+ sistemas unificados",
    },
    {
      title: "Automatizaciones",
      description:
        "Tareas repetitivas en piloto automático: agenda, CRM, pagos y mensajes conectados.",
      icon: "Zap",
      metric: "-15 hs al mes",
    },
    {
      title: "Bots con IA",
      description:
        "Responden 24/7 por WhatsApp e Instagram: toman datos, agendan turnos y derivan al equipo humano.",
      icon: "Bot",
      metric: "90% respuestas automáticas",
    },
  ],
  bots: {
    whatsapp: {
      title: "Bot de WhatsApp",
      handle: "WhatsApp Business",
      features: [
        "Responde consultas automáticamente",
        "Informa precios y servicios",
        "Toma datos de tus clientes",
        "Agenda turnos y envía recordatorios",
        "Deriva al equipo humano cuando hace falta",
      ],
      cta: "Chatear por WhatsApp",
      ctaUrl: waIntent(
        "Hola! 👋 Vengo desde la web y quiero probar el bot de WhatsApp de Soluciones Tech."
      ),
    },
    instagram: {
      title: "Bot de Instagram con IA",
      handle: "@soluciones_tech.ok",
      features: [
        "Responde DMs automáticamente",
        "Recomienda tu servicio al instante",
        "Cierra consultas y toma los datos",
        "Avisa y deriva al equipo en vivo",
      ],
      cta: "Hablar por DM",
      ctaUrl: "https://www.instagram.com/soluciones_tech.ok/",
    },
  },
  process: [
    {
      step: 1,
      tag: "IDEA",
      title: "Brief y planificación",
      description:
        "Escuchamos tu negocio, definimos objetivos y mapeamos el sistema que lo va a resolver.",
    },
    {
      step: 2,
      tag: "SISTEMA",
      title: "Diseño y desarrollo",
      description:
        "Construimos el producto: diseño, código, integraciones y automatizaciones en un mismo sistema.",
    },
    {
      step: 3,
      tag: "RESULTADO",
      title: "Lanzamiento y optimización",
      description:
        "Publicamos, medimos y mejoramos con datos reales. El resultado se convierte en crecimiento.",
    },
  ],
  portfolio: [
    {
      title: "Web a medida, lista para vender",
      category: "Desarrollo Web",
      industry: "Clínica · Web + Consultas",
      metric: "+45% turnos reservados por web",
      description:
        "Rediseñamos el sitio de una clínica: carga veloz, pedidos de turno directo desde la página y una estética que transmite confianza.",
    },
    {
      title: "Respuestas 24/7 en WhatsApp",
      category: "Bot de WhatsApp con IA",
      industry: "Laboratorio",
      metric: "90% de consultas respondidas automáticamente",
      description:
        "Un laboratorio dejó de perder consultas fuera de horario. El bot responde, toma los datos y agenda el turno solo.",
    },
    {
      title: "Reservas y mesas en piloto automático",
      category: "Automatización",
      industry: "Restaurante",
      metric: "-90% tareas manuales en reservas",
      description:
        "Un restaurante conectó WhatsApp, agenda y base de datos: el flujo entero se dispara con un solo mensaje del cliente.",
    },
  ],
  testimonials: [
    {
      name: "Dueño",
      role: "Cafetería de especialidad · CABA",
      text: "Nos triplicamos en consultas por mes en 90 días. El bot contesta a cualquier hora y la web transmite exactamente lo que somos.",
    },
    {
      name: "Fundador",
      role: "Marca de indumentaria",
      text: "Pasamos de planillas en Excel a un sistema que integra pedidos, pagos y stock. Hoy vemos números que antes no teníamos.",
    },
    {
      name: "Directora",
      role: "Estudio de diseño · Córdoba",
      text: "El proceso fue clarísimo: en tres etapas pasamos de la idea a una web con automatizaciones andando. La fábrica completa.",
    },
  ],
  tech: [
    "Next.js",
    "React",
    "Node.js",
    "Tailwind CSS",
    "TypeScript",
    "PostgreSQL",
    "OpenAI / Llama",
    "WhatsApp Biz API",
    "Google / Meta Ads",
    "Make",
    "n8n",
    "Vercel",
  ],
};