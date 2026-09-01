import katex from "katex";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

/** Inline / display maths, rendered with KaTeX. */
export function M({
  children,
  display = false,
  hand = false,
  className,
}: {
  children: string;
  display?: boolean;
  /** Chalk-and-pen look: the formula as if written on the page by hand. */
  hand?: boolean;
  className?: string;
}) {
  const html = useMemo(
    () =>
      katex.renderToString(children, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        output: "html",
      }),
    [children, display],
  );

  return (
    <span
      className={cn(
        display ? "block text-center" : "inline-block align-middle",
        hand && "math-hand",
        className,
      )}
      // KaTeX output is generated from our own literals, never user input.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export type KnownRow = {
  label: string;
  tex?: string;
  value?: string;
  state?: "known" | "derived" | "unknown";
};

/** The "what you know" board — the reasoning ledger of a LEMU problem. */
export function KnowBoard({
  title = "What you know",
  rows,
  className,
}: {
  title?: string;
  rows: KnownRow[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border-2 border-ink bg-chalk shadow-ink-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b-2 border-ink/15 bg-card px-4 py-2.5">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </span>
        <span className="font-mono text-[0.68rem] text-muted-foreground">
          {rows.filter((r) => r.state !== "unknown").length}/{rows.length}
        </span>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((r) => {
          const state = r.state ?? "known";
          return (
            <li
              key={r.label}
              className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
            >
              <span className="flex items-center gap-2.5">
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    state === "known" && "bg-blueprint",
                    state === "derived" && "bg-neon",
                    state === "unknown" && "bg-muted-foreground/40",
                  )}
                />
                <span
                  className={cn(
                    "text-[0.82rem]",
                    state === "unknown" ? "text-muted-foreground" : "text-ink",
                  )}
                >
                  {r.tex ? <M hand className="text-[1.15em]">{r.tex}</M> : r.label}
                </span>
              </span>
              <span
                className={cn(
                  "text-right",
                  state === "known" && "text-blueprint",
                  state === "derived" && "text-neon-strong",
                  state === "unknown" && "text-muted-foreground",
                )}
              >
                {r.value ? <M hand className="text-[1.15em]">{r.value}</M> : "?"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** A framed formula block — used to give a theorem some presence. */
export function FormulaCard({
  label,
  tex,
  note,
  className,
}: {
  label: string;
  tex: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border-2 border-ink bg-chalk px-5 pb-5 pt-7 shadow-ink-sm",
        className,
      )}
    >
      <span className="ruled-note pointer-events-none absolute inset-0" />
      <span className="pointer-events-none absolute inset-y-0 left-7 w-px bg-destructive/25" />
      <span className="absolute -top-2.5 left-4 rounded border-2 border-ink bg-signal px-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-signal-foreground">
        {label}
      </span>
      <M display hand className="relative text-[1.6rem] text-blueprint">
        {tex}
      </M>
      {note && (
        <p className="relative mt-3 text-center font-hand text-base text-muted-foreground">
          {note}
        </p>
      )}
    </div>
  );
}
