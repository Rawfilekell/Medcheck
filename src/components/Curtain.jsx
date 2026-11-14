import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, prefersReduced } from '../lib/motion';

/** Three-layer colour wipe that sweeps away on every route change. */
export default function Curtain() {
  const { pathname } = useLocation();
  const root = useRef(null);
  const first = useRef(true);

  useLayoutEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (prefersReduced()) return undefined;
    const layers = root.current.querySelectorAll('[data-layer]');
    const tl = gsap.timeline();
    tl.set(root.current, { visibility: 'visible' })
      .set(layers, { yPercent: 0 })
      .to(layers, { yPercent: -101, duration: 0.9, stagger: { each: 0.09, from: 'end' }, ease: 'expo.inOut', delay: 0.05 })
      .set(root.current, { visibility: 'hidden' });
    return () => tl.kill();
  }, [pathname]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[80] invisible">
      <div data-layer className="absolute inset-0 bg-night" />
      <div data-layer className="absolute inset-0 bg-aqua" />
      <div data-layer className="absolute inset-0 bg-forest" />
    </div>
  );
}
