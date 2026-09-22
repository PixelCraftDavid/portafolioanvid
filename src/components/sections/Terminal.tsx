"use client";

import { useEffect, useRef, useState } from "react";

type Line = { type: "input" | "output"; text: string };

const COMMANDS: Record<string, string | (() => string)> = {
  help: "Comandos disponibles: whoami, skills, projects, education, contact, clear",
  whoami: "Angel David Santos Pacheco — Ingeniero en Desarrollo y Gestión de Software",
  skills:
    "Frontend: HTML, CSS, JS, React, Tailwind, Bootstrap, Astro\nBackend: Node, PHP, Python, Java\nDatos: MySQL, MariaDB, MongoDB, Cassandra, Oracle\nMóvil: Flutter, Dart\nDevOps: Git, GitHub, Netlify, Heroku",
  projects: "Ve a la sección 'Proyectos' ↓ o escribe 'contact' para hablar conmigo.",
  education: "Ingeniería en Desarrollo y Gestión de Software",
  contact:
    "📧 angeld10293@gmail.com\n🔗 github.com/PixelCraftDavid\n💼 linkedin.com/in/angel-david-santos-pacheco-21a43a375",
  clear: "__CLEAR__",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Bienvenido a mi portafolio 👋" },
    { type: "output", text: "Escribe 'help' para ver los comandos disponibles." },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newLines: Line[] = [
      ...lines,
      { type: "input", text: trimmed },
    ];

    if (trimmed === "clear") {
      setLines([]);
      setHistory((h) => [trimmed, ...h]);
      setHistoryIndex(-1);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const output = typeof handler === "function" ? handler() : handler;
      newLines.push({ type: "output", text: output });
    } else {
      newLines.push({
        type: "output",
        text: `command not found: ${trimmed}. Escribe 'help'.`,
      });
    }
    newLines.push({ type: "output", text: "" });

    setLines(newLines);
    setHistory((h) => [trimmed, ...h]);
    setHistoryIndex(-1);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      if (history[next]) {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]/70 backdrop-blur-md shadow-2xl cursor-text"
    >
      {/* Barra superior tipo macOS */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg)]/50">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-3 font-mono text-xs text-[var(--color-text-dim)]">
          angeld@portafolio:~
        </span>
      </div>

      {/* Contenido */}
      <div
        ref={scrollRef}
        className="p-6 font-mono text-sm max-h-[400px] overflow-y-auto"
      >
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line.type === "input" ? (
              <>
                <span className="text-[var(--color-primary-light)]">$ </span>
                <span className="text-[var(--color-text)]">{line.text}</span>
              </>
            ) : (
              <span className="text-[var(--color-text-muted)]">{line.text}</span>
            )}
          </div>
        ))}

        {/* Input */}
        <div className="flex items-center">
          <span className="text-[var(--color-primary-light)]">$&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            className="flex-1 bg-transparent outline-none text-[var(--color-text)] caret-[var(--color-primary-light)]"
          />
        </div>
      </div>
    </div>
  );
}