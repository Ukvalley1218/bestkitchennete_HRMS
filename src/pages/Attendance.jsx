import React, { useState } from "react";
import TodayAttendanceTable from "../components/AttendanceTable";

// ─── Icons ────────────────────────────────────────────────────────────────────
const TrendIcon = ({ className = "" }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const PresentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LateIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="35" height="35" rx="10" fill="#FFE3E3"/>
    <path d="M23.625 11.25H21.9375V10.6875C21.9375 10.5383 21.8782 10.3952 21.7727 10.2898C21.6673 10.1843 21.5242 10.125 21.375 10.125C21.2258 10.125 21.0827 10.1843 20.9773 10.2898C20.8718 10.3952 20.8125 10.5383 20.8125 10.6875V11.25H15.1875V10.6875C15.1875 10.5383 15.1282 10.3952 15.0227 10.2898C14.9173 10.1843 14.7742 10.125 14.625 10.125C14.4758 10.125 14.3327 10.1843 14.2273 10.2898C14.1218 10.3952 14.0625 10.5383 14.0625 10.6875V11.25H12.375C12.0766 11.25 11.7905 11.3685 11.5795 11.5795C11.3685 11.7905 11.25 12.0766 11.25 12.375V23.625C11.25 23.9234 11.3685 24.2095 11.5795 24.4205C11.7905 24.6315 12.0766 24.75 12.375 24.75H23.625C23.9234 24.75 24.2095 24.6315 24.4205 24.4205C24.6315 24.2095 24.75 23.9234 24.75 23.625V12.375C24.75 12.0766 24.6315 11.7905 24.4205 11.5795C24.2095 11.3685 23.9234 11.25 23.625 11.25ZM14.0625 12.375V12.9375C14.0625 13.0867 14.1218 13.2298 14.2273 13.3352C14.3327 13.4407 14.4758 13.5 14.625 13.5C14.7742 13.5 14.9173 13.4407 15.0227 13.3352C15.1282 13.2298 15.1875 13.0867 15.1875 12.9375V12.375H20.8125V12.9375C20.8125 13.0867 20.8718 13.2298 20.9773 13.3352C21.0827 13.4407 21.2258 13.5 21.375 13.5C21.5242 13.5 21.6673 13.4407 21.7727 13.3352C21.8782 13.2298 21.9375 13.0867 21.9375 12.9375V12.375H23.625V14.625H12.375V12.375H14.0625ZM23.625 23.625H12.375V15.75H23.625V23.625Z" fill="#A60000"/>
  </svg>
);

const AbsentIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="35" height="35" rx="10" fill="#FFE3E3"/>
    <path d="M21.2105 15.9145C21.2628 15.9668 21.3043 16.0288 21.3326 16.0971C21.3609 16.1654 21.3754 16.2386 21.3754 16.3125C21.3754 16.3864 21.3609 16.4596 21.3326 16.5279C21.3043 16.5962 21.2628 16.6582 21.2105 16.7105L17.273 20.648C17.2207 20.7003 17.1587 20.7418 17.0904 20.7701C17.0221 20.7984 16.9489 20.8129 16.875 20.8129C16.8011 20.8129 16.7279 20.7984 16.6596 20.7701C16.5913 20.7418 16.5293 20.7003 16.477 20.648L14.7895 18.9605C14.684 18.8549 14.6247 18.7118 14.6247 18.5625C14.6247 18.4132 14.684 18.2701 14.7895 18.1645C14.8951 18.059 15.0382 17.9997 15.1875 17.9997C15.3368 17.9997 15.4799 18.059 15.5855 18.1645L16.875 19.4548L20.4145 15.9145C20.4668 15.8622 20.5288 15.8207 20.5971 15.7924C20.6654 15.7641 20.7386 15.7496 20.8125 15.7496C20.8864 15.7496 20.9596 15.7641 21.0279 15.7924C21.0962 15.8207 21.1582 15.8622 21.2105 15.9145ZM24.75 12.375V23.625C24.75 23.9234 24.6315 24.2095 24.4205 24.4205C24.2095 24.6315 23.9234 24.75 23.625 24.75H12.375C12.0766 24.75 11.7905 24.6315 11.5795 24.4205C11.3685 24.2095 11.25 23.9234 11.25 23.625V12.375C11.25 12.0766 11.3685 11.7905 11.5795 11.5795C11.7905 11.3685 12.0766 11.25 12.375 11.25H23.625C23.9234 11.25 24.2095 11.3685 24.4205 11.5795C24.6315 11.7905 24.75 12.0766 24.75 12.375ZM23.625 23.625V12.375H12.375V23.625H23.625Z" fill="#A60000"/>
  </svg>
);

