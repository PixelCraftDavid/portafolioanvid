import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero3D from "@/components/three/Hero3D";
import Terminal from "@/components/sections/Terminal";
import Projects from "@/components/sections/Projects";
import Courses from "@/components/sections/Courses";
import Contact from "@/components/sections/Contact";
import SplitText from "@/components/ui/SplitText";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-24">
        {/* HERO */}
        <section
          id="inicio"
          className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        >
          <Hero3D />
          <div className="relative z-10 text-center max-w-4xl pointer-events-none">
            <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-4">
              SOFTWARE ENGINEER
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              Angel David Santos Pacheco
            </h1>
            <p className="text-base sm:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto px-4">
              Transformo ideas en experiencias digitales inmersivas con React, Three.js y tecnologías web modernas.
            </p>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section
  id="sobre-mi"
  className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
>
  {/* Fondo glassmorphism */}
  <div className="absolute inset-0 -z-10">
    {/* Capa de color base */}
    <div className="absolute inset-0 bg-[var(--color-bg)]/60" />
    {/* Capa de blur (cristal) */}
    <div className="absolute inset-0 backdrop-blur-2xl" />
    {/* Gradiente sutil para dar profundidad */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-bg)]/20 to-transparent" />
    {/* Borde superior luminoso */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />
  </div>

          <div className="max-w-4xl w-full text-center mb-12">
            <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-4">
              01 — SOBRE MÍ
            </p>

            <SplitText
              text="Un poco sobre mí"
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-4"
            />
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              Soy ingeniero en desarrollo y gestión de software. Me apasiona construir
              productos digitales que se sientan bien: rápidos, accesibles y con
              detalles que sorprendan.
            </p>
          </div>
          <Terminal />
        </section>

        {/* PROYECTOS */}
        <Projects />

        {/* CURSOS */}
        <Courses />

         {/* CONTACTO */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}