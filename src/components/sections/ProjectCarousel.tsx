"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/lib/projects";
import ProjectCard3D from "./ProjectCard3D";

export default function ProjectCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
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
      {/* Carrusel */}
      <div
        ref={emblaRef}
        className="overflow-hidden"
        style={{ perspective: "1500px" }}
      >
        <div className="flex touch-pan-y">
          {projects.map((project, index) => {
            const offset = index - selectedIndex;
            return (
              <div
                key={project.slug}
                className="flex-[0_0_90%] sm:flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_55%] min-w-0 px-2 md:px-6"
              >
                <ProjectCard3D
                  project={project}
                  isActive={index === selectedIndex}
                  offset={offset}
                  onClick={() => scrollTo(index)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Flechas */}
      <button
        onClick={scrollPrev}
        aria-label="Anterior"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:shadow-[var(--shadow-glow)] transition-all cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Siguiente"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] hover:shadow-[var(--shadow-glow)] transition-all cursor-pointer"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
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
    </div>
  );
}