import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero3D from "@/components/three/Hero3D";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-24">
        {/* HERO placeholder */}
        <section
  id="inicio"
  className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
>
  {/* Canvas 3D de fondo */}
  <Hero3D />

  {/* Overlay con texto */}
  <div className="relative z-10 text-center max-w-4xl pointer-events-none">
    <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-4">
      SOFTWARE ENGINEER
    </p>
    <h1 className="text-5xl md:text-7xl font-bold mb-6">
      Angel David Santos
    </h1>
    <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
      Transformo ideas en experiencias digitales inmersivas con React, Three.js y tecnologías web modernas.
    </p>
  </div>
</section>

        {/* PROYECTOS placeholder */}
        <section
          id="proyectos"
          className="min-h-screen flex items-center justify-center px-6 border-t border-[var(--color-border)]"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Proyectos</h2>
            <p className="text-[var(--color-text-muted)]">Próximamente...</p>
          </div>
        </section>

        {/* SOBRE MÍ placeholder */}
        <section
          id="sobre-mi"
          className="min-h-screen flex items-center justify-center px-6 border-t border-[var(--color-border)]"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Sobre mí</h2>
            <p className="text-[var(--color-text-muted)]">Próximamente...</p>
          </div>
        </section>

        {/* CONTACTO placeholder */}
        <section
          id="contacto"
          className="min-h-screen flex items-center justify-center px-6 border-t border-[var(--color-border)]"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Contacto</h2>
            <p className="text-[var(--color-text-muted)]">Próximamente...</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}