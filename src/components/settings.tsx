import { X } from "lucide-react";
import { SheetFrame } from "@/components/motion";

export const THEMES = [
  { id: "auramite", name: "Auramite", swatch: "#d4b36a" },
  { id: "marble", name: "Marble", swatch: "#8a6a2f" },
  { id: "night", name: "Night", swatch: "#7eb0d6" },
  { id: "monochrome", name: "Monochrome", swatch: "#d4d4d4" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const THEME_KEY = "ttt-theme";
const MOTION_KEY = "ttt-motion";

export function loadTheme(): ThemeId {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "amethyst") return "monochrome";
  return THEMES.some((theme) => theme.id === saved) ? (saved as ThemeId) : "auramite";
}

export function loadReduceMotion(): boolean {
  const saved = localStorage.getItem(MOTION_KEY);
  if (saved === "on") return true;
  if (saved === "off") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function applySettings(theme: ThemeId, reduceMotion: boolean) {
  const root = document.documentElement;
  if (theme === "auramite") root.removeAttribute("data-theme");
  else root.dataset.theme = theme;
  root.dataset.motion = reduceMotion ? "on" : "off";
  localStorage.setItem(THEME_KEY, theme);
  localStorage.setItem(MOTION_KEY, reduceMotion ? "on" : "off");
}

export function Settings({
  theme,
  reduceMotion,
  onTheme,
  onMotion,
  onClose,
}: {
  theme: ThemeId;
  reduceMotion: boolean;
  onTheme: (theme: ThemeId) => void;
  onMotion: (reduce: boolean) => void;
  onClose: () => void;
}) {
  return (
    <SheetFrame label="Settings" onClose={onClose}>
      {(close) => (
        <>
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl">Settings</h2>
          <button
            type="button"
            aria-label="Close settings"
            onClick={close}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted"
          >
            <X className="size-5" />
          </button>
        </div>
        <section className="mt-4">
          <h3 className="text-xs tracking-wide text-gold uppercase">Motion</h3>
          <button
            type="button"
            role="switch"
            aria-checked={reduceMotion}
            onClick={() => onMotion(!reduceMotion)}
            className="mt-2 flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-line px-3 text-left text-sm"
          >
            <span>
              Reduce motion
              <span className="mt-0.5 block text-xs text-muted">Turn this off to keep interface transitions.</span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <span className={`motion-color text-xs ${reduceMotion ? "text-gold" : "text-muted"}`}>
                {reduceMotion ? "On" : "Off"}
              </span>
              <span className={`motion-switch ${reduceMotion ? "is-on" : ""}`} aria-hidden="true">
                <span />
              </span>
            </span>
          </button>
        </section>
        <section className="mt-5">
          <h3 className="text-xs tracking-wide text-gold uppercase">Colors</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {THEMES.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={theme === item.id}
                onClick={() => onTheme(item.id)}
                className={`motion-card flex min-h-11 items-center gap-2 rounded-lg border px-3 text-left text-sm ${
                  theme === item.id ? "border-gold text-fg" : "border-line text-muted"
                }`}
              >
                <span className="size-4 shrink-0 rounded-full border border-line" style={{ background: item.swatch }} />
                {item.name}
              </button>
            ))}
          </div>
        </section>
        </>
      )}
    </SheetFrame>
  );
}
