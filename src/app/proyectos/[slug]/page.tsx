import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, AlertCircle, Lightbulb, Target, Zap } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { projects } from "@/lib/projects";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: `${project.title} — Angel David Santos`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Volver */}
          <Link
            href="/#proyectos"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a proyectos
          </Link>

          {/* Header del proyecto */}
          <header className="mb-12">
            <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-3">
              {project.year} · {project.tags.slice(0, 3).join(" · ")}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-[var(--color-text-muted)] mb-6">
              {project.description}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-light)] text-sm transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  Ver código
                </a>
              )}
              {project.demo && project.demo !== "#" && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white text-sm font-medium transition-all hover:shadow-[var(--shadow-glow)]"
                >
                  Ver demo
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </header>

          {/* Imagen principal */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--color-border)] mb-16">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* El problema */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">El problema</h2>
            </div>
            <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
              {project.problem}
            </p>
          </section>

          {/* La solución */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                <Lightbulb className="w-5 h-5 text-[var(--color-primary-light)]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">La solución</h2>
            </div>
            <p className="text-[var(--color-text-muted)] leading-relaxed text-lg">
              {project.solution}
            </p>
          </section>

          {/* Stack técnico */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                <Target className="w-5 h-5 text-[var(--color-primary-light)]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Stack técnico</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.stack.map((group) => (
                <div
                  key={group.category}
                  className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm"
                >
                  <h3 className="font-mono text-xs text-[var(--color-primary-light)] tracking-widest mb-3 uppercase">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="font-mono text-xs px-2.5 py-1 rounded-md bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-text)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Retos técnicos */}
          {project.challenges.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  Retos técnicos
                </h2>
              </div>
              <div className="space-y-4">
                {project.challenges.map((challenge, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 backdrop-blur-sm hover:border-[var(--color-primary)]/40 transition-colors"
                  >
                    <h3 className="font-bold text-lg mb-2 flex items-start gap-3">
                      <span className="text-[var(--color-primary-light)] font-mono text-sm mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {challenge.title}
                    </h3>
                    <p className="text-[var(--color-text-muted)] leading-relaxed pl-9">
                      {challenge.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Resultados */}
          {project.results.length > 0 && (
            <section className="mb-16">
              <div className="p-8 rounded-2xl border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Resultados
                </h2>
                <ul className="space-y-3">
                  {project.results.map((result, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[var(--color-text)] text-lg"
                    >
                      <span className="text-[var(--color-primary-light)] mt-1 text-xl">
                        ▹
                      </span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* CTA final */}
          <div className="mt-20 pt-12 border-t border-[var(--color-border)] text-center">
            <p className="text-[var(--color-text-muted)] mb-4">
              ¿Te interesa este tipo de trabajo?
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-medium transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Hablemos
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}