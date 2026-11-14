/** Decorative two-tone capsule. */
export default function Capsule({ w = 90, h = 36, a = '#C0432C', b = '#FFFFFF', rotate = 0, className = '', style = {} }) {
  return <span aria-hidden className={`capsule ${className}`} style={{ width: w, height: h, '--a': a, '--b': b, '--r': `${rotate}deg`, transform: `rotate(${rotate}deg)`, ...style }} />;
}
