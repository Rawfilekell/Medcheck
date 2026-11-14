import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import ServiceState from '../components/ServiceState';
import EmptyState from '../components/EmptyState';
import Notice from '../components/Notice';
import Disclaimer from '../components/Disclaimer';
import useAsyncAction from '../hooks/useAsyncAction';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { medicineService } from '../services/medicineService';

export default function Verify() {
  useDocumentTitle('Verify Medicine');
  const [params, setParams] = useSearchParams();
  const [error, setError] = useState('');
  const search = useAsyncAction(useCallback((p) => medicineService.search(p), []));
  const results = search.data?.results;

  const submit = ({ query, type }) => {
    if (query.length < 2) { setError('Enter at least 2 characters to search.'); return; }
    setError('');
    setParams({ type, q: query });
    search.run({ query, type });
  };

  // Run a search when arriving with ?q= (e.g. from the home page).
  useEffect(() => {
    const q = params.get('q');
    if (q && q.length >= 2) search.run({ query: q, type: params.get('type') || 'name' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader eyebrow="Verify Medicine" title="Look up a medicine’s available details">
        Search by medicine name, brand name or NAFDAC registration number.
      </PageHeader>
      <div className="container-page max-w-3xl">
        <SearchBar onSubmit={submit} initialType={params.get('type') || 'name'} loading={search.loading} error={error} buttonLabel="Verify" />
        <Notice tone="warn" title="Read this first" className="mt-5">
          Even when a registration number matches a record, that does not prove the pack in your hand is genuine. Compare the printed details, check the seal and packaging, and ask a pharmacist if in doubt.
        </Notice>
        <div className="mt-8 space-y-4">
          <ServiceState loading={search.loading} error={search.error} loadingLabel="Searching…" />
          {results && results.length === 0 && (
            <EmptyState title="No matching records found">
              No record was found for that search. This does not mean a product is fake — the record may simply not be in MedCheck’s data. Check your spelling or ask a pharmacist.
            </EmptyState>
          )}
          {results && results.length > 0 && (
            <ul className="space-y-3">
              {results.map((m) => (
                <li key={m.id} className="card flex items-center justify-between gap-4">
                  <div><p className="font-serif text-2xl text-forest">{m.name}</p>{m.brandName && <p className="text-sm text-ink/60">{m.brandName}</p>}</div>
                  <Link to={`/medicines/${m.id}`} className="btn btn-outline">View details</Link>
                </li>
              ))}
            </ul>
          )}
          {!search.loading && !search.error && !results && (
            <EmptyState title="Start a search">Results will appear here.</EmptyState>
          )}
        </div>
        <Disclaimer className="mt-10" />
      </div>
    </>
  );
}
