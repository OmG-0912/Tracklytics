import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import DashboardLayout from './layouts/DashboardLayout';

import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import GoalCreation from './pages/employee/GoalCreation';
import QuarterlyCheckin from './pages/employee/QuarterlyCheckin';

import ManagerApproval from './pages/manager/ManagerApproval';

import AdminDashboard from './pages/admin/AdminDashboard';
import SharedGoals from './pages/admin/SharedGoals';
import Reporting from './pages/admin/Reporting';
import AuditTrail from './pages/admin/AuditTrail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<DashboardLayout />}>
          {/* Employee Routes */}
          <Route path="/employee" element={<EmployeeDashboard />} />
          <Route path="/employee/goals/new" element={<GoalCreation />} />
          <Route path="/employee/checkin" element={<QuarterlyCheckin />} />
          <Route path="/employee/shared-goals" element={<SharedGoals />} />
          <Route path="/employee/reports" element={<Reporting />} />
          
          {/* Manager Routes */}
          <Route path="/manager" element={<Navigate to="/manager/overview" />} />
          <Route path="/manager/overview" element={<EmployeeDashboard />} />
          <Route path="/manager/approvals" element={<ManagerApproval />} />
          <Route path="/manager/check-ins" element={<QuarterlyCheckin />} />
          <Route path="/manager/shared-goals" element={<SharedGoals />} />
          <Route path="/manager/analytics" element={<Reporting />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/approvals" element={<ManagerApproval />} />
          <Route path="/admin/shared-goals" element={<SharedGoals />} />
          <Route path="/admin/analytics" element={<Reporting />} />
          <Route path="/admin/audit" element={<AuditTrail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
