"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LOGO = "/logo-soluciones-tech.png";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Tecnologías", href: "#tecnologias" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
  { label: "Demo", href: "#demo" },

];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["inicio", "servicios", "tecnologias", "nosotros", "contacto"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-root { position: fixed; top: 0; width: 100%; z-index: 100; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .nav-root.scrolled { padding: 0; }
        .nav-inner {
          margin: 12px 16px 0;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(10, 12, 18, 0.7);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4);
        }
        .nav-root.scrolled .nav-inner {
          margin: 0; border-radius: 0;
          border-left: none; border-right: none; border-top: none;
          background: rgba(8, 10, 16, 0.92);
        }
        .nav-content { display: flex; align-items: center; justify-content: space-between; height: 60px; padding: 0 24px; max-width: 1280px; margin: 0 auto; }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-logo img { height: 28px; width: auto; }
        .nav-logo-text { font-size: 0.875rem; font-weight: 600; color: #fff; letter-spacing: -0.01em; }

        .nav-links { display: none; align-items: center; gap: 2px; }
        @media (min-width: 768px) { .nav-links { display: flex; } }
        .nav-link {
          position: relative; padding: 6px 14px;
          font-size: 0.8125rem; font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none; border-radius: 8px;
          transition: color 0.2s; letter-spacing: 0.01em;
        }
        .nav-link:hover { color: rgba(255,255,255,0.95); }
        .nav-link.active { color: #fff; background: rgba(255,255,255,0.06); }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 4px; left: 50%;
          transform: translateX(-50%); width: 16px; height: 2px;
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
          border-radius: 99px;
        }

        .nav-cta {
          display: none; align-items: center; gap: 8px;
          padding: 7px 18px; border-radius: 10px;
          background: linear-gradient(135deg, #0891b2, #2563eb);
          color: #fff; font-size: 0.8125rem; font-weight: 600;
          text-decoration: none; letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.2s;
          box-shadow: 0 0 20px rgba(6,182,212,0.3);
        }
        .nav-cta:hover { opacity: 0.95; transform: translateY(-1px); }
        @media (min-width: 768px) { .nav-cta { display: flex; } }

        .nav-hamburger { display: flex; flex-direction: column; gap: 4px; padding: 8px; cursor: pointer; background: none; border: none; }
        @media (min-width: 768px) { .nav-hamburger { display: none; } }
        .bar { width: 20px; height: 1.5px; background: rgba(255,255,255,0.75); border-radius: 99px; transition: all 0.3s; transform-origin: center; }
        .nav-hamburger.open .bar:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .nav-hamburger.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-hamburger.open .bar:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        .mobile-menu { display: block; overflow: hidden; max-height: 0; transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
        .mobile-menu.open { max-height: 340px; }
        .mobile-menu-inner { padding: 12px 24px 20px; display: flex; flex-direction: column; gap: 2px; border-top: 1px solid rgba(255,255,255,0.06); }
        .mobile-link { padding: 10px 12px; font-size: 0.875rem; font-weight: 500; color: rgba(255,255,255,0.65); text-decoration: none; border-radius: 8px; transition: all 0.2s; }
        .mobile-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .mobile-cta { margin-top: 8px; padding: 11px 16px; border-radius: 10px; background: linear-gradient(135deg, #0891b2, #2563eb); color: #fff; font-size: 0.875rem; font-weight: 600; text-align: center; text-decoration: none; box-shadow: 0 0 20px rgba(6,182,212,0.25); }
      `}</style>

      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-content">
            <Link href="#inicio" className="nav-logo">
              <img src={LOGO} alt="Soluciones Tech OK" />
              <span className="nav-logo-text">Soluciones Tech OK</span>
            </Link>

            <div className="nav-links">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link${activeSection === item.href.slice(1) ? " active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a href="#contacto" className="nav-cta">Contactanos</a>

            <button
              className={`nav-hamburger${isOpen ? " open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span className="bar" /><span className="bar" /><span className="bar" />
            </button>
          </div>

          <div className={`mobile-menu${isOpen ? " open" : ""}`}>
            <div className="mobile-menu-inner">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="mobile-link" onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              ))}
              <a href="#contacto" className="mobile-cta" onClick={() => setIsOpen(false)}>Contactanos</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}