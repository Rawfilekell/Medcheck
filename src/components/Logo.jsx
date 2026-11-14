import { Link } from 'react-router-dom';
import Capsule from './Capsule';

export default function Logo({ light = false, className = '' }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="MedCheck home">
      <span className="transition-transform duration-500 group-hover:rotate-[160deg]"><Capsule w={36} h={17} rotate={-20} a="#C5472F" b="#FFFFFF" /></span>
      <span className={`font-display text-xl font-medium leading-none tracking-tight ${light ? 'text-white' : 'text-forest-dark'}`}>MedCheck</span>
    </Link>
  );
}
