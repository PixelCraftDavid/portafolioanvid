"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  isActive: boolean;
  offset: number;
  onClick: () => void;
};

export default function ProjectCard3D({
  project,
  isActive,
  offset,
  onClick,
}: Props) {
  // Limitar el offset para que no se vaya muy lejos
  const limitedOffset = Math.max(-3, Math.min(3, offset));

  // Rotación en Y según la posición
  const rotateY = limitedOffset * -25;
  // Desplazamiento horizontal para dar sensación de profundidad
  const translateX = limitedOffset * 8;
  // Escala: activo al 100%, laterales al 85%
  const scale = isActive ? 1 : 0.85;
  // Opacidad: activo al 100%, laterales atenuados
  const opacity = isActive ? 1 : 0.55;
  // Blur: solo los laterales
  const blur = isActive ? 0 : 3;
  // Z para que el activo quede adelante
  const zIndex = isActive ? 10 : 10 - Math.abs(limitedOffset);

  return (
    <motion.article
      onClick={onClick}
      animate={{
        rotateY,
        x: `${translateX}%`,
        scale,
        opacity,
        filter: `blur(${blur}px)`,
        zIndex,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 30, mass: 0.8 }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      className={`group relative rounded-2xl overflow-hidden border bg-[var(--color-surface)]/60 backdrop-blur-md transition-colors cursor-pointer ${
        isActive
          ? "border-[var(--color-primary)] shadow-[var(--shadow-glow)]"
          : "border-[var(--color-border)]"
      }`}
    >
      {/* Imagen */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 85vw, 50vw"
          className="object-cover"
          priority={isActive}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-80" />

        {/* Año */}
        <span className="absolute top-4 right-4 font-mono text-xs px-3 py-1 rounded-full bg-[var(--color-bg)]/80 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-text-muted)]">
          {project.year}
        </span>
      </div>

      {/* Contenido */}
      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
            {project.title}
          </h3>
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="GitHub"
                className="p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-bg)]/50 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Demo"
                className="p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-bg)]/50 transition-all"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary-light)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/proyectos/${project.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-light)] hover:gap-2 transition-all"
        >
          Ver caso de estudio
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}