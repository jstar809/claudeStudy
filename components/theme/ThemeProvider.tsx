"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "default" | "minimal" | "neon" | "retro" | "cyberpunk";

const themeVars: Record<Theme, Record<string, string>> = {
  default: {},
  minimal: {
    "--background": "oklch(1 0 0)",
    "--foreground": "oklch(0.13 0 0)",
    "--card": "oklch(0.99 0 0)",
    "--card-foreground": "oklch(0.13 0 0)",
    "--popover": "oklch(1 0 0)",
    "--popover-foreground": "oklch(0.13 0 0)",
    "--primary": "oklch(0.13 0 0)",
    "--primary-foreground": "oklch(1 0 0)",
    "--secondary": "oklch(0.97 0 0)",
    "--secondary-foreground": "oklch(0.2 0 0)",
    "--muted": "oklch(0.97 0 0)",
    "--muted-foreground": "oklch(0.5 0 0)",
    "--accent": "oklch(0.95 0 0)",
    "--accent-foreground": "oklch(0.2 0 0)",
    "--border": "oklch(0.88 0 0)",
    "--input": "oklch(0.88 0 0)",
    "--ring": "oklch(0.4 0 0)",
    "--radius": "0.2rem",
  },
  neon: {
    "--background": "#0a0a0a",
    "--foreground": "#e0e0e0",
    "--card": "#111111",
    "--card-foreground": "#e0e0e0",
    "--popover": "#111111",
    "--popover-foreground": "#e0e0e0",
    "--primary": "#ff00ff",
    "--primary-foreground": "#0a0a0a",
    "--secondary": "#1a1a1a",
    "--secondary-foreground": "#e0e0e0",
    "--muted": "#1a1a1a",
    "--muted-foreground": "#888888",
    "--accent": "#00ffff",
    "--accent-foreground": "#0a0a0a",
    "--destructive": "#ff003c",
    "--border": "#00ffff33",
    "--input": "#1a1a1a",
    "--ring": "#ff00ff",
    "--radius": "0.375rem",
  },
  retro: {
    "--background": "#fdf6e3",
    "--foreground": "#3b2a1a",
    "--card": "#f5ead0",
    "--card-foreground": "#3b2a1a",
    "--popover": "#fdf6e3",
    "--popover-foreground": "#3b2a1a",
    "--primary": "#8b4513",
    "--primary-foreground": "#fdf6e3",
    "--secondary": "#e8d5b0",
    "--secondary-foreground": "#3b2a1a",
    "--muted": "#e8d5b0",
    "--muted-foreground": "#7a5c3a",
    "--accent": "#556b2f",
    "--accent-foreground": "#fdf6e3",
    "--border": "#c9a87c",
    "--input": "#e8d5b0",
    "--ring": "#8b4513",
    "--radius": "0.25rem",
  },
  cyberpunk: {
    "--background": "#0d001a",
    "--foreground": "#f0e0ff",
    "--card": "#150028",
    "--card-foreground": "#f0e0ff",
    "--popover": "#150028",
    "--popover-foreground": "#f0e0ff",
    "--primary": "#ffe000",
    "--primary-foreground": "#0d001a",
    "--secondary": "#1e0035",
    "--secondary-foreground": "#f0e0ff",
    "--muted": "#1e0035",
    "--muted-foreground": "#a080c0",
    "--accent": "#ff003c",
    "--accent-foreground": "#f0e0ff",
    "--destructive": "#ff003c",
    "--border": "#ffe00033",
    "--input": "#1e0035",
    "--ring": "#ffe000",
    "--radius": "0rem",
  },
};

const ALL_VARS = [
  "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground", "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground", "--muted", "--muted-foreground",
  "--accent", "--accent-foreground", "--destructive", "--border",
  "--input", "--ring", "--radius",
];

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: "default", setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("default");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved && saved in themeVars) {
      setThemeState(saved);
      applyTheme(saved);
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem("theme", t);
    applyTheme(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyTheme(theme: Theme) {
  const el = document.documentElement;
  // CSS 변수 직접 주입 (inline style → 최우선 적용)
  ALL_VARS.forEach((v) => el.style.removeProperty(v));
  Object.entries(themeVars[theme]).forEach(([k, v]) => {
    el.style.setProperty(k, v);
  });
  // 폰트 오버라이드용 클래스
  el.classList.remove("theme-minimal", "theme-neon", "theme-retro", "theme-cyberpunk");
  if (theme !== "default") el.classList.add(`theme-${theme}`);
}
