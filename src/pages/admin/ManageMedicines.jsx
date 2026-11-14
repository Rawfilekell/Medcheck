import { useState } from 'react';
import DataTable from '../../components/DataTable';
import EmptyState from '../../components/EmptyState';
import ServiceState from '../../components/ServiceState';
import Notice from '../../components/Notice';
import useLoad from '../../hooks/useLoad';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { adminService } from '../../services/adminService';

export default function ManageMedicines() {
  useDocumentTitle('Manage Medicines');
  const { loading, error, data } = useLoad(adminService.listMedicines, []);
  const [filter, setFilter] = useState('');
  const rows = (data || []).filter((m) => m.name?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl text-forest">Manage medicines</h1>
        <button className="btn btn-primary" disabled title="Needs a backend">Add medicine</button>
      </div>
      <Notice className="mt-4">Adding, editing and deleting records is disabled until a backend and verified data source are connected.</Notice>
      <input aria-label="Filter medicines" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by name" className="input mt-5 max-w-sm" />
      <div className="mt-5 space-y-4">
        <ServiceState loading={loading} error={error} />
        {data && (
          <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'brandName', label: 'Brand' },
              { key: 'nafdac', label: 'NAFDAC no.', render: (r) => r.registration?.number || '—' },
              { key: 'actions', label: '', render: () => (<span className="flex gap-2"><button className="btn btn-outline !py-1.5" disabled>Edit</button><button className="btn btn-danger !py-1.5" disabled>Delete</button></span>) },
            ]}
            rows={rows}
            empty={<EmptyState title="No medicine records">There are no records to show.</EmptyState>}
          />
        )}
      </div>
    </div>
  );
}
