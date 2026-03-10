import { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Users,
  FileText,
  Plus,
  X,
  ChevronDown,
  ArrowRight,
  Building2,
  Filter,
  Download,
  Settings,
  Info,
} from "lucide-react";

// ─── Filter Dropdown Component ─────────────────────────────────────────────────
const FilterDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 min-w-[160px] px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
      >
        <span className="truncate">{selectedOption?.name || placeholder}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-full min-w-[160px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  value === option.id ? "bg-red-50 text-red-600 font-medium" : "text-gray-700"
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Static Data ─────────────────────────────────────────────────────────────
const departments = [
  { id: "all", name: "All Departments" },
  { id: "production", name: "Production" },
  { id: "sales", name: "Sales" },
  { id: "it", name: "IT" },
  { id: "hr", name: "Human Resources" },
  { id: "finance", name: "Finance" },
  { id: "marketing", name: "Marketing" },
];

const leaveTypes = [
  { id: "casual", name: "Casual Leave", balance: 12, color: "bg-blue-100 text-blue-700" },
  { id: "sick", name: "Sick Leave", balance: 6, color: "bg-red-100 text-red-700" },
  { id: "earned", name: "Earned Leave", balance: 15, color: "bg-green-100 text-green-700" },
  { id: "comp_off", name: "Comp Off", balance: 3, color: "bg-purple-100 text-purple-700" },
  { id: "maternity", name: "Maternity Leave", balance: 180, color: "bg-pink-100 text-pink-700" },
  { id: "paternity", name: "Paternity Leave", balance: 7, color: "bg-amber-100 text-amber-700" },
];

const initialLeaveRequests = [
  {
    id: 1,
    empId: "EMP001",
    name: "Rajesh Kumar",
    department: "Production",
    designation: "Machine Operator",
    leaveType: "Casual Leave",
    from: "2026-03-15",
    to: "2026-03-16",
    days: 2,
    reason: "Personal work",
    status: "Pending",
    currentLevel: "hod",
    hodStatus: "pending",
    hrStatus: "pending",
    appliedOn: "2026-03-10",
    hodApprovedBy: null,
    hrApprovedBy: null,
    sickLeaveCertificate: null,
    isSickLeave: false,
  },
  {
    id: 2,
    empId: "EMP002",
    name: "Priya Sharma",
    department: "Sales",
    designation: "Sales Executive",
    leaveType: "Sick Leave",
    from: "2026-03-12",
    to: "2026-03-12",
    days: 1,
    reason: "Medical appointment - Fever",
    status: "HOD Approved",
    currentLevel: "hr",
    hodStatus: "approved",
    hrStatus: "pending",
    appliedOn: "2026-03-11",
    hodApprovedBy: "Amit Verma (HOD)",
    hrApprovedBy: null,
    sickLeaveCertificate: "medical_cert.pdf",
    isSickLeave: true,
  },
  {
    id: 3,
    empId: "EMP003",
    name: "Amit Patel",
    department: "IT",
    designation: "Software Engineer",
    leaveType: "Earned Leave",
    from: "2026-03-20",
    to: "2026-03-24",
    days: 5,
    reason: "Family vacation",
    status: "Pending",
    currentLevel: "hod",
    hodStatus: "pending",
    hrStatus: "pending",
    appliedOn: "2026-03-08",
    hodApprovedBy: null,
    hrApprovedBy: null,
    sickLeaveCertificate: null,
    isSickLeave: false,
  },
  {
    id: 4,
    empId: "EMP004",
    name: "Sneha Reddy",
    department: "Production",
    designation: "Quality Inspector",
    leaveType: "Sick Leave",
    from: "2026-03-14",
    to: "2026-03-16",
    days: 3,
    reason: "Medical emergency - Hospitalization",
    status: "Approved",
    currentLevel: "completed",
    hodStatus: "approved",
    hrStatus: "approved",
    appliedOn: "2026-03-14",
    hodApprovedBy: "Suresh Rao (HOD)",
    hrApprovedBy: "HR Admin",
    sickLeaveCertificate: "hospital_report.pdf",
    isSickLeave: true,
    autoApproved: true,
  },
  {
    id: 5,
    empId: "EMP005",
    name: "Vikram Singh",
    department: "Finance",
    designation: "Accountant",
    leaveType: "Casual Leave",
    from: "2026-03-18",
    to: "2026-03-18",
    days: 1,
    reason: "Bank work",
    status: "HOD Rejected",
    currentLevel: "rejected",
    hodStatus: "rejected",
    hrStatus: "pending",
    appliedOn: "2026-03-09",
    hodApprovedBy: null,
    hrApprovedBy: null,
    rejectedReason: "Critical audit work scheduled",
    sickLeaveCertificate: null,
    isSickLeave: false,
  },
];

// ─── Status Badge Component ───────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const statusStyles = {
    "Pending": "bg-amber-100 text-amber-700 border-amber-200",
    "HOD Approved": "bg-blue-100 text-blue-700 border-blue-200",
    "HOD Rejected": "bg-red-100 text-red-700 border-red-200",
    "HR Approved": "bg-purple-100 text-purple-700 border-purple-200",
    "HR Rejected": "bg-red-100 text-red-700 border-red-200",
    "Approved": "bg-green-100 text-green-700 border-green-200",
    "Rejected": "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || statusStyles["Pending"]}`}>
      {status}
    </span>
  );
};

