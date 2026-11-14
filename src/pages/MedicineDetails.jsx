import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ServiceState from '../components/ServiceState';
import Disclaimer from '../components/Disclaimer';
import Notice from '../components/Notice';
import useLoad from '../hooks/useLoad';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { medicineService } from '../services/medicineService';

const List = ({ items }) =>
  items?.length ? <ul className="list-disc space-y-1 pl-5 text-sm text-ink/80">{items.map((i) => <li key={i}>{i}</li>)}</ul> : <p className="text-sm text-ink/65">No information available.</p>;

export default function MedicineDetails() {
  const { id } = useParams();
  const { loading, error, data: m } = useLoad(() => medicineService.getById(id), [id]);
  useDocumentTitle(m?.name || 'Medicine Details');

  if (loading || error) {
    return (
      <>
        <PageHeader eyebrow="Medicine Details" title="Medicine information" />
        <div className="container-page max-w-3xl space-y-6">
          <ServiceState loading={loading} error={error} loadingLabel="Loading medicine details…" />
          <p className="text-center text-sm text-ink/60">
            Sections shown once data exists: overview, ingredients, uses, side effects, warnings and registration details.
          </p>
          <div className="text-center"><Link to="/verify" className="btn btn-outline">Back to Verify</Link></div>
          <Disclaimer />
        </div>
      </>
    );
  }

  const reg = m.registration || {};
  return (
    <>
      <PageHeader eyebrow="Medicine Details" title={m.name}>{m.brandName}</PageHeader>
      <div className="container-page grid max-w-5xl gap-5 md:grid-cols-2">
        <section className="card"><p className="label mb-3">Ingredients</p><List items={m.activeIngredients} /></section>
        <section className="card"><p className="label mb-3">Uses</p><List items={m.uses} /></section>
        <section className="card"><p className="label mb-3">Side effects</p><List items={m.sideEffects} /></section>
        <section className="card"><p className="label mb-3">Warnings</p><List items={m.warnings} /></section>
        <section className="card md:col-span-2">
          <p className="label mb-3">Registration details</p>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            {Object.entries(reg).map(([k, v]) => (
              <div key={k}><dt className="text-ink/65">{k}</dt><dd>{String(v)}</dd></div>
            ))}
          </dl>
          <Notice tone="warn" className="mt-4">A matching registration record does not prove that a physical pack is genuine.</Notice>
        </section>
        <div className="md:col-span-2"><Disclaimer /></div>
      </div>
    </>
  );
}