const LeaveIcon = () => (
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="35" height="35" rx="10" fill="#FFE3E3"/>
    <path d="M23.625 14.625C23.625 14.7742 23.5657 14.9173 23.4602 15.0227C23.3548 15.1282 23.2117 15.1875 23.0625 15.1875H20.802C20.8083 15.2803 20.8125 15.3738 20.8125 15.4688C20.8112 16.5872 20.3663 17.6595 19.5754 18.4504C18.7845 19.2413 17.7122 19.6862 16.5938 19.6875H15.5173L20.6283 24.3337C20.684 24.3831 20.7293 24.4431 20.7616 24.5102C20.794 24.5772 20.8127 24.65 20.8167 24.7243C20.8207 24.7986 20.8099 24.873 20.7849 24.9432C20.76 25.0133 20.7213 25.0778 20.6713 25.1328C20.6212 25.1879 20.5607 25.2325 20.4933 25.2641C20.4259 25.2956 20.3528 25.3134 20.2785 25.3165C20.2041 25.3197 20.1299 25.308 20.06 25.2822C19.9902 25.2564 19.9262 25.217 19.8717 25.1663L13.6842 19.5413C13.6002 19.4649 13.5413 19.3649 13.5151 19.2544C13.489 19.1439 13.497 19.0281 13.5379 18.9222C13.5788 18.8163 13.6508 18.7253 13.7445 18.6611C13.8381 18.5969 13.949 18.5625 14.0625 18.5625H16.5938C17.414 18.5616 18.2003 18.2353 18.7803 17.6553C19.3603 17.0753 19.6866 16.289 19.6875 15.4688C19.6875 15.3738 19.6826 15.2803 19.6741 15.1875H14.0625C13.9133 15.1875 13.7702 15.1282 13.6648 15.0227C13.5593 14.9173 13.5 14.7742 13.5 14.625C13.5 14.4758 13.5593 14.3327 13.6648 14.2273C13.7702 14.1218 13.9133 14.0625 14.0625 14.0625H19.3479C19.0888 13.5548 18.6945 13.1286 18.2085 12.8308C17.7225 12.533 17.1637 12.3753 16.5938 12.375H14.0625C13.9133 12.375 13.7702 12.3157 13.6648 12.2102C13.5593 12.1048 13.5 11.9617 13.5 11.8125C13.5 11.6633 13.5593 11.5202 13.6648 11.4148C13.7702 11.3093 13.9133 11.25 14.0625 11.25H23.0625C23.2117 11.25 23.3548 11.3093 23.4602 11.4148C23.5657 11.5202 23.625 11.6633 23.625 11.8125C23.625 11.9617 23.5657 12.1048 23.4602 12.2102C23.3548 12.3157 23.2117 12.375 23.0625 12.375H19.4583C19.96 12.8393 20.3417 13.4183 20.5706 14.0625H23.0625C23.2117 14.0625 23.3548 14.1218 23.4602 14.2273C23.5657 14.3327 23.625 14.4758 23.625 14.625Z" fill="#A60000"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
    <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
    <path d="M5 5 L5.8 8 L8 9 L5.8 10 L5 13 L4.2 10 L2 9 L4.2 8 Z" />
    <path d="M19 2 L19.5 4 L21 5 L19.5 6 L19 8 L18.5 6 L17 5 L18.5 4 Z" />
  </svg>
);
const shifts = [
    { title: "Morning Shift", time: "6 AM - 2 PM",  count: 89, bg: "bg-blue-100"   },
    { title: "Evening Shift", time: "2 PM - 10 PM", count: 76, bg: "bg-purple-100" },
    { title: "Night Shift",   time: "10 PM - 6 AM", count: 42, bg: "bg-yellow-100" },
  ];

  const ShiftCard = ({ title, time, count, bg }) => (
  <div className={`${bg} rounded-2xl p-5 flex-1 min-w-[160px]`}>
    <div className="flex items-start justify-between mb-3">
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <p className="text-xs text-gray-500 whitespace-nowrap ml-2">{time}</p>
    </div>
    <p className="text-4xl font-bold text-gray-800 mb-2">{count}</p>
    <p className="text-xs text-gray-500">employees assigned</p>
  </div>
);
// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, badge, value, label }) => (
  <div className="bg-white relative rounded-2xl p-5 overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[140px]">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[85%]  rounded-r" />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400">
          {icon}
        </div>
        <span className="flex items-center gap-0.5 pr-4  text-xs font-semibold text-[#A60000]">
          <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
