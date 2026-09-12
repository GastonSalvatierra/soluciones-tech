import Image from "next/image";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/shared/icons";
import { siteConfig } from "@/lib/config";

const footerLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Bots", href: "#bots" },
  { label: "Proceso", href: "#proceso" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

const socialIcons = [
  {
    label: "Instagram",
    href: siteConfig.instagram,
    icon: InstagramIcon,
    hover: "hover:border-fuchsia-400/40 hover:text-fuchsia-300",
  },
  {
    label: "WhatsApp",
    href: siteConfig.whatsappLink,
    icon: MessageCircle,
    hover: "hover:border-emerald-400/40 hover:text-emerald-300",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    hover: "hover:border-accent/40 hover:text-accent",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2 md:pr-10">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="text-base font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="max-w-sm text-sm font-medium text-accent-gradient">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ label, href, icon: Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-card text-muted transition-all duration-300 ${hover}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
              Navegación
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {siteConfig.services.map((service) => (
                <li key={service.title}>
                  <a
                    href={service.icon === "Bot" ? "#bots" : "#servicios"}
                    className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    {service.title}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contacto rápido */}
        <div className="mt-10 flex flex-col flex-wrap gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-fuchsia-300"
          >
            <InstagramIcon className="h-4 w-4" />
            {siteConfig.instagramHandle}
          </a>
          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-emerald-300"
          >
            <MessageCircle className="h-4 w-4" />
            {siteConfig.phone} · WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            {siteConfig.email}
          </a>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los
            derechos reservados.
          </p>
          <p className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase">
            Software, Engineered.
          </p>
        </div>
      </div>
    </footer>
  );
}