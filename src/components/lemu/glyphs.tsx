const stroke = "currentColor";

export function BoxGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={`h-full w-full ${className}`} fill="none">
      <path d="M20 30 L70 30 L70 72 L20 72 Z" stroke={stroke} strokeWidth="2" />
      <path d="M20 30 L45 12 L95 12 L70 30" stroke={stroke} strokeWidth="2" />
      <path d="M95 12 L95 54 L70 72" stroke={stroke} strokeWidth="2" />
      <path d="M45 12 L45 54 L95 54" stroke={stroke} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55" />
      <path d="M45 54 L20 72" stroke={stroke} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55" />
    </svg>
  );
}

export function PyramidGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <path d="M60 12 L22 66 L84 66 Z" stroke={stroke} strokeWidth="2" />
      <path d="M60 12 L98 52 L84 66" stroke={stroke} strokeWidth="2" />
      <path d="M22 66 L98 52" stroke={stroke} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55" />
      <circle cx="60" cy="12" r="2.5" fill={stroke} />
    </svg>
  );
}

export function SphereGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <circle cx="60" cy="45" r="30" stroke={stroke} strokeWidth="2" />
      <ellipse cx="60" cy="45" rx="30" ry="10" stroke={stroke} strokeWidth="1.2" opacity="0.6" />
      <ellipse cx="60" cy="45" rx="11" ry="30" stroke={stroke} strokeWidth="1.2" opacity="0.6" />
      <path d="M30 45 h60" stroke={stroke} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
    </svg>
  );
}

export function TriangleGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <path d="M24 70 L96 70 L58 16 Z" stroke={stroke} strokeWidth="2" />
      <path d="M58 16 L58 70" stroke={stroke} strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
      <path d="M58 62 h8 v8" stroke={stroke} strokeWidth="1.4" />
    </svg>
  );
}

export function AxiomGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <path d="M14 68 L106 34" stroke={stroke} strokeWidth="2" />
      <path d="M20 22 L100 74" stroke={stroke} strokeWidth="1.4" opacity="0.7" />
      <circle cx="62.5" cy="50" r="4" fill={stroke} />
      <circle cx="20" cy="22" r="2.5" stroke={stroke} strokeWidth="1.5" />
      <circle cx="106" cy="34" r="2.5" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

export function FunctionGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <path d="M16 74 H104" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
      <path d="M22 82 V14" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
      <path d="M22 70 C46 70 44 22 68 22 C86 22 88 52 104 52" stroke={stroke} strokeWidth="2" />
      <circle cx="68" cy="22" r="3" fill={stroke} />
    </svg>
  );
}

export function EquationGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <path d="M16 70 H104" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
      <path d="M22 78 V14" stroke={stroke} strokeWidth="1.2" opacity="0.5" />
      <path d="M24 74 L100 26" stroke={stroke} strokeWidth="2" />
      <circle cx="62" cy="50" r="4" stroke={stroke} strokeWidth="2" />
    </svg>
  );
}

export function GameGlyph() {
  return (
    <svg viewBox="0 0 120 90" className="h-full w-full" fill="none">
      <rect x="22" y="26" width="76" height="42" rx="14" stroke={stroke} strokeWidth="2" />
      <path d="M40 40 v12 M34 46 h12" stroke={stroke} strokeWidth="2" />
      <circle cx="78" cy="42" r="3.5" fill={stroke} />
      <circle cx="86" cy="52" r="3.5" fill={stroke} />
    </svg>
  );
}
