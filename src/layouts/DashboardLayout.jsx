import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Notice from '../components/Notice';
import { useAuth } from '../context/AuthContext';

/** Shared shell for user and admin areas. `links` = [{to,label,end?}] */
export default function DashboardLayout({ title, links }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cls = ({ isActive }) =>
    `whitespace-nowrap rounded-full border border-ink/25 px-5 py-2.5 text-sm font-bold transition ${isActive ? 'bg-forest text-white' : 'bg-paper text-ink hover:bg-sun'}`;
  return (
    <div className="container-page pb-16 pt-32">
      <p className="label mb-2">{title}</p>
      <Notice tone="warn" title="Sign-in is not available yet" className="mb-6">
        There is no authentication or backend connected, so this area shows the interface only. No personal records exist and nothing is stored on a server.
      </Notice>
      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible" aria-label={`${title} navigation`}>
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={cls}>{l.label}</NavLink>)}
          {user && <button type="button" onClick={() => { logout(); navigate('/login'); }} className="whitespace-nowrap rounded-full border border-ink/25 bg-paper px-5 py-2.5 text-left text-sm font-bold text-ink transition hover:bg-sun">Log out</button>}
        </nav>
        <div className="min-w-0"><Outlet /></div>
      </div>
    </div>
  );
}
