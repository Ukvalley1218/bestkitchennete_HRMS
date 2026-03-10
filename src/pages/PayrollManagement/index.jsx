import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import PayrollDashboard from "./PayrollDashboard";
import EmployeeSalary from "./EmployeeSalary";
import IncentiveCalculator from "./IncentiveCalculator";
import PayrollProcessing from "./PayrollProcessing";
import PayslipGenerator from "./PayslipGenerator";
import {
  DashboardStatsCard,
  ChartCard,
} from "./components/DashboardStats";
import {
  MoneyIcon,
  UsersIcon,
  BuildingIcon,
  CalculatorIcon,
  FileTextIcon,
  PieChartIcon,
  SettingsIcon,
} from "./components/Icons";

// ─── Refresh Icon ──────────────────────────────────────────────────────────────
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

// ─── Menu Items ────────────────────────────────────────────────────────────────
const menuItems = [
  { id: "dashboard", label: "Payroll Dashboard", icon: <PieChartIcon />, path: "/hrms/payroll" },
  { id: "employee-salary", label: "Employee Salary", icon: <UsersIcon />, path: "/hrms/payroll/salary" },
  { id: "salary-processing", label: "Salary Processing", icon: <RefreshIcon />, path: "/hrms/payroll/processing" },
  { id: "incentive", label: "Incentive Calculator", icon: <CalculatorIcon />, path: "/hrms/payroll/incentive" },
  { id: "payslip", label: "Payslip Generator", icon: <FileTextIcon />, path: "/hrms/payroll/payslip" },
  { id: "deductions", label: "Deductions Management", icon: <MoneyIcon />, path: "/hrms/payroll/deductions" },
  { id: "reports", label: "Payroll Reports", icon: <PieChartIcon />, path: "/hrms/payroll/reports" },
  { id: "settings", label: "Payroll Settings", icon: <SettingsIcon />, path: "/hrms/payroll/settings" },
];

