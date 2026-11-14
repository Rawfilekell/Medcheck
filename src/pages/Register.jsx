import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Field, { TextInput } from '../components/Field';
import ServiceState from '../components/ServiceState';
import useAsyncAction from '../hooks/useAsyncAction';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { authService } from '../services/authService';
import { validate, required, email, minLength, matches } from '../utils/validators';

export default function Register() {
  useDocumentTitle('Register');
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const reg = useAsyncAction(useCallback((d) => authService.register(d), []));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values, {
      name: [required('Full name')],
      email: [required('Email'), email],
      password: [required('Password'), minLength('Password', 8)],
      confirm: [required('Confirmation'), matches('password', 'Passwords do not match.')],
    });
    setErrors(errs);
    if (!Object.keys(errs).length) reg.run({ name: values.name, email: values.email, password: values.password });
  };
  const set = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <>
      <PageHeader eyebrow="Register" title="Create your account" />
      <div className="container-page max-w-md pb-6">
        <form onSubmit={onSubmit} noValidate className="card space-y-5">
          <Field label="Full name" id="name" error={errors.name}><TextInput id="name" name="name" autoComplete="name" value={values.name} onChange={set} error={errors.name} /></Field>
          <Field label="Email" id="email" error={errors.email}><TextInput id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={set} error={errors.email} /></Field>
          <Field label="Password" id="password" error={errors.password} hint="At least 8 characters."><TextInput id="password" name="password" type="password" autoComplete="new-password" value={values.password} onChange={set} error={errors.password} /></Field>
          <Field label="Confirm password" id="confirm" error={errors.confirm}><TextInput id="confirm" name="confirm" type="password" autoComplete="new-password" value={values.confirm} onChange={set} error={errors.confirm} /></Field>
          <button className="btn btn-primary w-full" disabled={reg.loading}>{reg.loading ? 'Creating…' : 'Register'}</button>
          <ServiceState loading={reg.loading} error={reg.error} />
          <p className="text-center text-sm text-ink/60">Already registered? <Link to="/login" className="text-forest underline">Login</Link></p>
        </form>
      </div>
    </>
  );
}
