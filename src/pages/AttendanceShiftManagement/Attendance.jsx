import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { ChevronDown, Calendar, Clock, Users, UserCheck, UserX, AlertTriangle, TrendingUp, Edit2, Trash2, Plus, Save, X, Settings, Info, ToggleLeft, ToggleRight } from "lucide-react";
import TodayAttendanceTable from "../../components/AttendanceTable";

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

// ─── Dropdown Data ─────────────────────────────────────────────────────────────
const branches = [
  { id: "all", name: "All Branches" },
  { id: "head_office", name: "Head Office" },
  { id: "mumbai", name: "Mumbai" },
  { id: "pune", name: "Pune" },
  { id: "nashik", name: "Nashik" },
  { id: "bangalore", name: "Bangalore" },
];

const departments = [
  { id: "all", name: "All Departments" },
  { id: "production", name: "Production" },
  { id: "sales", name: "Sales" },
  { id: "it", name: "IT" },
  { id: "hr", name: "Human Resources" },
  { id: "finance", name: "Finance" },
  { id: "marketing", name: "Marketing" },
];

// ─── Icons ──────────────────────────────────────────────────────────────────────
const TrendIcon = ({ className = "" }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

// ─── Stat Card Component ───────────────────────────────────────────────────────
const StatCard = ({ icon, badge, value, label, subLabel, trendColor = "text-green-500" }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex-1 min-w-[200px]">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {subLabel && <p className="text-xs text-gray-400 mt-1">{subLabel}</p>}
      </div>
      <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
        {icon}
      </div>
    </div>
    {badge && (
      <div className="flex items-center gap-1 mt-3">
        <TrendIcon className={trendColor} />
        <span className={`text-xs font-semibold ${trendColor}`}>{badge}</span>
        <span className="text-xs text-gray-400">vs last week</span>
      </div>
    )}
  </div>
);

// ─── Tab Button Component ───────────────────────────────────────────────────────
const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-sm font-medium rounded-xl border transition-colors ${
      active
        ? "bg-red-600 text-white border-red-600"
        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
    }`}
  >
    {label}
  </button>
);

// ─── Alert Card Component ────────────────────────────────────────────────────────
const AlertCard = ({ title, employees, icon, bg, border, badge }) => (
  <div className={`${bg} rounded-xl border ${border} p-4`}>
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${badge}`}>
        {employees.length}
      </span>
    </div>
    <div className="space-y-2">
      {employees.slice(0, 3).map((emp, idx) => (
        <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
              {emp.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{emp.name}</p>
              <p className="text-xs text-gray-500">{emp.department}</p>
            </div>
          </div>
          <span className="text-xs text-gray-500">{emp.time || `${emp.days} day${emp.days > 1 ? 's' : ''}`}</span>
        </div>
      ))}
      {employees.length > 3 && (
        <button className="w-full text-center text-xs text-red-600 font-medium hover:text-red-700 py-1">
          +{employees.length - 3} more
        </button>
      )}
    </div>
  </div>
);

