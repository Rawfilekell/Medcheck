import PageHeader from '../components/PageHeader';
import Disclaimer from '../components/Disclaimer';
import Button from '../components/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';

const limits = [
  'MedCheck cannot confirm that a physical medicine, pack or batch is genuine.',
  'A matching NAFDAC registration number does not prove authenticity — registration numbers can be copied onto fake packaging.',
  'MedCheck does not label any product counterfeit without reliable evidence.',
  'Drug interaction information is not medical advice and must be confirmed with a pharmacist or doctor.',
  'Information may be incomplete or out of date. Always follow the guidance of your healthcare provider.',
  'MedCheck is not affiliated with NAFDAC or any regulator unless explicitly stated.',
];

export default function About() {
  useDocumentTitle('About');
  return (
    <>
      <PageHeader eyebrow="About MedCheck" title="Safer choices start with better information" />
      <div className="container-page max-w-4xl space-y-6">
        <section className="card">
          <p className="label mb-3">Our mission</p>
          <p className="text-ink/80">
            MedCheck aims to help Nigerians access reliable medicine information, understand available registration details, learn about counterfeit medicines and unsafe combinations, and report concerns so that they can be reviewed.
          </p>
        </section>
        <section className="rounded-xl bg-forest p-7 text-cream">
          <p className="label !text-sun mb-4">What MedCheck cannot do</p>
          <ul className="space-y-3 text-sm text-cream/90">
            {limits.map((l) => <li key={l} className="flex gap-3"><span className="text-sun">✦</span>{l}</li>)}
          </ul>
        </section>
        <section className="card">
          <p className="label mb-3">Project status</p>
          <p className="text-ink/80">
            This is a frontend-only build. It is not connected to a backend, database or any external data source, so verification results, interaction results, accounts and report submission are not yet available.
          </p>
        </section>
        <div className="flex flex-wrap gap-3"><Button to="/verify">Verify a medicine</Button><Button to="/report" variant="outline">Report a medicine</Button></div>
        <Disclaimer />
      </div>
    </>
  );
}
