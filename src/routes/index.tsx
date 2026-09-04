import { createFileRoute } from "@tanstack/react-router";
import { LemuLinkButton } from "@/components/lemu/button";
import { SiteFooter, SiteHeader } from "@/components/lemu/site-chrome";
import { LemurBuild } from "@/components/lemu/lemur-build";
import logoVideo from "@/assets/lemu-logo.mp4.asset.json";


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
          <div className="flex items-center gap-3">
            <LogoReel />
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-chalk px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest shadow-ink-sm">
              Geometry · Algebra · Puzzles
            </span>
          </div>

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
            <LemuLinkButton to="/auth" size="lg" variant="paper">
              Save my progress
            </LemuLinkButton>
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
          Build · Lemu
        </span>
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full border border-ink bg-signal" />
          <span className="size-2.5 rounded-full border border-ink bg-blueprint" />
        </span>
      </div>

      <div className="relative overflow-hidden py-2">
        <div className="grid-paper pointer-events-none absolute inset-0" />
        <LemurBuild className="relative text-ink" />
      </div>
    </div>
  );
}

function LogoReel() {
  return (
    <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border-2 border-ink bg-chalk shadow-ink-sm">
      <video
        src={logoVideo.url}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        className="size-full scale-[1.02] object-cover"
      />
    </span>
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
        <p className="mt-4 max-w-lg text-muted-foreground">
          Explainer, problems, puzzle — same rhythm on every topic, so you always know what
          comes next.
        </p>
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

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Steps />
      </main>
      <SiteFooter />
    </div>
  );
}
