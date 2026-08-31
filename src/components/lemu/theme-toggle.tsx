import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('lemu-theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("lemu-theme", next ? "dark" : "light");
    } catch {
      /* ignore */
    }
    setDark(next);
  };

  return { dark, toggle };
}

export function ThemeToggle({ className }: { className?: string }) {
  const { dark, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Chalk mode" : "Night mode"}
      className={cn(
        "group relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg border-2 border-ink bg-chalk text-ink shadow-ink-sm press",
        className,
      )}
    >
      <span className="grid-paper pointer-events-none absolute inset-0 opacity-60" />
      <svg viewBox="0 0 24 24" className="relative size-4" fill="none" aria-hidden>
        {dark ? (
          <>
            <path
              d="M20 14.5A8.5 8.5 0 1 1 9.8 4a7 7 0 0 0 10.2 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              className="text-neon-strong"
            />
          </>
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1="12"
                y1="2.5"
                x2="12"
                y2="5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${a} 12 12)`}
              />
            ))}
          </>
        )}
      </svg>
    </button>
  );
}
