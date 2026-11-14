import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { gsap, prefersReduced } from '../../lib/motion';

const light = 'bg-black/10 hover:bg-black/20';
const dark = 'bg-white/15 hover:bg-white/25';

const people = [
  {
    title: 'Patients & families',
    img: 'who/patients.jpg',
    text: 'Understand what a medicine is for, read about it in plain language, and look up its details before you take it.',
    bg: 'bg-white text-ink', chip: light, a: '#0E5E5A', b: '#fff',
    tools: [{ to: '/library', label: 'Medicine Library' }, { to: '/verify', label: 'Verify Medicine' }],
  },
  {
    title: 'Parents & caregivers',
    img: 'who/parents.jpg',
    text: 'Look after medicines for children or relatives: double-check what you buy and keep a list of doses and times.',
    bg: 'bg-sun text-ink', chip: light, a: '#C5472F', b: '#fff',
    tools: [{ to: '/verify', label: 'Verify Medicine' }, { to: '/reminders', label: 'Reminders' }],
  },
  {
    title: 'Older adults',
    img: 'who/older.jpg',
    text: 'Taking several medicines at once? Check how they work together before adding another, and keep your own list close.',
    bg: 'bg-aqua text-ink', chip: light, a: '#E0A83C', b: '#0E5E5A',
    tools: [{ to: '/interactions', label: 'Drug Interactions' }, { to: '/saved', label: 'Saved medicines' }],
  },
  {
    title: 'Everyday buyers',
    img: 'who/buyers.jpg',
    text: 'Buy from different pharmacies and shops? Compare the pack with its record and learn the warning signs early.',
    bg: 'bg-night text-white', chip: dark, a: '#BCD3DA', b: '#C5472F',
    tools: [{ to: '/verify', label: 'Verify Medicine' }, { to: '/library', label: 'Medicine Library' }],
  },
  {
    title: 'Anyone who spots a problem',
    img: 'who/report.jpg',
    text: 'Found a suspicious or damaged product, or had a bad reaction? Report it so it can be reviewed.',
    bg: 'bg-clay text-white', chip: dark, a: '#E0A83C', b: '#fff',
    tools: [{ to: '/report', label: 'Report a Medicine' }],
  },
];

export default function WhoFor() {
  const root = useRef(null);
  useLayoutEffect(() => {
    if (prefersReduced()) return undefined;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-stack]');
      cards.forEach((c, i) => {
        if (i === cards.length - 1) return;
        const st = { trigger: cards[i + 1], start: 'top 75%', end: 'top 20%', scrub: true };
        gsap.to(c, { scale: 0.92 - (cards.length - i) * 0.01, rotate: i % 2 ? 1.5 : -1.5, ease: 'none', scrollTrigger: st });
        gsap.to(c.querySelector('[data-dim]'), { opacity: 0.2, ease: 'none', scrollTrigger: st });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-lilac py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionTitle chip="Who MedCheck is for" title="Built for" serif="everyday Nigerians" className="!mb-0" />
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
            Behind every medicine is a person: a child with a fever, a parent on five tablets, a neighbour who bought whatever was cheapest. MedCheck is for all of them.
          </p>
        </div>
        <div className="space-y-6 pb-12">
          {people.map((p, i) => (
            <article key={p.title} data-stack className={`sticky overflow-hidden will-change-transform rounded-[2rem] border border-ink/25 p-7 shadow-[0_24px_48px_-24px_rgba(12,42,46,0.45)] sm:p-10 ${p.bg}`} style={{ top: `${6.5 + i * 1.1}rem`, minHeight: '19rem' }}>
              <div aria-hidden data-dim className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0" />
              <img
                src={`${import.meta.env.BASE_URL}${p.img}`}
                alt={p.title}
                loading="lazy"
                decoding="async"
                width="192"
                height="192"
                className="mb-6 block h-44 w-full rounded-2xl object-cover shadow-lg sm:absolute sm:right-8 sm:top-8 sm:mb-0 sm:h-40 sm:w-40"
              />
              <div className="relative z-10 flex h-full flex-col justify-end sm:min-h-[15rem] sm:pr-40">
                <h3 className="max-w-[12ch] font-display text-[clamp(1.36rem,2.55vw,2.32rem)] font-medium leading-[0.98] tracking-tight !text-inherit">{p.title}</h3>
                <p className="mt-4 max-w-sm text-base font-medium leading-relaxed">{p.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <Link key={t.to + t.label} to={t.to} className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${p.chip}`}>{t.label} →</Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}