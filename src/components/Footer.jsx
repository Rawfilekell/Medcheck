import { Link } from 'react-router-dom';
import Logo from './Logo';

const cols = [
  { title: 'Tools', links: [['/verify', 'Verify Medicine'], ['/interactions', 'Drug Interactions'], ['/library', 'Medicine Library'], ['/report', 'Report a Medicine']] },
  { title: 'MedCheck', links: [['/about', 'About & limitations'], ['/login', 'Login'], ['/register', 'Register']] },
  { title: 'Your space', links: [['/saved', 'Saved medicines'], ['/reminders', 'Reminders']] },
];

export default function Footer() {

  return (
    <footer className="on-dark relative mt-0 overflow-hidden bg-night text-cream">
      <div className="container-page relative py-20">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">Helping Nigerians access reliable medicine information and think before they take.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="label !text-sun">{c.title}</p>
              <ul className="mt-4 space-y-2.5 text-base font-medium text-cream/85">
                {c.links.map(([to, label]) => (
                  <li key={to}><Link className="group inline-flex items-center gap-2 transition-colors hover:text-aqua" to={to}><span className="inline-block h-px w-0 bg-aqua transition-all duration-300 group-hover:w-4" />{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="relative border-t border-white/15 bg-night">
        <div className="container-page flex flex-col justify-between gap-2 py-5 text-xs text-cream/70 sm:flex-row">
          <span>© {new Date().getFullYear()} MedCheck</span>
          <span>Information only. Not medical advice.</span>
        </div>
      </div>
    </footer>
  );
}