// ─── Workflow Progress Component ──────────────────────────────────────────────
const WorkflowProgress = ({ request }) => {
  const getStepStatus = (step) => {
    if (step === "applied") return "completed";
    if (step === "hod") {
      if (request.hodStatus === "approved") return "completed";
      if (request.hodStatus === "rejected") return "rejected";
      return "pending";
    }
    if (step === "hr") {
      if (request.hrStatus === "approved") return "completed";
      if (request.hrStatus === "rejected") return "rejected";
      if (request.hodStatus === "approved") return "pending";
      return "waiting";
    }
    if (step === "final") {
      if (request.status === "Approved") return "completed";
      if (request.status === "Rejected" || request.status === "HOD Rejected" || request.status === "HR Rejected") return "rejected";
      return "waiting";
    }
    return "waiting";
  };

  const steps = [
    { key: "applied", label: "Applied" },
    { key: "hod", label: "HOD" },
    { key: "hr", label: "HR" },
    { key: "final", label: "Final" },
  ];

  const getStatusIcon = (status) => {
    if (status === "completed") return <CheckCircle className="w-3.5 h-3.5 text-white" />;
    if (status === "rejected") return <XCircle className="w-3.5 h-3.5 text-white" />;
    if (status === "pending") return <Clock className="w-3.5 h-3.5 text-white" />;
    return <span className="text-[10px] text-gray-400">-</span>;
  };

  const getStatusColor = (status) => {
    if (status === "completed") return "bg-green-500";
    if (status === "rejected") return "bg-red-500";
    if (status === "pending") return "bg-amber-500";
    return "bg-gray-200";
  };

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, idx) => {
        const status = getStepStatus(step.key);
        return (
          <div key={step.key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor(status)}`}
                title={step.label}
              >
                {getStatusIcon(status)}
              </div>
              <span className="text-[9px] text-gray-500 mt-0.5 whitespace-nowrap">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-4 h-0.5 mx-0.5 ${status === "completed" ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Stat Card Component ──────────────────────────────────────────────────────
const StatCard = ({ icon, value, label, subLabel, color = "red" }) => {
  const colorClasses = {
    red: "bg-red-50 text-red-500",
    blue: "bg-blue-50 text-blue-500",
    green: "bg-green-50 text-green-500",
    amber: "bg-amber-50 text-amber-500",
    purple: "bg-purple-50 text-purple-500",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subLabel && <p className="text-xs text-gray-400 mt-1">{subLabel}</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// ─── Leave Balance Card Component ─────────────────────────────────────────────
const LeaveBalanceCard = ({ leaveType, balance, used, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-all">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700">{leaveType}</span>
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {balance - used} left
      </span>
    </div>
    <div className="flex items-end justify-between">
      <div>
        <p className="text-2xl font-bold text-gray-900">{balance}</p>
        <p className="text-xs text-gray-500">Total</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-red-500">{used}</p>
        <p className="text-xs text-gray-500">Used</p>
      </div>
    </div>
    <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-500 rounded-full transition-all"
        style={{ width: `${(used / balance) * 100}%` }}
      />
    </div>
  </div>
);

// ─── Add Leave Request Modal ───────────────────────────────────────────────────
const AddLeaveRequestModal = ({ isOpen, onClose, onSubmit, leaveBalances }) => {
  const [formData, setFormData] = useState({
    leaveType: "casual",
    from: "",
    to: "",
    reason: "",
    hasCertificate: false,
    certificateFile: null,
  });
  const [errors, setErrors] = useState({});
  const [calculatedDays, setCalculatedDays] = useState(0);

  const selectedLeave = leaveTypes.find((lt) => lt.id === formData.leaveType);

  const calculateDays = (from, to) => {
    if (!from || !to) return 0;
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleDateChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    if (newFormData.from && newFormData.to) {
      setCalculatedDays(calculateDays(newFormData.from, newFormData.to));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.from) newErrors.from = "From date is required";
    if (!formData.to) newErrors.to = "To date is required";
    if (!formData.reason.trim()) newErrors.reason = "Reason is required";
    if (calculatedDays <= 0) newErrors.days = "Invalid date range";

    // Check leave balance
    const balance = leaveBalances[formData.leaveType] || 0;
    if (calculatedDays > balance) {
      newErrors.balance = `Insufficient leave balance. Available: ${balance} days`;
    }

    // Sick leave validation - if more than 2 days, certificate required
    if (formData.leaveType === "sick" && calculatedDays > 2 && !formData.hasCertificate) {
      newErrors.certificate = "Medical certificate required for sick leave > 2 days";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      ...formData,
      days: calculatedDays,
      isSickLeave: formData.leaveType === "sick",
    });

    setFormData({
      leaveType: "casual",
      from: "",
      to: "",
      reason: "",
      hasCertificate: false,
      certificateFile: null,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Apply for Leave</h3>
            <p className="text-sm text-gray-500">Submit your leave request for approval</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type *</label>
            <select
              value={formData.leaveType}
              onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white"
            >
              {leaveTypes.map((lt) => (
                <option key={lt.id} value={lt.id}>
                  {lt.name} ({leaveBalances[lt.id] || 0} days available)
                </option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date *</label>
              <input
                type="date"
                value={formData.from}
                onChange={(e) => handleDateChange("from", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              {errors.from && <p className="text-xs text-red-500 mt-1">{errors.from}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date *</label>
              <input
                type="date"
                value={formData.to}
                onChange={(e) => handleDateChange("to", e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              {errors.to && <p className="text-xs text-red-500 mt-1">{errors.to}</p>}
            </div>
          </div>

          {/* Calculated Days */}
          {calculatedDays > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Duration: {calculatedDays} day(s)</span>
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
              placeholder="Please provide a reason for your leave request..."
            />
            {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
          </div>

          {/* Sick Leave Certificate */}
          {formData.leaveType === "sick" && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Medical Certificate</label>
                  <p className="text-xs text-gray-500">Required for sick leave &gt; 2 days</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasCertificate: !formData.hasCertificate })}
                  className={`relative w-10 h-5 rounded-full transition-colors ${formData.hasCertificate ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${formData.hasCertificate ? 'translate-x-5' : ''}`} />
                </button>
              </div>
              {formData.hasCertificate && (
                <div className="mt-2">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({ ...formData, certificateFile: e.target.files[0] })}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
                  />
                </div>
              )}
              {errors.certificate && <p className="text-xs text-red-500 mt-1">{errors.certificate}</p>}
            </div>
          )}

          {errors.balance && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-700">{errors.balance}</span>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-3 bg-gray-50 rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-600">
              <span className="font-medium">Approval Flow:</span> Your request will first go to HOD for approval, then to HR for final approval.
              {formData.leaveType === "sick" && calculatedDays <= 2 && " Sick leave ≤ 2 days may be auto-approved if balance available."}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Leave Request Detail Modal ───────────────────────────────────────────────
const LeaveRequestDetailModal = ({ isOpen, onClose, request, onApprove, onReject, userRole }) => {
  if (!isOpen || !request) return null;

  const canApprove = () => {
    if (userRole === "hod" && request.hodStatus === "pending") return true;
    if (userRole === "hr" && request.hodStatus === "approved" && request.hrStatus === "pending") return true;
    return false;
  };

  const canReject = () => {
    if (userRole === "hod" && request.hodStatus === "pending") return true;
    if (userRole === "hr" && request.hodStatus === "approved" && request.hrStatus === "pending") return true;
    return false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Leave Request Details</h3>
            <p className="text-sm text-gray-500">Request ID: #{request.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Employee Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold">
              {request.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-900">{request.name}</h4>
              <p className="text-sm text-gray-500">{request.empId} • {request.department}</p>
              <p className="text-xs text-gray-400">{request.designation}</p>
            </div>
            <StatusBadge status={request.status} />
          </div>

          {/* Leave Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Leave Type</p>
              <p className="text-sm font-medium text-gray-900">{request.leaveType}</p>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Duration</p>
              <p className="text-sm font-medium text-gray-900">{request.days} day(s)</p>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">From Date</p>
              <p className="text-sm font-medium text-gray-900">{request.from}</p>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">To Date</p>
              <p className="text-sm font-medium text-gray-900">{request.to}</p>
            </div>
          </div>

          {/* Reason */}
          <div className="p-3 bg-white border border-gray-200 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Reason</p>
            <p className="text-sm text-gray-900">{request.reason}</p>
          </div>

          {/* Sick Leave Certificate */}
          {request.isSickLeave && request.sickLeaveCertificate && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">Medical Certificate Attached</span>
              </div>
              <p className="text-xs text-red-600 mt-1">{request.sickLeaveCertificate}</p>
            </div>
          )}

          {/* Approval Workflow */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-4">Approval Workflow</h4>
            <div className="space-y-4">
              {/* Applied */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">Leave Applied</p>
                    <p className="text-xs text-gray-500">{request.appliedOn}</p>
                  </div>
                  <p className="text-xs text-gray-500">By {request.name}</p>
                </div>
              </div>

              {/* HOD Approval */}
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  request.hodStatus === "approved" ? "bg-green-100" :
                  request.hodStatus === "rejected" ? "bg-red-100" : "bg-amber-100"
                }`}>
                  {request.hodStatus === "approved" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : request.hodStatus === "rejected" ? (
                    <XCircle className="w-4 h-4 text-red-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">HOD Review</p>
                    <StatusBadge status={request.hodStatus === "approved" ? "HOD Approved" : request.hodStatus === "rejected" ? "HOD Rejected" : "Pending"} />
                  </div>
                  {request.hodApprovedBy && (
                    <p className="text-xs text-gray-500">Approved by {request.hodApprovedBy}</p>
                  )}
                  {request.rejectedReason && (
                    <p className="text-xs text-red-600 mt-1">Rejection Reason: {request.rejectedReason}</p>
                  )}
                </div>
              </div>

              {/* HR Approval */}
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  request.hrStatus === "approved" ? "bg-green-100" :
                  request.hrStatus === "rejected" ? "bg-red-100" :
                  request.hodStatus === "approved" ? "bg-amber-100" : "bg-gray-100"
                }`}>
                  {request.hrStatus === "approved" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : request.hrStatus === "rejected" ? (
                    <XCircle className="w-4 h-4 text-red-600" />
                  ) : request.hodStatus === "approved" ? (
                    <Clock className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">HR Final Approval</p>
                    {request.hodStatus === "approved" && (
                      <StatusBadge status={request.hrStatus === "approved" ? "Approved" : request.hrStatus === "rejected" ? "HR Rejected" : "Pending"} />
                    )}
                  </div>
                  {request.hrApprovedBy && (
                    <p className="text-xs text-gray-500">Approved by {request.hrApprovedBy}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Auto Approval Info */}
          {request.autoApproved && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-green-700">
                <span className="font-medium">Auto-Approved:</span> This sick leave was automatically approved as it met the criteria (≤2 days with valid reason).
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {canApprove() && (
          <div className="flex gap-3 p-5 border-t border-gray-100">
            <button
              onClick={() => onReject(request.id)}
              className="flex-1 px-4 py-2.5 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={() => onApprove(request.id)}
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [userRole, setUserRole] = useState("hr"); // Can be 'employee', 'hod', 'hr'
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  // Leave balances (would come from API in real app)
  const [leaveBalances, setLeaveBalances] = useState({
    casual: 10,
    sick: 5,
    earned: 14,
    comp_off: 2,
    maternity: 180,
    paternity: 7,
  });

  // Calculate stats
  const stats = useMemo(() => {
    const pending = leaveRequests.filter((r) => r.status === "Pending" || r.status === "HOD Approved").length;
    const approved = leaveRequests.filter((r) => r.status === "Approved").length;
    const rejected = leaveRequests.filter((r) => r.status === "Rejected" || r.status === "HOD Rejected").length;
    const onLeaveToday = 3; // Would calculate based on today's date
    const hodPending = leaveRequests.filter((r) => r.hodStatus === "pending").length;
    const hrPending = leaveRequests.filter((r) => r.hodStatus === "approved" && r.hrStatus === "pending").length;

    return { pending, approved, rejected, onLeaveToday, hodPending, hrPending };
  }, [leaveRequests]);

  // Filter requests
  const filteredRequests = useMemo(() => {
    return leaveRequests.filter((r) => {
      if (selectedDepartment !== "all" && r.department.toLowerCase() !== selectedDepartment) return false;
      if (selectedStatus !== "all") {
        if (selectedStatus === "pending" && r.status !== "Pending" && r.status !== "HOD Approved") return false;
        if (selectedStatus === "approved" && r.status !== "Approved") return false;
        if (selectedStatus === "rejected" && r.status !== "Rejected" && r.status !== "HOD Rejected") return false;
      }
      return true;
    });
  }, [leaveRequests, selectedDepartment, selectedStatus]);

  // Handle leave request submission
  const handleSubmitRequest = (requestData) => {
    const newRequest = {
      id: leaveRequests.length + 1,
      empId: "EMP006",
      name: "Current User",
      department: "IT",
      designation: "Software Developer",
      leaveType: leaveTypes.find((lt) => lt.id === requestData.leaveType)?.name || requestData.leaveType,
      from: requestData.from,
      to: requestData.to,
      days: requestData.days,
      reason: requestData.reason,
      status: "Pending",
      currentLevel: "hod",
      hodStatus: "pending",
      hrStatus: "pending",
      appliedOn: new Date().toISOString().split("T")[0],
      hodApprovedBy: null,
      hrApprovedBy: null,
      sickLeaveCertificate: requestData.hasCertificate ? "certificate.pdf" : null,
      isSickLeave: requestData.isSickLeave,
    };

    // Auto-approve sick leave <= 2 days if balance available
    if (requestData.isSickLeave && requestData.days <= 2) {
      newRequest.hodStatus = "approved";
      newRequest.hodApprovedBy = "Auto-Approved (System)";
      newRequest.hrStatus = "approved";
      newRequest.hrApprovedBy = "Auto-Approved (System)";
      newRequest.status = "Approved";
      newRequest.currentLevel = "completed";
      newRequest.autoApproved = true;
    }

    setLeaveRequests((prev) => [newRequest, ...prev]);

    // Update leave balance
    setLeaveBalances((prev) => ({
      ...prev,
      [requestData.leaveType]: Math.max(0, prev[requestData.leaveType] - requestData.days),
    }));
  };

  // Handle HOD approval
  const handleHODApprove = (id) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              hodStatus: "approved",
              hodApprovedBy: "Department Head",
              status: "HOD Approved",
              currentLevel: "hr",
            }
          : r
      )
    );
    setSelectedRequest(null);
  };

  // Handle HOD rejection
  const handleHODReject = (id) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              hodStatus: "rejected",
              status: "HOD Rejected",
              currentLevel: "rejected",
            }
          : r
      )
    );
    setSelectedRequest(null);
  };

  // Handle HR approval
  const handleHRApprove = (id) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              hrStatus: "approved",
              hrApprovedBy: "HR Admin",
              status: "Approved",
              currentLevel: "completed",
            }
          : r
      )
    );
    setSelectedRequest(null);
  };

  // Handle HR rejection
  const handleHRReject = (id) => {
    setLeaveRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              hrStatus: "rejected",
              status: "HR Rejected",
              currentLevel: "rejected",
            }
          : r
      )
    );
    setSelectedRequest(null);
  };

  // Combined approval handler
  const handleApprove = (id) => {
    const request = leaveRequests.find((r) => r.id === id);
    if (!request) return;

    if (userRole === "hod" && request.hodStatus === "pending") {
      handleHODApprove(id);
    } else if (userRole === "hr" && request.hodStatus === "approved" && request.hrStatus === "pending") {
      handleHRApprove(id);
    }
  };

  // Combined rejection handler
  const handleReject = (id) => {
    const request = leaveRequests.find((r) => r.id === id);
    if (!request) return;

    if (userRole === "hod" && request.hodStatus === "pending") {
      handleHODReject(id);
    } else if (userRole === "hr" && request.hodStatus === "approved" && request.hrStatus === "pending") {
      handleHRReject(id);
    }
  };

  const statusOptions = [
    { id: "all", name: "All Status" },
    { id: "pending", name: "Pending" },
    { id: "approved", name: "Approved" },
    { id: "rejected", name: "Rejected" },
  ];

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              <option value="employee">Employee View</option>
              <option value="hod">HOD View</option>
              <option value="hr">HR View</option>
            </select>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Apply Leave
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            value={stats.pending}
            label="Pending Requests"
            subLabel="Awaiting approval"
            color="amber"
          />
          <StatCard
            icon={<CheckCircle className="w-5 h-5" />}
            value={stats.approved}
            label="Approved"
            subLabel="This month"
            color="green"
          />
          <StatCard
            icon={<XCircle className="w-5 h-5" />}
            value={stats.rejected}
            label="Rejected"
            subLabel="This month"
            color="red"
          />
          <StatCard
            icon={<Users className="w-5 h-5" />}
            value={stats.onLeaveToday}
            label="On Leave Today"
            subLabel="Currently absent"
            color="blue"
          />
        </div>

        {/* Role-specific pending counts */}
        {(userRole === "hod" || userRole === "hr") && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRole === "hod" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-800">{stats.hodPending} Requests</p>
                  <p className="text-sm text-amber-600">Awaiting your approval</p>
                </div>
              </div>
            )}
            {userRole === "hr" && (
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-800">{stats.hrPending} Requests</p>
                  <p className="text-sm text-purple-600">Awaiting final HR approval</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-1 rounded-xl border border-gray-100">
          {["requests", "balance", "workflow"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests Tab */}
        {activeTab === "requests" && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <FilterDropdown
                label="Department"
                options={departments}
                value={selectedDepartment}
                onChange={setSelectedDepartment}
                placeholder="Select Department"
              />
              <FilterDropdown
                label="Status"
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Select Status"
              />
              <div className="flex items-end gap-2 ml-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Leave Requests Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap w-[200px]">Employee</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap w-[120px]">Leave Type</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap w-[140px]">Duration</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap w-[200px]">Reason</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap w-[280px]">Workflow</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap w-[120px]">Status</th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase whitespace-nowrap w-[100px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {request.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{request.name}</p>
                              <p className="text-xs text-gray-500 truncate">{request.empId} • {request.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                            request.isSickLeave ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {request.leaveType}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-900 whitespace-nowrap">{request.days} day(s)</p>
                          <p className="text-xs text-gray-500 whitespace-nowrap">{request.from} → {request.to}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{request.reason}</p>
                          {request.isSickLeave && request.sickLeaveCertificate && (
                            <span className="text-xs text-red-600 flex items-center gap-1 mt-1">
                              <FileText className="w-3 h-3" />
                              Certificate
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <WorkflowProgress request={request} />
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={request.status} />
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Balance Tab */}
        {activeTab === "balance" && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Your Leave Balance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaveTypes.map((lt) => (
                  <LeaveBalanceCard
                    key={lt.id}
                    leaveType={lt.name}
                    balance={lt.balance}
                    used={lt.balance - (leaveBalances[lt.id] || 0)}
                    color={lt.color}
                  />
                ))}
              </div>
            </div>

            {/* Sick Leave Auto-Approval Criteria */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Sick Leave Auto-Approval Criteria</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Up to 2 Days</p>
                    <p className="text-xs text-green-600">Sick leave of 1-2 days may be auto-approved if leave balance is available and valid reason is provided.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">More than 2 Days</p>
                    <p className="text-xs text-amber-600">Medical certificate is required. Request will go through HOD → HR approval workflow.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">No Balance</p>
                    <p className="text-xs text-red-600">If leave balance is exhausted, request will require manual approval even for short duration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Tab */}
        {activeTab === "workflow" && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Leave Approval Workflow</h3>

              {/* Workflow Diagram */}
              <div className="flex items-center justify-center gap-4 py-8 overflow-x-auto">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">Employee</p>
                  <p className="text-xs text-gray-500">Applies for leave</p>
                </div>
                <ArrowRight className="w-8 h-8 text-gray-300 flex-shrink-0" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-amber-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">HOD</p>
                  <p className="text-xs text-gray-500">First level approval</p>
                </div>
                <ArrowRight className="w-8 h-8 text-gray-300 flex-shrink-0" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">HR</p>
                  <p className="text-xs text-gray-500">Final approval</p>
                </div>
                <ArrowRight className="w-8 h-8 text-gray-300 flex-shrink-0" />
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2">Approved</p>
                  <p className="text-xs text-gray-500">Leave confirmed</p>
                </div>
              </div>

              {/* Workflow Rules */}
              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-semibold text-gray-700">Workflow Rules</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-800 mb-2">Regular Leave</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Employee submits leave request</li>
                      <li>• HOD reviews and approves/rejects</li>
                      <li>• HR provides final approval</li>
                      <li>• Leave balance gets deducted</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h5 className="text-sm font-medium text-red-800 mb-2">Sick Leave (Auto-Approval)</h5>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• ≤2 days: Auto-approved if balance available</li>
                      <li>• &gt;2 days: Medical certificate required</li>
                      <li>• No balance: Requires manual approval</li>
                      <li>• Emergency: Can be applied retroactively</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Role Info */}
            <div className={`rounded-xl p-4 border ${
              userRole === "hod" ? "bg-amber-50 border-amber-200" :
              userRole === "hr" ? "bg-purple-50 border-purple-200" :
              "bg-blue-50 border-blue-200"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  userRole === "hod" ? "bg-amber-100" :
                  userRole === "hr" ? "bg-purple-100" :
                  "bg-blue-100"
                }`}>
                  {userRole === "hod" ? (
                    <Building2 className={`w-5 h-5 ${userRole === "hod" ? "text-amber-600" : "text-purple-600"}`} />
                  ) : userRole === "hr" ? (
                    <Users className="w-5 h-5 text-purple-600" />
                  ) : (
                    <User className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {userRole === "hod" ? "HOD View Active" : userRole === "hr" ? "HR View Active" : "Employee View Active"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {userRole === "hod"
                      ? "You can approve/reject pending leave requests from your department"
                      : userRole === "hr"
                      ? "You can provide final approval for HOD-approved requests"
                      : "You can view your leave balance and apply for new leaves"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Leave Request Modal */}
      <AddLeaveRequestModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleSubmitRequest}
        leaveBalances={leaveBalances}
      />

      {/* Leave Request Detail Modal */}
      <LeaveRequestDetailModal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
        onApprove={handleApprove}
        onReject={handleReject}
        userRole={userRole}
      />

      {/* Floating AI Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-b from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
          <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
        </svg>
      </button>
    </div>
  );
};

export default LeaveManagement;