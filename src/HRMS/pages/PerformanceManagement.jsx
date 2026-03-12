import { useState, useMemo } from "react";
import {
  Target,
  TrendingUp,
  TrendingDown,
  Clock,
  FileText,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  UserX,
  ChevronDown,
  Eye,
  Edit2,
  Filter,
  Download,
  RefreshCw,
  MessageSquare,
  Flag,
  Star,
  Briefcase,
  DollarSign,
  AlertCircle,
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────
const departments = [
  { id: "all", name: "All Departments" },
  { id: "sales", name: "Sales" },
  { id: "design", name: "Interior Design" },
  { id: "production", name: "Production" },
  { id: "recruitment", name: "Recruitment HR" },
  { id: "it", name: "IT" },
  { id: "marketing", name: "Marketing" },
];

const kpiGroups = [
  { id: "sales", name: "Sales Team KPIs", department: "sales" },
  { id: "design", name: "Design Team KPIs", department: "design" },
  { id: "production", name: "Production KPIs", department: "production" },
  { id: "recruitment", name: "Recruitment KPIs", department: "recruitment" },
];

const employees = [
  {
    id: "EMP001",
    name: "Rajesh Kumar",
    department: "Sales",
    designation: "Senior Sales Executive",
    kpiGroup: "sales",
    doj: "2022-03-15",
    basicSalary: 35000,
    status: "active",
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    department: "Interior Design",
    designation: "Lead Designer",
    kpiGroup: "design",
    doj: "2021-08-20",
    basicSalary: 45000,
    status: "active",
  },
  {
    id: "EMP003",
    name: "Amit Patel",
    department: "Production",
    designation: "Production Manager",
    kpiGroup: "production",
    doj: "2020-01-10",
    basicSalary: 50000,
    status: "active",
  },
  {
    id: "EMP004",
    name: "Sneha Gupta",
    department: "Recruitment HR",
    designation: "HR Executive",
    kpiGroup: "recruitment",
    doj: "2023-02-01",
    basicSalary: 28000,
    status: "active",
  },
  {
    id: "EMP005",
    name: "Vikram Singh",
    department: "Sales",
    designation: "Sales Manager",
    kpiGroup: "sales",
    doj: "2019-06-15",
    basicSalary: 55000,
    status: "active",
  },
  {
    id: "EMP006",
    name: "Neha Reddy",
    department: "Interior Design",
    designation: "Junior Designer",
    kpiGroup: "design",
    doj: "2024-01-05",
    basicSalary: 25000,
    status: "active",
  },
];

// KPI Definitions by Role
const kpiDefinitions = {
  sales: [
    { id: "revenue", name: "Revenue Generated", unit: "₹", target: 500000 },
    { id: "calls", name: "Calls Made", unit: "calls", target: 100 },
    { id: "leads", name: "Leads Generated", unit: "leads", target: 30 },
    { id: "conversions", name: "Deals Closed", unit: "deals", target: 5 },
  ],
  design: [
    { id: "designs", name: "Unique Designs Created", unit: "designs", target: 15 },
    { id: "kitchens", name: "Kitchen Designs", unit: "rooms", target: 5 },
    { id: "bedrooms", name: "Bedroom Designs", unit: "rooms", target: 4 },
    { id: "pdfs", name: "PDF Proposals Generated", unit: "pdfs", target: 10 },
  ],
  production: [
    { id: "units", name: "Units Produced", unit: "units", target: 500 },
    { id: "quality", name: "Quality Score", unit: "%", target: 95 },
    { id: "efficiency", name: "Efficiency Rate", unit: "%", target: 90 },
    { id: "downtime", name: "Min Downtime", unit: "hrs", target: 5 },
  ],
  recruitment: [
    { id: "calls", name: "Calls Made", unit: "calls", target: 80 },
    { id: "screened", name: "Candidates Screened", unit: "candidates", target: 40 },
    { id: "interviews", name: "Interviews Scheduled", unit: "interviews", target: 15 },
    { id: "onboards", name: "Successful Onboards", unit: "hires", target: 3 },
  ],
};

// Employee KPI Performance Data
const employeeKpiData = [
  {
    employeeId: "EMP001",
    month: "March 2026",
    kpis: [
      { id: "revenue", target: 500000, achieved: 520000, score: 4.8 },
      { id: "calls", target: 100, achieved: 95, score: 4.0 },
      { id: "leads", target: 30, achieved: 35, score: 4.5 },
      { id: "conversions", target: 5, achieved: 6, score: 5.0 },
    ],
    overallScore: 4.6,
    dwrCompliance: 95,
    attendanceScore: 4.2,
    finalRating: 4.4,
    incentiveEarned: 12000,
    challenges: ["Client negotiation delays", "Lead quality issues"],
    goodNews: ["Closed major deal with ABC Corp", "Exceeded monthly target"],
  },
  {
    employeeId: "EMP002",
    month: "March 2026",
    kpis: [
      { id: "designs", target: 15, achieved: 18, score: 5.0 },
      { id: "kitchens", target: 5, achieved: 7, score: 5.0 },
      { id: "bedrooms", target: 4, achieved: 4, score: 4.0 },
      { id: "pdfs", target: 10, achieved: 12, score: 4.5 },
    ],
    overallScore: 4.6,
    dwrCompliance: 100,
    attendanceScore: 4.8,
    finalRating: 4.7,
    incentiveEarned: 8500,
    challenges: ["Material sourcing delays", "Client revision requests"],
    goodNews: ["Design featured in magazine", "3 clients approved first draft"],
  },
  {
    employeeId: "EMP003",
    month: "March 2026",
    kpis: [
      { id: "units", target: 500, achieved: 480, score: 4.0 },
      { id: "quality", target: 95, achieved: 92, score: 3.8 },
      { id: "efficiency", target: 90, achieved: 88, score: 3.9 },
      { id: "downtime", target: 5, achieved: 6, score: 3.5 },
    ],
    overallScore: 3.8,
    dwrCompliance: 90,
    attendanceScore: 4.0,
    finalRating: 3.9,
    incentiveEarned: 4500,
    challenges: ["Machine breakdown", "Raw material shortage"],
    goodNews: ["Zero safety incidents", "Team efficiency improved"],
  },
  {
    employeeId: "EMP004",
    month: "March 2026",
    kpis: [
      { id: "calls", target: 80, achieved: 85, score: 4.5 },
      { id: "screened", target: 40, achieved: 45, score: 4.8 },
      { id: "interviews", target: 15, achieved: 12, score: 3.5 },
      { id: "onboards", target: 3, achieved: 3, score: 4.0 },
    ],
    overallScore: 4.2,
    dwrCompliance: 100,
    attendanceScore: 4.5,
    finalRating: 4.3,
    incentiveEarned: 5000,
    challenges: ["Candidate no-shows", "Salary negotiation issues"],
    goodNews: ["Hired 2 senior developers", "Reduced time-to-hire by 20%"],
  },
  {
    employeeId: "EMP005",
    month: "March 2026",
    kpis: [
      { id: "revenue", target: 500000, achieved: 650000, score: 5.0 },
      { id: "calls", target: 100, achieved: 110, score: 4.5 },
      { id: "leads", target: 30, achieved: 42, score: 5.0 },
      { id: "conversions", target: 5, achieved: 8, score: 5.0 },
    ],
    overallScore: 4.9,
    dwrCompliance: 100,
    attendanceScore: 4.8,
    finalRating: 4.9,
    incentiveEarned: 25000,
    challenges: ["Team coordination", "Market competition"],
    goodNews: ["Achieved 130% target", "Promoted 2 team members"],
  },
  {
    employeeId: "EMP006",
    month: "March 2026",
    kpis: [
      { id: "designs", target: 15, achieved: 12, score: 3.5 },
      { id: "kitchens", target: 5, achieved: 4, score: 3.5 },
      { id: "bedrooms", target: 4, achieved: 3, score: 3.0 },
      { id: "pdfs", target: 10, achieved: 8, score: 3.5 },
    ],
    overallScore: 3.4,
    dwrCompliance: 85,
    attendanceScore: 3.8,
    finalRating: 3.5,
    incentiveEarned: 2000,
    challenges: ["Learning curve", "Software training needed"],
    goodNews: ["Completed certification", "First solo project approved"],
  },
];

// Attendance & Discipline Data
const attendanceData = [
  { employeeId: "EMP001", lateMarks: 2, unplannedLeaves: 1, hourlyDeductions: 0, deductions: 1500 },
  { employeeId: "EMP002", lateMarks: 0, unplannedLeaves: 0, hourlyDeductions: 0, deductions: 0 },
  { employeeId: "EMP003", lateMarks: 3, unplannedLeaves: 2, hourlyDeductions: 4, deductions: 3500 },
  { employeeId: "EMP004", lateMarks: 1, unplannedLeaves: 0, hourlyDeductions: 0, deductions: 500 },
  { employeeId: "EMP005", lateMarks: 0, unplannedLeaves: 0, hourlyDeductions: 0, deductions: 0 },
  { employeeId: "EMP006", lateMarks: 4, unplannedLeaves: 1, hourlyDeductions: 2, deductions: 2500 },
];

// DWR Data
const dwrData = [
  { employeeId: "EMP001", submitted: 22, pending: 2, compliance: 91 },
  { employeeId: "EMP002", submitted: 24, pending: 0, compliance: 100 },
  { employeeId: "EMP003", submitted: 20, pending: 4, compliance: 83 },
  { employeeId: "EMP004", submitted: 24, pending: 0, compliance: 100 },
  { employeeId: "EMP005", submitted: 24, pending: 0, compliance: 100 },
  { employeeId: "EMP006", submitted: 18, pending: 6, compliance: 75 },
];

// Management Challenges
const challenges = [
  { id: 1, employeeId: "EMP001", title: "Client negotiation delays", status: "open", priority: "medium", assignedTo: "Manager", createdDate: "2026-03-05" },
  { id: 2, employeeId: "EMP003", title: "Machine breakdown affecting production", status: "open", priority: "high", assignedTo: "CTO", createdDate: "2026-03-08" },
  { id: 3, employeeId: "EMP006", title: "Software training needed", status: "in_progress", priority: "medium", assignedTo: "IT Lead", createdDate: "2026-03-01" },
  { id: 4, employeeId: "EMP004", title: "Salary negotiation issues", status: "resolved", priority: "low", assignedTo: "HR Head", createdDate: "2026-02-25" },
];

// ─── Components ───────────────────────────────────────────────────────────

const StatCard = ({ icon: Icon, label, value, sub, trend, trendUp }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
        <Icon className="w-5 h-5 text-red-600" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? "text-green-600" : "text-red-600"}`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      )}
    </div>
    <div className="mt-3">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const ScoreBadge = ({ score }) => {
  const getColor = () => {
    if (score >= 4.5) return "bg-green-100 text-green-700";
    if (score >= 3.5) return "bg-yellow-100 text-yellow-700";
    if (score >= 2.5) return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getColor()}`}>
      {score.toFixed(1)}/5
    </span>
  );
};

