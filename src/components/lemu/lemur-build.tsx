import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Geometry helpers — every piece is a shaded 3D solid drawn in SVG.    */
/* ------------------------------------------------------------------ */

const DX = 7; // depth offset x
const DY = -6; // depth offset y

type Kind = "box" | "wedge" | "sphere";

type Piece = {
  id: string;
  label: string;
  kind: Kind;
  w: number;
  h: number;
  /** target (assembled) position */
  tx: number;
  ty: number;
  /** scattered position */
  sx: number;
  sy: number;
  sr: number;
  fill: string;
  stripes?: number;
};

const FUR = "var(--chalk)";
const DARK = "var(--ink)";

const PIECES: Piece[] = [
  { id: "leg-l", label: "Leg", kind: "box", w: 17, h: 30, tx: 168, ty: 246, sx: 60, sy: 262, sr: -12, fill: FUR },
  { id: "leg-r", label: "Leg", kind: "box", w: 17, h: 30, tx: 198, ty: 246, sx: 108, sy: 268, sr: 9, fill: FUR },
  { id: "body", label: "Body", kind: "box", w: 62, h: 74, tx: 183, ty: 196, sx: 76, sy: 196, sr: -8, fill: FUR },
  { id: "arm-l", label: "Arm", kind: "box", w: 14, h: 42, tx: 144, ty: 190, sx: 44, sy: 152, sr: 24, fill: FUR },
  { id: "arm-r", label: "Arm", kind: "box", w: 14, h: 42, tx: 222, ty: 190, sx: 300, sy: 258, sr: -20, fill: FUR },
  { id: "head", label: "Head", kind: "sphere", w: 56, h: 48, tx: 183, ty: 124, sx: 292, sy: 120, sr: 0, fill: FUR },
  { id: "ear-l", label: "Ear", kind: "wedge", w: 20, h: 22, tx: 160, ty: 92, sx: 250, sy: 60, sr: -18, fill: DARK },
  { id: "ear-r", label: "Ear", kind: "wedge", w: 20, h: 22, tx: 206, ty: 92, sx: 324, sy: 62, sr: 16, fill: DARK },
  { id: "tail", label: "Tail", kind: "box", w: 20, h: 118, tx: 258, ty: 200, sx: 320, sy: 190, sr: 26, fill: FUR, stripes: 6 },
];

const SNAP = 26;

function Solid({ p, placed }: { p: Piece; placed: boolean }) {
  const { w, h } = p;
  const x = -w / 2;
  const y = -h / 2;
  const stroke = "var(--ink)";

  if (p.kind === "sphere") {
    return (
      <g>
        <ellipse cx={DX / 2} cy={DY / 2} rx={w / 2} ry={h / 2} fill="var(--ink)" opacity={0.18} />
        <ellipse cx={0} cy={0} rx={w / 2} ry={h / 2} fill={p.fill} stroke={stroke} strokeWidth={2.4} />
        {/* latitude / longitude construction lines: it is still a solid of revolution */}
        <ellipse cx={0} cy={0} rx={w / 2} ry={h / 6} fill="none" stroke={stroke} strokeWidth={1} opacity={0.35} />
        <ellipse cx={0} cy={0} rx={w / 6} ry={h / 2} fill="none" stroke={stroke} strokeWidth={1} opacity={0.35} />
        {placed && (
          <>
            <circle cx={-11} cy={-3} r={4.6} fill="var(--ink)" />
            <circle cx={11} cy={-3} r={4.6} fill="var(--ink)" />
            <path d="M -6 11 q 6 5 12 0" fill="none" stroke="var(--ink)" strokeWidth={2} strokeLinecap="round" />
          </>
        )}
      </g>
    );
  }

  if (p.kind === "wedge") {
    const pts = `${x},${y + h} ${0},${y} ${x + w},${y + h}`;
    return (
      <g>
        <polygon
          points={`${x + DX},${y + h + DY} ${DX},${y + DY} ${x + w + DX},${y + h + DY}`}
          fill="var(--ink)"
          opacity={0.35}
        />
        <polygon points={pts} fill={p.fill} stroke={stroke} strokeWidth={2.2} strokeLinejoin="round" />
      </g>
    );
  }

  const stripes = p.stripes ?? 0;
  return (
    <g>
      {/* top face */}
      <polygon
        points={`${x},${y} ${x + DX},${y + DY} ${x + w + DX},${y + DY} ${x + w},${y}`}
        fill="var(--chalk)"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        opacity={0.9}
      />
      {/* right face */}
      <polygon
        points={`${x + w},${y} ${x + w + DX},${y + DY} ${x + w + DX},${y + h + DY} ${x + w},${y + h}`}
        fill="var(--ink)"
        opacity={0.22}
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* front face */}
      <rect x={x} y={y} width={w} height={h} rx={4} fill={p.fill} stroke={stroke} strokeWidth={2.4} />
      {Array.from({ length: stripes }).map((_, i) =>
        i % 2 === 0 ? null : (
          <rect
            key={i}
            x={x}
            y={y + (h / stripes) * i}
            width={w}
            height={h / stripes}
            fill="var(--ink)"
            opacity={0.85}
          />
        ),
      )}
      {stripes > 0 && (
        <rect x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={stroke} strokeWidth={2.4} />
      )}
    </g>
  );
}

