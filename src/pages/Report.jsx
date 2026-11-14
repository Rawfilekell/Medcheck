import { useCallback, useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Field, { TextInput, Select, Textarea } from '../components/Field';
import ServiceState from '../components/ServiceState';
import Notice from '../components/Notice';
import Disclaimer from '../components/Disclaimer';
import useAsyncAction from '../hooks/useAsyncAction';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { reportService } from '../services/reportService';
import { validate, required, minLength } from '../utils/validators';
import { REPORT_TYPES, NIGERIAN_STATES, MAX_IMAGES, MAX_IMAGE_MB } from '../utils/constants';

const initial = { reportType: '', medicineName: '', brandName: '', manufacturer: '', nafdacNumber: '', batchNumber: '', expiryDate: '', purchasePlace: '', state: '', description: '' };
const rules = {
  reportType: [required('Report type')],
  medicineName: [required('Medicine name')],
  state: [required('State')],
  description: [required('Description'), minLength('Description', 20)],
};

export default function Report() {
  useDocumentTitle('Report a Medicine');
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]); // { file, url }
  const [imageError, setImageError] = useState('');
  const submit = useAsyncAction(useCallback((fd) => reportService.submit(fd), []));

  useEffect(() => () => images.forEach((i) => URL.revokeObjectURL(i.url)), []); // eslint-disable-line

  const set = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const addImages = (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    const next = [...images];
    let err = '';
    for (const f of files) {
      if (!f.type.startsWith('image/')) { err = `“${f.name}” is not an image.`; continue; }
      if (f.size > MAX_IMAGE_MB * 1024 * 1024) { err = `“${f.name}” is larger than ${MAX_IMAGE_MB} MB.`; continue; }
      if (next.length >= MAX_IMAGES) { err = `You can attach up to ${MAX_IMAGES} images.`; break; }
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    setImageError(err);
    setImages(next);
  };
  const removeImage = (i) => { URL.revokeObjectURL(images[i].url); setImages(images.filter((_, idx) => idx !== i)); };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values, rules);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, v));
    images.forEach((i) => fd.append('images', i.file));
    submit.run(fd);
  };

  return (
    <>
      <PageHeader eyebrow="Report a Medicine" title="Report a suspicious or unsafe medicine">
        Share what you know about a suspected counterfeit, substandard or unsafe product.
      </PageHeader>
      <div className="container-page max-w-3xl">
        <Notice tone="warn" title="Reports cannot be submitted yet" className="mb-6">
          There is no backend to receive reports. You can complete and check this form, but nothing will be sent or recorded, and you will not receive a confirmation. If a medicine has harmed you, seek medical care immediately and contact the relevant authorities directly.
        </Notice>
        <form onSubmit={onSubmit} noValidate className="card grid gap-5 sm:grid-cols-2">
          <Field label="Type of concern *" id="reportType" error={errors.reportType}>
            <Select id="reportType" name="reportType" value={values.reportType} onChange={set} error={errors.reportType}>
              <option value="">Select…</option>{REPORT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="Medicine name *" id="medicineName" error={errors.medicineName}>
            <TextInput id="medicineName" name="medicineName" value={values.medicineName} onChange={set} error={errors.medicineName} />
          </Field>
          <Field label="Brand name" id="brandName"><TextInput id="brandName" name="brandName" value={values.brandName} onChange={set} /></Field>
          <Field label="Manufacturer (as printed)" id="manufacturer"><TextInput id="manufacturer" name="manufacturer" value={values.manufacturer} onChange={set} /></Field>
          <Field label="NAFDAC reg. number (as printed)" id="nafdacNumber"><TextInput id="nafdacNumber" name="nafdacNumber" value={values.nafdacNumber} onChange={set} /></Field>
          <Field label="Batch number" id="batchNumber"><TextInput id="batchNumber" name="batchNumber" value={values.batchNumber} onChange={set} /></Field>
          <Field label="Expiry date (as printed)" id="expiryDate"><TextInput id="expiryDate" name="expiryDate" type="month" value={values.expiryDate} onChange={set} /></Field>
          <Field label="Where was it bought or found?" id="purchasePlace"><TextInput id="purchasePlace" name="purchasePlace" value={values.purchasePlace} onChange={set} placeholder="Shop, market or pharmacy name" /></Field>
          <Field label="State *" id="state" error={errors.state}>
            <Select id="state" name="state" value={values.state} onChange={set} error={errors.state}>
              <option value="">Select…</option>{NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
            </Select>
          </Field>
          <Field label="What did you notice? *" id="description" error={errors.description} hint="Describe the packaging, taste, appearance or effects. Stick to what you observed." className="sm:col-span-2">
            <Textarea id="description" name="description" value={values.description} onChange={set} error={errors.description} />
          </Field>

          <div className="sm:col-span-2">
            <p className="mb-1.5 text-sm font-medium text-forest">Photos (optional)</p>
            <label htmlFor="images" className="flex cursor-pointer flex-col items-center rounded-2xl border border-forest/40 bg-cream px-4 py-6 text-center text-sm text-ink/70 hover:bg-sun/20">
              <span className="font-medium text-forest">Choose images</span>
              <span className="text-xs">Up to {MAX_IMAGES} images, {MAX_IMAGE_MB} MB each. Not uploaded anywhere.</span>
              <input id="images" type="file" accept="image/*" multiple onChange={addImages} className="sr-only" />
            </label>
            {imageError && <p className="mt-2 text-xs text-clay" role="alert">{imageError}</p>}
            {images.length > 0 && (
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {images.map((img, i) => (
                  <li key={img.url} className="relative overflow-hidden rounded-2xl border border-line">
                    <img src={img.url} alt={`Attachment ${i + 1}`} className="h-24 w-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} aria-label={`Remove image ${i + 1}`} className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-forest text-xs text-cream">×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="sm:col-span-2">
            <button type="submit" disabled={submit.loading} className="btn btn-primary w-full sm:w-auto">{submit.loading ? 'Submitting…' : 'Submit report'}</button>
          </div>
          <div className="sm:col-span-2"><ServiceState loading={submit.loading} error={submit.error} loadingLabel="Submitting…" /></div>
        </form>
        <Disclaimer className="mt-8" />
      </div>
    </>
  );
}
