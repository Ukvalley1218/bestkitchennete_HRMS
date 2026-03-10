import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  Target,
  Award,
  Filter,
  Download,
  Eye,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Calculator,
  Percent,
  Receipt,
  CreditCard,
} from "lucide-react";

// ─── Incentive Slabs (from payroll data) ──────────────────────────────────────
const incentiveSlabs = [
  { min: 10000, max: 300000, percentage: 2, label: "₹10K - ₹3L" },
  { min: 310000, max: 600000, percentage: 2.5, label: "₹3.1L - ₹6L" },
  { min: 610000, max: 900000, percentage: 3, label: "₹6.1L - ₹9L" },
  { min: 910000, max: 1200000, percentage: 3.5, label: "₹9.1L - ₹12L" },
  { min: 1210000, max: 1500000, percentage: 4, label: "₹12.1L - ₹15L" },
  { min: 1510000, max: 2000000, percentage: 4.5, label: "₹15.1L - ₹20L" },
  { min: 2150000, max: Infinity, percentage: 5, label: "Above ₹21.5L" },
];

// ─── Mock Data ────────────────────────────────────────────────────────────────
const departments = [
  { id: "all", name: "All Departments" },
  { id: "sales", name: "Sales" },
  { id: "design", name: "Interior Design" },
  { id: "production", name: "Production" },
  { id: "recruitment", name: "Recruitment HR" },
];

const employees = [
  { id: "EMP001", name: "Rajesh Kumar", department: "Sales", designation: "Senior Sales Executive", monthlyTarget: 600000 },
  { id: "EMP002", name: "Priya Sharma", department: "Sales", designation: "Sales Manager", monthlyTarget: 800000 },
  { id: "EMP003", name: "Amit Patel", department: "Sales", designation: "Sales Executive", monthlyTarget: 500000 },
  { id: "EMP004", name: "Sneha Gupta", department: "Interior Design", designation: "Lead Designer", monthlyTarget: 400000 },
  { id: "EMP005", name: "Vikram Singh", department: "Sales", designation: "Sales Lead", monthlyTarget: 700000 },
  { id: "EMP006", name: "Neha Reddy", department: "Interior Design", designation: "Junior Designer", monthlyTarget: 300000 },
  { id: "EMP007", name: "Rohit Verma", department: "Sales", designation: "Sales Executive", monthlyTarget: 450000 },
  { id: "EMP008", name: "Kavita Menon", department: "Recruitment HR", designation: "HR Executive", monthlyTarget: 350000 },
];