</svg>

          {badge}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  </div>
);

// ─── Tab Button ───────────────────────────────────────────────────────────────
const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-sm font-medium rounded-xl border border-gray-300 transition-colors ${
      active ? "bg-gray-100 text-gray-800" : "bg-white text-gray-500 hover:bg-gray-50"
    }`}
  >
    {label}
  </button>
);

// ─── Static Data ──────────────────────────────────────────────────────────────
const stats = [
  { icon: <PresentIcon />, badge: "+12", value: "45",    label: "Present Today" },
  { icon: <LateIcon />,    badge: "+5",  value: "18",    label: "Late Arrivals" },
  { icon: <AbsentIcon />,  badge: "+5",  value: "12",    label: "Absent"        },
  { icon: <LeaveIcon />,   badge: "+5",  value: "₹8.5K", label: "On Leave"      },
];

// ✅ FIX: attendanceRecords defined at module level (was missing entirely)
const attendanceRecords = [
  { id: "EMP001", name: "Rajesh Kumar",  department: "Production", shift: "Morning", checkIn: "09:02 AM", checkOut: "-", status: "Present" },
  { id: "EMP002", name: "Priya Sharma",  department: "Sales",      shift: "General", checkIn: "09:15 AM", checkOut: "-", status: "Late"    },
  { id: "EMP003", name: "Amit Patel",    department: "IT",         shift: "General", checkIn: "09:00 AM", checkOut: "-", status: "Present" },
  { id: "EMP004", name: "Sneha Reddy",   department: "Production", shift: "Evening", checkIn: "-",        checkOut: "-", status: "Absent"  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const AttendanceShiftManagement = () => {
  const [activeTab, setActiveTab] = useState("thisMonth");

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    // ✅ FIX: single wrapper — no more duplicate nested layout
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance & Shift Management</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track employee attendance and manage shifts</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center w-fit">
          <TabButton label="This Month" active={activeTab === "thisMonth"} onClick={() => setActiveTab("thisMonth")} />
          <div className="w-px h-8 bg-gray-300 mx-2" />
          <TabButton label="Last Month" active={activeTab === "lastMonth"} onClick={() => setActiveTab("lastMonth")} />
        </div>

        {/* Stat Cards */}
        <div className="flex flex-wrap gap-4">
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* Today's Attendance Table */}
        <TodayAttendanceTable
          date={today}
          records={attendanceRecords}
        />

      </div>

      {/* Floating Sparkle Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 z-50">
        <SparkleIcon />
      </button>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-5 font-sans">
      <h2 className="text-base font-bold text-gray-900 mb-4">Shift Schedule</h2>
      <div className="flex flex-wrap gap-4">
        {shifts.map((s, i) => (
          <ShiftCard key={i} {...s} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default AttendanceShiftManagement;