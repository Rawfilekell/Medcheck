import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { gsap, prefersReduced } from "../../lib/motion";

const doses = [
  {
    id: "a",
    name: "Amoxicillin",
    dose: "500 mg · Three times daily",
    time: "8:00 AM",
  },
  {
    id: "b",
    name: "Vitamin C",
    dose: "1 tablet · Once daily",
    time: "9:00 AM",
  },
  {
    id: "c",
    name: "Artemether / Lumefantrine",
    dose: "4 tablets · Twice daily",
    time: "8:00 PM",
  },
];

const steps = ["Received", "Under review", "Resolved"];
const reports = [
  {
    title: "Suspected counterfeit",
    where: "Lagos · Pharmacy purchase",
    step: 1,
  },
  { title: "Suspicious packaging", where: "Abuja · Open market", step: 2 },
  { title: "Unsafe or harmful effects", where: "Kano · Patent store", step: 0 },
];

const saved = [
  ["Amoxicillin", "Antibiotic · Capsule"],
  ["Artemether / Lumefantrine", "Antimalarial · Tablet"],
  ["Ascorbic acid", "Vitamin · Tablet"],
];

const shell =
  "relative overflow-hidden rounded-[2rem] border border-ink/25 p-6 shadow-[10px_10px_0_#0C2A2E] sm:p-8";

function CardHead({ title, note }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight !text-inherit sm:text-2xl">
          {title}
        </h3>
        <p className="mt-1 text-sm opacity-75">{note}</p>
      </div>
      <span className="shrink-0 rounded-full border border-ink/25 bg-white/70 px-3 py-1 text-xs font-bold text-ink">
        Example
      </span>
    </div>
  );
}

/** A preview of the signed-in dashboard: three separate cards, each a real area of the account. Entries are illustrative. */
export default function InsideDashboard() {
  const root = useRef(null);
  const [taken, setTaken] = useState(["b"]);
  const toggle = (id) =>
    setTaken((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  useLayoutEffect(() => {
    if (prefersReduced()) return undefined;
    const ctx = gsap.context(() => {
      gsap.from("[data-dcard]", {
        y: 110,
        rotate: (i) => (i % 2 ? 3 : -3),
        opacity: 0,
        stagger: 0.16,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-grid]", start: "top 82%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="on-electric grain relative overflow-hidden bg-forest py-24 sm:py-32"
    >
      <div className="container-page relative">
        <SectionTitle
          tone="light"
          chip="Inside your dashboard"
          title="A space for the medicines"
          serif="you keep track of"
          text="Create a free account and get a personal dashboard for your doses, your reports and the medicines you want to come back to."
        />

        <div data-grid className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Reminders */}
          <article
            data-dcard
            className={`${shell} bg-white text-ink lg:row-span-2`}
          >
            <CardHead
              title="Medication Reminders"
              note="Your doses and times in one list. Tap to mark a dose as taken."
            />
            <ul className="space-y-3">
              {doses.map((d) => {
                const on = taken.includes(d.id);
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(d.id)}
                      className={`flex w-full items-center gap-4 rounded-2xl border border-ink/15 px-4 py-3 text-left transition-all duration-300 ${on ? "bg-aqua" : "bg-cream hover:bg-sun"}`}
                    >
                      <span className="grid h-12 w-[4.5rem] shrink-0 place-items-center rounded-xl border border-ink/25 bg-white font-display text-xs font-semibold text-forest">
                        {d.time}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-serif text-xl leading-tight text-forest ${on ? "line-through decoration-forest/50" : ""}`}
                        >
                          {d.name}
                        </span>
                        <span className="block text-sm text-ink/60">
                          {d.dose}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/25 text-sm font-bold transition-all duration-300 ${on ? "rotate-[360deg] bg-forest text-white" : "bg-white text-transparent"}`}
                      >
                        ✓
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-sm text-ink/60">
              Kept on your device. Reminders don’t send alerts.
            </p>
            <Link to="/reminders" className="btn btn-primary mt-5">
              Set a reminder
            </Link>
          </article>

          {/* Reported drugs */}
          <article data-dcard className={`${shell} bg-sun text-ink`}>
            <CardHead
              title="Reported Drugs"
              note="Follow each report from sent to resolved."
            />
            <ul className="space-y-3">
              {reports.map((r) => (
                <li
                  key={r.title}
                  className="rounded-2xl border border-ink/25 bg-white px-4 py-3"
                >
                  <span className="block font-serif text-lg leading-tight text-forest">
                    {r.title}
                  </span>
                  <span className="block text-xs text-ink/60">{r.where}</span>
                  <div
                    className="mt-3 flex items-center gap-1.5"
                    role="img"
                    aria-label={`Status: ${steps[r.step]}`}
                  >
                    {steps.map((s, i) => (
                      <span key={s} className="flex flex-1 flex-col gap-1">
                        <span
                          className={`h-1.5 rounded-full ${i <= r.step ? (r.step === 2 ? "bg-forest" : "bg-clay") : "bg-ink/15"}`}
                        />
                        <span
                          className={`text-[10px] font-bold ${i === r.step ? "text-ink" : "text-ink/40"}`}
                        >
                          {s}
                        </span>
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/report" className="btn btn-primary mt-5">
              Report a medicine
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
