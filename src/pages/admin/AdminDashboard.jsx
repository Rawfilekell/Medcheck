import { Link } from 'react-router-dom';
import ServiceState from '../../components/ServiceState';
import useLoad from '../../hooks/useLoad';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { adminService } from '../../services/adminService';
import { reportService } from '../../services/reportService';

function Stat({ label, to, loader }) {
  const { loading, error, data } = useLoad(loader, []);
  return (
    <Link to={to} className="card block transition hover:border-forest">
      <p className="label">{label}</p>
      {data ? <p className="mt-4 font-serif text-5xl text-forest">{data.length}</p> : <p className="mt-4 font-serif text-5xl text-ink/25">—</p>}
      <ServiceState loading={loading} error={error} />
    </Link>
  );
}

export default function AdminDashboard() {
  useDocumentTitle('Admin Dashboard');
  return (
    <div>
      <h1 className="text-4xl text-forest">Admin overview</h1>
      <p className="mt-2 text-sm text-ink/70">Counts will appear once a backend provides medicine records and reports.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Stat label="Medicine records" to="/admin/medicines" loader={adminService.listMedicines} />
        <Stat label="Submitted reports" to="/admin/reports" loader={reportService.adminList} />
      </div>
    </div>
  );
}
