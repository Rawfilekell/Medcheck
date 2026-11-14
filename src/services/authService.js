import { unavailable } from './api';

/**
 * login(credentials) must resolve with:
 *   { token: string, user: { id, name, email, role: 'user' | 'admin' } }
 * One endpoint serves both regular users and admins; the returned `role` decides
 * which dashboard the Login page sends them to.
 */
export const authService = {
  login: (credentials) => unavailable('Sign in', credentials),
  register: (details) => unavailable('Account registration', details),
};
