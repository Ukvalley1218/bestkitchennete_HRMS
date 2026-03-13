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

// Marketing imports
import {
  MarketingDashboard,
  CampaignManagement,
  OfflineMarketing,
  SocialMediaMarketing,
  LeadsAttribution,
  BudgetROI,
} from "../Marketing/pages";

function App() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          {/* HRMS Routes */}
          <Route path="/hrms/dashboard" element={<HRMSDashboard />} />
          <Route path="/hrms/employees" element={<EmployeeManagement />} />
          <Route path="/hrms/employees/list" element={<EmployeeManagement initialTab="employees" />} />
          <Route path="/hrms/incentives" element={<IncentiveManagement />} />
          <Route path="/hrms/leaves" element={<LeaveManagement />} />
          <Route path="/hrms/recruitment" element={<Recruitment />} />
          <Route path="/hrms/attendance" element={<AttendanceShiftManagement />} />
          <Route path="/hrms/payroll" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/salary" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/processing" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/incentive" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/payslip" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/deductions" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/reports" element={<PayrollManagement />} />
          <Route path="/hrms/payroll/settings" element={<PayrollManagement />} />
          <Route path="/hrms/leave" element={<LeaveManagement />} />
          <Route path="/hrms/performance" element={<PerformanceManagement />} />
          <Route path="/hrms/calender" element={<CalenderTraining />} />
          <Route path="/hrms/compilance" element={<Compilance />} />

          {/* Marketing Routes */}
          <Route path="/marketing/dashboard" element={<MarketingDashboard />} />
          <Route path="/marketing/campaigns" element={<CampaignManagement />} />
          <Route path="/marketing/offline" element={<OfflineMarketing />} />
          <Route path="/marketing/social" element={<SocialMediaMarketing />} />
          <Route path="/marketing/leads" element={<LeadsAttribution />} />
          <Route path="/marketing/budget" element={<BudgetROI />} />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/hrms/dashboard" replace />} />
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}
export default App;