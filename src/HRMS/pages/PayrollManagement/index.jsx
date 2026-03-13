import React, { useState } from "react";
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

// ─── Tab Configuration ──────────────────────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Payroll Dashboard", icon: <PieChartIcon /> },
  { id: "employee-salary", label: "Employee Salary", icon: <UsersIcon /> },
  { id: "salary-processing", label: "Salary Processing", icon: <BuildingIcon /> },
  { id: "incentive", label: "Incentive Calculator", icon: <CalculatorIcon /> },
  { id: "payslip", label: "Payslip Generator", icon: <FileTextIcon /> },
  { id: "deductions", label: "Deductions", icon: <MoneyIcon /> },
  { id: "reports", label: "Reports", icon: <PieChartIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

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
  const [settings, setSettings] = useState({
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

// ─── Payroll Management Main Component ──────────────────────────────────────────
const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
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
    <div className="bg-gray-50 min-h-screen">
      {/* Horizontal Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap
                  border-b-2 transition-colors duration-200
                  ${activeTab === tab.id
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                <span className="w-4 h-4">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default PayrollManagement;