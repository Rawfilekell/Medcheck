export default function DataTable({ columns, rows = [], empty }) {
  if (!rows.length) return empty || null;
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/25 bg-paper">
      <table className="w-full min-w-[560px] text-left text-sm">
        <thead className="border-b border-line">
          <tr>{columns.map((c) => <th key={c.key} className="label px-5 py-4 font-normal">{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id ?? i} className="border-b border-line/60 last:border-0">
              {columns.map((c) => <td key={c.key} className="px-5 py-4">{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
