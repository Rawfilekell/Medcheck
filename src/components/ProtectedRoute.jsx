import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, homeForRole } from '../context/AuthContext';

/**
 * Route guard. Not signed in -> /login. Signed in with the wrong role -> that role's own dashboard.
 * `role` is 'user' | 'admin'.
 */
export default function ProtectedRoute({ role }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (role && user.role !== role) return <Navigate to={homeForRole(user.role)} replace />;
  return <Outlet />;
}
