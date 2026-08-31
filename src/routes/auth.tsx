import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/lemu/site-chrome";
import { LemuButton } from "@/components/lemu/button";
import { BoxGlyph } from "@/components/lemu/glyphs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Log in or sign up — LEMU" },
      {
        name: "description",
        content:
          "Sign in to LEMU to keep your streak, save solved topics and pick up where you left off.",
      },
      { property: "og:title", content: "Log in or sign up — LEMU" },
      {
        property: "og:description",
        content: "Keep your streak and progress across LEMU's geometry and algebra topics.",
      },
    ],
  }),
  component: Auth,
});

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border-2 border-ink bg-chalk px-3.5 text-[0.95rem] outline-none placeholder:text-muted-foreground/70 focus:shadow-ink-sm"
      />
    </label>
  );
}

function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="grid-paper pointer-events-none absolute inset-0" />

      <div className="relative flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <Logo />
          <h1 className="mt-8 text-3xl font-bold">
            {mode === "login" ? "Welcome back" : "Make an account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Your streak is waiting where you left it."
              : "Free. Keeps your progress and puzzle solutions."}
          </p>

          <div className="mt-7 inline-flex rounded-lg border-2 border-ink bg-chalk p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  "rounded px-4 py-1.5 font-display text-sm font-medium transition-colors",
                  mode === m ? "bg-ink text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <Field label="Name" type="text" placeholder="Ana" />
            )}
            <Field label="Email" type="email" placeholder="you@school.edu" />
            <Field label="Password" type="password" placeholder="••••••••" />
            <LemuButton type="submit" size="lg" className="w-full">
              {mode === "login" ? "Log in" : "Create account"}
            </LemuButton>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to be shown shapes you cannot unsee.
          </p>
        </div>
      </div>

      <div className="relative hidden border-l-2 border-ink bg-ink text-primary-foreground lg:flex lg:flex-col lg:justify-center lg:px-14">
        <blockquote className="max-w-sm text-2xl leading-snug font-display font-semibold">
          “I finally saw why the space diagonal is longer than the face diagonal. Nobody had ever
          shown me.”
        </blockquote>
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-signal">
          Student, 10th grade
        </p>
        <div className="mt-12 w-64 text-blueprint">
          <BoxGlyph />
        </div>
      </div>
    </div>
  );
}