// Sales data for each employee
const salesData = [
  {
    employeeId: "EMP001",
    month: "March 2026",
    sales: [
      { client: "ABC Corporation", dealAmount: 145000, receipt: 145000, date: "2026-03-01" },
      { client: "XYZ Industries", dealAmount: 275000, receipt: 200000, date: "2026-03-05" },
      { client: "Tech Solutions", dealAmount: 185000, receipt: 185000, date: "2026-03-12" },
      { client: "Global Traders", dealAmount: 118000, receipt: 118000, date: "2026-03-18" },
      { client: "Metro Services", dealAmount: 95000, receipt: 95000, date: "2026-03-22" },
    ],
  },
  {
    employeeId: "EMP002",
    month: "March 2026",
    sales: [
      { client: "Prime Enterprises", dealAmount: 485000, receipt: 485000, date: "2026-03-02" },
      { client: "Sunrise Ltd", dealAmount: 320000, receipt: 320000, date: "2026-03-08" },
      { client: "Ocean Exports", dealAmount: 410000, receipt: 205000, date: "2026-03-15" },
      { client: "Delta Corp", dealAmount: 275000, receipt: 275000, date: "2026-03-25" },
    ],
  },
  {
    employeeId: "EMP003",
    month: "March 2026",
    sales: [
      { client: "Alpha Industries", dealAmount: 165000, receipt: 165000, date: "2026-03-03" },
      { client: "Beta Solutions", dealAmount: 195000, receipt: 150000, date: "2026-03-10" },
      { client: "Gamma Tech", dealAmount: 125000, receipt: 125000, date: "2026-03-20" },
    ],
  },
  {
    employeeId: "EMP004",
    month: "March 2026",
    sales: [
      { client: "Kitchen Project A", dealAmount: 185000, receipt: 185000, date: "2026-03-05" },
      { client: "Bedroom Design B", dealAmount: 145000, receipt: 145000, date: "2026-03-12" },
      { client: "Living Room C", dealAmount: 95000, receipt: 95000, date: "2026-03-18" },
    ],
  },
  {
    employeeId: "EMP005",
    month: "March 2026",
    sales: [
      { client: "Mega Corp", dealAmount: 385000, receipt: 385000, date: "2026-03-04" },
      { client: "Super Industries", dealAmount: 295000, receipt: 295000, date: "2026-03-11" },
      { client: "Elite Group", dealAmount: 185000, receipt: 185000, date: "2026-03-19" },
      { client: "Star Enterprises", dealAmount: 155000, receipt: 155000, date: "2026-03-26" },
    ],
  },
  {
    employeeId: "EMP006",
    month: "March 2026",
    sales: [
      { client: "Small Project X", dealAmount: 125000, receipt: 125000, date: "2026-03-07" },
      { client: "Design Y", dealAmount: 95000, receipt: 50000, date: "2026-03-15" },
    ],
  },
  {
    employeeId: "EMP007",
    month: "March 2026",
    sales: [
      { client: "Client M", dealAmount: 145000, receipt: 145000, date: "2026-03-06" },
      { client: "Client N", dealAmount: 185000, receipt: 185000, date: "2026-03-14" },
      { client: "Client O", dealAmount: 125000, receipt: 125000, date: "2026-03-21" },
    ],
  },
  {
    employeeId: "EMP008",
    month: "March 2026",
    sales: [
      { client: "Recruitment Fee A", dealAmount: 85000, receipt: 85000, date: "2026-03-08" },
      { client: "Recruitment Fee B", dealAmount: 75000, receipt: 75000, date: "2026-03-18" },
      { client: "Recruitment Fee C", dealAmount: 95000, receipt: 50000, date: "2026-03-25" },
    ],
  },
];

// Payment status data
const paymentStatus = [
  { employeeId: "EMP001", status: "approved", paidDate: null, paymentCycle: "April 2026" },
  { employeeId: "EMP002", status: "approved", paidDate: null, paymentCycle: "April 2026" },
  { employeeId: "EMP003", status: "pending", paidDate: null, paymentCycle: "April 2026" },
  { employeeId: "EMP004", status: "pending", paidDate: null, paymentCycle: "April 2026" },
  { employeeId: "EMP005", status: "approved", paidDate: null, paymentCycle: "April 2026" },
  { employeeId: "EMP006", status: "pending", paidDate: null, paymentCycle: "April 2026" },
  { employeeId: "EMP007", status: "pending", paidDate: null, paymentCycle: "April 2026" },
  { employeeId: "EMP008", status: "approved", paidDate: null, paymentCycle: "April 2026" },
];

// ─── Helper Functions ──────────────────────────────────────────────────────────
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat("en-IN").format(num);
};

const getIncentivePercentage = (totalSales) => {
  for (const slab of incentiveSlabs) {
    if (totalSales >= slab.min && totalSales <= slab.max) {
      return slab.percentage;
    }
  }
  return 0;
};

const calculateIncentive = (totalSales) => {
  const percentage = getIncentivePercentage(totalSales);
  return Math.round((totalSales * percentage) / 100);
};

const calculate3DDeduction = (incentive) => {
  return Math.round(incentive * 0.001);
};

const calculateActualIncentive = (incentive, deduction3D) => {
  return incentive - deduction3D;
};

const getAchievementPercentage = (totalSales, target) => {
  return ((totalSales / target) * 100).toFixed(1);
};

// ─── Components ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, trend, trendUp, bgColor = "bg-white" }) => (
  <div className={`${bgColor} rounded-xl border border-gray-100 p-4 shadow-sm`}>
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

