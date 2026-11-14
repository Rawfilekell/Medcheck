import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Intro gate: hero animations wait until the preloader has finished. */
let introDone = false;
const queue = [];
export const onIntro = (cb) => {
  if (introDone) { cb(); return () => {}; }
  queue.push(cb);
  return () => { const i = queue.indexOf(cb); if (i > -1) queue.splice(i, 1); };
};
export const finishIntro = () => {
  introDone = true;
  while (queue.length) queue.shift()();
};

export { gsap, ScrollTrigger };
