export default function Field({ label, id, error, hint, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-ink">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink/65">{hint}</p>}
      {error && <p className="mt-1 text-xs text-clay" role="alert">{error}</p>}
    </div>
  );
}

export function TextInput({ id, error, ...props }) {
  return <input id={id} className={`input ${error ? 'input-error' : ''}`} aria-invalid={!!error} {...props} />;
}

export function Select({ id, error, children, ...props }) {
  return <select id={id} className={`input ${error ? 'input-error' : ''}`} aria-invalid={!!error} {...props}>{children}</select>;
}

export function Textarea({ id, error, ...props }) {
  return <textarea id={id} rows={4} className={`input ${error ? 'input-error' : ''}`} aria-invalid={!!error} {...props} />;
}
