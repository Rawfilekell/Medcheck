/** Four animated illustrations, one per MedCheck tool. All decorative. */
const base = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

export function VerifyArt({ className = '' }) {
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      <g {...base} stroke="#10272B" strokeWidth="5">
        <rect x="60" y="86" width="150" height="150" rx="22" fill="#fff" />
        <path d="M60 130h150" />
        <rect x="82" y="152" width="106" height="12" rx="6" fill="#BFD8D2" stroke="none" />
        <rect x="82" y="174" width="70" height="12" rx="6" fill="#BFD8D2" stroke="none" />
        <g stroke="none" fill="#10272B">{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => <rect key={i} x={84 + i * 8.5} y={198} width={i % 3 === 0 ? 5 : 3} height="20" />)}</g>
        <rect x="60" y="86" width="150" height="150" rx="22" />
        <rect x="76" y="100" width="22" height="14" rx="7" fill="#C5472F" />
        <g style={{ animation: 'lens 5s ease-in-out infinite', transformOrigin: '200px 200px' }}>
          <circle cx="206" cy="196" r="52" fill="rgba(169,216,206,0.45)" stroke="#10272B" strokeWidth="6" />
          <path d="M243 233l44 44" strokeWidth="14" />
          <path d="M186 196l14 14 26-30" stroke="#0E5E5A" strokeWidth="9" />
        </g>
      </g>
      <style>{'@keyframes lens{0%,100%{transform:translate(-70px,-60px) rotate(-6deg)}50%{transform:translate(0,0) rotate(4deg)}}'}</style>
    </svg>
  );
}

export function InteractArt({ className = '' }) {
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      <g {...base} stroke="#10272B" strokeWidth="5">
        <g style={{ animation: 'pillL 3.6s ease-in-out infinite', transformOrigin: '110px 160px' }}>
          <rect x="40" y="130" width="140" height="60" rx="30" fill="#C5472F" />
          <path d="M70 146h58" stroke="#fff" opacity=".6" strokeWidth="8" />
        </g>
        <g style={{ animation: 'pillR 3.6s ease-in-out infinite', transformOrigin: '220px 160px' }}>
          <rect x="140" y="130" width="140" height="60" rx="30" fill="#E0A83C" />
          <path d="M170 146h58" stroke="#fff" opacity=".7" strokeWidth="8" />
        </g>
        <g style={{ animation: 'spark 3.6s ease-in-out infinite', transformOrigin: '160px 160px' }} stroke="#0E5E5A" strokeWidth="7">
          <path d="M160 60v36M160 224v36M60 160h36M224 160h36M88 88l24 24M232 208l24 24M232 112l24-24M88 232l24-24" />
        </g>
      </g>
      <style>{'@keyframes pillL{0%,100%{transform:translateX(-24px) rotate(-14deg)}50%{transform:translateX(18px) rotate(6deg)}}@keyframes pillR{0%,100%{transform:translateX(24px) rotate(14deg)}50%{transform:translateX(-18px) rotate(-6deg)}}@keyframes spark{0%,40%,100%{transform:scale(0) rotate(0);opacity:0}55%{transform:scale(1) rotate(30deg);opacity:1}80%{transform:scale(1.3) rotate(60deg);opacity:0}}'}</style>
    </svg>
  );
}

export function LibraryArt({ className = '' }) {
  const books = [['#0E5E5A', 70, 0], ['#C5472F', 56, 1], ['#E0A83C', 84, 2], ['#A9D8CE', 62, 3], ['#BCD3DA', 76, 4]];
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      <g {...base} stroke="#10272B" strokeWidth="5">
        <path d="M30 262h260" strokeWidth="8" />
        {books.map(([c, h, i]) => (
          <g key={i} style={{ animation: `book 3s ease-in-out ${i * 0.25}s infinite`, transformOrigin: `${60 + i * 46}px 262px` }}>
            <rect x={44 + i * 46} y={262 - h * 2.3} width="38" height={h * 2.3} rx="6" fill={c} />
            <path d={`M${53 + i * 46} ${262 - h * 2.3 + 22}h20M${53 + i * 46} ${262 - h * 2.3 + 36}h20`} strokeWidth="4" />
            <circle cx={63 + i * 46} cy={248} r="6" fill="#fff" />
          </g>
        ))}
      </g>
      <style>{'@keyframes book{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}'}</style>
    </svg>
  );
}

export function ReportArt({ className = '' }) {
  return (
    <svg viewBox="0 0 320 320" className={className} aria-hidden="true">
      <g {...base} stroke="#10272B" strokeWidth="5">
        <g style={{ animation: 'ring 2.4s ease-out infinite', transformOrigin: '160px 170px' }}><circle cx="160" cy="170" r="110" stroke="#C5472F" strokeWidth="4" /></g>
        <g style={{ animation: 'ring 2.4s ease-out 1.2s infinite', transformOrigin: '160px 170px' }}><circle cx="160" cy="170" r="110" stroke="#C5472F" strokeWidth="4" /></g>
        <path d="M160 64l108 188H52z" fill="#E0A83C" />
        <path d="M160 128v62" strokeWidth="14" />
        <circle cx="160" cy="222" r="9" fill="#10272B" />
        <g style={{ animation: 'flag 1.8s ease-in-out infinite', transformOrigin: '236px 70px' }}>
          <path d="M236 40v70" /><path d="M236 42h46l-12 18 12 18h-46z" fill="#0E5E5A" />
        </g>
      </g>
      <style>{'@keyframes ring{0%{transform:scale(.5);opacity:.9}100%{transform:scale(1.15);opacity:0}}@keyframes flag{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(8deg)}}'}</style>
    </svg>
  );
}
