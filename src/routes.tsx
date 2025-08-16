import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import CandidatesPage from './pages/Candidates';
import ClientsPage from './pages/Clients';
import JobsPage from './pages/Jobs';
import UsersPage from './pages/Users';
import LoginPage from './pages/Auth/Login';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/candidates" element={<CandidatesPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<div className="p-8">Not Found</div>} />
    </Routes>
  );
}