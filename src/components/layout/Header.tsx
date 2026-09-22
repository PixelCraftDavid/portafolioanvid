"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-primary)] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="hidden md:inline-flex px-4 py-2 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-medium transition-all hover:shadow-[var(--shadow-glow)]"
        >
          Hablemos
        </a>
      </nav>
    </header>
  );
}