import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { VerifyArt, InteractArt, LibraryArt, ReportArt } from '../art/ToolArt';
import { gsap, prefersReduced } from '../../lib/motion';

const tools = [
  { to: '/verify', title: 'Verify Medicine', text: 'Hold the pack, type what’s printed on it, and see what’s on record.', bg: 'bg-forest text-white', Art: VerifyArt },
  { to: '/interactions', title: 'Drug Interactions', text: 'Medicines don’t live alone in your body. List everything you take and look at them together.', bg: 'bg-clay text-white', Art: InteractArt },
  { to: '/library', title: 'Medicine Library', text: 'Plain-language information, so you know what you’re taking and why.', bg: 'bg-sun text-ink', Art: LibraryArt },
  { to: '/report', title: 'Report a Medicine', text: 'Noticed something wrong? Describe what you saw so it can be reviewed.', bg: 'bg-lilac text-ink', Art: ReportArt },
];

/** Desktop: the section pins and the four tools slide sideways as you scroll. Mobile / reduced motion: a normal grid. */
export default function Tools() {
  const root = useRef(null);
  const track = useRef(null);
  const reduced = prefersReduced();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const dist = () => track.current.scrollWidth - window.innerWidth + 64;
      const setBar = gsap.quickSetter(root.current.querySelector('[data-bar]'), 'scaleX');
      const tween = gsap.to(track.current, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: root.current, pin: true, scrub: true, anticipatePin: 1, start: 'top top', end: () => `+=${dist()}`, invalidateOnRefresh: true, onUpdate: (s) => setBar(s.progress) } });
      gsap.utils.toArray('[data-art]').forEach((el) => {
        gsap.fromTo(el, { xPercent: 22, rotate: 8 }, { xPercent: -18, rotate: -6, ease: 'none', scrollTrigger: { trigger: el.closest('[data-panel]'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
    });
    mm.add('(max-width: 1023px)', () => {
      gsap.utils.toArray('[data-panel]').forEach((p) => {
        gsap.from(p, { y: 80, rotate: 2, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 88%' } });
      });
    });
    return () => mm.revert();
  }, [reduced]);

  return (
    <section ref={root} className={`relative overflow-hidden bg-cream py-24 ${reduced ? '' : 'lg:flex lg:h-screen lg:items-center lg:py-0'}`}>
      <div ref={track} className={`flex w-full flex-col gap-6 px-5 sm:px-8 ${reduced ? 'container-page lg:grid lg:grid-cols-2' : 'lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:pl-[6vw] lg:pr-8'}`}>
        <div className={`shrink-0 ${reduced ? 'lg:col-span-2' : 'lg:w-[min(36vw,520px)]'}`}>
          <SectionTitle chip="What does MedCheck do" title="Everything you need to" serif="understand your medicines" text="Look one up. Compare the ones you take. Learn what they’re for. Speak up when something’s wrong." className="!mb-0" />
        </div>
        {tools.map((t) => (
          <Link key={t.to} to={t.to} data-panel className={`group relative flex min-h-[30rem] shrink-0 flex-col justify-end overflow-hidden rounded-[2rem] border border-ink/25 p-7 shadow-[0_24px_48px_-24px_rgba(12,42,46,0.45)] transition-transform duration-500 hover:-rotate-1 sm:p-10 ${reduced ? '' : 'lg:h-[68vh] lg:w-[min(64vw,900px)]'} ${t.bg}`}>
            <div data-art className={`pointer-events-none relative mx-auto mb-6 w-[60%] max-w-[260px] lg:absolute lg:mx-0 lg:mb-0 lg:max-w-none ${reduced ? 'lg:right-4 lg:top-4 lg:w-[34%]' : 'lg:right-6 lg:top-1/2 lg:w-[46%] lg:-translate-y-1/2'}`}><t.Art className="w-full" /></div>
            <div className="relative z-10 max-w-md">
              <h3 className="font-display text-[clamp(1.44rem,2.7vw,2.64rem)] font-medium leading-[0.98] tracking-tight !text-inherit">{t.title}</h3>
              <p className="mt-4 text-base font-medium leading-relaxed sm:text-lg">{t.text}</p>
              <span className="mt-7 inline-flex items-center gap-3 rounded-full border border-current py-2 pl-5 pr-2 text-sm font-bold transition group-hover:bg-white group-hover:text-ink">Open tool <span className="grid h-9 w-9 place-items-center rounded-full bg-night text-white transition-transform duration-500 group-hover:rotate-[360deg]" aria-hidden>→</span></span>
            </div>
          </Link>
        ))}
      </div>
      <div aria-hidden className="absolute inset-x-[6vw] bottom-8 hidden h-1.5 rounded-full bg-ink/15 lg:block"><div data-bar className="h-full origin-left scale-x-0 rounded-full bg-forest" /></div>
    </section>
  );
}