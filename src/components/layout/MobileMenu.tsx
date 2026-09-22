"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  activeSection: string;
};

export default function MobileMenu({
  isOpen,
  onClose,
  links,
  activeSection,
}: Props) {
  const { theme, toggleTheme } = useTheme();

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[80%] max-w-sm bg-[var(--color-bg-soft)] border-l border-[var(--color-border)] md:hidden flex flex-col"
          >
            {/* Header del menú */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
              <span className="font-mono text-sm text-[var(--color-text-muted)]">
                NAVEGACIÓN
              </span>
              <button
                onClick={onClose}
                aria-label="Cerrar menú"
                className="p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col gap-2 p-6">
              {links.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className={`px-4 py-4 rounded-lg text-lg font-medium transition-all ${
                      isActive
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-light)] border border-[var(--color-primary)]/30"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* Footer del menú */}
            <div className="p-6 border-t border-[var(--color-border)] space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                {theme === "dark" ? "☀️ Modo claro" : "🌙 Modo oscuro"}
              </button>
              <a
                href="#contacto"
                onClick={onClose}
                className="w-full px-4 py-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-medium transition-all flex items-center justify-center hover:shadow-[var(--shadow-glow)]"
              >
                Hablemos
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}