const ProgressBar = ({ value, target, color = "red" }) => {
  const percentage = Math.min((value / target) * 100, 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{value.toLocaleString()}</span>
        <span className="text-gray-400">Target: {target.toLocaleString()}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${percentage >= 100 ? "bg-green-500" : percentage >= 80 ? "bg-yellow-500" : "bg-red-500"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 min-w-[160px] px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-all"
      >
        <span className="truncate">{selectedOption?.name || "Select"}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 ${value === opt.id ? "bg-red-50 text-red-600" : "text-gray-700"}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PerformanceManagement() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("march2026");

  // Filter employees by department
  const filteredEmployees = useMemo(() => {
    return selectedDepartment === "all"
      ? employees
      : employees.filter((e) => e.department.toLowerCase().includes(selectedDepartment));
  }, [selectedDepartment]);

  // Calculate overall stats
  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const avgScore = (employeeKpiData.reduce((sum, e) => sum + e.finalRating, 0) / employeeKpiData.length).toFixed(1);
    const topPerformers = employeeKpiData.filter((e) => e.finalRating >= 4.5).length;
    const needsImprovement = employeeKpiData.filter((e) => e.finalRating < 3.5).length;
    const totalIncentives = employeeKpiData.reduce((sum, e) => sum + e.incentiveEarned, 0);
    const avgDwrCompliance = (dwrData.reduce((sum, e) => sum + e.compliance, 0) / dwrData.length).toFixed(0);
    const openChallenges = challenges.filter((c) => c.status !== "resolved").length;

    return { totalEmployees, avgScore, topPerformers, needsImprovement, totalIncentives, avgDwrCompliance, openChallenges };
  }, []);

  // Get employee details with KPI data
  const getEmployeeDetails = (empId) => {
    const emp = employees.find((e) => e.id === empId);
    const kpi = employeeKpiData.find((k) => k.employeeId === empId);
    const att = attendanceData.find((a) => a.employeeId === empId);
    const dwr = dwrData.find((d) => d.employeeId === empId);
    return { ...emp, ...kpi, ...att, ...dwr };
  };

  const handleViewDetails = (empId) => {
    const details = getEmployeeDetails(empId);
    setSelectedEmployee(details);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-sm text-gray-500 mt-1">KPI tracking, DWR verification, and employee performance analytics</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown
            label="Month"
            options={[
              { id: "march2026", name: "March 2026" },
              { id: "february2026", name: "February 2026" },
              { id: "january2026", name: "January 2026" },
            ]}
            value={selectedMonth}
            onChange={setSelectedMonth}
          />
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-gray-100">
        {[
          { id: "overview", label: "Overview", icon: PieChart },
          { id: "kpi", label: "KPI Tracking", icon: Target },
          { id: "dwr", label: "DWR Compliance", icon: FileText },
          { id: "attendance", label: "Attendance Impact", icon: Clock },
          { id: "challenges", label: "Challenges", icon: AlertTriangle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-red-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Star}
          label="Avg Performance Score"
          value={stats.avgScore}
          sub="Out of 5"
          trend="+0.3"
          trendUp={true}
        />
        <StatCard
          icon={Award}
          label="Top Performers"
          value={stats.topPerformers}
          sub="Rating 4.5+"
          trend="+2"
          trendUp={true}
        />
        <StatCard
          icon={Activity}
          label="DWR Compliance"
          value={`${stats.avgDwrCompliance}%`}
          sub="Average"
          trend="+5%"
          trendUp={true}
        />
        <StatCard
          icon={AlertCircle}
          label="Open Challenges"
          value={stats.openChallenges}
          sub="Need Resolution"
          trend="-3"
          trendUp={true}
        />
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Department-wise Performance */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">Department Performance Summary</h3>
                <FilterDropdown
                  label=""
                  options={departments}
                  value={selectedDepartment}
                  onChange={setSelectedDepartment}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">KPI Score</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">DWR %</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Attendance</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Deductions</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Final Rating</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Incentive</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEmployees.map((emp) => {
                    const details = getEmployeeDetails(emp.id);
                    return (
                      <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                              {emp.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                              <p className="text-xs text-gray-500">{emp.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-800">{emp.department}</p>
                          <p className="text-xs text-gray-500">{emp.designation}</p>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <ScoreBadge score={details.overallScore || 0} />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            details.compliance >= 95 ? "bg-green-100 text-green-700" :
                            details.compliance >= 80 ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {details.compliance || 0}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {details.lateMarks > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] bg-orange-100 text-orange-700 rounded" title="Late Marks">
                                {details.lateMarks}L
                              </span>
                            )}
                            {details.unplannedLeaves > 0 && (
                              <span className="px-1.5 py-0.5 text-[10px] bg-red-100 text-red-700 rounded" title="Unplanned Leaves">
                                {details.unplannedLeaves}UL
                              </span>
                            )}
                            {details.lateMarks === 0 && details.unplannedLeaves === 0 && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-sm font-medium ${details.deductions > 0 ? "text-red-600" : "text-green-600"}`}>
                            {details.deductions > 0 ? `-₹${details.deductions.toLocaleString()}` : "₹0"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <ScoreBadge score={details.finalRating || 0} />
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm font-semibold text-green-600">
                            ₹{(details.incentiveEarned || 0).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => handleViewDetails(emp.id)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Top Performers This Month
              </h3>
              <div className="space-y-3">
                {employeeKpiData
                  .sort((a, b) => b.finalRating - a.finalRating)
                  .slice(0, 3)
                  .map((kpi, index) => {
                    const emp = employees.find((e) => e.id === kpi.employeeId);
                    return (
                      <div key={kpi.employeeId} className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-100">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? "bg-yellow-400 text-white" :
                          index === 1 ? "bg-gray-300 text-gray-700" :
                          "bg-amber-600 text-white"
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{emp?.name}</p>
                          <p className="text-xs text-gray-500">{emp?.department}</p>
                        </div>
                        <ScoreBadge score={kpi.finalRating} />
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Needs Attention */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Needs Improvement
              </h3>
              <div className="space-y-3">
                {employeeKpiData
                  .filter((kpi) => kpi.finalRating < 4.0)
                  .map((kpi) => {
                    const emp = employees.find((e) => e.id === kpi.employeeId);
                    return (
                      <div key={kpi.employeeId} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
                          {emp?.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{emp?.name}</p>
                          <p className="text-xs text-gray-500">{emp?.department}</p>
                        </div>
                        <ScoreBadge score={kpi.finalRating} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KPI Tracking Tab */}
      {activeTab === "kpi" && (
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
            <FilterDropdown
              label="Department"
              options={departments}
              value={selectedDepartment}
              onChange={setSelectedDepartment}
            />
          </div>

          {/* Role-wise KPI Cards */}
          {Object.entries(kpiDefinitions).map(([role, kpis]) => {
            const roleEmployees = filteredEmployees.filter(
              (e) => e.department.toLowerCase().includes(role) || e.kpiGroup === role
            );
            if (roleEmployees.length === 0 && selectedDepartment !== "all") return null;

            return (
              <div key={role} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
                  <h3 className="text-base font-semibold text-gray-900 capitalize">{role} Team KPIs</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Target vs Achievement Analysis</p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {roleEmployees.map((emp) => {
                      const kpiData = employeeKpiData.find((k) => k.employeeId === emp.id);
                      if (!kpiData) return null;

                      return (
                        <div key={emp.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-sm font-bold">
                                {emp.name.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                                <p className="text-xs text-gray-500">{emp.designation}</p>
                              </div>
                            </div>
                            <ScoreBadge score={kpiData.finalRating} />
                          </div>

                          <div className="space-y-3">
                            {kpiData.kpis.map((kpi) => (
                              <div key={kpi.id}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-600 capitalize">{kpi.id.replace(/([A-Z])/g, " $1")}</span>
                                  <span className={`font-medium ${kpi.achieved >= kpi.target ? "text-green-600" : "text-red-600"}`}>
                                    {kpi.score.toFixed(1)}/5
                                  </span>
                                </div>
                                <ProgressBar value={kpi.achieved} target={kpi.target} />
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-500">Incentive Earned</span>
                            <span className="text-sm font-semibold text-green-600">
                              ₹{kpiData.incentiveEarned.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DWR Compliance Tab */}
      {activeTab === "dwr" && (
        <div className="space-y-6">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-amber-800">DWR Compliance Tracking</h4>
                <p className="text-xs text-amber-700 mt-1">
                  Employees must submit Daily Work Reports with hourly activity logs. Management verifies DWR entries against KPI achievements for accuracy.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">DWR Submission Status - March 2026</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Working Days</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">DWR Submitted</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Pending</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Compliance %</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dwrData.map((dwr) => {
                    const emp = employees.find((e) => e.id === dwr.employeeId);
                    const complianceColor = dwr.compliance >= 95 ? "green" : dwr.compliance >= 80 ? "yellow" : "red";
                    return (
                      <tr key={dwr.employeeId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                              {emp?.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{emp?.name}</p>
                              <p className="text-xs text-gray-500">{emp?.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">24</td>
                        <td className="px-4 py-4 text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            {dwr.submitted}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            dwr.pending > 0 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-500"
                          }`}>
                            {dwr.pending}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  complianceColor === "green" ? "bg-green-500" :
                                  complianceColor === "yellow" ? "bg-yellow-500" : "bg-red-500"
                                }`}
                                style={{ width: `${dwr.compliance}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{dwr.compliance}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {dwr.compliance >= 95 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3" /> Compliant
                            </span>
                          ) : dwr.compliance >= 80 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                              <AlertTriangle className="w-3 h-3" /> Warning
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              <XCircle className="w-3 h-3" /> Action Required
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Impact Tab */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          <div className="bg-red-50 rounded-xl p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-red-800">Disciplinary Metrics & Payroll Impact</h4>
                <p className="text-xs text-red-700 mt-1">
                  Late marks (3 = 0.5 day), unplanned weekend leaves (2x deduction), and hourly deductions after 10:30 AM buffer directly affect performance scores and payroll.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Attendance & Deduction Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Late Marks</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Unplanned Leaves</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Hourly Deductions</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Total Deductions</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Performance Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendanceData.map((att) => {
                    const emp = employees.find((e) => e.id === att.employeeId);
                    const kpiData = employeeKpiData.find((k) => k.employeeId === att.employeeId);
                    return (
                      <tr key={att.employeeId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                              {emp?.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{emp?.name}</p>
                              <p className="text-xs text-gray-500">{emp?.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            att.lateMarks >= 3 ? "bg-red-100 text-red-700" :
                            att.lateMarks > 0 ? "bg-orange-100 text-orange-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {att.lateMarks}
                            {att.lateMarks >= 3 && " (0.5 day)"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            att.unplannedLeaves > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                          }`}>
                            {att.unplannedLeaves}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm text-gray-700">{att.hourlyDeductions} hrs</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-sm font-semibold ${att.deductions > 0 ? "text-red-600" : "text-green-600"}`}>
                            ₹{att.deductions.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-sm text-gray-600">Score:</span>
                            <ScoreBadge score={kpiData?.attendanceScore || 0} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Deduction Policy Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <h4 className="text-sm font-semibold text-gray-900">Late Mark Policy</h4>
              </div>
              <p className="text-xs text-gray-600">
                3 Late Marks = 0.5 day deduction<br />
                5 Late Marks = 1 full day deduction
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <h4 className="text-sm font-semibold text-gray-900">Weekend Leave Policy</h4>
              </div>
              <p className="text-xs text-gray-600">
                Unplanned leave on Sat/Sun = 2x salary deduction<br />
                (HR can adjust for genuine reasons)
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <h4 className="text-sm font-semibold text-gray-900">Hourly Deduction</h4>
              </div>
              <p className="text-xs text-gray-600">
                After 10:30 AM buffer: Hourly deduction based on daily salary rate
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === "challenges" && (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <Flag className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-blue-800">Management Challenges Tracker</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Weekly bottlenecks and challenges reported by team leaders. Issues remain "open" until resolved by superiors to ensure external hurdles to performance are addressed.
                </p>
              </div>
            </div>
          </div>

          {/* Challenge Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{challenges.filter((c) => c.status === "open").length}</p>
              <p className="text-xs text-gray-500">Open</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{challenges.filter((c) => c.status === "in_progress").length}</p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{challenges.filter((c) => c.status === "resolved").length}</p>
              <p className="text-xs text-gray-500">Resolved</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">All Challenges</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors">
                <Flag className="w-3 h-3" /> Add Challenge
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {challenges.map((challenge) => {
                const emp = employees.find((e) => e.id === challenge.employeeId);
                const kpiData = employeeKpiData.find((k) => k.employeeId === challenge.employeeId);
                return (
                  <div key={challenge.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          challenge.status === "open" ? "bg-red-500" :
                          challenge.status === "in_progress" ? "bg-yellow-500" : "bg-green-500"
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-gray-900">{challenge.title}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                              challenge.priority === "high" ? "bg-red-100 text-red-700" :
                              challenge.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-gray-100 text-gray-700"
                            }`}>
                              {challenge.priority}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Reported by: {emp?.name} ({emp?.department}) • Assigned to: {challenge.assignedTo}
                          </p>
                          {/* Good News from this employee */}
                          {kpiData?.goodNews && kpiData.goodNews.length > 0 && (
                            <div className="mt-2 flex items-start gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                              <p className="text-xs text-green-700">{kpiData.goodNews[0]}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          challenge.status === "open" ? "bg-red-100 text-red-700" :
                          challenge.status === "in_progress" ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {challenge.status.replace("_", " ")}
                        </span>
                        <p className="text-xs text-gray-400 mt-1">{challenge.createdDate}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {showDetailModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold">
                  {selectedEmployee.name?.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-sm text-gray-500">{selectedEmployee.department} • {selectedEmployee.designation}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Overall Score */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100">
                <div>
                  <p className="text-sm text-gray-500">Final Performance Rating</p>
                  <p className="text-3xl font-bold text-gray-900">{selectedEmployee.finalRating?.toFixed(1)}/5</p>
                </div>
                <ScoreBadge score={selectedEmployee.finalRating || 0} />
              </div>

              {/* KPI Breakdown */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" /> KPI Breakdown
                </h4>
                <div className="space-y-3">
                  {selectedEmployee.kpis?.map((kpi) => (
                    <div key={kpi.id}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600 capitalize">{kpi.id.replace(/([A-Z])/g, " $1")}</span>
                        <span className="font-medium">{kpi.score.toFixed(1)}/5</span>
                      </div>
                      <ProgressBar value={kpi.achieved} target={kpi.target} />
                    </div>
                  ))}
                </div>
              </div>

              {/* DWR & Attendance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> DWR Compliance
                  </h4>
                  <p className="text-2xl font-bold text-blue-600">{selectedEmployee.compliance}%</p>
                  <p className="text-xs text-blue-500 mt-1">{selectedEmployee.submitted} of 24 days submitted</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Attendance Score
                  </h4>
                  <p className="text-2xl font-bold text-green-600">{selectedEmployee.attendanceScore}/5</p>
                  <p className="text-xs text-green-500 mt-1">
                    {selectedEmployee.lateMarks} late • {selectedEmployee.unplannedLeaves} unplanned leaves
                  </p>
                </div>
              </div>

              {/* Good News & Challenges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Good News
                  </h4>
                  <ul className="space-y-1">
                    {selectedEmployee.goodNews?.map((news, i) => (
                      <li key={i} className="text-xs text-green-600 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" /> {news}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-orange-700 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Challenges
                  </h4>
                  <ul className="space-y-1">
                    {selectedEmployee.challenges?.map((challenge, i) => (
                      <li key={i} className="text-xs text-orange-600 flex items-start gap-1">
                        <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" /> {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Incentive */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div>
                  <p className="text-sm text-gray-500">Incentive Earned</p>
                  <p className="text-xl font-bold text-green-600">₹{(selectedEmployee.incentiveEarned || 0).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Deductions</p>
                  <p className="text-lg font-semibold text-red-600">₹{(selectedEmployee.deductions || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}