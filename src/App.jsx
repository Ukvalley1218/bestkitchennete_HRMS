import SidebarLayout from "./layout/Sidebar";

import HRMSDashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import IncentiveManagement from "./pages/IncentiveManagement";
import Recruitment from "./pages/Recruitement";
import AttendanceShiftManagement from "./pages/AttendanceShiftManagement";
import PayrollManagement from "./pages/Payroll";
import PerformanceManagement from "./pages/PerformanceManagement";
import CalenderTraining from "./pages/CalenderTraining";
import Compilance from "./pages/Compilance";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LeaveManagement from "./pages/LeaveManagement";

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/hrms/dashboard" element={<HRMSDashboard />} />

          {/* Employee Management Routes */}
          <Route path="/hrms/employees" element={<EmployeeManagement />} />
          <Route path="/hrms/employees/list" element={<EmployeeManagement initialTab="employees" />} />

          <Route path="/hrms/incentives" element={<IncentiveManagement />} />
          <Route path="/hrms/leaves" element={<LeaveManagement />} />
          <Route path="/hrms/recruitment" element={<Recruitment />} />
          <Route path="/hrms/attendance" element={<AttendanceShiftManagement />} />
          <Route path="/hrms/payroll" element={<PayrollManagement />} />
          <Route path="/hrms/performance" element={<PerformanceManagement />} />
          <Route path="/hrms/calender" element={<CalenderTraining />} />
          <Route path="/hrms/compilance" element={<Compilance />} />

          {/* Payroll Routes */}
          <Route path="/hrms/payroll/salary" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/processing" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/incentive" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/payslip" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/deductions" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/reports" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/settings" element={<PayrollManagement />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/hrms/dashboard" replace />} />
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}
export default App;
