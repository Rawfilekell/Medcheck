import Pill3D from './art/Pill3D';
import SplitText from './SplitText';

/** Inner-page hero: electric blue, giant title, drifting pills, looping ECG. */
export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="on-electric grain bg-grid relative mb-12 overflow-hidden bg-forest text-white">
      <div className="blob -right-24 -top-24 h-96 w-96 bg-aqua/70" />
      <div className="blob -bottom-32 left-1/4 h-96 w-96 bg-lilac/60" style={{ animationDelay: '-6s' }} />
      <div aria-hidden className="scanline animate-scan" />
      <div aria-hidden className="absolute right-[-3rem] top-24 hidden w-52 animate-float opacity-95 sm:block" style={{ '--r': '-18deg' }}><Pill3D className="w-full drop-shadow-[0_20px_30px_rgba(12,42,46,0.5)]" /></div>
      <div aria-hidden className="absolute bottom-16 right-[24%] hidden w-20 animate-float opacity-80 md:block" style={{ '--r': '24deg', animationDelay: '-2s' }}><Pill3D a="#A9D8CE" b="#E0A83C" className="w-full" /></div>
      <div className="container-page relative z-10 pb-24 pt-36 sm:pb-28 sm:pt-44">
        {eyebrow && <span className="chip mb-7 animate-rise">{eyebrow}</span>}
        <h1 className="max-w-4xl text-[clamp(1.32rem,4.44vw,3.52rem)] font-medium leading-[0.95] !text-white">
          <SplitText text={title} mode="words" when="intro" stagger={0.07} duration={1.1} />
        </h1>
        {children && <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-white/85" style={{ animationDelay: '.35s' }}>{children}</p>}
      </div>
    </section>
  );
}
