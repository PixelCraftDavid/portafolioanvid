"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import type { Course } from "@/lib/courses";

type Props = {
  course: Course;
  index: number;
};

export default function CourseCard({ course, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-500 flex flex-col"
    >
      {/* Icono + categoría */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
          <Award className="w-5 h-5 text-[var(--color-primary-light)]" />
        </div>
        <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--color-bg)]/50 border border-[var(--color-border)] text-[var(--color-text-muted)]">
          {course.category}
        </span>
      </div>

      {/* Título */}
      <h3 className="text-lg font-bold text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary-light)] transition-colors">
        {course.title}
      </h3>

      {/* Provider + año */}
      <p className="font-mono text-sm text-[var(--color-text-muted)] mb-3">
        {course.provider} · {course.year}
        {course.duration && ` · ${course.duration}`}
      </p>

      {/* Descripción */}
      {course.description && (
        <p className="text-sm text-[var(--color-text-muted)] mb-4 flex-1">
          {course.description}
        </p>
      )}

      {/* Credential ID */}
      {course.credentialId && (
        <p className="font-mono text-xs text-[var(--color-text-dim)] mb-4">
          ID: {course.credentialId}
        </p>
      )}

      {/* Link al certificado */}
      {course.certificateUrl && (
        <a
          href={course.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary-light)] hover:gap-3 transition-all"
        >
          Ver certificado
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.article>
  );
}