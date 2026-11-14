export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** rules: { field: [(value, all) => errorMessage | '' ] } -> { field: message } */
export function validate(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, checks]) => {
    for (const check of checks) {
      const msg = check(values[field], values);
      if (msg) { errors[field] = msg; break; }
    }
  });
  return errors;
}

export const required = (label) => (v) =>
  v === undefined || v === null || String(v).trim() === '' ? `${label} is required.` : '';
export const minLength = (label, n) => (v) =>
  v && String(v).length < n ? `${label} must be at least ${n} characters.` : '';
export const email = (v) => (v && !isEmail(v) ? 'Enter a valid email address.' : '');
export const matches = (other, msg) => (v, all) => (v !== all[other] ? msg : '');
