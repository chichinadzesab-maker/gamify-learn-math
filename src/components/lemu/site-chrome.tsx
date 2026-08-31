import { Link } from "@tanstack/react-router";
import { LemuLinkButton } from "./button";
import logo from "@/assets/lemu-logo.jpg.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid size-10 place-items-center overflow-hidden rounded-lg border-2 border-ink bg-chalk shadow-ink-sm">
        <img src={logo.url} alt="" className="size-11 scale-[2.6] object-contain" />
      </span>
      <span className="font-display text-xl font-bold tracking-[-0.04em] text-ink">
        LEMU
      </span>
    </Link>
  );
}

const nav = [
  { to: "/learn", label: "Learn" },
  { to: "/learn/geometry", label: "Geometry" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/90 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-secondary" }}
              className="rounded-md px-3 py-2 font-display text-sm font-medium text-ink/80 transition-colors hover:bg-secondary hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden rounded-md px-3 py-2 font-display text-sm font-medium text-ink/80 hover:text-ink sm:inline-flex"
          >
            Log in
          </Link>
          <LemuLinkButton to="/learn" variant="signal" size="sm">
            Start learning
          </LemuLinkButton>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink/90 bg-chalk">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Maths you can look at. Built for students who need to see it before they believe it.
          </p>
        </div>
        <div className="flex gap-10 font-display text-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Learn</p>
            <Link to="/learn" className="block hover:underline">Subjects</Link>
            <Link to="/learn/geometry" className="block hover:underline">Geometry</Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Account</p>
            <Link to="/auth" className="block hover:underline">Log in</Link>
            <Link to="/auth" className="block hover:underline">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} LEMU — interactive mathematics
      </div>
    </footer>
  );
}
