import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReduced } from '../lib/motion';
import { smooth } from '../lib/lenis';

/** Inertial smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return undefined;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    smooth.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // layout shifts after fonts/images load would leave pin positions stale (causes a jump)
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    return () => { gsap.ticker.remove(tick); window.removeEventListener('load', refresh); lenis.destroy(); smooth.current = null; };
  }, []);
  return null;
}
