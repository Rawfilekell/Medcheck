import Capsule from './Capsule';

export default function EmptyState({ title, children, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/60 bg-paper/70 px-6 py-12 text-center">
      <div className="mb-4 flex justify-center animate-float" style={{ '--r': '-20deg' }}><Capsule w={64} h={28} rotate={-20} a="#E0A83C" /></div>
      <h3 className="text-2xl">{title}</h3>
      {children && <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
