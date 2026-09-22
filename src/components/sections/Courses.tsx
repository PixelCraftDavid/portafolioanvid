"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Award, ExternalLink } from "lucide-react";
import { courses } from "@/lib/courses";

export default function Courses() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = courses.length;

  const goPrev = () => {
    setActiveIndex((i) => (i - 1 + total) % total);
  };

  const goNext = () => {
    setActiveIndex((i) => (i + 1) % total);
  };

  // Autoplay
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, total]);

  // Navegación con teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  // Calcular offset de cada card respecto al activo
  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    // Wrap-around para carrusel infinito
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section
      id="cursos"
      className="relative py-32 border-t border-[var(--color-border)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Columna izquierda: título + info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-4">
              03 — CURSOS
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Formación
              <br />
              <span className="text-[var(--color-primary-light)]">
                continua
              </span>
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8 max-w-md mx-auto lg:mx-0">
              Certificaciones y cursos que he completado para mantenerme al día
              con las tecnologías que uso a diario.
            </p>

            {/* Contador y navegación */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  aria-label="Anterior"
                  onMouseEnter={() => setAutoPlay(false)}
                  onMouseLeave={() => setAutoPlay(true)}
                  className="p-3 rounded-full border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:shadow-[var(--shadow-glow)] transition-all cursor-pointer"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Siguiente"
                  onMouseEnter={() => setAutoPlay(false)}
                  onMouseLeave={() => setAutoPlay(true)}
                  className="p-3 rounded-full border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:shadow-[var(--shadow-glow)] transition-all cursor-pointer"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              <span className="font-mono text-sm text-[var(--color-text-dim)]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Dots verticales (opcional) */}
            <div className="hidden lg:flex flex-col gap-2 mt-8">
              {courses.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Ir al curso ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === i
                      ? "w-10 bg-[var(--color-primary)]"
                      : "w-4 bg-[var(--color-text-dim)] hover:bg-[var(--color-text-muted)]"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Columna derecha: carrusel vertical */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative h-[500px] md:h-[550px] flex items-center justify-center"
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            ref={containerRef}
          >
            {/* Card del curso activo */}
            <div className="relative w-full max-w-md" style={{ perspective: "1200px" }}>
              {courses.map((course, index) => {
                const offset = getOffset(index);
                const isActive = offset === 0;
                const absOffset = Math.abs(offset);

                // Solo mostramos las cards cercanas
                if (absOffset > 2) return null;

                return (
                  <motion.div
                    key={`${course.title}-${course.year}`}
                    animate={{
                      y: offset * 200,
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.35 - absOffset * 0.1,
                      filter: isActive ? "blur(0px)" : `blur(${4 + absOffset * 2}px)`,
                      zIndex: 10 - absOffset,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 24,
                    }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => !isActive && setActiveIndex(index)}
                  >
                    <CourseCard course={course} isActive={isActive} />
                  </motion.div>
                );
              })}
            </div>

            {/* Gradientes de fade arriba y abajo */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-bg)] to-transparent z-20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Card individual del curso
function CourseCard({
  course,
  isActive,
}: {
  course: (typeof courses)[number];
  isActive: boolean;
}) {
  return (
    <div
      className={`p-6 md:p-8 rounded-2xl border backdrop-blur-md transition-colors ${
        isActive
          ? "border-[var(--color-primary)] bg-[var(--color-surface)]/70 shadow-[var(--shadow-glow)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)]/40"
      }`}
    >
      {/* Categoría + Icono */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
          <Award className="w-5 h-5 text-[var(--color-primary-light)]" />
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--color-bg)]/50 border border-[var(--color-border)] text-[var(--color-text-muted)]">
          {course.category}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-lg md:text-xl font-bold text-[var(--color-text)] mb-2">
        {course.title}
      </h3>

      {/* Provider + año + duración */}
      <p className="font-mono text-sm text-[var(--color-text-muted)] mb-3">
        {course.provider} · {course.year}
        {course.duration && ` · ${course.duration}`}
      </p>

      {/* Descripción */}
      {course.description && (
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          {course.description}
        </p>
      )}

      {/* Link al certificado */}
      {course.certificateUrl && (
        <a
          href={course.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary-light)] hover:gap-3 transition-all"
        >
          Ver certificado
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}