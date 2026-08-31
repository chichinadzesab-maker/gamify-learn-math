import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type V3 = [number, number, number];

const A = 1.35; // width
const B = 0.85; // depth
const C = 1.0; // height

const V: V3[] = [
  [-A, -C, -B], // 0 back-bottom-left
  [A, -C, -B], // 1 back-bottom-right
  [A, -C, B], // 2 front-bottom-right
  [-A, -C, B], // 3 front-bottom-left
  [-A, C, -B], // 4 back-top-left
  [A, C, -B], // 5
  [A, C, B], // 6
  [-A, C, B], // 7
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

// hidden-ish edges (back face) get a dashed treatment
const BACK_EDGES = new Set(["0-1", "0-4", "1-5", "4-5"]);

function project(v: V3, rx: number, ry: number) {
  const [x0, y0, z0] = v;
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x1 = x0 * cy + z0 * sy;
  const z1 = -x0 * sy + z0 * cy;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  const y1 = y0 * cx - z1 * sx;
  const z2 = y0 * sx + z1 * cx;
  const d = 9;
  const k = d / (d + z2);
  return { x: x1 * k, y: -y1 * k, z: z2 };
}

/**
 * Drag-to-rotate wireframe box with the two diagonals students confuse:
 * the face diagonal and the space diagonal.
 */
export function SolidBox({ className }: { className?: string }) {
  const [rot, setRot] = useState({ x: 0.38, y: 0.72 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    if (!spin) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setRot((r) => ({ ...r, y: r.y + dt * 0.25 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [spin]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY };
    setSpin(false);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    drag.current = { x: e.clientX, y: e.clientY };
    setRot((r) => ({
      x: Math.max(-1.2, Math.min(1.2, r.x - dy * 0.008)),
      y: r.y + dx * 0.008,
    }));
  };
  const onUp = () => {
    drag.current = null;
  };

  const S = 46;
  const proj = V.map((v) => project(v, rot.x, rot.y));
  const p = (i: number) => proj[i]!;
  const pt = (i: number) => `${p(i).x * S},${p(i).y * S}`;

  return (
    <div className={cn("relative select-none", className)}>
      <svg
        viewBox="-160 -130 320 260"
        className="w-full cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        role="img"
        aria-label="Rotatable wireframe box showing face and space diagonals"
      >
        {/* bottom face wash */}
        <polygon
          points={[0, 1, 2, 3].map(pt).join(" ")}
          className="fill-blueprint/10"
        />
        {EDGES.map(([a, b]) => {
          const key = `${a}-${b}`;
          const back = BACK_EDGES.has(key);
          return (
            <line
              key={key}
              x1={p(a).x * S}
              y1={p(a).y * S}
              x2={p(b).x * S}
              y2={p(b).y * S}
              stroke="currentColor"
              strokeWidth={back ? 1.4 : 2.4}
              strokeLinecap="round"
              strokeDasharray={back ? "5 6" : undefined}
              opacity={back ? 0.45 : 1}
            />
          );
        })}

        {/* face diagonal 3 -> 1 on the bottom face */}
        <line
          x1={p(3).x * S}
          y1={p(3).y * S}
          x2={p(1).x * S}
          y2={p(1).y * S}
          className="stroke-signal"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* space diagonal 3 -> 5 */}
        <line
          x1={p(3).x * S}
          y1={p(3).y * S}
          x2={p(5).x * S}
          y2={p(5).y * S}
          className="stroke-neon-strong"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle
            key={i}
            cx={p(i).x * S}
            cy={p(i).y * S}
            r="3.4"
            className="fill-background stroke-current"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="mt-3 flex items-center justify-center gap-5 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-signal" /> face
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-neon-strong" /> space
        </span>
        <span className="opacity-60">drag to rotate</span>
      </div>
    </div>
  );
}
