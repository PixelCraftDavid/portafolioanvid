"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

// Endpoint viene de .env.local (no commit)
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contacto"
      className="min-h-screen px-6 py-24 border-t border-[var(--color-border)]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-4">
            04 — CONTACTO
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hablemos de tu proyecto
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
            ¿Tienes una idea, una oportunidad o simplemente quieres saludar?
            Escríbeme y te responderé lo antes posible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          {/* Info izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                  <Mail className="w-4 h-4 text-[var(--color-primary-light)]" />
                </div>
                <h3 className="font-semibold">Email</h3>
              </div>
              <a
                href="mailto:angeld10293@gmail.com"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors break-all"
              >
                angeld10293@gmail.com
              </a>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                  <MapPin className="w-4 h-4 text-[var(--color-primary-light)]" />
                </div>
                <h3 className="font-semibold">Ubicación</h3>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Acapulco, Guerrero · México
              </p>
            </div>

            {/* Redes */}
            <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm">
              <h3 className="font-semibold mb-4">Redes</h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/PixelCraftDavid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/angel-david-santos-pacheco-21a43a375"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:angeld10293@gmail.com"
                  aria-label="Email"
                  className="p-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Formulario derecha */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs text-[var(--color-text-muted)] mb-2 tracking-widest"
              >
                NOMBRE
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/50 text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[var(--shadow-glow)] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs text-[var(--color-text-muted)] mb-2 tracking-widest"
              >
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/50 text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[var(--shadow-glow)] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs text-[var(--color-text-muted)] mb-2 tracking-widest"
              >
                MENSAJE
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Cuéntame sobre tu proyecto..."
                className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/50 text-[var(--color-text)] placeholder:text-[var(--color-text-dim)] focus:border-[var(--color-primary)] focus:outline-none focus:shadow-[var(--shadow-glow)] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-medium transition-all hover:shadow-[var(--shadow-glow)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "loading" && "Enviando..."}
              {status === "success" && (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  ¡Mensaje enviado!
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  Error, intenta de nuevo
                </>
              )}
              {status === "idle" && (
                <>
                  Enviar mensaje
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}