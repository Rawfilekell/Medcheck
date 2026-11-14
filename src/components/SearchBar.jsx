import { useState } from 'react';
import { SEARCH_TYPES } from '../utils/constants';

/** Reusable search input styled like a prescription line. onSubmit receives { query, type }. */
export default function SearchBar({ onSubmit, initialType = 'name', showType = true, placeholder, loading = false, buttonLabel = 'Search', error }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState(initialType);
  const placeholders = { name: 'Type the name on the pack…', brand: 'Type the brand on the pack…', nafdac: 'Type the NAFDAC number on the label…' };

  const handle = (e) => { e.preventDefault(); onSubmit({ query: query.trim(), type }); };

  return (
    <form onSubmit={handle} noValidate className="w-full">
      {showType && (
        <div className="mb-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Search by">
          {SEARCH_TYPES.map((t) => (
            <button key={t.value} type="button" role="radio" aria-checked={type === t.value} onClick={() => setType(t.value)}
              className={`rounded-full border border-ink/25 px-4 py-1.5 text-sm font-bold transition ${type === t.value ? 'bg-ink text-white' : 'bg-white hover:bg-sun'}`}>
              {t.label}
            </button>
          ))}
        </div>
      )}
      <div className={`shadow-[5px_5px_0_#0C2A2E] flex flex-col gap-2 rounded-2xl border bg-white p-2 text-ink transition focus-within:shadow-glow sm:flex-row sm:items-center sm:rounded-full ${error ? 'border-clay' : 'border-ink/25'}`}>
        <span className="hidden pl-4 font-serif text-3xl italic text-clay sm:block" aria-hidden>℞</span>
        <input aria-label="Search medicines" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder || placeholders[type]}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm placeholder:text-ink/40 focus:outline-none sm:px-2" />
        <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Searching…' : buttonLabel}</button>
      </div>
      {error && <p className="mt-2 px-4 text-left text-xs text-clay" role="alert">{error}</p>}
    </form>
  );
}
