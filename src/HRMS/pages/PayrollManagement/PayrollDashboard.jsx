import React, { useState } from "react";
import {
  PlusIcon,
  DownloadIcon,
  BarChartIcon,
  PieChartIcon,
} from "./components/Icons";
import {
  DashboardStatsCard,
  ProgressCard,
  ChartCard,
  TimelineStep,
} from "./components/DashboardStats";
import {
  dashboardKPIs,
  departmentPayroll,
  payrollProcessingSteps,
  payrollTrendData,
  departmentCostDistribution,
  topIncentiveEarners,
} from "./data/payrollData";
import { formatCurrency } from "./utils/payrollCalculations";
import { UserIcon } from "lucide-react";

// ─── Icon Components (defined outside render) ───────────────────────────────────
const TotalPaidIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A60000" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PayrollIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A60000" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IncentiveIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A60000" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A60000" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AverageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A60000" strokeWidth="2">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

// ─── Payroll Dashboard Component ────────────────────────────────────────────────
const PayrollDashboard = () => {
  const [activePeriod, setActivePeriod] = useState("thisMonth");

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage salaries, incentives & deductions</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Period Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActivePeriod("thisMonth")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePeriod === "thisMonth"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setActivePeriod("lastMonth")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePeriod === "lastMonth"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Last Month
              </button>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg">
              <PlusIcon />
              Process Payroll
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <DashboardStatsCard
            icon={<TotalPaidIcon />}
            value={dashboardKPIs.totalEmployeesPaid.value}
            label={dashboardKPIs.totalEmployeesPaid.label}
            sublabel={dashboardKPIs.totalEmployeesPaid.sublabel}
            trend={dashboardKPIs.totalEmployeesPaid.trend}
            trendColor="green"
          />
          <DashboardStatsCard
            icon={<PayrollIcon />}
            value={dashboardKPIs.totalPayrollAmount.value}
            label={dashboardKPIs.totalPayrollAmount.label}
            sublabel={dashboardKPIs.totalPayrollAmount.sublabel}
            trend={dashboardKPIs.totalPayrollAmount.trend}
            trendColor="green"
          />
          <DashboardStatsCard
            icon={<IncentiveIcon />}
            value={dashboardKPIs.totalIncentivePaid.value}
            label={dashboardKPIs.totalIncentivePaid.label}
            sublabel={dashboardKPIs.totalIncentivePaid.sublabel}
            trend={dashboardKPIs.totalIncentivePaid.trend}
            trendColor="green"
          />
          <DashboardStatsCard
            icon={<PendingIcon />}
            value={dashboardKPIs.pendingPayroll.value}
            label={dashboardKPIs.pendingPayroll.label}
            sublabel={dashboardKPIs.pendingPayroll.sublabel}
            trend={dashboardKPIs.pendingPayroll.trend}
            trendColor="red"
          />
          <DashboardStatsCard
            icon={<AverageIcon />}
            value={dashboardKPIs.averageSalary.value}
            label={dashboardKPIs.averageSalary.label}
            sublabel={dashboardKPIs.averageSalary.sublabel}
            trend={dashboardKPIs.averageSalary.trend}
            trendColor="green"
          />
          <ProgressCard
           icon={<UserIcon />}
            title={dashboardKPIs.processingStatus.value}
            subtitle={dashboardKPIs.processingStatus.label}
            progress={dashboardKPIs.processingStatus.progress}
            status="processing"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Payroll Processing Timeline */}
          <div className="lg:col-span-1">
            <ChartCard title="Payroll Processing Timeline" subtitle="February 2026">
              <div className="mt-4">
                {payrollProcessingSteps.map((step, index) => (
                  <TimelineStep
                    key={step.step}
                    step={step.step}
                    title={step.title}
                    subtitle={step.subtitle}
                    status={step.status}
                    isLast={index === payrollProcessingSteps.length - 1}
                  />
                ))}
              </div>
            </ChartCard>
          </div>

          {/* Right Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payroll Trend Chart */}
            <ChartCard
              title="Payroll Cost Trend"
              subtitle="Last 7 months"
              action={
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                  <BarChartIcon />
                </button>
              }
            >
              <div className="mt-4">
                <div className="flex items-end justify-between h-48 gap-2">
                  {payrollTrendData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-1">
                        <div
                          className="w-full bg-red-500 rounded-t transition-all duration-300 hover:bg-red-600"
                          style={{ height: `${(item.amount / 3000000) * 150}px` }}
                          title={`Payroll: ${formatCurrency(item.amount)}`}
                        />
                        <div
                          className="w-full bg-green-500 rounded-t transition-all duration-300 hover:bg-green-600"
                          style={{ height: `${(item.incentive / 400000) * 80}px` }}
                          title={`Incentive: ${formatCurrency(item.incentive)}`}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{item.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-red-500" />
                    <span className="text-xs text-gray-500">Payroll</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-green-500" />
                    <span className="text-xs text-gray-500">Incentive</span>
                  </div>
                </div>
              </div>
            </ChartCard>

            {/* Department Distribution & Top Earners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department Cost Distribution */}
              <ChartCard
                title="Department Cost"
                subtitle="Distribution"
                action={
                  <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                    <PieChartIcon />
                  </button>
                }
              >
                <div className="mt-4 space-y-3">
                  {departmentCostDistribution.map((dept, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                      <span className="text-sm text-gray-700 flex-1">{dept.department}</span>
                      <span className="text-sm font-semibold text-gray-900">{dept.percentage}%</span>
                    </div>
                  ))}
                </div>
              </ChartCard>

              {/* Top Incentive Earners */}
              <ChartCard title="Top Incentive Earners" subtitle="This month">
                <div className="mt-4 space-y-3">
                  {topIncentiveEarners.map((earner, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm font-bold">
                        {earner.rank}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{earner.name}</p>
                        <p className="text-xs text-gray-500">{earner.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">{earner.incentive}</p>
                        <p className="text-xs text-gray-500">{earner.target} target</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </div>
        </div>

        {/* Department-wise Salary Table */}
        <ChartCard title="Department-wise Salary Breakdown" subtitle="February 2026">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employees</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Salary</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg. Salary</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Overtime</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deductions</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Net Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {departmentPayroll.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                          <span className="text-red-600 text-sm font-bold">{row.department.charAt(0)}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">{row.department}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{row.employees}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">{formatCurrency(row.totalSalary)}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{formatCurrency(row.avgSalary)}</td>
                    <td className="px-4 py-4 text-sm text-green-600 font-medium">{formatCurrency(row.overtime)}</td>
                    <td className="px-4 py-4 text-sm text-red-600 font-medium">{formatCurrency(row.deductions)}</td>
                    <td className="px-4 py-4 text-sm font-bold text-gray-900">{formatCurrency(row.netAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Total: <span className="font-semibold text-gray-900">{formatCurrency(departmentPayroll.reduce((sum, d) => sum + d.netAmount, 0))}</span>
            </p>
            <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
              <DownloadIcon />
              Export Report
            </button>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default PayrollDashboard;