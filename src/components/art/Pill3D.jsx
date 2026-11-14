import { useId } from 'react';

/** Glossy chrome capsule drawn in SVG. Colours are props so it can be reused as a hero object or small accent. */
export default function Pill3D({ a = '#C5472F', b = '#FFFFFF', className = '', style }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 400 160" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} /><stop offset="0.55" stopColor={a} /><stop offset="1" stopColor="#10272B" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={b} /><stop offset="0.6" stopColor={b} /><stop offset="1" stopColor="#7FB3AB" stopOpacity="0.9" />
        </linearGradient>
        <clipPath id={`${id}c`}><rect x="10" y="10" width="380" height="140" rx="70" /></clipPath>
        <radialGradient id={`${id}s`} cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#0C2A2E" stopOpacity="0.5" /><stop offset="1" stopColor="#0C2A2E" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="200" cy="152" rx="170" ry="8" fill={`url(#${id}s)`} />
      <g clipPath={`url(#${id}c)`}>
        <rect x="0" y="0" width="200" height="160" fill={`url(#${id}a)`} />
        <rect x="200" y="0" width="200" height="160" fill={`url(#${id}b)`} />
        <rect x="196" y="0" width="8" height="160" fill="#10272B" opacity="0.35" />
        <rect x="34" y="26" width="140" height="22" rx="11" fill="#fff" opacity="0.55" />
        <rect x="226" y="26" width="140" height="22" rx="11" fill="#fff" opacity="0.8" />
        <rect x="30" y="118" width="340" height="10" rx="5" fill="#fff" opacity="0.18" />
      </g>
      <rect x="10" y="10" width="380" height="140" rx="70" fill="none" stroke="#10272B" strokeWidth="5" />
    </svg>
  );
}