// ─── Payroll Management Main Component ──────────────────────────────────────────
const PayrollManagement = () => {
  const location = useLocation();

  // Determine active menu based on URL path using useMemo
  const activeMenu = useMemo(() => {
    const path = location.pathname;
    if (path === "/hrms/payroll" || path === "/hrms/payroll/") {
      return "dashboard";
    } else if (path.includes("/salary")) {
      return "employee-salary";
    } else if (path.includes("/processing")) {
      return "salary-processing";
    } else if (path.includes("/incentive")) {
      return "incentive";
    } else if (path.includes("/payslip")) {
      return "payslip";
    } else if (path.includes("/deductions")) {
      return "deductions";
    } else if (path.includes("/reports")) {
      return "reports";
    } else if (path.includes("/settings")) {
      return "settings";
    }
    return "dashboard";
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <PayrollDashboard />;
      case "employee-salary":
        return <EmployeeSalary />;
      case "salary-processing":
        return <PayrollProcessing />;
      case "incentive":
        return <IncentiveCalculator />;
      case "payslip":
        return <PayslipGenerator />;
      case "deductions":
        return <DeductionsManagement />;
      case "reports":
        return <PayrollReports />;
      case "settings":
        return <PayrollSettings />;
      default:
        return <PayrollDashboard />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-red-600">Payroll Module</h2>
          <p className="text-xs text-gray-500">Manage salaries & incentives</p>
        </div>
        <nav className="p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeMenu === item.id
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className={activeMenu === item.id ? "text-white" : "text-gray-400"}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Menu */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeMenu === item.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// ─── Deductions Management Component ────────────────────────────────────────────
const DeductionsManagement = () => {
  const deductionTypes = [
    { name: "Provident Fund (PF)", rate: "12%", description: "Employee & Employer contribution", status: "active" },
    { name: "ESIC", rate: "0.75%", description: "Employee State Insurance", status: "active" },
    { name: "Professional Tax", rate: "₹200", description: "Fixed monthly deduction", status: "active" },
    { name: "TDS", rate: "Variable", description: "Tax Deducted at Source", status: "active" },
    { name: "Loan Recovery", rate: "Custom", description: "EMI deduction from salary", status: "active" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Deductions Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">Configure and manage payroll deductions</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700">
            Add Deduction Type
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DashboardStatsCard
            icon={<MoneyIcon />}
            value="₹1,45,000"
            label="Total PF Deductions"
            sublabel="This Month"
            bgColor="#FFE3E3"
          />
          <DashboardStatsCard
            icon={<MoneyIcon />}
            value="₹18,500"
            label="Total ESIC"
            sublabel="This Month"
            bgColor="#E3F2FD"
          />
          <DashboardStatsCard
            icon={<MoneyIcon />}
            value="₹49,600"
            label="Professional Tax"
            sublabel="This Month"
            bgColor="#FFF3E0"
          />
        </div>

        <ChartCard title="Deduction Types" subtitle="Configure deduction rates">
          <div className="mt-4 space-y-3">
            {deductionTypes.map((deduction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                    <MoneyIcon />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{deduction.name}</p>
                    <p className="text-xs text-gray-500">{deduction.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-red-600">{deduction.rate}</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {deduction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

// ─── Payroll Reports Component ───────────────────────────────────────────────────
const PayrollReports = () => {
  const reports = [
    { name: "Monthly Salary Report", icon: <FileTextIcon />, lastGenerated: "28 Feb 2026" },
    { name: "Department Payroll", icon: <BuildingIcon />, lastGenerated: "28 Feb 2026" },
    { name: "Incentive Report", icon: <CalculatorIcon />, lastGenerated: "18 Mar 2026" },
    { name: "Tax Report", icon: <MoneyIcon />, lastGenerated: "31 Mar 2026" },
    { name: "PF/ESIC Report", icon: <UsersIcon />, lastGenerated: "15 Mar 2026" },
    { name: "Employee Payslip History", icon: <FileTextIcon />, lastGenerated: "28 Feb 2026" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">Generate and download payroll reports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                  {report.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {report.name}
                  </p>
                  <p className="text-xs text-gray-500">Last: {report.lastGenerated}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200">
                  View
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700">
                  Generate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Payroll Settings Component ──────────────────────────────────────────────────
const PayrollSettings = () => {
  const [settings, setSettings] = React.useState({
    pfPercentage: 12,
    esicPercentage: 0.75,
    professionalTax: 200,
    workingDays: 26,
    salaryCycle: "26th - 25th",
    paymentDate: 28,
    paymentMode: "Bank Transfer",
  });

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll Settings</h1>
          <p className="text-sm text-gray-500 mt-0.5">Configure payroll parameters</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          {/* PF Settings */}
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Provident Fund Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PF Percentage (%)</label>
                <input
                  type="number"
                  value={settings.pfPercentage}
                  onChange={(e) => setSettings({ ...settings, pfPercentage: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">PF Ceiling (₹)</label>
                <input
                  type="number"
                  defaultValue={15000}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* ESIC Settings */}
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">ESIC Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ESIC Percentage (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.esicPercentage}
                  onChange={(e) => setSettings({ ...settings, esicPercentage: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ESIC Ceiling (₹)</label>
                <input
                  type="number"
                  defaultValue={21000}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Tax */}
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Professional Tax</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly PT Amount (₹)</label>
                <input
                  type="number"
                  value={settings.professionalTax}
                  onChange={(e) => setSettings({ ...settings, professionalTax: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Salary Cycle */}
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Salary Cycle</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                <input
                  type="number"
                  value={settings.workingDays}
                  onChange={(e) => setSettings({ ...settings, workingDays: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Cycle</label>
                <select
                  value={settings.salaryCycle}
                  onChange={(e) => setSettings({ ...settings, salaryCycle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                >
                  <option>26th - 25th</option>
                  <option>1st - Last Day</option>
                  <option>21st - 20th</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                <input
                  type="number"
                  value={settings.paymentDate}
                  onChange={(e) => setSettings({ ...settings, paymentDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="p-6 bg-gray-50">
            <button className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all">
              <SettingsIcon />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;