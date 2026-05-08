import svgPaths from "../../../imports/svg-nx92b0rij3";

const stroke = {
  stroke: "var(--color-accent-gold)",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2,
  fill: "none",
};

const strokeThin = { ...stroke, strokeWidth: 1.5 };

export function IconSchwannoma() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d={svgPaths.p35d2d4c0} {...stroke} />
      <path d={svgPaths.p1888b00} {...stroke} />
    </svg>
  );
}

export function IconAneurisma() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d={svgPaths.p11260970} {...strokeThin} />
    </svg>
  );
}

export function IconMAV() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d="M12 6V30" {...stroke} />
      <path d={svgPaths.p3790d380} {...stroke} />
      <path d={svgPaths.p211045b0} {...stroke} />
      <path d={svgPaths.p100365c0} {...stroke} />
    </svg>
  );
}

export function IconTumor() {
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} fill="none" aria-hidden="true">
      <path d={svgPaths.p14c86900} {...stroke} />
      <path d={svgPaths.p342dea00} {...stroke} />
      <path d={svgPaths.p178ef400} {...stroke} />
      <path d={svgPaths.p33923780} {...stroke} />
      <path d={svgPaths.p31a60900} {...stroke} />
      <path d={svgPaths.pd7f3b40} {...stroke} />
      <path d={svgPaths.p2c0983c0} {...stroke} />
      <path d={svgPaths.pcd66900} {...stroke} />
      <path d={svgPaths.p246e8ba0} {...stroke} />
    </svg>
  );
}

export function CardArrow() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" aria-hidden="true">
      <path d="M19 12H5" stroke="var(--color-accent-gold-light)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 17L19 12" stroke="var(--color-accent-gold-light)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
      <path d="M14 7L19 12" stroke="var(--color-accent-gold-light)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  );
}
