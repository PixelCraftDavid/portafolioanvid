import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
          <Link
            href="/#proyectos"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a proyectos
          </Link>

          <div className="mb-8">
            <p className="font-mono text-sm text-[var(--color-primary-light)] tracking-widest mb-3">
              {project.year} · {project.tags.join(" · ")}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-[var(--color-text-muted)]">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
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

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--color-border)] mb-12">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Sobre el proyecto</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {project.highlights.length > 0 && (
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 p-8">
              <h2 className="text-xl font-bold mb-6">Lo más destacado</h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[var(--color-text-muted)]"
                  >
                    <span className="text-[var(--color-primary-light)] mt-1">
                      ▹
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}