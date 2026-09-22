"use client";

import { motion } from "framer-motion";
import ProjectCarousel from "./ProjectCarousel";

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="min-h-screen flex flex-col justify-center px-6 py-24 border-t border-[var(--color-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-4">
            02 — PROYECTOS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cosas que he construido
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Desliza para explorar. Click en una card para centrarla.
          </p>
        </motion.div>

        <ProjectCarousel />
      </div>
    </section>
  );
}