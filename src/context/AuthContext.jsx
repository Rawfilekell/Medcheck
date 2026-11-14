import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { authService } from '../services/authService';

const KEY = 'medcheck.session.v1';
const AuthContext = createContext(null);

const readSession = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const s = raw ? JSON.parse(raw) : null;
    return s && s.user && s.user.role ? s : null;
  } catch {
    return null;
  }
};

/** Where each role lands after signing in. */
export const homeForRole = (role) => (role === 'admin' ? '/admin' : '/dashboard');

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  /** Resolves with the signed-in user so callers can redirect by role. */
  const login = useCallback(async (credentials) => {
    const result = await authService.login(credentials); // -> { token, user: { id, name, email, role } }
    const next = { token: result.token, user: result.user };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
    setSession(next);
    return next.user;
  }, []);

  const logout = useCallback(() => {
    try { localStorage.removeItem(KEY); } catch { /* storage unavailable */ }
    setSession(null);
  }, []);

  const value = useMemo(() => ({ user: session?.user || null, token: session?.token || null, login, logout }), [session, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
