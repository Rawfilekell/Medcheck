import { useState } from 'react';
import SectionTitle from './SectionTitle';

const faqs = [
  { q: 'Can MedCheck tell me if my medicine is fake?', a: 'No. MedCheck can’t confirm whether a specific pack, batch or tablet is genuine, and it never labels a product counterfeit without reliable evidence. It helps you find information and spot warning signs.' },
  { q: 'Is MedCheck a replacement for my pharmacist or doctor?', a: 'No. It provides general information only and is not medical advice. Always speak to a pharmacist or doctor about your medicines.' },
  { q: 'Will reminders send me alerts?', a: 'Not at the moment. Reminders are a list saved in your browser on this device. They don’t send notifications, so don’t rely on them to alert you.' },
  { q: 'Are my report photos uploaded?', a: 'Not at the moment. The report form only previews photos on your device, and nothing can be submitted yet.' },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionTitle chip="FAQ" title="Quick" serif="answers" text="What MedCheck can and can’t do today, so you know what to rely on." className="!mb-0" />
        </div>
        <div className="space-y-4">
          {faqs.map((f, i) => {
            const on = open === i;
            return (
              <div key={f.q} className={`overflow-hidden rounded-[1.5rem] border border-ink/25 transition-all duration-500 ${on ? 'bg-sun text-ink shadow-[7px_7px_0_#0C2A2E]' : 'bg-white text-ink hover:border-forest'}`}>
                <h3 className="!text-inherit">
                  <button className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-[clamp(1rem,1.5vw,1.08rem)] font-semibold leading-snug tracking-tight" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? -1 : i)}>
                    {f.q}
                    <span aria-hidden className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-current text-2xl transition-transform duration-500 ${on ? 'rotate-[135deg] bg-ink text-sun' : ''}`}>+</span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" className={`grid transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden"><p className="px-6 pb-6 text-base leading-relaxed sm:text-lg">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
