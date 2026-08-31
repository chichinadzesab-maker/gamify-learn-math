import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/lemu/site-chrome";
import { StatusChip } from "@/components/lemu/topic-card";
import { EquationGlyph, FunctionGlyph, GameGlyph } from "@/components/lemu/glyphs";
import { LemuAnchorButton, LemuLinkButton } from "@/components/lemu/button";

export const Route = createFileRoute("/learn/")({
  head: () => ({
    meta: [
      { title: "Subjects — LEMU interactive mathematics" },
      {
        name: "description",
        content:
          "Browse LEMU subjects: geometry, algebra and Lemu's Math Quest. Interactive explainers, guided problems and puzzles.",
      },
      { property: "og:title", content: "Subjects — LEMU" },
      {
        property: "og:description",
        content: "Geometry, algebra and the Math Quest game — all built around interactive visuals.",
      },
    ],
  }),
  component: Learn,
});

function Learn() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b-2 border-ink/90">
          <div className="grid-paper pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-5 py-16">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Library
            </p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Pick a subject</h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Each subject is a stack of topics. Topics unlock as fast as you want — nothing
              here is gated behind a timer.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-16">
          <article className="rounded-2xl border-2 border-ink bg-card p-6 shadow-ink sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Geometry</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Stereometry and planimetry, built on models you can turn in your hands.
                </p>
              </div>
              <StatusChip status="live" />
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
              {["Axioms", "The Box", "The Pyramid", "The Sphere", "The Triangle"].map((t) => (
                <li key={t} className="rounded-full border border-border bg-chalk px-3 py-1">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <LemuLinkButton to="/learn/geometry">Enter geometry</LemuLinkButton>
            </div>
          </article>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border-2 border-ink bg-card p-6 shadow-ink">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold">Algebra</h2>
                <StatusChip status="soon" />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Functions and linear equations, drawn as things that move.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="grid h-24 place-items-center rounded-lg border border-border bg-chalk">
                  <FunctionGlyph />
                </div>
                <div className="grid h-24 place-items-center rounded-lg border border-border bg-chalk">
                  <EquationGlyph />
                </div>
              </div>
              <p className="mt-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                In the workshop now
              </p>
            </article>

            <article className="rounded-2xl border-2 border-ink bg-slab p-6 text-slab-foreground shadow-ink">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold">Lemu&apos;s Math Quest</h2>
                <span className="rounded-full border-2 border-signal px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-signal">
                  Game
                </span>
              </div>
              <p className="mt-1 text-sm text-primary-foreground/70">
                Levels, streaks and boss puzzles. Opens in a new tab.
              </p>
              <div className="mt-6 grid h-24 place-items-center rounded-lg border border-signal/40 bg-background text-ink">
                <GameGlyph />
              </div>
              <div className="mt-6">
                <LemuAnchorButton href="#" target="_blank" rel="noreferrer" variant="signal">
                  Launch the game
                </LemuAnchorButton>
              </div>
            </article>
          </div>

          <p className="pt-4 text-center text-sm text-muted-foreground">
            Missing something you need?{" "}
            <Link to="/auth" className="underline decoration-2 underline-offset-4">
              Make an account
            </Link>{" "}
            and tell us what to build next.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
