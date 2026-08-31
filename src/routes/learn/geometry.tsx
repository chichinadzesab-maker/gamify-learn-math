import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/lemu/site-chrome";
import { TopicCard } from "@/components/lemu/topic-card";
import {
  AxiomGlyph,
  BoxGlyph,
  PyramidGlyph,
  SphereGlyph,
  TriangleGlyph,
} from "@/components/lemu/glyphs";

export const Route = createFileRoute("/learn/geometry")({
  head: () => ({
    meta: [
      { title: "Geometry topics — LEMU" },
      {
        name: "description",
        content:
          "Stereometry and planimetry on LEMU: axioms, the box, the pyramid, the sphere and the triangle — each with an interactive explainer, problems and a puzzle.",
      },
      { property: "og:title", content: "Geometry topics — LEMU" },
      {
        property: "og:description",
        content: "Axioms, the box, the pyramid, the sphere and the triangle, taught visually.",
      },
    ],
  }),
  component: Geometry,
});

function Geometry() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b-2 border-ink/90">
          <div className="grid-paper pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-5 py-16">
            <nav className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <Link to="/learn" className="hover:text-ink">
                Learn
              </Link>{" "}
              / Geometry
            </nav>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Geometry</h1>
            <p className="mt-4 max-w-lg text-muted-foreground">
              Two tracks. Solids first, because they are the ones textbooks flatten into
              unreadable drawings.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <header className="flex items-baseline gap-4">
            <h2 className="text-2xl font-bold">Stereometry</h2>
            <span className="tick-rule h-px flex-1 opacity-30" />
            <span className="font-mono text-xs text-muted-foreground">3 / 4 ready</span>
          </header>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <TopicCard index="01" title="Axioms" status="live" to="/learn/geometry" glyph={<AxiomGlyph />} blurb="Points, lines and planes — and what they are allowed to do." />
            <TopicCard index="02" title="The Box" status="live" to="/learn/geometry" glyph={<BoxGlyph />} blurb="Edges, face diagonals, space diagonals and the angles between them." />
            <TopicCard index="03" title="The Pyramid" status="live" to="/learn/geometry" glyph={<PyramidGlyph />} blurb="Apex, height, slant height, and cross-sections you can slide." />
            <TopicCard index="04" title="The Sphere" status="dev" glyph={<SphereGlyph />} blurb="Great circles, tangent planes and the geometry of the round." />
          </div>

          <header className="mt-16 flex items-baseline gap-4">
            <h2 className="text-2xl font-bold">Planimetry</h2>
            <span className="tick-rule h-px flex-1 opacity-30" />
            <span className="font-mono text-xs text-muted-foreground">0 / 1 ready</span>
          </header>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <TopicCard index="01" title="The Triangle" status="dev" glyph={<TriangleGlyph />} blurb="Centres, heights and the theorems that hold it all together." />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
