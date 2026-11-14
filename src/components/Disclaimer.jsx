export default function Disclaimer({ className = '' }) {
  return (
    <div className={`rounded-2xl border border-ink/25 bg-paper p-6 text-sm leading-relaxed text-ink/80 ${className}`} role="note">
      <p className="label mb-2">℞ Important disclaimer</p>
      <p>
        MedCheck provides general information only. It is not medical advice and does not replace a doctor or pharmacist.
        A matching NAFDAC registration number does <strong>not</strong> prove that a physical medicine is genuine, and MedCheck
        cannot confirm whether a specific pack, batch or tablet is authentic. Never label a product counterfeit without reliable evidence.
        If you feel unwell after taking a medicine, seek medical care immediately.
      </p>
    </div>
  );
}
