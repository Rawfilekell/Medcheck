import Capsule from './Capsule';

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-4 py-10 text-sm text-ink/70" role="status">
      <span className="animate-spin"><Capsule w={34} h={16} /></span>
      <span className="font-sans text-sm font-bold">{label}</span>
    </div>
  );
}
