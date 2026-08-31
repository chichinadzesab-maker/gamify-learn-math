import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type TopicStatus = "live" | "dev" | "soon";

const statusLabel: Record<TopicStatus, string> = {
  live: "Ready",
  dev: "In progress",
  soon: "Coming soon",
};

const statusClass: Record<TopicStatus, string> = {
  live: "bg-signal text-signal-foreground",
  dev: "bg-blueprint text-blueprint-foreground",
  soon: "bg-secondary text-muted-foreground",
};

export function StatusChip({ status }: { status: TopicStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-2.5 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider",
        statusClass[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {statusLabel[status]}
    </span>
  );
}

export function TopicCard({
  title,
  blurb,
  status,
  index,
  glyph,
  to,
}: {
  title: string;
  blurb: string;
  status: TopicStatus;
  index: string;
  glyph: React.ReactNode;
  to?: string;
}) {
  const disabled = status === "soon";
  const body = (
    <div
      className={cn(
        "relative flex h-full flex-col gap-4 rounded-xl border-2 border-ink bg-card p-5 shadow-ink",
        disabled ? "opacity-60" : "press cursor-pointer",
      )}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
        <StatusChip status={status} />
      </div>
      <div className="grid h-24 place-items-center rounded-lg border border-border bg-chalk text-ink">
        {glyph}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      </div>
    </div>
  );

  if (disabled || !to) return body;
  return (
    <Link to={to} className="block h-full">
      {body}
    </Link>
  );
}