// ─── Edit Shift Modal ───────────────────────────────────────────────────────────
const EditShiftModal = ({ isOpen, onClose, shift, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    startTimeSat: "",
    endTimeSat: "",
    breakDuration: "30",
    graceTime: "15",
    departments: [],
  });

  const [errors, setErrors] = useState({});

  // Initialize form when shift changes
  useState(() => {
    if (shift) {
      setFormData({
        name: shift.name || "",
        startTime: shift.startTime || "",
        endTime: shift.endTime || "",
        startTimeSat: shift.startTimeSat || "",
        endTimeSat: shift.endTimeSat || "",
        breakDuration: shift.breakDuration || "30",
        graceTime: shift.graceTime || "15",
        departments: shift.departments || [],
      });
    }
  }, [shift]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors({ name: "Shift name is required" });
      return;
    }
    onSave({ ...shift, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {shift ? "Edit Shift" : "Create New Shift"}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Shift Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Shift Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              placeholder="e.g., Shift 1, Morning Shift"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Weekday Timing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weekday Timing (Mon-Fri)</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Saturday Timing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Saturday Timing</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Time</label>
                <input
                  type="time"
                  value={formData.startTimeSat}
                  onChange={(e) => setFormData({ ...formData, startTimeSat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Time</label>
                <input
                  type="time"
                  value={formData.endTimeSat}
                  onChange={(e) => setFormData({ ...formData, endTimeSat: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Leave empty if same as weekday</p>
          </div>

          {/* Break & Grace */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Break Duration (min)</label>
              <input
                type="number"
                value={formData.breakDuration}
                onChange={(e) => setFormData({ ...formData, breakDuration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Grace Time (min)</label>
              <input
                type="number"
                value={formData.graceTime}
                onChange={(e) => setFormData({ ...formData, graceTime: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-3">
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
              <Save className="w-4 h-4" />
              Save Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Static Data ─────────────────────────────────────────────────────────────────
const weeklyAttendanceData = [
  { day: "Mon", present: 230, absent: 8, late: 12, onLeave: 5 },
  { day: "Tue", present: 235, absent: 10, late: 8, onLeave: 7 },
  { day: "Wed", present: 238, absent: 6, late: 15, onLeave: 4 },
  { day: "Thu", present: 233, absent: 9, late: 10, onLeave: 6 },
  { day: "Fri", present: 236, absent: 7, late: 14, onLeave: 5 },
  { day: "Sat", present: 180, absent: 15, late: 5, onLeave: 8 },
  { day: "Sun", present: 45, absent: 0, late: 0, onLeave: 0 },
];

const monthlyTrendData = [
  { week: "Week 1", attendance: 95.2, late: 8.5 },
  { week: "Week 2", attendance: 96.1, late: 7.2 },
  { week: "Week 3", attendance: 94.8, late: 9.1 },
  { week: "Week 4", attendance: 95.5, late: 6.8 },
];

const criticalAlerts = [
  {
    title: "Absent Without Leave",
    employees: [
      { name: "Deepak Sharma", department: "Production", days: 2, avatar: "DS" },
      { name: "Meena Iyer", department: "HR", days: 1, avatar: "MI" },
      { name: "Ravi Kumar", department: "Sales", days: 3, avatar: "RK" },
    ],
    icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-500",
  },
  {
    title: "Late Arrivals Today",
    employees: [
      { name: "Suresh Patil", department: "IT", time: "45 min late", avatar: "SP" },
      { name: "Kavita Singh", department: "Marketing", time: "30 min late", avatar: "KS" },
      { name: "Arun Nair", department: "Finance", time: "1 hr late", avatar: "AN" },
    ],
    icon: <Clock className="w-4 h-4 text-amber-500" />,
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-500",
  },
];

const attendanceRecords = [
  { id: "EMP001", name: "Rajesh Kumar", department: "Production", shift: "Morning", checkIn: "09:02 AM", checkOut: "-", status: "Present" },
  { id: "EMP002", name: "Priya Sharma", department: "Sales", shift: "General", checkIn: "09:15 AM", checkOut: "-", status: "Late" },
  { id: "EMP003", name: "Amit Patel", department: "IT", shift: "General", checkIn: "09:00 AM", checkOut: "-", status: "Present" },
  { id: "EMP004", name: "Sneha Reddy", department: "Production", shift: "Evening", checkIn: "-", checkOut: "-", status: "Absent" },
  { id: "EMP005", name: "Vikram Singh", department: "Finance", shift: "General", checkIn: "09:05 AM", checkOut: "-", status: "Present" },
  { id: "EMP006", name: "Neha Gupta", department: "Marketing", shift: "Morning", checkIn: "09:30 AM", checkOut: "-", status: "Late" },
  { id: "EMP007", name: "Rahul Verma", department: "IT", shift: "Night", checkIn: "10:00 PM", checkOut: "-", status: "Present" },
];

// ─── Late Mark Policy Settings Component ────────────────────────────────────────
const LateMarkPolicySettings = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (field, value) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onUpdate(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">Late Mark Policy</h3>
            <p className="text-xs text-gray-500">Configure late arrival deductions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${localSettings.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {localSettings.enabled ? 'Active' : 'Inactive'}
          </span>
          <button
            onClick={() => handleChange('enabled', !localSettings.enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${localSettings.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${localSettings.enabled ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Buffer Time */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Buffer Time</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={localSettings.bufferTime}
              onChange={(e) => handleChange('bufferTime', parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
            <span className="text-sm text-gray-600">minutes</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Grace period before late mark is applied</p>
        </div>

        {/* Hourly Deduction */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Late Deduction</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={localSettings.hourlyDeduction}
              onChange={(e) => handleChange('hourlyDeduction', parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
            />
            <span className="text-sm text-gray-600">hours per late arrival</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Hours deducted for each late arrival</p>
        </div>

        {/* 3 Days Late = Half Day */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded">3 Days Late</span>
              <label className="text-sm font-medium text-gray-700">Half Day Deduction</label>
            </div>
            <button
              onClick={() => handleChange('halfDayEnabled', !localSettings.halfDayEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${localSettings.halfDayEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${localSettings.halfDayEnabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">After</span>
            <input
              type="number"
              value={localSettings.halfDayThreshold}
              onChange={(e) => handleChange('halfDayThreshold', parseInt(e.target.value) || 3)}
              className="w-16 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              disabled={!localSettings.halfDayEnabled}
            />
            <span className="text-sm text-gray-600">consecutive late days</span>
          </div>
        </div>

        {/* 5 Days Late = Full Day */}
        <div className="p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded">5 Days Late</span>
              <label className="text-sm font-medium text-gray-700">Full Day Deduction</label>
            </div>
            <button
              onClick={() => handleChange('fullDayEnabled', !localSettings.fullDayEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${localSettings.fullDayEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${localSettings.fullDayEnabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">After</span>
            <input
              type="number"
              value={localSettings.fullDayThreshold}
              onChange={(e) => handleChange('fullDayThreshold', parseInt(e.target.value) || 5)}
              className="w-16 px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              disabled={!localSettings.fullDayEnabled}
            />
            <span className="text-sm text-gray-600">consecutive late days</span>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-blue-700">
          <span className="font-medium">How it works:</span> Buffer time ({localSettings.bufferTime} min) is the grace period. If an employee arrives beyond buffer time, it's marked as late. {localSettings.hourlyDeduction} hour(s) will be deducted per late arrival. {localSettings.halfDayThreshold} consecutive late days = Half day cut, {localSettings.fullDayThreshold} consecutive late days = Full day cut.
        </div>
      </div>
    </div>
  );
};

// ─── Sandwich Leave Policy Settings Component ─────────────────────────────────────
const SandwichLeavePolicySettings = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (field, value) => {
    const updated = { ...localSettings, [field]: value };
    setLocalSettings(updated);
    onUpdate(updated);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-800">Sandwich Leave Policy</h3>
            <p className="text-xs text-gray-500">Configure Saturday/Sunday sandwich deductions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${localSettings.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
            {localSettings.enabled ? 'Active' : 'Inactive'}
          </span>
          <button
            onClick={() => handleChange('enabled', !localSettings.enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors ${localSettings.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${localSettings.enabled ? 'translate-x-6' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Saturday Sandwich */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">Saturday</span>
              <label className="text-sm font-medium text-gray-700">Sandwich Leave</label>
            </div>
            <button
              onClick={() => handleChange('saturdayEnabled', !localSettings.saturdayEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${localSettings.saturdayEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${localSettings.saturdayEnabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-2">Deduction multiplier if absent on Saturday</p>
          <div className="flex items-center gap-2">
            <select
              value={localSettings.saturdayMultiplier}
              onChange={(e) => handleChange('saturdayMultiplier', e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              disabled={!localSettings.saturdayEnabled}
            >
              <option value="1">1X (Single Day)</option>
              <option value="2">2X (Double Day)</option>
            </select>
            <span className="text-sm text-gray-600">salary deduction</span>
          </div>
        </div>

        {/* Sunday Sandwich */}
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded">Sunday</span>
              <label className="text-sm font-medium text-gray-700">Sandwich Leave</label>
            </div>
            <button
              onClick={() => handleChange('sundayEnabled', !localSettings.sundayEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${localSettings.sundayEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${localSettings.sundayEnabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-2">Deduction multiplier if absent on Sunday</p>
          <div className="flex items-center gap-2">
            <select
              value={localSettings.sundayMultiplier}
              onChange={(e) => handleChange('sundayMultiplier', e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              disabled={!localSettings.sundayEnabled}
            >
              <option value="1">1X (Single Day)</option>
              <option value="2">2X (Double Day)</option>
            </select>
            <span className="text-sm text-gray-600">salary deduction</span>
          </div>
        </div>

        {/* Genuine Reason Exclusion */}
        <div className="p-4 bg-green-50 rounded-xl border border-green-200 md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-600" />
              <label className="text-sm font-medium text-gray-700">Genuine Reason Exclusion</label>
            </div>
            <button
              onClick={() => handleChange('genuineReasonEnabled', !localSettings.genuineReasonEnabled)}
              className={`relative w-10 h-5 rounded-full transition-colors ${localSettings.genuineReasonEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${localSettings.genuineReasonEnabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mb-3">Exclude employees with approved genuine reasons from sandwich deduction</p>
          <div className="flex flex-wrap gap-2">
            {['Medical Emergency', 'Family Emergency', 'Approved Leave', 'Work From Home', 'Official Travel'].map((reason) => (
              <button
                key={reason}
                onClick={() => {
                  const reasons = localSettings.excludedReasons || [];
                  const updated = reasons.includes(reason)
                    ? reasons.filter(r => r !== reason)
                    : [...reasons, reason];
                  handleChange('excludedReasons', updated);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  (localSettings.excludedReasons || []).includes(reason)
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-amber-700">
          <span className="font-medium">Note:</span> Sandwich leave applies when an employee is absent on Saturday or Sunday between two working days (Friday and Monday). {localSettings.saturdayMultiplier === '2' ? '2X deduction will apply for Saturday. ' : ''}{localSettings.sundayMultiplier === '2' ? '2X deduction will apply for Sunday.' : ''}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────────
const AttendanceShiftManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [timeFilter, setTimeFilter] = useState("thisMonth");
  const [editShift, setEditShift] = useState(null);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);

  // Late Mark Policy Settings
  const [lateMarkSettings, setLateMarkSettings] = useState({
    enabled: true,
    bufferTime: 10,
    hourlyDeduction: 1,
    halfDayEnabled: true,
    halfDayThreshold: 3,
    fullDayEnabled: true,
    fullDayThreshold: 5,
  });

  // Sandwich Leave Policy Settings
  const [sandwichSettings, setSandwichSettings] = useState({
    enabled: true,
    saturdayEnabled: true,
    saturdayMultiplier: '2',
    sundayEnabled: true,
    sundayMultiplier: '2',
    genuineReasonEnabled: true,
    excludedReasons: ['Medical Emergency', 'Family Emergency', 'Approved Leave'],
  });

  // Shifts State - HR can edit these
  const [shifts, setShifts] = useState([
    {
      id: 1,
      name: "Shift 1",
      startTime: "06:00",
      endTime: "14:00",
      startTimeSat: "06:00",
      endTimeSat: "14:00",
      breakDuration: 30,
      graceTime: 15,
      employees: 89,
      color: "bg-blue-100 text-blue-600",
      departments: ["Production", "Quality"],
    },
    {
      id: 2,
      name: "Shift 2",
      startTime: "14:00",
      endTime: "22:00",
      startTimeSat: "14:00",
      endTimeSat: "22:00",
      breakDuration: 30,
      graceTime: 15,
      employees: 76,
      color: "bg-purple-100 text-purple-600",
      departments: ["Production", "Maintenance"],
    },
    {
      id: 3,
      name: "Shift 3",
      startTime: "22:00",
      endTime: "06:00",
      startTimeSat: "22:00",
      endTimeSat: "06:00",
      breakDuration: 30,
      graceTime: 15,
      employees: 42,
      color: "bg-amber-100 text-amber-600",
      departments: ["Production", "Security"],
    },
    {
      id: 4,
      name: "Sales Shift",
      startTime: "10:00",
      endTime: "19:00",
      startTimeSat: "10:00",
      endTimeSat: "20:00",
      breakDuration: 60,
      graceTime: 10,
      employees: 45,
      color: "bg-green-100 text-green-600",
      departments: ["Sales"],
      isSpecial: true,
      description: "Mon-Fri: 10AM-7PM, Sat: 10AM-8PM",
    },
    {
      id: 5,
      name: "General Shift",
      startTime: "09:00",
      endTime: "18:00",
      startTimeSat: "09:00",
      endTimeSat: "18:00",
      breakDuration: 60,
      graceTime: 15,
      employees: 156,
      color: "bg-teal-100 text-teal-600",
      departments: ["IT", "HR", "Finance", "Marketing"],
    },
  ]);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const presentToday = 203;
  const lateToday = 18;
  const absentToday = 12;
  const onLeave = 8;

  const handleEditShift = (shift) => {
    setEditShift(shift);
    setIsShiftModalOpen(true);
  };

  const handleSaveShift = (updatedShift) => {
    setShifts(shifts.map(s => s.id === updatedShift.id ? updatedShift : s));
    setIsShiftModalOpen(false);
    setEditShift(null);
  };

  const handleAddShift = () => {
    const newId = Math.max(...shifts.map(s => s.id)) + 1;
    setEditShift({
      id: newId,
      name: `Shift ${newId}`,
      startTime: "09:00",
      endTime: "18:00",
      startTimeSat: "",
      endTimeSat: "",
      breakDuration: 30,
      graceTime: 15,
      employees: 0,
      color: "bg-gray-100 text-gray-600",
      departments: [],
    });
    setIsShiftModalOpen(true);
  };

  const handleDeleteShift = (shiftId) => {
    if (window.confirm("Are you sure you want to delete this shift?")) {
      setShifts(shifts.filter(s => s.id !== shiftId));
    }
  };

  const formatTime = (time) => {
    if (!time) return "-";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Attendance & Shift Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              Select Date
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              <Users className="w-4 h-4" />
              Mark Attendance
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <FilterDropdown
            label="Branch"
            options={branches}
            value={selectedBranch}
            onChange={setSelectedBranch}
            placeholder="Select Branch"
          />
          <FilterDropdown
            label="Department"
            options={departments}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            placeholder="Select Department"
          />
          <div className="flex items-end gap-2 ml-auto">
            <TabButton label="This Month" active={timeFilter === "thisMonth"} onClick={() => setTimeFilter("thisMonth")} />
            <TabButton label="Last Month" active={timeFilter === "lastMonth"} onClick={() => setTimeFilter("lastMonth")} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-1 rounded-xl border border-gray-100">
          {["overview", "today", "shifts", "policies", "reports"].map((tab) => (
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

        {/* Overview Tab Content */}
        {activeTab === "overview" && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<UserCheck className="w-5 h-5 text-green-500" />}
                badge="+5%"
                value={presentToday}
                label="Present Today"
                subLabel="95.2% attendance"
                trendColor="text-green-500"
              />
              <StatCard
                icon={<Clock className="w-5 h-5 text-amber-500" />}
                badge="+3"
                value={lateToday}
                label="Late Arrivals"
                subLabel="Needs attention"
                trendColor="text-amber-500"
              />
              <StatCard
                icon={<UserX className="w-5 h-5 text-red-500" />}
                badge="-2"
                value={absentToday}
                label="Absent"
                subLabel="5.6% absence rate"
                trendColor="text-red-500"
              />
              <StatCard
                icon={<Users className="w-5 h-5 text-blue-500" />}
                badge="+8"
                value={onLeave}
                label="On Leave"
                subLabel="Approved leaves"
                trendColor="text-blue-500"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Weekly Attendance Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Weekly Attendance Overview</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyAttendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                      <Bar dataKey="present" fill="#22C55E" radius={[4, 4, 0, 0]} name="Present" />
                      <Bar dataKey="late" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Late" />
                      <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500"></div><span className="text-xs text-gray-600">Present</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-amber-500"></div><span className="text-xs text-gray-600">Late</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500"></div><span className="text-xs text-gray-600">Absent</span></div>
                </div>
              </div>

              {/* Monthly Trend Chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Attendance Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" domain={[0, 100]} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB' }} />
                      <Legend />
                      <Line type="monotone" dataKey="attendance" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E', strokeWidth: 2 }} name="Attendance %" />
                      <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', strokeWidth: 2 }} name="Late %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Shifts & Critical Alerts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Shift Distribution */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-base font-semibold text-gray-800 mb-4">Shift Distribution</h3>
                <div className="space-y-3">
                  {shifts.map((shift) => (
                    <div key={shift.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${shift.color} flex items-center justify-center`}>
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{shift.name}</p>
                          <p className="text-xs text-gray-500">
                            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                            {shift.isSpecial && <span className="ml-1 text-green-600">(Sat: {formatTime(shift.startTimeSat)} - {formatTime(shift.endTimeSat)})</span>}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">{shift.employees}</p>
                        <p className="text-xs text-gray-500">employees</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Alerts */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-800">Critical Alerts</h3>
                  <span className="text-xs text-red-600 font-medium">Action Required</span>
                </div>
                <div className="space-y-3">
                  {criticalAlerts.map((alert, idx) => (
                    <AlertCard key={idx} {...alert} />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Today Tab Content */}
        {activeTab === "today" && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700">Present</span>
                </div>
                <p className="text-2xl font-bold text-green-800">{presentToday}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span className="text-sm text-amber-700">Late</span>
                </div>
                <p className="text-2xl font-bold text-amber-800">{lateToday}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <UserX className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-red-700">Absent</span>
                </div>
                <p className="text-2xl font-bold text-red-800">{absentToday}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-700">On Leave</span>
                </div>
                <p className="text-2xl font-bold text-blue-800">{onLeave}</p>
              </div>
            </div>
            <TodayAttendanceTable date={today} records={attendanceRecords} />
          </>
        )}

        {/* Shifts Tab Content - HR Management */}
        {activeTab === "shifts" && (
          <div className="space-y-5">
            {/* Shift Management Header */}
            <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Shift Management</h2>
                <p className="text-sm text-gray-500">Configure and manage employee shifts</p>
              </div>
              <button
                onClick={handleAddShift}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New Shift
              </button>
            </div>

            {/* Shifts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shifts.map((shift) => (
                <div key={shift.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  {/* Shift Header */}
                  <div className={`${shift.color.replace('text-', 'bg-').replace('-600', '-50')} rounded-t-xl p-4 border-b`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{shift.name}</h3>
                        {shift.isSpecial && (
                          <span className="inline-block px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full mt-1">
                            Special Shift
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditShift(shift)}
                          className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          title="Edit Shift"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteShift(shift.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          title="Delete Shift"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Shift Details */}
                  <div className="p-4 space-y-3">
                    {/* Weekday Timing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Mon-Fri</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                      </span>
                    </div>

                    {/* Saturday Timing */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Saturday</span>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {shift.startTimeSat && shift.endTimeSat
                          ? `${formatTime(shift.startTimeSat)} - ${formatTime(shift.endTimeSat)}`
                          : "Same as weekday"}
                      </span>
                    </div>

                    {/* Break & Grace */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500">Break Duration</p>
                        <p className="text-sm font-medium text-gray-800">{shift.breakDuration} min</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Grace Time</p>
                        <p className="text-sm font-medium text-gray-800">{shift.graceTime} min</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Employees</p>
                        <p className="text-sm font-medium text-gray-800">{shift.employees}</p>
                      </div>
                    </div>

                    {/* Departments */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Departments</p>
                      <div className="flex flex-wrap gap-1">
                        {shift.departments.map((dept, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Special Shift Info */}
                    {shift.isSpecial && shift.description && (
                      <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-xs text-amber-700">
                          <span className="font-medium">Note:</span> {shift.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Department-wise Shift Summary */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Department-wise Shift Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shift</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mon-Fri Timing</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sat Timing</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employees</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">Sales</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Sales Shift</span></td>
                      <td className="px-4 py-3 text-sm text-gray-600">10:00 AM - 7:00 PM</td>
                      <td className="px-4 py-3 text-sm text-gray-600">10:00 AM - 8:00 PM</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">45</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">Production</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">Shift 1, 2, 3</span></td>
                      <td className="px-4 py-3 text-sm text-gray-600">Rotational</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Rotational</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">207</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">IT / HR / Finance</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">General</span></td>
                      <td className="px-4 py-3 text-sm text-gray-600">9:00 AM - 6:00 PM</td>
                      <td className="px-4 py-3 text-sm text-gray-600">9:00 AM - 6:00 PM</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">156</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab Content */}
        {activeTab === "policies" && (
          <div className="space-y-5">
            {/* Header */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Attendance Policies</h2>
                  <p className="text-sm text-gray-500">Configure late mark and sandwich leave deduction policies</p>
                </div>
              </div>
            </div>

            {/* Late Mark Policy */}
            <LateMarkPolicySettings
              settings={lateMarkSettings}
              onUpdate={setLateMarkSettings}
            />

            {/* Sandwich Leave Policy */}
            <SandwichLeavePolicySettings
              settings={sandwichSettings}
              onUpdate={setSandwichSettings}
            />

            {/* Policy Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Policy Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-medium text-gray-700">Buffer Time</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{lateMarkSettings.bufferTime} min</p>
                  <p className="text-xs text-gray-500">Grace period for late check-in</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Half Day Deduction</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{lateMarkSettings.halfDayThreshold} Days</p>
                  <p className="text-xs text-gray-500">Consecutive late marks threshold</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <UserX className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-gray-700">Full Day Deduction</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{lateMarkSettings.fullDayThreshold} Days</p>
                  <p className="text-xs text-gray-500">Consecutive late marks threshold</p>
                </div>
              </div>
            </div>

            {/* Sandwich Leave Warning */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Sandwich Leave Impact</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Day</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Enabled</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Multiplier</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="px-4 py-3 text-gray-800 font-medium">Saturday</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${sandwichSettings.saturdayEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {sandwichSettings.saturdayEnabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{sandwichSettings.saturdayMultiplier}X</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${sandwichSettings.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {sandwichSettings.enabled ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-800 font-medium">Sunday</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${sandwichSettings.sundayEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {sandwichSettings.sundayEnabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{sandwichSettings.sundayMultiplier}X</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${sandwichSettings.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {sandwichSettings.enabled ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Excluded Reasons:</span>
                {(sandwichSettings.excludedReasons || []).map((reason, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab Content */}
        {activeTab === "reports" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Attendance Reports</h3>
            <p className="text-sm text-gray-500 mb-4">Generate detailed attendance and shift reports</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Download Monthly Report
              </button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Export to Excel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Shift Modal */}
      <EditShiftModal
        isOpen={isShiftModalOpen}
        onClose={() => { setIsShiftModalOpen(false); setEditShift(null); }}
        shift={editShift}
        onSave={handleSaveShift}
      />

      {/* Floating AI Assistant Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-b from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
          <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
        </svg>
      </button>
    </div>
  );
};

export default AttendanceShiftManagement;