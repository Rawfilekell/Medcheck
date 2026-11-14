import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Magnetic from './Magnetic';
import { NAV_LINKS } from '../utils/constants';
import { gsap, ScrollTrigger, prefersReduced, onIntro } from '../lib/motion';
import { smooth } from '../lib/lenis';

const mobileLinks = [...NAV_LINKS, { to: '/login', label: 'Login' }, { to: '/register', label: 'Register' }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const bar = useRef(null);
  const progress = useRef(null);
  const menu = useRef(null);

  // close menu on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  const openRef = useRef(false);
  useEffect(() => { openRef.current = open; }, [open]);

  // entrance, hide-on-scroll-down, scroll progress (runs once; reads `open` via a ref)
  useEffect(() => {
    if (prefersReduced()) return undefined;
    const ctx = gsap.context(() => {
      gsap.set(bar.current, { yPercent: -160 });
      onIntro(() => gsap.to(bar.current, { yPercent: 0, duration: 1, ease: 'expo.out', delay: 0.2 }));
      const setProgress = gsap.quickSetter(progress.current, 'scaleX');
      let hidden = false;
      ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: (s) => {
          setProgress(s.progress);
          if (openRef.current) return;
          const shouldHide = s.direction === 1 && s.scroll() > 240;
          if (shouldHide === hidden) return; // only tween when the state actually flips
          hidden = shouldHide;
          gsap.to(bar.current, { yPercent: hidden ? -160 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // full-screen menu choreography + scroll lock
  useEffect(() => {
    const el = menu.current;
    if (!el) return undefined;
    if (prefersReduced()) { el.style.visibility = open ? 'visible' : 'hidden'; return undefined; }
    if (open) smooth.current?.stop(); else smooth.current?.start();
    const items = el.querySelectorAll('[data-item]');
    if (open) {
      gsap.set(el, { visibility: 'visible' });
      gsap.fromTo(el, { clipPath: 'circle(0% at calc(100% - 40px) 40px)' }, { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.9, ease: 'expo.inOut' });
      gsap.fromTo(items, { yPercent: 110, rotate: 6 }, { yPercent: 0, rotate: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out', delay: 0.35 });
    } else {
      gsap.to(el, { clipPath: 'circle(0% at calc(100% - 40px) 40px)', duration: 0.6, ease: 'expo.inOut', onComplete: () => gsap.set(el, { visibility: 'hidden' }) });
    }
    return () => { if (open) smooth.current?.start(); };
  }, [open]);

  const linkCls = ({ isActive }) =>
    `group relative px-3 py-2 text-sm font-bold transition-colors ${isActive ? 'text-sun' : 'text-white/80 hover:text-white'}`;

  return (
    <>
      <header className="sticky top-0 z-[55] h-0">
        <div ref={bar} className="on-dark absolute inset-x-0 top-3 px-3 sm:top-4 sm:px-6">
          <div className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/20 bg-night/90 py-2.5 pl-5 pr-2.5 shadow-[0_10px_40px_-10px_rgba(12,42,46,0.7)]">
            <Logo light />
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {NAV_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} className={linkCls}>
                  {({ isActive }) => (<><span className="roll"><span>{l.label}</span><span aria-hidden className="text-aqua">{l.label}</span></span>{isActive && <span aria-hidden className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sun" />}</>)}
                </NavLink>
              ))}
            </nav>
            <div className="hidden items-center gap-2 lg:flex">
              <NavLink to="/login" className={linkCls}>Login</NavLink>
              <Magnetic strength={0.25}><NavLink to="/register" className="btn btn-sun !px-5 !py-2">Get started</NavLink></Magnetic>
            </div>
            <button className="relative z-[60] grid h-11 w-11 place-items-center rounded-full bg-sun text-ink lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
            <span ref={progress} aria-hidden className="absolute inset-x-8 -bottom-px h-[3px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-aqua via-sun to-clay" />
          </div>
        </div>
      </header>

      <div ref={menu} id="mobile-menu" className="on-electric grain fixed inset-0 z-50 overflow-y-auto bg-forest text-white lg:hidden" style={{ visibility: 'hidden' }} aria-hidden={!open}>
        <div className="blob -right-16 top-10 h-72 w-72 bg-aqua/60" />
        <div className="blob -left-20 bottom-10 h-80 w-80 bg-clay/50" />
        <nav className="relative z-10 flex min-h-full flex-col justify-center gap-1 px-7 pb-10 pt-28" aria-label="Mobile">
          {mobileLinks.map((l, i) => (
            <span key={l.to} className="block overflow-hidden">
              <NavLink data-item to={l.to} tabIndex={open ? 0 : -1} className={({ isActive }) => `block py-1 font-display text-[clamp(1.6rem,6.75vw,2.72rem)] font-medium leading-tight tracking-tight ${isActive ? 'text-sun' : 'text-white'}`}>
                <span className="mr-3 font-sans text-sm font-bold text-aqua">{String(i + 1).padStart(2, '0')}</span>{l.label}
              </NavLink>
            </span>
          ))}
        </nav>
      </div>
    </>
  );
}
