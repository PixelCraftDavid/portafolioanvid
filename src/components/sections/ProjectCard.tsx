"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:border-[var(--color-primary)] transition-all duration-500 hover:shadow-[var(--shadow-glow)] ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Imagen */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
        <span className="absolute top-4 right-4 font-mono text-xs px-3 py-1 rounded-full bg-[var(--color-bg)]/80 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-text-muted)]">
          {project.year}
        </span>
      </div>

      {/* Contenido */}
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary-light)] transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-bg)]/50 transition-all"
                aria-label="GitHub"
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
                className="p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] hover:bg-[var(--color-bg)]/50 transition-all"
                aria-label="Demo"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
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
          className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary-light)] hover:gap-2 transition-all"
        >
          Ver caso de estudio
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.article>
  );
}