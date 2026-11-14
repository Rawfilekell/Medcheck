import { useCallback, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Field, { TextInput } from '../components/Field';
import ServiceState from '../components/ServiceState';
import useAsyncAction from '../hooks/useAsyncAction';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAuth, homeForRole } from '../context/AuthContext';
import { validate, required, email } from '../utils/validators';

export default function Login() {
  useDocumentTitle('Login');
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const auth = useAuth();
  const location = useLocation();
  const login = useAsyncAction(useCallback((c) => auth.login(c), [auth.login]));

  // Signed in (already, or just now): the account's role decides the destination.
  // A page they were bounced from is honoured only if their role may open it.
  if (auth.user) {
    const from = location.state?.from;
    const allowed = from && (auth.user.role === 'admin' ? from.startsWith('/admin') : !from.startsWith('/admin'));
    return <Navigate to={allowed ? from : homeForRole(auth.user.role)} replace />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values, { email: [required('Email'), email], password: [required('Password')] });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    login.run(values);
  };
  const set = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <>
      <PageHeader eyebrow="Login" title="Welcome back" />
      <div className="container-page max-w-md pb-6">
        <form onSubmit={onSubmit} noValidate className="card space-y-5">
          <Field label="Email" id="email" error={errors.email}><TextInput id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={set} error={errors.email} /></Field>
          <Field label="Password" id="password" error={errors.password}><TextInput id="password" name="password" type="password" autoComplete="current-password" value={values.password} onChange={set} error={errors.password} /></Field>
          <button className="btn btn-primary w-full" disabled={login.loading}>{login.loading ? 'Signing in…' : 'Login'}</button>
          <ServiceState loading={login.loading} error={login.error} />
          <p className="text-center text-sm text-ink/60">No account? <Link to="/register" className="text-forest underline">Register</Link></p>
        </form>
      </div>
    </>
  );
}
