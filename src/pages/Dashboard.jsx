import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ServiceState from '../components/ServiceState';
import useLoad from '../hooks/useLoad';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { userDataService } from '../services/userDataService';
import { reminderService } from '../services/reminderService';

function Panel({ title, to, linkLabel, loader, emptyTitle, emptyText }) {
  const { loading, error, data } = useLoad(loader, []);
  return (
    <section className="card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl text-forest">{title}</h2>
        {to && <Link to={to} className="label underline">{linkLabel}</Link>}
      </div>
      <ServiceState loading={loading} error={error} />
      {Array.isArray(data) && data.length === 0 && <EmptyState title={emptyTitle}>{emptyText}</EmptyState>}
      {Array.isArray(data) && data.length > 0 && (
        <ul className="space-y-2 text-sm">{data.map((d) => <li key={d.id} className="rounded-2xl bg-cream px-4 py-3">{d.medicineName || d.name || d.query}{d.time ? ` · ${d.time}` : ''}</li>)}</ul>
      )}
    </section>
  );
}

export default function Dashboard() {
  useDocumentTitle('Dashboard');
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Panel title="Saved medicines" to="/saved" linkLabel="View all" loader={userDataService.listSaved} />
      <Panel title="Previous searches" loader={userDataService.listSearches} />
      <Panel title="Submitted reports" loader={userDataService.listReports} />
      <Panel title="Medication reminders" to="/reminders" linkLabel="Manage" loader={async () => reminderService.list().slice(0, 4)} emptyTitle="No reminders" emptyText="Create a reminder to keep track of your medication. Reminders are stored on this device only." />
    </div>
  );
}
