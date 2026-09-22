"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export default function SplitText({ text, className = "", as = "h2" }: Props) {
  const containerRef = useRef<HTMLElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = lettersRef.current.filter(Boolean);
    if (letters.length === 0) return;

    // Respetar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1) Estado INICIAL: posiciones aleatorias + glow + opacidad baja
      letters.forEach((letter, i) => {
        const randomX = (Math.random() - 0.5) * 120; // -60 a 60 px
        const randomY = (Math.random() - 0.5) * 60;  // -30 a 30 px
        const randomRotate = (Math.random() - 0.5) * 45; // -22 a 22 deg
        const randomScale = 0.6 + Math.random() * 0.4;   // 0.6 a 1.0

        gsap.set(letter, {
          display: "inline-block",
          willChange: "transform, opacity, filter",
          x: randomX,
          y: randomY,
          rotate: randomRotate,
          scale: randomScale,
          opacity: 0.3,
          filter: "blur(4px)",
          textShadow:
            "0 0 20px var(--color-primary-light), 0 0 40px var(--color-primary)",
        });
      });

      // 2) Animación controlada por scroll (scrub)
      gsap.to(letters, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        textShadow: "0 0 0px transparent",
        stagger: {
          each: 0.06,
          from: "center",
        },
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "top 35%",
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  const Tag = as as any;

  return (
    <Tag ref={containerRef} className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) lettersRef.current[i] = el;
          }}
          aria-hidden="true"
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}