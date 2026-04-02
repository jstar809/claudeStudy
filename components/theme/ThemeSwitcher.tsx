"use client";

import { useTheme, type Theme } from "./ThemeProvider";

const themes: { value: Theme; label: string }[] = [
  { value: "default",    label: "기본" },
  { value: "minimal",    label: "미니멀" },
  { value: "neon",       label: "네온" },
  { value: "retro",      label: "레트로" },
  { value: "cyberpunk",  label: "사이버펑크" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="hidden md:flex items-center gap-1 border border-border rounded-lg px-1 py-1">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
            theme === t.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
