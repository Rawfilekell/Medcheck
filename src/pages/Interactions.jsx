import { useCallback, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ServiceState from '../components/ServiceState';
import Notice from '../components/Notice';
import Disclaimer from '../components/Disclaimer';
import Button from '../components/Button';
import useAsyncAction from '../hooks/useAsyncAction';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { interactionService } from '../services/interactionService';

export default function Interactions() {
  useDocumentTitle('Drug Interaction Checker');
  const [meds, setMeds] = useState([]);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const check = useAsyncAction(useCallback((p) => interactionService.check(p), []));

  const add = (e) => {
    e.preventDefault();
    const name = value.trim();
    if (!name) return setError('Enter a medicine name to add.');
    if (meds.some((m) => m.toLowerCase() === name.toLowerCase())) return setError('That medicine is already in your list.');
    if (meds.length >= 10) return setError('You can add up to 10 medicines.');
    setMeds([...meds, name]); setValue(''); setError(''); check.reset();
  };
  const remove = (name) => { setMeds(meds.filter((m) => m !== name)); check.reset(); };
  const submit = () => {
    if (meds.length < 2) return setError('Add at least two medicines to check.');
    setError('');
    check.run({ medicines: meds });
  };

  return (
    <>
      <PageHeader eyebrow="Drug Interaction Checker" title="Check medicines you take together">
        Add two or more medicines to look for potential interactions.
      </PageHeader>
      <div className="container-page max-w-3xl space-y-6">
        <Notice tone="warn" title="No interaction data is connected">
          MedCheck does not yet have a verified interaction data source, so it cannot report whether medicines interact. Never assume that “no result” means “safe”. Ask a pharmacist or doctor before combining medicines.
        </Notice>
        <form onSubmit={add} noValidate className="card">
          <label htmlFor="med" className="mb-2 block text-sm font-medium text-forest">Add a medicine</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="med" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type the medicine name" className={`input ${error ? 'input-error' : ''}`} />
            <button className="btn btn-outline" type="submit">Add</button>
          </div>
          {error && <p className="mt-2 text-xs text-clay" role="alert">{error}</p>}
          <div className="mt-5 flex min-h-10 flex-wrap gap-2" aria-live="polite">
            {meds.length === 0 && <p className="text-sm text-ink/65">No medicines added yet.</p>}
            {meds.map((m) => (
              <span key={m} className="inline-flex items-center gap-2 rounded-full bg-sun/60 py-1.5 pl-4 pr-2 text-sm text-forest">
                {m}
                <button type="button" onClick={() => remove(m)} aria-label={`Remove ${m}`} className="grid h-6 w-6 place-items-center rounded-full bg-forest text-xs text-cream">×</button>
              </span>
            ))}
          </div>
          <Button onClick={submit} disabled={check.loading} className="mt-6">{check.loading ? 'Checking…' : 'Check Interactions'}</Button>
        </form>
        <ServiceState loading={check.loading} error={check.error} loadingLabel="Checking…" />
        <Disclaimer />
      </div>
    </>
  );
}
