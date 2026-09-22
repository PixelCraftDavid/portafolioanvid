"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import MobileMenu from "./MobileMenu";
import { useActiveSection } from "@/hooks/useActiveSection";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#cursos", label: "Cursos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(
    NAV_LINKS.map((l) => l.href.replace("#", ""))
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-bg)]/80 backdrop-blur-md border-b border-[var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#inicio"
            className="font-mono text-lg font-bold text-[var(--color-text)] hover:text-[var(--color-primary-light)] transition-colors"
          >
            <span className="text-[var(--color-primary)]">&lt;/&gt;</span> Angel David
          </a>

          {/* Nav desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors relative group ${
                      isActive
                        ? "text-[var(--color-primary-light)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[var(--color-primary)] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contacto"
              className="hidden md:inline-flex px-4 py-2 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-medium transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Hablemos
            </a>
            {/* Botón hamburguesa (solo móvil) */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="md:hidden p-2 rounded-md border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Menú móvil */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        activeSection={activeSection}
      />
    </>
  );
}