import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import ServiceState from '../components/ServiceState';
import Button from '../components/Button';
import useLoad from '../hooks/useLoad';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { userDataService } from '../services/userDataService';

export default function SavedMedicines() {
  useDocumentTitle('Saved Medicines');
  const { loading, error, data } = useLoad(userDataService.listSaved, []);
  return (
    <div>
      <h1 className="text-4xl text-forest">Saved medicines</h1>
      <p className="mt-2 text-sm text-ink/70">Medicines you save from their details page will appear here.</p>
      <div className="mt-6 space-y-4">
        <ServiceState loading={loading} error={error} />
        {data?.length === 0 && <EmptyState title="Nothing saved yet" action={<Button to="/library" variant="outline">Browse the library</Button>}>Saving medicines needs an account and a connected backend.</EmptyState>}
        {data?.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.map((m) => (
              <li key={m.id} className="card flex items-center justify-between gap-3">
                <Link to={`/medicines/${m.id}`} className="font-serif text-2xl text-forest">{m.name}</Link>
                <button className="btn btn-danger !py-2" disabled>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
