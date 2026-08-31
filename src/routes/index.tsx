import { createFileRoute, Link } from "@tanstack/react-router";
import { LemuLinkButton } from "@/components/lemu/button";
import { SiteFooter, SiteHeader } from "@/components/lemu/site-chrome";
import { TopicCard } from "@/components/lemu/topic-card";
import {
  AxiomGlyph,
  BoxGlyph,
  FunctionGlyph,
  GameGlyph,
  PyramidGlyph,
} from "@/components/lemu/glyphs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LEMU — Maths you can look at" },
      {
        name: "description",
        content:
          "LEMU teaches school mathematics through interactive visualizations, guided problems and puzzles. See the geometry before you calculate it.",
      },
      { property: "og:title", content: "LEMU — Maths you can look at" },
      {
        property: "og:description",
        content:
          "Interactive visual explainers, guided problems and puzzles for geometry and algebra.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink/90">
      <div className="grid-paper pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-chalk px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest shadow-ink-sm">
            Geometry · Algebra · Puzzles
          </span>
          <h1 className="mt-6 text-5xl leading-[0.95] font-bold sm:text-6xl lg:text-7xl">
            Maths you can
            <br />
            <span className="relative inline-block">
              look at
              <svg
                viewBox="0 0 300 18"
                className="absolute -bottom-2 left-0 w-full text-signal"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 12 C 80 2, 210 2, 298 9"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
            Every topic starts with something you can rotate, drag and break. Then you solve
            with it — not with a wall of formulas.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <LemuLinkButton to="/learn" size="lg">
              Open the topics
            </LemuLinkButton>
            <Link
              to="/learn/geometry"
              className="font-display text-sm font-medium underline decoration-2 underline-offset-4 hover:text-blueprint"
            >
              See a geometry topic →
            </Link>
          </div>
          <dl className="mt-12 flex gap-8 border-t-2 border-ink/15 pt-6 font-mono text-sm">
            {[
              ["6", "topics live"],
              ["3", "steps per topic"],
              ["1", "lemur"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="text-2xl font-semibold text-ink">{n}</dt>
                <dd className="text-xs uppercase tracking-widest text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroFigure />
      </div>
    </section>
  );
}

function HeroFigure() {
  return (
    <div className="relative rounded-2xl border-2 border-ink bg-card p-5 shadow-ink">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Explainer · The Box
        </span>
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full border border-ink bg-signal" />
          <span className="size-2.5 rounded-full border border-ink bg-blueprint" />
        </span>
      </div>

      <div className="relative grid h-64 place-items-center overflow-hidden">
        <div className="grid-paper pointer-events-none absolute inset-0" />
        <div className="relative w-56 animate-[spin_18s_linear_infinite] [transform-style:preserve-3d]">
          <BoxGlyph className="text-blueprint" />
        </div>
      </div>

      <div className="mt-3 space-y-2 rounded-lg border border-border bg-chalk p-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
          What you know
        </p>
        <ul className="space-y-1.5 font-mono text-sm">
          <li className="flex justify-between">
            <span>edge a</span>
            <span className="text-blueprint">4 cm</span>
          </li>
          <li className="flex justify-between">
            <span>diagonal d</span>
            <span className="text-blueprint">√(a² + b² + c²)</span>
          </li>
          <li className="flex justify-between text-muted-foreground">
            <span>angle to base</span>
            <span>?</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

const steps = [
  {
    n: "01",
    title: "Explainer",
    text: "An interactive model you can rotate and slice. Definitions appear on the object, not beside it.",
  },
  {
    n: "02",
    title: "Problems",
    text: "Guided tasks with a live 'what you know' panel that fills in as you reason.",
  },
  {
    n: "03",
    title: "Puzzle",
    text: "One playful challenge that only works if you actually understood the idea.",
  },
];

function Steps() {
  return (
    <section className="border-b-2 border-ink/90 bg-chalk">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-lg text-3xl font-bold sm:text-4xl">
          Every topic runs the same three beats
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="press rounded-xl border-2 border-ink bg-card p-6 shadow-ink"
            >
              <span className="font-mono text-xs text-signal-foreground">
                <span className="rounded bg-signal px-1.5 py-0.5">{s.n}</span>
              </span>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="border-b-2 border-ink/90">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold sm:text-4xl">Start somewhere</h2>
          <Link
            to="/learn"
            className="font-display text-sm underline decoration-2 underline-offset-4 hover:text-blueprint"
          >
            All subjects →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <TopicCard
            index="GEO · 01"
            title="Axioms"
            blurb="The rules of space, shown as objects you can move."
            status="live"
            to="/learn/geometry"
            glyph={<AxiomGlyph />}
          />
          <TopicCard
            index="GEO · 02"
            title="The Box"
            blurb="Edges, diagonals and sections of a rectangular solid."
            status="live"
            to="/learn/geometry"
            glyph={<BoxGlyph />}
          />
          <TopicCard
            index="GEO · 03"
            title="The Pyramid"
            blurb="Apexes, slant heights and the cuts that reveal them."
            status="live"
            to="/learn/geometry"
            glyph={<PyramidGlyph />}
          />
          <TopicCard
            index="ALG · 01"
            title="Functions"
            blurb="Drag the inputs, watch the curve answer back."
            status="soon"
            glyph={<FunctionGlyph />}
          />
        </div>
      </div>
    </section>
  );
}

function GameBand() {
  return (
    <section className="border-b-2 border-ink/90 bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-signal">
            Gamification
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Lemu&apos;s Math Quest</h2>
          <p className="mt-3 max-w-md text-primary-foreground/70">
            Streaks, XP and boss puzzles. The same maths, wrapped in a reason to come back
            tomorrow.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LemuLinkButton to="/learn" variant="signal">
              Play the quest
            </LemuLinkButton>
            <LemuLinkButton to="/auth" variant="paper">
              Track my progress
            </LemuLinkButton>
          </div>
        </div>
        <div className="rounded-xl border-2 border-signal bg-background p-5 text-ink">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span>Week streak</span>
            <span>4 / 7</span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {[1, 1, 1, 1, 0, 0, 0].map((on, i) => (
              <span
                key={i}
                className={`h-8 flex-1 rounded border-2 border-ink ${on ? "bg-signal" : "bg-secondary"}`}
              />
            ))}
          </div>
          <div className="mt-5 grid h-20 place-items-center rounded-lg border border-border bg-chalk">
            <GameGlyph />
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Steps />
        <Featured />
        <GameBand />
      </main>
      <SiteFooter />
    </div>
  );
}
