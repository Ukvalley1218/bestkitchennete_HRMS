import SidebarLayout from "./layout/Sidebar";

import HRMSDashboard from "./pages/Dashboard";
import EmployeeManagement from "./pages/Employees";
import IncentiveRecords from "./pages/Incentives";
import Recruitment from "./pages/Recruitement";
import AttendanceShiftManagement from "./pages/AttendanceShiftManagement";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PayrollManagement from "./pages/Payroll";
import LeaveManagement from "./pages/LeaveManagement";
import PerformanceManagement from "./pages/PerformanceManagement";
import CalenderTraining from "./pages/CalenderTraining";
import Compilance from "./pages/Compilance";
function App() {
  return (
    <BrowserRouter>
      <SidebarLayout>
        <Routes>
          <Route path="/hrms/dashboard" element={<HRMSDashboard />} />
          <Route path="/hrms/employees" element={<EmployeeManagement />} />
          <Route path="/hrms/incentives" element={<IncentiveRecords />} />
          <Route path="/hrms/recruitment" element={<Recruitment />} />
          <Route
            path="/hrms/attendance"
            element={<AttendanceShiftManagement />}
          />
          <Route path="/hrms/payroll" element={<PayrollManagement />} />
          <Route path="/hrms/leave" element={<LeaveManagement />} />
          <Route path="/hrms/performance" element={<PerformanceManagement />} />
          <Route path="/hrms/performance" element={<PerformanceManagement />} />
          <Route path="/hrms/calender" element={<CalenderTraining />} />
          <Route path="/hrms/compilance" element={<Compilance />} />
        </Routes>
      </SidebarLayout>
    </BrowserRouter>
  );
}
export default App;
