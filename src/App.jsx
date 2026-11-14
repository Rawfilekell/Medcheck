import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Verify from './pages/Verify';
import MedicineDetails from './pages/MedicineDetails';
import Interactions from './pages/Interactions';
import Library from './pages/Library';
import Report from './pages/Report';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SavedMedicines from './pages/SavedMedicines';
import Reminders from './pages/Reminders';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageMedicines from './pages/admin/ManageMedicines';
import ManageReports from './pages/admin/ManageReports';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const userLinks = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/saved', label: 'Saved' },
  { to: '/reminders', label: 'Reminders' },
];
const adminLinks = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/medicines', label: 'Medicines' },
  { to: '/admin/reports', label: 'Reports' },
];

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="verify" element={<Verify />} />
        <Route path="medicines/:id" element={<MedicineDetails />} />
        <Route path="interactions" element={<Interactions />} />
        <Route path="library" element={<Library />} />
        <Route path="report" element={<Report />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Signed-in users. Admins who land here are sent to /admin. */}
        <Route element={<ProtectedRoute role="user" />}>
          <Route element={<DashboardLayout title="Your space" links={userLinks} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="saved" element={<SavedMedicines />} />
          </Route>
        </Route>

        {/* Reminders are stored on this device only, so they stay usable without an account. */}
        <Route element={<DashboardLayout title="Your space" links={userLinks} />}>
          <Route path="reminders" element={<Reminders />} />
        </Route>

        {/* Admins only. Regular users who land here are sent to /dashboard. */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="admin" element={<DashboardLayout title="Admin" links={adminLinks} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="medicines" element={<ManageMedicines />} />
            <Route path="reports" element={<ManageReports />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
