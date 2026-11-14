import { useLayoutEffect, useRef } from "react";
import SplitText from "../SplitText";
import Button from "../Button";
import { gsap, prefersReduced, onIntro } from "../../lib/motion";

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (prefersReduced()) return undefined;
    const ctx = gsap.context(() => {
      // headline drifts away as you scroll past
      gsap.to("[data-headline]", {
        yPercent: -14,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: true },
      });

      // background photo slowly pushes in as you scroll
      gsap.fromTo(
        "[data-photo]",
        { yPercent: 0, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1.16,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        },
      );

      gsap.set("[data-rise]", { opacity: 0 });
      onIntro(() => {
        gsap.fromTo(
          "[data-rise]",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12, delay: 0.3, ease: "expo.out" },
        );
      });
    }, root);
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="on-electric relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-forest text-white"
    >
      {/* ───────── background photo (retro grade + grain are baked into the image) ───────── */}
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-night">
        <img
          data-photo
          src={`${import.meta.env.BASE_URL}hero-bg.jpg`}
          srcSet={`${import.meta.env.BASE_URL}hero-bg-sm.jpg 1100w, ${import.meta.env.BASE_URL}hero-bg.jpg 2000w`}
          sizes="100vw"
          alt=""
          width="2000"
          height="1929"
          className="h-full w-full object-cover will-change-transform"
          loading="eager"
          decoding="async"
        />

        {/* glow + readability fade + vignette, merged into one static layer (no blend modes) */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse at 50% 35%, rgba(255,170,70,0.30) 0%, rgba(255,120,60,0.12) 40%, transparent 70%)",
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.8) 100%)",
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
            ].join(", "),
          }}
        />
      </div>

      {/* ───────── centred copy ───────── */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-16 pt-28 text-center sm:px-8 lg:pt-32">
        <div className="w-full">
          <h1
            data-headline
            className="!text-white"
            style={{ fontVariationSettings: "'wght' 500" }}
          >
            <SplitText
              as="span"
              when="intro"
              text="Before you take"
              mode="words"
              stagger={0.08}
              delay={0.1}
              className="block font-serif text-[clamp(2.4rem,5.4vw,4.6rem)] font-normal italic leading-none tracking-tight text-aqua"
            />
            <SplitText
              as="span"
              when="intro"
              text="that medicine,"
              mode="chars"
              stagger={0.025}
              delay={0.2}
              className="mt-1 block font-display text-[clamp(1.5rem,3.6vw,3rem)] font-medium leading-[1] tracking-tight text-white/80"
            />
            <span className="relative mt-1 inline-block">
              <SplitText
                as="span"
                when="intro"
                text="Check it."
                mode="chars"
                stagger={0.05}
                delay={0.35}
                className="block font-display text-[clamp(2.6rem,6.6vw,5.4rem)] font-medium leading-[0.95] tracking-tight"
              />
              <svg
                aria-hidden
                viewBox="0 0 400 24"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-[5%] min-h-3 w-full text-sun"
              >
                <path
                  pathLength="1"
                  strokeDasharray="1"
                  className="animate-draw"
                  style={{ animationDelay: "2.6s" }}
                  d="M4 15c70-14 190-16 392-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p data-rise className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            With fake drugs on the rise, and more people mixing medicines or prescribing for
            themselves, checking before you take has never mattered more.
          </p>

          <div data-rise className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button to="/verify" variant="sun">
              Verify a medicine
            </Button>
            <Button to="/report" variant="light">
              Report a fake
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}