type State = { x: number; y: number; r: number; placed: boolean };

const scattered = (): Record<string, State> =>
  Object.fromEntries(PIECES.map((p) => [p.id, { x: p.sx, y: p.sy, r: p.sr, placed: false }]));

const assembled = (): Record<string, State> =>
  Object.fromEntries(PIECES.map((p) => [p.id, { x: p.tx, y: p.ty, r: 0, placed: true }]));

/**
 * Build-the-lemur: the solid lemur falls apart on load and the student
 * drags each solid back into place. Pure SVG, no dependencies.
 */
export function LemurBuild({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<Record<string, State>>(assembled);
  const [dragId, setDragId] = useState<string | null>(null);
  const offset = useRef({ x: 0, y: 0 });

  // fall apart shortly after arriving
  useEffect(() => {
    const t = setTimeout(() => setState(scattered()), 900);
    return () => clearTimeout(t);
  }, []);

  const toSvg = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }, []);

  const onDown = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    const cur = state[id]!;
    const p = toSvg(e.clientX, e.clientY);
    offset.current = { x: cur.x - p.x, y: cur.y - p.y };
    setDragId(id);
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!dragId) return;
    const p = toSvg(e.clientX, e.clientY);
    setState((s) => ({
      ...s,
      [dragId]: { ...s[dragId]!, x: p.x + offset.current.x, y: p.y + offset.current.y, r: 0, placed: false },
    }));
  };

  const onUp = () => {
    if (!dragId) return;
    const piece = PIECES.find((p) => p.id === dragId)!;
    setState((s) => {
      const cur = s[dragId]!;
      const near = Math.hypot(cur.x - piece.tx, cur.y - piece.ty) < SNAP;
      return {
        ...s,
        [dragId]: near ? { x: piece.tx, y: piece.ty, r: 0, placed: true } : { ...cur, placed: false },
      };
    });
    setDragId(null);
  };

  const done = PIECES.every((p) => state[p.id]?.placed);
  const count = PIECES.filter((p) => state[p.id]?.placed).length;

  return (
    <div className={cn("select-none", className)}>
      <svg
        ref={svgRef}
        viewBox="0 0 366 300"
        className="w-full touch-none"
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        role="img"
        aria-label="Drag the solids to rebuild the lemur"
      >
        {/* ghost outlines of where each solid belongs */}
        {PIECES.map((p) => {
          const st = state[p.id]!;
          if (st.placed) return null;
          return (
            <g key={`ghost-${p.id}`} transform={`translate(${p.tx} ${p.ty})`} opacity={0.28}>
              <rect
                x={-p.w / 2 - 2}
                y={-p.h / 2 - 2}
                width={p.w + 4}
                height={p.h + 4}
                rx={p.kind === "sphere" ? p.h / 2 : 5}
                fill="none"
                stroke="var(--ink)"
                strokeWidth={1.6}
                strokeDasharray="4 6"
              />
            </g>
          );
        })}

        {PIECES.map((p) => {
          const st = state[p.id]!;
          const dragging = dragId === p.id;
          return (
            <g
              key={p.id}
              transform={`translate(${st.x} ${st.y}) rotate(${st.r})`}
              className={cn(
                "cursor-grab text-ink",
                dragging ? "cursor-grabbing" : "transition-transform duration-500 ease-out",
              )}
              onPointerDown={onDown(p.id)}
            >
              <Solid p={p} placed={st.placed} />
            </g>
          );
        })}
      </svg>

      <div className="mt-2 flex items-center justify-between gap-3 border-t border-border pt-3 font-mono text-[0.65rem] uppercase tracking-[0.16em]">
        <span className={done ? "text-signal-foreground" : "text-muted-foreground"}>
          {done ? "Lemur assembled ✓" : `${count} / ${PIECES.length} solids placed`}
        </span>
        <button
          type="button"
          onClick={() => setState(scattered())}
          className="rounded border-2 border-ink bg-chalk px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink transition-transform hover:-translate-y-0.5"
        >
          Break it apart
        </button>
      </div>
    </div>
  );
}
