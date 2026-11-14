import SplitText from '../SplitText';

/**
 * Two-line headline: a wide Unbounded line over a large italic serif line.
 * tone: 'dark' (ink on light bg) | 'light' (white on dark bg)
 */
export default function SectionTitle({ chip, title, serif, text, tone = 'dark', center = false, className = '' }) {
  const light = tone === 'light';
  return (
    <div className={`mb-12 sm:mb-16 ${center ? 'text-center' : ''} ${className}`}>
      {chip && <span className={`chip ${light ? '' : '!bg-sun'}`}>{chip}</span>}
      <h2 className={`mt-6 leading-[0.92] ${center ? 'mx-auto' : ''} ${light ? '!text-white' : '!text-forest-dark'}`}>
        <SplitText as="span" text={title} mode="words" stagger={0.06} className="block font-display text-[clamp(1.36rem,3.3vw,3.12rem)] font-medium tracking-tight" />
        {serif && <SplitText as="span" text={serif} mode="words" stagger={0.06} delay={0.15} className={`block font-serif text-[clamp(1.43rem,4.8vw,3.85rem)] font-normal italic leading-[0.95] tracking-tight ${light ? 'text-aqua' : 'text-forest'}`} />}
      </h2>
      {text && <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-lg ${center ? 'mx-auto' : ''} ${light ? 'text-white/80' : 'text-ink/75'}`}>{text}</p>}
    </div>
  );
}
