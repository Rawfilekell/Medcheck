import { uid } from '../utils/format';

const KEY = 'medcheck.reminders.v1';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* storage unavailable */ }
  return list;
}

/** Reminders are user-created and stored in this browser only. Swap for API calls when a backend is added. */
export const reminderService = {
  list: () => read(),
  create: (data) => write([{ ...data, id: uid(), createdAt: Date.now() }, ...read()]),
  update: (id, data) => write(read().map((r) => (r.id === id ? { ...r, ...data } : r))),
  remove: (id) => write(read().filter((r) => r.id !== id)),
};
