"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { projects } from "@/lib/projects";

export default function ProjectShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Navegación por teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollPrev, scrollNext]);

  return (
    <div className="relative">
      {/* Carrusel — con overflow visible en el contenedor padre */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y items-center">
          {projects.map((project, index) => {
            const isActive = index === selectedIndex;
            return (
              <div
                key={project.slug}
                className="flex-[0_0_88%] md:flex-[0_0_75%] lg:flex-[0_0_68%] min-w-0 px-3 md:px-4"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.88,
                    opacity: isActive ? 1 : 0.35,
                    filter: isActive ? "blur(0px)" : "blur(8px)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 22,
                  }}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl"
                >
                  {/* Imagen de fondo */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 75vw"
                    className="object-cover"
                    priority={isActive}
                  />

                  {/* Overlay gradiente para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="max-w-3xl">
                      {/* Año + tags */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90">
                          {project.year}
                        </span>
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Título */}
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                        {project.title}
                      </h3>

                      {/* Descripción */}
                      <p className="text-sm md:text-base text-white/80 mb-6 max-w-2xl line-clamp-2">
                        {project.description}
                      </p>

                      {/* Botones */}
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/proyectos/${project.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-all"
                        >
                          Ver caso de estudio
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 bg-white/5 backdrop-blur-md text-white text-sm font-medium hover:bg-white/10 transition-all"
                          >
                            <GithubIcon className="w-4 h-4" />
                            Código
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navegación inferior */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={scrollPrev}
          aria-label="Anterior"
          className="p-2 rounded-full border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === i
                  ? "w-8 h-2 bg-[var(--color-primary)]"
                  : "w-2 h-2 bg-[var(--color-text-dim)] hover:bg-[var(--color-text-muted)]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Siguiente"
          className="p-2 rounded-full border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] transition-all cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Contador */}
      <div className="flex justify-center mt-4">
        <span className="font-mono text-xs text-[var(--color-text-dim)]">
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}