import DataTable from '../../components/DataTable';
import EmptyState from '../../components/EmptyState';
import ServiceState from '../../components/ServiceState';
import Notice from '../../components/Notice';
import useLoad from '../../hooks/useLoad';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { reportService } from '../../services/reportService';
import { REPORT_STATUSES } from '../../utils/constants';

export default function ManageReports() {
  useDocumentTitle('Manage Reports');
  const { loading, error, data } = useLoad(reportService.adminList, []);

  const changeStatus = (id, status) => reportService.adminUpdateStatus(id, status).catch((e) => alert(e.message));

  return (
    <div>
      <h1 className="text-4xl text-forest">Manage reports</h1>
      <Notice className="mt-4">Reports are unverified claims from the public. Do not treat a report as proof that a product is counterfeit.</Notice>
      <div className="mt-5 space-y-4">
        <ServiceState loading={loading} error={error} />
        {data && (
          <DataTable
            columns={[
              { key: 'medicineName', label: 'Medicine' },
              { key: 'reportType', label: 'Type' },
              { key: 'state', label: 'State' },
              { key: 'status', label: 'Status', render: (r) => (
                <select aria-label={`Status for ${r.medicineName}`} defaultValue={r.status} onChange={(e) => changeStatus(r.id, e.target.value)} className="input !py-2">
                  {REPORT_STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              ) },
            ]}
            rows={data}
            empty={<EmptyState title="No reports">No reports have been received.</EmptyState>}
          />
        )}
      </div>
    </div>
  );
}
