import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import ServiceState from '../components/ServiceState';
import EmptyState from '../components/EmptyState';
import Disclaimer from '../components/Disclaimer';
import useAsyncAction from '../hooks/useAsyncAction';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { medicineService } from '../services/medicineService';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Library() {
  useDocumentTitle('Medicine Library');
  const [letter, setLetter] = useState('');
  const [query, setQuery] = useState('');
  const list = useAsyncAction(useCallback((p) => medicineService.list(p), []));
  const results = list.data?.results;

  const run = (q, l) => { setQuery(q); setLetter(l); list.run({ query: q, letter: l }); };

  return (
    <>
      <PageHeader eyebrow="Medicine Library" title="Browse medicine information">
        Search by name or browse alphabetically.
      </PageHeader>
      <div className="container-page max-w-4xl">
        <SearchBar showType={false} buttonLabel="Search" placeholder="Search the library" loading={list.loading} onSubmit={({ query: q }) => run(q, '')} />
        <div className="mt-6 flex flex-wrap justify-center gap-1.5" role="group" aria-label="Browse by letter">
          {LETTERS.map((l) => (
            <button key={l} onClick={() => run('', l)} aria-pressed={letter === l} className={`h-9 w-9 rounded-full border text-xs font-bold transition ${letter === l ? 'border-forest bg-forest text-cream' : 'border-line bg-paper hover:border-forest'}`}>{l}</button>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <ServiceState loading={list.loading} error={list.error} loadingLabel="Loading…" />
          {results?.length === 0 && <EmptyState title="Nothing found">No medicines matched “{query || letter}”.</EmptyState>}
          {results?.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {results.map((m) => (
                <li key={m.id}><Link to={`/medicines/${m.id}`} className="card block transition hover:border-forest"><p className="font-serif text-2xl text-forest">{m.name}</p>{m.brandName && <p className="text-sm text-ink/60">{m.brandName}</p>}</Link></li>
              ))}
            </ul>
          )}
          {!list.loading && !list.error && !results && <EmptyState title="Search or pick a letter">Medicine information will appear here.</EmptyState>}
        </div>
        <Disclaimer className="mt-10" />
      </div>
    </>
  );
}
