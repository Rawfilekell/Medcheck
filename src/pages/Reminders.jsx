import { useState } from 'react';
import Field, { TextInput, Select, Textarea } from '../components/Field';
import EmptyState from '../components/EmptyState';
import Notice from '../components/Notice';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { reminderService } from '../services/reminderService';
import { validate, required } from '../utils/validators';
import { FREQUENCIES } from '../utils/constants';

const blank = { medicineName: '', dose: '', time: '', frequency: '', notes: '' };

export default function Reminders() {
  useDocumentTitle('Medication Reminders');
  const [items, setItems] = useState(() => reminderService.list());
  const [values, setValues] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const set = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values, { medicineName: [required('Medicine name')], time: [required('Time')], frequency: [required('Frequency')] });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setItems(editingId ? reminderService.update(editingId, values) : reminderService.create(values));
    setValues(blank); setEditingId(null);
  };
  const edit = (r) => { setEditingId(r.id); setValues({ medicineName: r.medicineName, dose: r.dose || '', time: r.time, frequency: r.frequency, notes: r.notes || '' }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const remove = (r) => {
    if (!window.confirm(`Delete the reminder for ${r.medicineName}?`)) return;
    setItems(reminderService.remove(r.id));
    if (editingId === r.id) { setEditingId(null); setValues(blank); }
  };

  return (
    <div>
      <h1 className="text-4xl text-forest">Medication reminders</h1>
      <Notice className="mt-4" tone="warn" title="Reminders are a list only">
        Reminders are saved in this browser on this device. MedCheck does not send notifications, alarms or messages, so do not rely on it to alert you. Follow your prescriber’s instructions.
      </Notice>
      <form onSubmit={onSubmit} noValidate className="card mt-6 grid gap-4 sm:grid-cols-2">
        <p className="label sm:col-span-2">{editingId ? 'Edit reminder' : 'New reminder'}</p>
        <Field label="Medicine name *" id="medicineName" error={errors.medicineName}><TextInput id="medicineName" name="medicineName" value={values.medicineName} onChange={set} error={errors.medicineName} /></Field>
        <Field label="Dose (as prescribed)" id="dose"><TextInput id="dose" name="dose" value={values.dose} onChange={set} /></Field>
        <Field label="Time *" id="time" error={errors.time}><TextInput id="time" name="time" type="time" value={values.time} onChange={set} error={errors.time} /></Field>
        <Field label="Frequency *" id="frequency" error={errors.frequency}>
          <Select id="frequency" name="frequency" value={values.frequency} onChange={set} error={errors.frequency}><option value="">Select…</option>{FREQUENCIES.map((f) => <option key={f}>{f}</option>)}</Select>
        </Field>
        <Field label="Notes" id="notes" className="sm:col-span-2"><Textarea id="notes" name="notes" rows={2} value={values.notes} onChange={set} /></Field>
        <div className="flex gap-3 sm:col-span-2">
          <button className="btn btn-primary">{editingId ? 'Save changes' : 'Add reminder'}</button>
          {editingId && <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setValues(blank); setErrors({}); }}>Cancel</button>}
        </div>
      </form>

      <div className="mt-8 space-y-3">
        {items.length === 0 && <EmptyState title="No reminders yet">Add your first reminder above.</EmptyState>}
        {items.map((r) => (
          <div key={r.id} className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-2xl text-forest">{r.medicineName}{r.dose && <span className="ml-2 text-base text-ink/60">{r.dose}</span>}</p>
              <p className="text-sm text-ink/70">{r.time} · {r.frequency}</p>
              {r.notes && <p className="mt-1 text-sm text-ink/60">{r.notes}</p>}
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline !py-2" onClick={() => edit(r)}>Edit</button>
              <button className="btn btn-danger !py-2" onClick={() => remove(r)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