const StatusBadge = ({ status }) => {
  const styles = {
    approved: "bg-blue-100 text-blue-700 border-blue-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    paid: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };
  const icons = {
    approved: <CheckCircle className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />,
    paid: <CheckCircle className="w-3 h-3" />,
    rejected: <XCircle className="w-3 h-3" />,
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className="relative">
      {label && <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}
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

const ProgressBar = ({ value, target }) => {
  const percentage = Math.min((value / target) * 100, 150);
  const isOverAchieved = percentage >= 100;
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{formatCurrency(value)}</span>
        <span className={`font-medium ${isOverAchieved ? "text-green-600" : "text-gray-400"}`}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isOverAchieved ? "bg-green-500" : percentage >= 80 ? "bg-yellow-500" : "bg-red-500"}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const IncentiveManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("march2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate incentive data for all employees
  const incentiveCalculations = useMemo(() => {
    return employees.map((emp) => {
      const empSales = salesData.find((s) => s.employeeId === emp.id);
      const empPayment = paymentStatus.find((p) => p.employeeId === emp.id);

      const totalDealAmount = empSales?.sales.reduce((sum, s) => sum + s.dealAmount, 0) || 0;
      const totalReceipt = empSales?.sales.reduce((sum, s) => sum + s.receipt, 0) || 0;
      const totalSales = empSales?.sales.length || 0;

      const achievementPct = getAchievementPercentage(totalReceipt, emp.monthlyTarget);
      const incentivePercent = getIncentivePercentage(totalReceipt);
      const calculatedIncentive = calculateIncentive(totalReceipt);
      const deduction3D = calculate3DDeduction(calculatedIncentive);
      const actualIncentive = calculateActualIncentive(calculatedIncentive, deduction3D);
      const overAchieved = Math.max(0, totalReceipt - emp.monthlyTarget);

      return {
        ...emp,
        totalDealAmount,
        totalReceipt,
        totalSales,
        achievementPct,
        incentivePercent,
        calculatedIncentive,
        deduction3D,
        actualIncentive,
        overAchieved,
        status: empPayment?.status || "pending",
        paymentCycle: empPayment?.paymentCycle || "April 2026",
        salesDetails: empSales?.sales || [],
      };
    });
  }, []);

  // Filter by department
  const filteredData = useMemo(() => {
    let data = incentiveCalculations;
    if (selectedDepartment !== "all") {
      data = data.filter((e) => e.department.toLowerCase().includes(selectedDepartment));
    }
    if (searchQuery) {
      data = data.filter(
        (e) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [selectedDepartment, searchQuery, incentiveCalculations]);

  // Calculate totals
  const totalStats = useMemo(() => {
    const totalIncentive = filteredData.reduce((sum, e) => sum + e.actualIncentive, 0);
    const totalSales = filteredData.reduce((sum, e) => sum + e.totalReceipt, 0);
    const approvedCount = filteredData.filter((e) => e.status === "approved").length;
    const pendingCount = filteredData.filter((e) => e.status === "pending").length;
    const overAchievers = filteredData.filter((e) => e.achievementPct >= 100).length;
    const totalDeduction = filteredData.reduce((sum, e) => sum + e.deduction3D, 0);

    return { totalIncentive, totalSales, approvedCount, pendingCount, overAchievers, totalDeduction };
  }, [filteredData]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleViewDetails = (emp) => {
    setSelectedEmployee(emp);
    setShowDetailModal(true);
  };

  const handleApprove = (empId) => {
    // In real app, this would update the backend
    alert(`Incentive for ${empId} approved for payment`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Incentive Management</h1>
            <p className="text-sm text-gray-500 mt-1">Track employee incentives, sales performance, and payment status</p>
          </div>
          <div className="flex items-center gap-3">
            <FilterDropdown
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

        {/* Incentive Slabs Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Incentive Structure (Sales-Based)
            </h3>
            <span className="text-xs text-gray-500">* Incentive paid after 45 days before 18th of next month</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {incentiveSlabs.map((slab, index) => (
              <div key={index} className="bg-gradient-to-br from-red-50 to-white rounded-xl p-3 text-center border border-red-100">
                <p className="text-xs text-gray-500">{slab.label}</p>
                <p className="text-lg font-bold text-red-600 mt-1">{slab.percentage}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-xl border border-gray-100">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "tracking", label: "Incentive Tracking", icon: Target },
            { id: "approval", label: "Pending Approval", icon: Clock },
            { id: "payments", label: "Payment History", icon: CreditCard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id ? "bg-red-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"
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
            icon={DollarSign}
            label="Total Incentives"
            value={formatCurrency(totalStats.totalIncentive)}
            sub="This Month"
            trend="+15%"
            trendUp={true}
          />
          <StatCard
            icon={Target}
            label="Total Sales"
            value={formatCurrency(totalStats.totalSales)}
            sub="Receipts Collected"
            trend="+12%"
            trendUp={true}
          />
          <StatCard
            icon={CheckCircle}
            label="Approved"
            value={totalStats.approvedCount}
            sub="Ready for Payment"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={Clock}
            label="Pending Approval"
            value={totalStats.pendingCount}
            sub="Awaiting Review"
            bgColor="bg-yellow-50"
          />
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Top Incentive Earners */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Top Incentive Earners - March 2026
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredData
                  .sort((a, b) => b.actualIncentive - a.actualIncentive)
                  .slice(0, 3)
                  .map((emp, index) => (
                    <div
                      key={emp.id}
                      className={`p-4 rounded-xl border ${
                        index === 0 ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200" :
                        index === 1 ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200" :
                        "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? "bg-yellow-400 text-white" :
                          index === 1 ? "bg-gray-300 text-gray-700" :
                          "bg-amber-600 text-white"
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-500">{emp.department}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{formatCurrency(emp.actualIncentive)}</p>
                          <p className="text-xs text-gray-500">{emp.incentivePercent}% @ {emp.achievementPct}%</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <ProgressBar value={emp.totalReceipt} target={emp.monthlyTarget} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Summary Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h3 className="text-base font-semibold text-gray-900">Employee Incentive Summary</h3>
                <div className="flex items-center gap-3">
                  <FilterDropdown
                    label=""
                    options={departments}
                    value={selectedDepartment}
                    onChange={setSelectedDepartment}
                  />
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 w-48"
                    />
                    <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Target</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Receipt</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Achievement</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Incentive %</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Gross Incentive</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">3D Deduction</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Net Incentive</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginatedData.map((emp) => (
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
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{formatCurrency(emp.monthlyTarget)}</td>
                        <td className="px-4 py-4 text-center text-sm font-medium text-gray-900">{formatCurrency(emp.totalReceipt)}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`text-sm font-semibold ${emp.achievementPct >= 100 ? "text-green-600" : emp.achievementPct >= 80 ? "text-yellow-600" : "text-red-600"}`}>
                            {emp.achievementPct}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            {emp.incentivePercent}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-medium text-gray-700">{formatCurrency(emp.calculatedIncentive)}</td>
                        <td className="px-4 py-4 text-center text-sm text-red-600">-{formatCurrency(emp.deduction3D)}</td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-sm font-bold text-green-600">{formatCurrency(emp.actualIncentive)}</span>
                        </td>
                        <td className="px-4 py-4 text-center"><StatusBadge status={emp.status} /></td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => handleViewDetails(emp)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} employees
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                        currentPage === p ? "bg-red-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Incentive Tracking Tab */}
        {activeTab === "tracking" && (
          <div className="space-y-6">
            {filteredData.map((emp) => (
              <div key={emp.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-sm font-bold">
                        {emp.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.department} • {emp.designation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{formatCurrency(emp.actualIncentive)}</p>
                        <p className="text-xs text-gray-500">Net Incentive</p>
                      </div>
                      <StatusBadge status={emp.status} />
                    </div>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Monthly Target</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(emp.monthlyTarget)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Total Receipt</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(emp.totalReceipt)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Achievement</p>
                    <p className={`text-lg font-semibold ${emp.achievementPct >= 100 ? "text-green-600" : "text-gray-900"}`}>
                      {emp.achievementPct}%
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Incentive Rate</p>
                    <p className="text-lg font-semibold text-red-600">{emp.incentivePercent}%</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <p className="text-xs text-green-600">Net Payable</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(emp.actualIncentive)}</p>
                  </div>
                </div>

                {/* Calculation Steps */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">Calculated: <strong>{formatCurrency(emp.calculatedIncentive)}</strong></span>
                    <span className="text-gray-400">→</span>
                    <span className="text-red-600">3D Deduction: <strong>-{formatCurrency(emp.deduction3D)}</strong> (0.10%)</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-green-600 font-semibold">Actual: {formatCurrency(emp.actualIncentive)}</span>
                  </div>
                </div>

                {/* Sales Table */}
                <div className="p-4 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-500 mb-2">Sales Breakdown</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Client</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Deal Amount</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {emp.salesDetails.map((sale, idx) => (
                          <tr key={idx}>
                            <td className="px-3 py-2 text-gray-700">{sale.client}</td>
                            <td className="px-3 py-2 text-gray-500">{sale.date}</td>
                            <td className="px-3 py-2 text-right text-gray-700">{formatCurrency(sale.dealAmount)}</td>
                            <td className="px-3 py-2 text-right font-medium text-green-600">{formatCurrency(sale.receipt)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan={2} className="px-3 py-2 text-xs font-bold text-gray-700">Total</td>
                          <td className="px-3 py-2 text-right text-xs font-bold text-gray-700">{formatCurrency(emp.totalDealAmount)}</td>
                          <td className="px-3 py-2 text-right text-xs font-bold text-green-600">{formatCurrency(emp.totalReceipt)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pending Approval Tab */}
        {activeTab === "approval" && (
          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800">Pending Approvals</h4>
                  <p className="text-xs text-yellow-700 mt-1">
                    Review and approve incentives before payment cycle. Approved incentives will be processed in the next payment cycle (before 18th of next month).
                  </p>
                </div>
              </div>
            </div>

            {filteredData.filter((e) => e.status === "pending").length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-700">All incentives have been approved</p>
                <p className="text-xs text-gray-500 mt-1">No pending approvals at this time</p>
              </div>
            ) : (
              filteredData.filter((e) => e.status === "pending").map((emp) => (
                <div key={emp.id} className="bg-white rounded-xl border border-yellow-200 shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-sm font-bold">
                        {emp.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.department} • {emp.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Achievement</p>
                        <p className="text-sm font-semibold">{emp.achievementPct}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Incentive</p>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(emp.actualIncentive)}</p>
                      </div>
                      <button
                        onClick={() => handleApprove(emp.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Payment History Tab */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-semibold text-gray-900">Payment History</h3>
              <p className="text-xs text-gray-500 mt-0.5">Incentive payments processed in previous cycles</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Month</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Sales</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Incentive %</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Payment Date</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.filter((e) => e.status === "approved").map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                            {emp.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                            <p className="text-xs text-gray-500">{emp.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">March 2026</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-700">{formatCurrency(emp.totalReceipt)}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          {emp.incentivePercent}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-bold text-green-600">{formatCurrency(emp.actualIncentive)}</td>
                      <td className="px-4 py-4 text-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {emp.paymentCycle}
                      </td>
                      <td className="px-4 py-4 text-center"><StatusBadge status="approved" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Employee Detail Modal */}
        {showDetailModal && selectedEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailModal(false)}>
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold">
                    {selectedEmployee.name.split(" ").map((n) => n[0]).join("")}
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
                {/* Incentive Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="text-xs text-green-600">Net Incentive</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedEmployee.actualIncentive)}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs text-blue-600">Achievement</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedEmployee.achievementPct}%</p>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Calculation Breakdown
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Monthly Target</span>
                      <span className="text-sm font-semibold">{formatCurrency(selectedEmployee.monthlyTarget)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Total Receipt Collected</span>
                      <span className="text-sm font-semibold">{formatCurrency(selectedEmployee.totalReceipt)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Over-Achievement</span>
                      <span className="text-sm font-semibold text-green-600">+{formatCurrency(selectedEmployee.overAchieved)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Applicable Rate</span>
                      <span className="text-sm font-semibold text-red-600">{selectedEmployee.incentivePercent}%</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">Gross Incentive ({selectedEmployee.incentivePercent}%)</span>
                      <span className="text-sm font-semibold">{formatCurrency(selectedEmployee.calculatedIncentive)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-sm text-gray-600">3D Deduction (0.10%)</span>
                      <span className="text-sm font-semibold text-red-600">-{formatCurrency(selectedEmployee.deduction3D)}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 bg-green-100 rounded-lg px-3 -mx-3">
                      <span className="text-sm font-semibold text-green-700">Net Incentive Payable</span>
                      <span className="text-lg font-bold text-green-600">{formatCurrency(selectedEmployee.actualIncentive)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Receipt className="w-4 h-4" />
                    Payment Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <StatusBadge status={selectedEmployee.status} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Payment Cycle</p>
                      <p className="text-sm font-semibold text-gray-700">{selectedEmployee.paymentCycle}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    * Incentive will be paid after 45 days, before 18th of next month
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                {selectedEmployee.status === "pending" && (
                  <button
                    onClick={() => {
                      handleApprove(selectedEmployee.id);
                      setShowDetailModal(false);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Approve for Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncentiveManagement;