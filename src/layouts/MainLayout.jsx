import { Outlet, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import Curtain from '../components/Curtain';
import { smooth } from '../lib/lenis';
import { ScrollTrigger, finishIntro } from '../lib/motion';

export default function MainLayout() {
  const { pathname } = useLocation();
  useLayoutEffect(() => { finishIntro(); }, []);
  useLayoutEffect(() => {
    if (smooth.current) smooth.current.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(t);
  }, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:font-bold">Skip to content</a>
      <SmoothScroll />
      <Curtain />
      <Navbar />
      <main id="main" className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}
