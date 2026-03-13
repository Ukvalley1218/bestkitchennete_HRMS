import { useState, useMemo, useEffect } from "react";
import {
  UserPlus,
  Users,
  User,
  Clock,
  FileText,
  TrendingUp,
  Settings,
  Download,
  Calendar,
  Mail,
  Phone,
  Building,
  Briefcase,
  DollarSign,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  X,
  Save,
  Eye,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronRight,
  Award,
  Gift,
  Bell,
  CreditCard,
  Activity,
  BarChart3,
  Send,
  Key,
  GraduationCap,
  FileCheck,
  UserCheck,
  UserX,
  ClipboardList,
  BadgeCheck,
  BriefcaseBusiness,
  ShieldCheck,
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
        className="flex items-center justify-between gap-2 min-w-[160px] px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 transition-all"
      >
        <span className="truncate">{selectedOption?.name || placeholder}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => { onChange(option.id); setIsOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
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

// ─── Status Badge Component ────────────────────────────────────────────────────
const StatusBadge = ({ status, type = "default" }) => {
  const styles = {
    pending: "bg-amber-100 text-amber-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-600",
    training: "bg-purple-100 text-purple-700",
    onboarded: "bg-green-100 text-green-700",
    submitted: "bg-blue-100 text-blue-700",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[type] || styles.default}`}>
      {status}
    </span>
  );
};

// ─── Progress Tracker Component ────────────────────────────────────────────────
const TrainingProgress = ({ currentStep, totalSteps = 4 }) => {
  const steps = ["Training 1", "Training 2", "Training 3", "Training 4"];

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              idx < currentStep
                ? "bg-green-500 text-white"
                : idx === currentStep
                ? "bg-amber-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            title={step}
          >
            {idx < currentStep ? <CheckCircle className="w-3.5 h-3.5" /> : idx + 1}
          </div>
          {idx < totalSteps - 1 && (
            <div className={`w-4 h-0.5 ${idx < currentStep ? "bg-green-400" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Static Data ───────────────────────────────────────────────────────────────
const departments = [
  { id: "all", name: "All Departments" },
  { id: "production", name: "Production" },
  { id: "sales", name: "Sales" },
  { id: "it", name: "IT" },
  { id: "hr", name: "Human Resources" },
  { id: "finance", name: "Finance" },
  { id: "interior_design", name: "Interior Design" },
];

const shifts = [
  { id: "general", name: "General Shift (10 AM - 7 PM)" },
  { id: "morning", name: "Morning Shift (6 AM - 2 PM)" },
  { id: "evening", name: "Evening Shift (2 PM - 10 PM)" },
  { id: "night", name: "Night Shift (10 PM - 6 AM)" },
  { id: "sales", name: "Sales Shift (10 AM - 8 PM)" },
];

const kpiGroups = [
  { id: "interior_designers", name: "Interior Designers", metrics: ["Designs Created", "Client Meetings", "Project Proposals"] },
  { id: "sales", name: "Sales Team", metrics: ["Calls Made", "Leads Generated", "Deals Closed", "Revenue"] },
  { id: "production", name: "Production Team", metrics: ["Units Produced", "Quality Score", "Efficiency %"] },
  { id: "it", name: "IT Team", metrics: ["Tickets Resolved", "Uptime %", "Projects Completed"] },
];

// Initial Onboarding Candidates
const initialOnboardingCandidates = [
  {
    id: "ONB001",
    name: "Rahul Mehta",
    email: "rahul.mehta@email.com",
    phone: "+91 98765 43210",
    department: "Interior Design",
    designation: "Junior Interior Designer",
    status: "training",
    currentTraining: 2,
    trainingProgress: [
      { module: "Company Overview", completed: true, date: "2026-03-07" },
      { module: "Product Training", completed: true, date: "2026-03-08" },
      { module: "Process & Tools", completed: false, date: null },
      { module: "Role Specific", completed: false, date: null },
    ],
    offerAcceptedDate: "2026-03-05",
    joiningDate: "2026-03-10",
    credentialsGenerated: false,
  },
  {
    id: "ONB002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 87654 32109",
    department: "Sales",
    designation: "Sales Executive",
    status: "training",
    currentTraining: 3,
    trainingProgress: [
      { module: "Company Overview", completed: true, date: "2026-03-03" },
      { module: "Product Training", completed: true, date: "2026-03-04" },
      { module: "Process & Tools", completed: true, date: "2026-03-05" },
      { module: "Role Specific", completed: false, date: null },
    ],
    offerAcceptedDate: "2026-03-01",
    joiningDate: "2026-03-06",
    credentialsGenerated: false,
  },
  {
    id: "ONB003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    phone: "+91 76543 21098",
    department: "Production",
    designation: "Machine Operator",
    status: "onboarded",
    currentTraining: 4,
    trainingProgress: [
      { module: "Company Overview", completed: true, date: "2026-02-24" },
      { module: "Product Training", completed: true, date: "2026-02-25" },
      { module: "Process & Tools", completed: true, date: "2026-02-26" },
      { module: "Role Specific", completed: true, date: "2026-02-27" },
    ],
    offerAcceptedDate: "2026-02-20",
    joiningDate: "2026-02-24",
    credentialsGenerated: true,
    employeeId: "EMP125",
  },
];

// Initial Employees
const initialEmployees = [
  { id: "EMP001", name: "Rajesh Kumar", email: "rajesh.kumar@company.com", phone: "+91 98765 12345", department: "Production", designation: "Machine Operator", doj: "2023-01-15", status: "active", shift: "morning", kpiGroup: "production", basicSalary: 25000, pf: true, esic: true, pt: true, },
  { id: "EMP002", name: "Priya Sharma", email: "priya.sharma@company.com", phone: "+91 98765 23456", department: "Sales", designation: "Sales Executive", doj: "2023-03-20", status: "active", shift: "sales", kpiGroup: "sales", basicSalary: 30000, pf: true, esic: false, pt: true, },
  { id: "EMP003", name: "Amit Patel", email: "amit.patel@company.com", phone: "+91 98765 34567", department: "IT", designation: "Software Engineer", doj: "2022-06-10", status: "active", shift: "general", kpiGroup: "it", basicSalary: 45000, pf: true, esic: false, pt: true, },
  { id: "EMP004", name: "Sneha Reddy", email: "sneha.reddy@company.com", phone: "+91 98765 45678", department: "Interior Design", designation: "Senior Interior Designer", doj: "2021-08-05", status: "active", shift: "general", kpiGroup: "interior_designers", basicSalary: 55000, pf: true, esic: false, pt: true, },
  { id: "EMP005", name: "Vikram Singh", email: "vikram.singh@company.com", phone: "+91 98765 56789", department: "Finance", designation: "Accountant", doj: "2022-11-15", status: "active", shift: "general", kpiGroup: "", basicSalary: 35000, pf: true, esic: false, pt: true, },
];

// Daily Work Reports (HR View - All Employees)
const initialDWR = [
  { id: "DWR001", employeeId: "EMP004", employeeName: "Sneha Reddy", department: "Interior Design", date: "2026-03-10", status: "submitted", entries: 6, reviewedBy: "HR Admin", reviewedAt: "2026-03-10" },
  { id: "DWR002", employeeId: "EMP002", employeeName: "Priya Sharma", department: "Sales", date: "2026-03-10", status: "submitted", entries: 6, reviewedBy: "HR Admin", reviewedAt: "2026-03-10" },
  { id: "DWR003", employeeId: "EMP001", employeeName: "Rajesh Kumar", department: "Production", date: "2026-03-10", status: "pending", entries: 0, reviewedBy: null, reviewedAt: null },
  { id: "DWR004", employeeId: "EMP003", employeeName: "Amit Patel", department: "IT", date: "2026-03-10", status: "pending", entries: 0, reviewedBy: null, reviewedAt: null },
  { id: "DWR005", employeeId: "EMP005", employeeName: "Vikram Singh", department: "Finance", date: "2026-03-09", status: "submitted", entries: 5, reviewedBy: "HR Admin", reviewedAt: "2026-03-09" },
];

// Leave Requests (HR View)
const initialLeaveRequests = [
  { id: "LR001", employeeId: "EMP001", employeeName: "Rajesh Kumar", department: "Production", leaveType: "Casual Leave", from: "2026-03-15", to: "2026-03-16", days: 2, reason: "Personal work", status: "pending_hod", hodStatus: "pending", hrStatus: "pending", appliedOn: "2026-03-10" },
  { id: "LR002", employeeId: "EMP002", employeeName: "Priya Sharma", department: "Sales", leaveType: "Sick Leave", from: "2026-03-12", to: "2026-03-12", days: 1, reason: "Medical appointment", status: "pending_hr", hodStatus: "approved", hrStatus: "pending", appliedOn: "2026-03-11" },
  { id: "LR003", employeeId: "EMP003", employeeName: "Amit Patel", department: "IT", leaveType: "Earned Leave", from: "2026-03-20", to: "2026-03-24", days: 5, reason: "Family vacation", status: "pending_hod", hodStatus: "pending", hrStatus: "pending", appliedOn: "2026-03-08" },
  { id: "LR004", employeeId: "EMP004", employeeName: "Sneha Reddy", department: "Interior Design", leaveType: "Casual Leave", from: "2026-03-18", to: "2026-03-18", days: 1, reason: "Personal work", status: "approved", hodStatus: "approved", hrStatus: "approved", appliedOn: "2026-03-09" },
  { id: "LR005", employeeId: "EMP005", employeeName: "Vikram Singh", department: "Finance", leaveType: "Sick Leave", from: "2026-03-14", to: "2026-03-14", days: 1, reason: "Not feeling well", status: "rejected", hodStatus: "rejected", hrStatus: "pending", appliedOn: "2026-03-13", rejectedReason: "Critical audit work scheduled" },
];

// KPI Data
const kpiData = [
  { employeeId: "EMP004", employeeName: "Sneha Reddy", group: "Interior Designers", month: "March 2026", metrics: [{ name: "Designs Created", target: 15, achieved: 12 }, { name: "Client Meetings", target: 20, achieved: 18 }, { name: "Project Proposals", target: 8, achieved: 7 }], incentiveEarned: 8500 },
  { employeeId: "EMP002", employeeName: "Priya Sharma", group: "Sales", month: "March 2026", metrics: [{ name: "Calls Made", target: 100, achieved: 85 }, { name: "Leads Generated", target: 30, achieved: 28 }, { name: "Deals Closed", target: 5, achieved: 4 }], incentiveEarned: 12000 },
  { employeeId: "EMP001", employeeName: "Rajesh Kumar", group: "Production", month: "March 2026", metrics: [{ name: "Units Produced", target: 500, achieved: 480 }, { name: "Quality Score", target: 95, achieved: 92 }], incentiveEarned: 4500 },
];

// ─── Onboarding Detail Modal ───────────────────────────────────────────────────
const OnboardingDetailModal = ({ isOpen, onClose, candidate, onUpdate }) => {
  if (!isOpen || !candidate) return null;

  const handleCompleteModule = (moduleIdx) => {
    const updatedProgress = candidate.trainingProgress.map((m, idx) =>
      idx === moduleIdx ? { ...m, completed: true, date: new Date().toISOString().split("T")[0] } : m
    );
    const completedCount = updatedProgress.filter(m => m.completed).length;
    onUpdate({ ...candidate, trainingProgress: updatedProgress, currentTraining: completedCount, status: completedCount === 4 ? "onboarded" : "training" });
  };

  const handleGenerateCredentials = () => {
    const employeeId = `EMP${Math.floor(Math.random() * 900 + 100)}`;
    const password = Math.random().toString(36).slice(-8);
    onUpdate({ ...candidate, credentialsGenerated: true, employeeId, generatedPassword: password });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Onboarding Details</h3>
              <p className="text-sm text-gray-500">{candidate.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Candidate Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold">
              {candidate.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-gray-900">{candidate.name}</h4>
              <p className="text-sm text-gray-500">{candidate.email}</p>
              <p className="text-xs text-gray-400">{candidate.phone}</p>
            </div>
            <StatusBadge status={candidate.status === "onboarded" ? "Onboarded" : "In Training"} type={candidate.status} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Department</p>
              <p className="text-sm font-medium text-gray-800">{candidate.department}</p>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Designation</p>
              <p className="text-sm font-medium text-gray-800">{candidate.designation}</p>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Offer Accepted</p>
              <p className="text-sm font-medium text-gray-800">{candidate.offerAcceptedDate}</p>
            </div>
            <div className="p-3 bg-white border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Joining Date</p>
              <p className="text-sm font-medium text-gray-800">{candidate.joiningDate}</p>
            </div>
          </div>

          {/* Training Progress */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Training Progress
            </h4>
            <div className="space-y-3">
              {candidate.trainingProgress.map((module, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${module.completed ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-500"}`}>
                      {module.completed ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{module.module}</p>
                      {module.date && <p className="text-xs text-gray-500">Completed: {module.date}</p>}
                    </div>
                  </div>
                  {!module.completed && (
                    <button onClick={() => handleCompleteModule(idx)} className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors">
                      Complete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Credentials */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Key className="w-4 h-4" /> System Credentials
            </h4>
            {candidate.credentialsGenerated ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Credentials Generated</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Employee ID</p>
                    <p className="text-sm font-semibold text-gray-800">{candidate.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Password</p>
                    <p className="text-sm font-semibold text-gray-800">{candidate.generatedPassword}</p>
                  </div>
                </div>
                <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                  <Send className="w-4 h-4" /> Send to Employee Email
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                {candidate.currentTraining === 4 ? (
                  <>
                    <p className="text-sm text-gray-600 mb-3">Training completed! Generate credentials for system access.</p>
                    <button onClick={handleGenerateCredentials} className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto">
                      <Key className="w-4 h-4" /> Generate Credentials
                    </button>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Complete all training modules to generate credentials</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Add Employee Modal ────────────────────────────────────────────────────────
const AddEmployeeModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", department: "", designation: "", doj: "", shift: "general", kpiGroup: "", basicSalary: "", pf: true, esic: false, pt: true, incentiveSlab: "", qualification: "", address: "", emergencyContact: "" });
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: `EMP${Math.floor(Math.random() * 900 + 100)}`, status: "active" });
    setFormData({ name: "", email: "", phone: "", department: "", designation: "", doj: "", shift: "general", kpiGroup: "", basicSalary: "", pf: true, esic: false, pt: true, incentiveSlab: "", qualification: "", address: "", emergencyContact: "" });
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
              <p className="text-sm text-gray-500">Step {step} of 4</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${s < step ? "bg-green-500 text-white" : s === step ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                <span className={`ml-2 text-xs font-medium ${s <= step ? "text-gray-800" : "text-gray-400"}`}>
                  {s === 1 ? "Basic" : s === 2 ? "Payroll" : s === 3 ? "Assignment" : "Review"}
                </span>
                {s < 4 && <div className={`w-12 h-0.5 mx-2 ${s < step ? "bg-green-400" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Step 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="Enter full name" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="email@company.com" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                  <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white" required>
                    <option value="">Select Department</option>
                    {departments.filter(d => d.id !== "all").map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                  <input type="text" value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="e.g., Software Engineer" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Joining *</label>
                  <input type="date" value={formData.doj} onChange={(e) => setFormData({ ...formData, doj: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" required />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payroll */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary (Monthly) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input type="number" value={formData.basicSalary} onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })} className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" placeholder="25000" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incentive Slab</label>
                  <select value={formData.incentiveSlab} onChange={(e) => setFormData({ ...formData, incentiveSlab: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white">
                    <option value="">Select Incentive Slab</option>
                    <option value="Production Bonus">Production Bonus</option>
                    <option value="Sales Commission">Sales Commission</option>
                    <option value="Design Incentive">Design Incentive</option>
                    <option value="Performance Bonus">Performance Bonus</option>
                  </select>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Statutory Deductions</h4>
                <div className="space-y-3">
                  {[
                    { key: "pf", label: "PF (Provident Fund)", desc: "12% of Basic Salary" },
                    { key: "esic", label: "ESIC", desc: "Employee State Insurance" },
                    { key: "pt", label: "Professional Tax", desc: "State-wise deduction" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <button type="button" onClick={() => setFormData({ ...formData, [item.key]: !formData[item.key] })} className={`relative w-12 h-6 rounded-full transition-colors ${formData[item.key] ? "bg-green-500" : "bg-gray-300"}`}>
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData[item.key] ? "translate-x-6" : ""}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Assignment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600" /> Shift Assignment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {shifts.map((s) => (
                    <button key={s.id} type="button" onClick={() => setFormData({ ...formData, shift: s.id })} className={`p-3 rounded-lg border text-left transition-all ${formData.shift === s.id ? "border-blue-500 bg-blue-100" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      <p className="text-sm font-medium text-gray-800">{s.name}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-purple-600" /> KPI Group Assignment</h4>
                <p className="text-xs text-gray-600 mb-3">Assigning a KPI group automatically maps relevant performance metrics to the employee profile.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {kpiGroups.map((kpi) => (
                    <button key={kpi.id} type="button" onClick={() => setFormData({ ...formData, kpiGroup: kpi.id })} className={`p-3 rounded-lg border text-left transition-all ${formData.kpiGroup === kpi.id ? "border-purple-500 bg-purple-100" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                      <p className="text-sm font-medium text-gray-800">{kpi.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{kpi.metrics.join(", ")}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Review Employee Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div><p className="text-xs text-gray-500">Name</p><p className="text-sm font-medium text-gray-800">{formData.name || "-"}</p></div>
                  <div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium text-gray-800">{formData.email || "-"}</p></div>
                  <div><p className="text-xs text-gray-500">Department</p><p className="text-sm font-medium text-gray-800">{formData.department || "-"}</p></div>
                  <div><p className="text-xs text-gray-500">Basic Salary</p><p className="text-sm font-medium text-gray-800">₹{formData.basicSalary || "0"}</p></div>
                  <div><p className="text-xs text-gray-500">Shift</p><p className="text-sm font-medium text-gray-800">{shifts.find(s => s.id === formData.shift)?.name || "-"}</p></div>
                  <div><p className="text-xs text-gray-500">KPI Group</p><p className="text-sm font-medium text-gray-800">{kpiGroups.find(k => k.id === formData.kpiGroup)?.name || "-"}</p></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Previous</button>}
            {step < 4 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">Next</button>
            ) : (
              <button type="submit" className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Create Employee</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Employee View/Edit Modal ───────────────────────────────────────────────────
const EmployeeModal = ({ isOpen, onClose, employee, mode, onUpdate }) => {
  const [formData, setFormData] = useState(employee || {});

  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

  if (!isOpen || !employee) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold">
              {employee.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{mode === "edit" ? "Edit Employee" : "Employee Details"}</h3>
              <p className="text-sm text-gray-500">{employee.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {mode === "view" ? (
          <div className="p-5 space-y-6">
            {/* Basic Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><User className="w-4 h-4" /> Basic Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-gray-500">Full Name</span><p className="text-sm font-medium text-gray-800">{employee.name}</p></div>
                <div><span className="text-xs text-gray-500">Email</span><p className="text-sm font-medium text-gray-800">{employee.email}</p></div>
                <div><span className="text-xs text-gray-500">Phone</span><p className="text-sm font-medium text-gray-800">{employee.phone}</p></div>
                <div><span className="text-xs text-gray-500">Department</span><p className="text-sm font-medium text-gray-800">{employee.department}</p></div>
                <div><span className="text-xs text-gray-500">Designation</span><p className="text-sm font-medium text-gray-800">{employee.designation}</p></div>
                <div><span className="text-xs text-gray-500">Date of Joining</span><p className="text-sm font-medium text-gray-800">{employee.doj}</p></div>
              </div>
            </div>

            {/* Work Assignment */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Work Assignment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-blue-500">Shift</span><p className="text-sm font-medium text-gray-800">{shifts.find(s => s.id === employee.shift)?.name || employee.shift}</p></div>
                <div><span className="text-xs text-blue-500">KPI Group</span><p className="text-sm font-medium text-gray-800">{kpiGroups.find(k => k.id === employee.kpiGroup)?.name || "-"}</p></div>
                <div><span className="text-xs text-blue-500">Incentive Slab</span><p className="text-sm font-medium text-gray-800">{employee.incentiveSlab || "-"}</p></div>
                <div><span className="text-xs text-blue-500">Status</span><p className="text-sm font-medium text-gray-800 capitalize">{employee.status}</p></div>
              </div>
            </div>

            {/* Payroll Info */}
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Payroll Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-green-500">Basic Salary</span><p className="text-sm font-medium text-gray-800">₹{employee.basicSalary?.toLocaleString()}</p></div>
                <div><span className="text-xs text-green-500">Deductions</span><div className="flex gap-2 mt-1">{employee.pf && <span className="px-1.5 py-0.5 text-[10px] bg-green-100 text-green-700 rounded">PF</span>}{employee.esic && <span className="px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded">ESIC</span>}{employee.pt && <span className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-700 rounded">PT</span>}</div></div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select value={formData.department || ""} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white">
                  {departments.filter(d => d.id !== "all").map(d => (<option key={d.id} value={d.name}>{d.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input type="text" value={formData.designation || ""} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input type="number" value={formData.basicSalary || ""} onChange={(e) => setFormData({ ...formData, basicSalary: parseInt(e.target.value) })} className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                <select value={formData.shift || "general"} onChange={(e) => setFormData({ ...formData, shift: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white">
                  {shifts.map(s => (<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Group</label>
                <select value={formData.kpiGroup || ""} onChange={(e) => setFormData({ ...formData, kpiGroup: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white">
                  <option value="">Select KPI Group</option>
                  {kpiGroups.map(k => (<option key={k.id} value={k.id}>{k.name}</option>))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"><Save className="w-4 h-4" /> Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── DWR Detail Modal ───────────────────────────────────────────────────────────
const DwrModal = ({ isOpen, onClose, dwr }) => {
  if (!isOpen || !dwr) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Daily Work Report</h3>
              <p className="text-sm text-gray-500">{dwr.date}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Employee Info */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-lg font-bold">
              {dwr.employeeName.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{dwr.employeeName}</p>
              <p className="text-sm text-gray-500">{dwr.employeeId} • {dwr.department}</p>
            </div>
            <div className="ml-auto"><StatusBadge status={dwr.status === "submitted" ? "Submitted" : "Pending"} type={dwr.status} /></div>
          </div>

          {/* Work Entries */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Work Entries ({dwr.entries})</h4>
            <div className="space-y-3">
              {[1, 2, 3].slice(0, dwr.entries).map((_, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium">{i + 1}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Task #{i + 1}: Sample work entry description</p>
                    <p className="text-xs text-gray-500 mt-1">Duration: {2 + i}h • Completed at {(10 + i * 2)}:00 AM</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">Done</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{dwr.entries}</p>
              <p className="text-xs text-blue-500">Tasks Completed</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{dwr.entries * 2}h</p>
              <p className="text-xs text-green-500">Total Hours</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{dwr.reviewedBy || "N/A"}</p>
              <p className="text-xs text-purple-500">Reviewed By</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const EmployeeManagement = ({ initialTab: initialTabProp }) => {
  const [activeTab, setActiveTab] = useState(initialTabProp || "onboarding");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // "view" or "edit"
  const [selectedDwr, setSelectedDwr] = useState(null);
  const [showDwrModal, setShowDwrModal] = useState(false);

  const [onboardingCandidates, setOnboardingCandidates] = useState(initialOnboardingCandidates);
  const [employees, setEmployees] = useState(initialEmployees);
  const [dwrList, setDwrList] = useState(initialDWR);
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);

  // Sync tab with initialTab prop from route
  useEffect(() => {
    if (initialTabProp) {
      setActiveTab(initialTabProp);
    }
  }, [initialTabProp]);

  // Stats
  const stats = useMemo(() => ({
    onboarding: onboardingCandidates.filter(c => c.status === "training").length,
    onboarded: onboardingCandidates.filter(c => c.status === "onboarded").length,
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === "active").length,
    pendingDWR: dwrList.filter(d => d.status === "pending").length,
    pendingLeaves: leaveRequests.filter(l => l.status === "pending_hod" || l.status === "pending_hr").length,
  }), [onboardingCandidates, employees, dwrList, leaveRequests]);

  const handleUpdateCandidate = (updatedCandidate) => {
    setOnboardingCandidates(prev => prev.map(c => c.id === updatedCandidate.id ? updatedCandidate : c));
    setSelectedCandidate(updatedCandidate);
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees(prev => prev.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    setSelectedEmployee(updatedEmployee);
  };

  const handleLeaveAction = (leaveId, action) => {
    setLeaveRequests(prev => prev.map(l => {
      if (l.id === leaveId) {
        if (action === "approve_hod") {
          return { ...l, hodStatus: "approved", status: "pending_hr" };
        } else if (action === "approve_hr") {
          return { ...l, hrStatus: "approved", status: "approved" };
        } else if (action === "reject") {
          return { ...l, status: "rejected", hodStatus: l.hodStatus === "pending" ? "rejected" : l.hodStatus, hrStatus: l.hodStatus === "approved" ? "rejected" : l.hrStatus };
        }
      }
      return l;
    }));
  };

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HR Management</h1>
              <p className="text-sm text-gray-500">{today} • HR Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAddEmployeeModal(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <UserPlus className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-500">Onboarding</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.onboarding}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500">Onboarded</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.onboarded}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-500">Employees</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.activeEmployees}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <ClipboardList className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-gray-500">Pending DWR</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingDWR}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-500">Leave Requests</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pendingLeaves}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-teal-500" />
              <span className="text-xs text-gray-500">KPI Reviews</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{kpiData.length}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-1 rounded-xl border border-gray-100">
          {[
            { id: "onboarding", label: "Onboarding", icon: UserPlus },
            { id: "employees", label: "Employees", icon: Users },
            { id: "dwr", label: "DWR (HR View)", icon: FileText },
            // { id: "leaves", label: "Leave Requests", icon: Calendar },
            // { id: "performance", label: "Performance", icon: Target },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? "bg-red-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Onboarding Tab */}
        {activeTab === "onboarding" && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-800">Onboarding Pipeline</h3>
                <span className="text-sm text-gray-500">Candidates moved from recruitment after offer acceptance</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Candidate</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Joining Date</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Training</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Credentials</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {onboardingCandidates.map((candidate) => (
                      <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                              {candidate.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{candidate.name}</p>
                              <p className="text-xs text-gray-500">{candidate.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{candidate.department}</td>
                        <td className="px-4 py-4 text-sm text-gray-600">{candidate.joiningDate}</td>
                        <td className="px-4 py-4 flex justify-center"><TrainingProgress currentStep={candidate.currentTraining} /></td>
                        <td className="px-4 py-4 text-center"><StatusBadge status={candidate.status === "onboarded" ? "Onboarded" : "In Training"} type={candidate.status} /></td>
                        <td className="px-4 py-4 text-center">
                          {candidate.credentialsGenerated ? (
                            <span className="text-xs font-medium text-green-600 flex items-center gap-1 justify-center"><CheckCircle className="w-3.5 h-3.5" /> Generated</span>
                          ) : (
                            <span className="text-xs text-gray-400">Pending</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => setSelectedCandidate(candidate)} className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h4 className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2"><GraduationCap className="w-4 h-4" /> 4-Day Training/Induction Process</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {["Company Overview", "Product Training", "Process & Tools", "Role Specific"].map((module, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-xs font-medium">{idx + 1}</span>
                      <span className="text-xs font-semibold text-gray-800">Day {idx + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700">{module}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === "employees" && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <FilterDropdown label="Department" options={departments} value={selectedDepartment} onChange={setSelectedDepartment} placeholder="Select Department" />
              <div className="flex items-end gap-2 ml-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"><Download className="w-4 h-4" /> Export</button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Shift</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">KPI</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Payroll</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {employees.filter(e => selectedDepartment === "all" || e.department.toLowerCase().includes(selectedDepartment)).map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">{emp.name.split(" ").map(n => n[0]).join("")}</div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                              <p className="text-xs text-gray-500">{emp.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-800">{emp.email}</p>
                          <p className="text-xs text-gray-500">{emp.phone}</p>
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-800">{emp.department}</p>
                          <p className="text-xs text-gray-500">{emp.designation}</p>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">{shifts.find(s => s.id === emp.shift)?.name.split(" (")[0] || emp.shift}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">{kpiGroups.find(k => k.id === emp.kpiGroup)?.name || "-"}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {emp.pf && <span className="px-1.5 py-0.5 text-[10px] bg-green-100 text-green-700 rounded">PF</span>}
                            {emp.esic && <span className="px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded">ESIC</span>}
                            {emp.pt && <span className="px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-700 rounded">PT</span>}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">₹{emp.basicSalary.toLocaleString()}</p>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => { setSelectedEmployee(emp); setModalMode("view"); setShowEmployeeModal(true); }}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => { setSelectedEmployee(emp); setModalMode("edit"); setShowEmployeeModal(true); }}
                              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* DWR Tab - HR View */}
        {activeTab === "dwr" && (
          <div className="space-y-5">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-amber-800">HR Daily Work Report Management</h4>
                  <p className="text-xs text-amber-700 mt-1">HR can view all employee DWRs. Employees have a 2-day buffer to submit their reports. Monitor pending submissions and review completed entries.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-800">Daily Work Reports - All Employees</h3>
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Entries</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Reviewed By</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {dwrList.map((dwr) => (
                      <tr key={dwr.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">{dwr.employeeName.split(" ").map(n => n[0]).join("")}</div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{dwr.employeeName}</p>
                              <p className="text-xs text-gray-500">{dwr.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{dwr.department}</td>
                        <td className="px-4 py-4 text-sm text-gray-600 text-center">{dwr.date}</td>
                        <td className="px-4 py-4 text-center"><span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">{dwr.entries} entries</span></td>
                        <td className="px-4 py-4 text-center"><StatusBadge status={dwr.status === "submitted" ? "Submitted" : "Pending"} type={dwr.status} /></td>
                        <td className="px-4 py-4 text-center text-sm text-gray-600">{dwr.reviewedBy || "-"}</td>
                        <td className="px-4 py-4 text-center">
                          {dwr.status === "pending" ? (
                            <button className="px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">Send Reminder</button>
                          ) : (
                            <button
                              onClick={() => { setSelectedDwr(dwr); setShowDwrModal(true); }}
                              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Leave Requests Tab - HR View */}
        {activeTab === "leaves" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-amber-800">{leaveRequests.filter(l => l.status === "pending_hod").length}</p>
                    <p className="text-xs text-amber-600">Pending HOD Approval</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-800">{leaveRequests.filter(l => l.status === "pending_hr").length}</p>
                    <p className="text-xs text-blue-600">Pending HR Approval</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-800">{leaveRequests.filter(l => l.status === "approved").length}</p>
                    <p className="text-xs text-green-600">Approved This Month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-800">Leave Requests - HR Approval Panel</h3>
                <span className="text-sm text-gray-500">Two-stage approval: HOD → HR</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Leave Type</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Duration</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Reason</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">HOD</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">HR</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leaveRequests.map((leave) => (
                      <tr key={leave.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">{leave.employeeName.split(" ").map(n => n[0]).join("")}</div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{leave.employeeName}</p>
                              <p className="text-xs text-gray-500">{leave.department}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">{leave.leaveType}</span></td>
                        <td className="px-4 py-4 text-center">
                          <p className="text-sm text-gray-900">{leave.days} day(s)</p>
                          <p className="text-xs text-gray-500">{leave.from} → {leave.to}</p>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 max-w-[150px] truncate">{leave.reason}</td>
                        <td className="px-4 py-4 text-center">
                          {leave.hodStatus === "approved" ? <span className="text-xs font-medium text-green-600 flex items-center gap-1 justify-center"><CheckCircle className="w-3.5 h-3.5" /> Approved</span> :
                           leave.hodStatus === "rejected" ? <span className="text-xs font-medium text-red-600 flex items-center gap-1 justify-center"><XCircle className="w-3.5 h-3.5" /> Rejected</span> :
                           <span className="text-xs font-medium text-amber-600 flex items-center gap-1 justify-center"><Clock className="w-3.5 h-3.5" /> Pending</span>}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {leave.hrStatus === "approved" ? <span className="text-xs font-medium text-green-600 flex items-center gap-1 justify-center"><CheckCircle className="w-3.5 h-3.5" /> Approved</span> :
                           leave.hrStatus === "rejected" ? <span className="text-xs font-medium text-red-600 flex items-center gap-1 justify-center"><XCircle className="w-3.5 h-3.5" /> Rejected</span> :
                           leave.hodStatus === "approved" ? <span className="text-xs font-medium text-blue-600 flex items-center gap-1 justify-center"><Clock className="w-3.5 h-3.5" /> Pending</span> :
                           <span className="text-xs text-gray-400">-</span>}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {leave.status === "pending_hr" && (
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => handleLeaveAction(leave.id, "approve_hr")} className="px-2 py-1 text-xs font-medium text-green-600 hover:bg-green-50 rounded transition-colors">Approve</button>
                              <button onClick={() => handleLeaveAction(leave.id, "reject")} className="px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors">Reject</button>
                            </div>
                          )}
                          {leave.status === "approved" && <span className="text-xs text-green-600 font-medium">Finalized</span>}
                          {leave.status === "rejected" && <span className="text-xs text-red-600 font-medium">{leave.rejectedReason || "Rejected"}</span>}
                          {leave.status === "pending_hod" && <span className="text-xs text-gray-400">Awaiting HOD</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === "performance" && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-800">KPI Performance - Target vs Achievement</h3>
                <span className="text-sm text-gray-500">March 2026</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">KPI Group</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Metrics</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Achievement</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Incentive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {kpiData.map((kpi, idx) => {
                      const avgAchievement = kpi.metrics.reduce((sum, m) => sum + (m.achieved / m.target * 100), 0) / kpi.metrics.length;
                      return (
                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">{kpi.employeeName.split(" ").map(n => n[0]).join("")}</div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{kpi.employeeName}</p>
                                <p className="text-xs text-gray-500">{kpi.employeeId}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4"><span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">{kpi.group}</span></td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              {kpi.metrics.map((m, mIdx) => (
                                <div key={mIdx} className="flex items-center gap-2 text-xs">
                                  <span className="text-gray-500">{m.name}:</span>
                                  <span className="font-medium text-gray-800">{m.achieved}/{m.target}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex flex-col items-center">
                              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${avgAchievement >= 90 ? "bg-green-500" : avgAchievement >= 70 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${Math.min(avgAchievement, 100)}%` }} />
                              </div>
                              <span className={`text-xs font-semibold mt-1 ${avgAchievement >= 90 ? "text-green-600" : avgAchievement >= 70 ? "text-amber-600" : "text-red-600"}`}>{avgAchievement.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center"><span className="text-sm font-bold text-green-600">₹{kpi.incentiveEarned.toLocaleString()}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <OnboardingDetailModal isOpen={!!selectedCandidate} onClose={() => setSelectedCandidate(null)} candidate={selectedCandidate} onUpdate={handleUpdateCandidate} />
      <AddEmployeeModal isOpen={showAddEmployeeModal} onClose={() => setShowAddEmployeeModal(false)} onSubmit={handleAddEmployee} />
      <EmployeeModal isOpen={showEmployeeModal} onClose={() => setShowEmployeeModal(false)} employee={selectedEmployee} mode={modalMode} onUpdate={handleUpdateEmployee} />
      <DwrModal isOpen={showDwrModal} onClose={() => setShowDwrModal(false)} dwr={selectedDwr} />

      {/* Floating AI Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-b from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5"><path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" /></svg>
      </button>
    </div>
  );
};

export default EmployeeManagement;