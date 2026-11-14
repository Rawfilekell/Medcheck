import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReduced, onIntro } from '../lib/motion';

/**
 * Splits text into masked characters (or words) and animates them in.
 * `when`: 'intro' (after preloader) | 'scroll' (when visible).
 * The wrapper keeps the full string in aria-label; the pieces are hidden from assistive tech.
 */
export default function SplitText({ text, as: Tag = 'span', className = '', mode = 'chars', when = 'scroll', delay = 0, stagger = 0.03, duration = 1, y = 115, rotate = 8, start = 'top 88%' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const pieces = el.querySelectorAll('[data-piece]');
    if (prefersReduced()) { gsap.set(pieces, { clearProps: 'all' }); return undefined; }
    gsap.set(pieces, { yPercent: y, rotate, opacity: 0, transformOrigin: '0% 100%' });
    const play = () => gsap.to(pieces, { yPercent: 0, rotate: 0, opacity: 1, duration, delay, stagger, ease: 'expo.out', onComplete: () => gsap.set(pieces, { clearProps: 'all' }) });
    let st; let off = () => {};
    if (when === 'intro') off = onIntro(play);
    else st = ScrollTrigger.create({ trigger: el, start, once: true, onEnter: play });
    return () => { off(); st?.kill(); gsap.killTweensOf(pieces); };
  }, [text, mode, when, delay, stagger, duration, y, rotate, start]);

  const words = String(text).split(' ');
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} aria-hidden="true">
          <span className="split-word">
            {mode === 'chars'
              ? [...w].map((c, ci) => <span key={ci} data-piece className="split-char">{c}</span>)
              : <span data-piece className="split-char">{w}</span>}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
