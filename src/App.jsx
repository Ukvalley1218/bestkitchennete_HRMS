import SidebarLayout from "./layout/Sidebar";

import HRMSDashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/Employees";
import IncentiveRecords from "./pages/Incentives";
import Recruitment from "./pages/Recruitement";
import AttendanceShiftManagement from "./pages/Attendance";
import PayrollManagement from "./pages/PayrollManagement";
import LeaveManagement from "./pages/LeaveManagement";
import PerformanceManagement from "./pages/PerformanceManagement";
import CalenderTraining from "./pages/CalenderTraining";
import Compilance from "./pages/Compilance";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          {/* HRMS Routes */}
          <Route path="/hrms/dashboard" element={<HRMSDashboard />} />
          <Route path="/hrms/employees" element={<EmployeeManagement />} />
          <Route path="/hrms/incentives" element={<IncentiveRecords />} />
          <Route path="/hrms/recruitment" element={<Recruitment />} />
          <Route path="/hrms/attendance" element={<AttendanceShiftManagement />} />
          <Route path="/hrms/leave" element={<LeaveManagement />} />
          <Route path="/hrms/performance" element={<PerformanceManagement />} />
          <Route path="/hrms/calender" element={<CalenderTraining />} />
          <Route path="/hrms/compilance" element={<Compilance />} />

          {/* Payroll Routes */}
          <Route path="/hrms/payroll" element={<PayrollManagement />} />
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
  )
}
export default App