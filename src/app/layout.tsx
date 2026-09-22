import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angel David Santos — Software Engineer",
  description:
    "Ingeniero en Desarrollo y Gestión de Software. Construyo experiencias digitales inmersivas con React, Three.js y tecnologías web modernas.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Three.js",
    "React",
    "Next.js",
    "Flutter",
    "Angel David Santos",
    "PixelCraftDavid",
  ],
  authors: [{ name: "Angel David Santos Pacheco" }],
  creator: "Angel David Santos Pacheco",
  openGraph: {
    title: "Angel David Santos — Software Engineer",
    description:
      "Transformando ideas en soluciones digitales con tecnologías web modernas.",
    type: "website",
    locale: "es_MX",
    siteName: "Angel David Santos",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel David Santos — Software Engineer",
    description:
      "Transformando ideas en soluciones digitales con tecnologías web modernas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}