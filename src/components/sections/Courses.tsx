"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { courses } from "@/lib/courses";
import CourseCard from "./CourseCard";

export default function Courses() {
  const [filter, setFilter] = useState<string>("Todos");

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => set.add(c.category));
    return ["Todos", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    if (filter === "Todos") return courses;
    return courses.filter((c) => c.category === filter);
  }, [filter]);

  return (
    <section
      id="cursos"
      className="min-h-screen px-6 py-24 border-t border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-4">
            03 — CURSOS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Formación continua
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Certificaciones y cursos que he completado para mantenerme al día con las
            tecnologías que uso.
          </p>
        </motion.div>

        {/* Filtros */}
        {allCategories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-[var(--shadow-glow)]"
                    : "bg-transparent border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <CourseCard
              key={`${course.title}-${course.year}`}
              course={course}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}