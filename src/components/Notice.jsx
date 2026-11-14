const tones = {
  info: 'border-ink/25 bg-mist text-ink',
  warn: 'border-ink/25 bg-amber text-ink',
  error: 'border-clay bg-clay/10 text-clay',
};

export default function Notice({ tone = 'info', title, children, className = '' }) {
  return (
    <div className={`rounded-2xl border p-4 text-sm leading-relaxed ${tones[tone]} ${className}`} role={tone === 'error' ? 'alert' : 'status'}>
      {title && <p className="mb-1 font-display text-xs font-bold">{title}</p>}
      {children}
    </div>
  );
}
