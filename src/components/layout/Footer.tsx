const SOCIALS = [
  { label: "GitHub", href: "https://github.com/PixelCraftDavid" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/angel-david-santos-pacheco-21a43a375",
  },
  { label: "Email", href: "mailto:angeld10293@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-32">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-[var(--color-text-dim)] font-mono">
          © {new Date().getFullYear()} Angel David Santos Pacheco
        </p>

        <ul className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-light)] transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}