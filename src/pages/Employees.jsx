import { useState } from "react";


// import { useState } from "react";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
// const DownloadIcon = () => (
//   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
//   </svg>
// );
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const DeleteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);
const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
    <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
    <path d="M5 5 L5.8 8 L8 9 L5.8 10 L5 13 L4.2 10 L2 9 L4.2 8 Z" />
    <path d="M19 2 L19.5 4 L21 5 L19.5 6 L19 8 L18.5 6 L17 5 L18.5 4 Z" />
  </svg>
);

const employees = [
  { id: "EMP001", name: "Rajesh Kumar", dept: "Production", designation: "Machine Operator", type: "Full-time", shift: "Morning", reporting: "Suresh Rao", status: "Active" },
  { id: "EMP002", name: "Priya Sharma", dept: "Sales", designation: "Sales Executive", type: "Full-time", shift: "General", reporting: "Amit Verma", status: "Active" },
  { id: "EMP003", name: "Amit Patel", dept: "IT", designation: "Software Engineer", type: "Full-time", shift: "General", reporting: "Deepak Singh", status: "Active" },
  { id: "EMP004", name: "Sneha Reddy", dept: "Production", designation: "Quality Inspector", type: "Contract", shift: "Evening", reporting: "Suresh Rao", status: "Active" },
  { id: "EMP004", name: "Sneha Reddy", dept: "Production", designation: "Quality Inspector", type: "Contract", shift: "Evening", reporting: "Suresh Rao", status: "Active" },
];

const tabs = [
  { label: "All Employees (248)", value: "all" },
  { label: "Full-time (198)", value: "fulltime" },
  { label: "Contract (35)", value: "contract" },
  { label: "Factory Workers (145)", value: "factory" },
];

const TypeBadge = ({ type }) => {
  const styles = {
    "Full-time": "bg-blue-100 text-blue-600",
    "Contract": "bg-purple-100 text-purple-600",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${styles[type] || "bg-gray-100 text-gray-600"}`}>
      {type}
    </span>
  );
};

const StatusBadge = ({ status }) => (
  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-600 border border-green-200">
    {status}
  </span>
);
const TrendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IncentiveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polyline points="9 11 12 14 22 4" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const stats = [
  {
    icon: <IncentiveIcon />,
    badge: "+12",
    value: "₹0.90L",
    label: "Total Incentives",
    sublabel: "For Jan 2026",
  },
  {
    icon: <PhoneIcon />,
    badge: "+5",
    value: "142",
    label: "Pending Approvals",
    sublabel: "Requires Action",
  },
  {
    icon: <ChartIcon />,
    badge: "+5",
    value: "07",
    label: "Approved",
    sublabel: "Ready To Pay",
  },
  {
    icon: <CheckIcon />,
    badge: "+5",
    value: "02",
    label: "Paid",
    sublabel: "Completed",
  },
];

export default function EmployeeManagement() {
  const [activeTab, setActiveTab] = useState("thisMonth");
// const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  return (
    <div className=" bg-white p-4 sm:p-6 lg:p-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">Employee Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage employee master data and organizational structure</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              <DownloadIcon />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
              <PlusIcon />
              Add Employee
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 w-fit mb-5">
      {/* Button 1 */}
      <button
        onClick={() => setActiveTab("thisMonth")}
        className={`px-6 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
          activeTab === "thisMonth"
            ? "bg-gray-100 border-gray-300 text-gray-800"
            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
        }`}
      >
        This Month
      </button>

      {/* Vertical divider line */}
      <div className="w-px h-8 bg-gray-300 mx-2" />

      {/* Button 2 */}
      <button
        onClick={() => setActiveTab("lastMonth")}
        className={`px-6 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
          activeTab === "lastMonth"
            ? "bg-gray-100 border-gray-300 text-gray-800"
            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
        }`}
      >
        Last Month
      </button>
    </div>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              {/* Top row: icon + badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl  flex items-center justify-center text-red-500">
                  {stat.icon}
                </div>
                <span className="flex items-center gap-1 text-xs font-semibold text-red-500  px-2 py-0.5 rounded-full">
                  <svg width="15" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
</svg>

                  {stat.badge}
                </span>
              </div>

              {/* Value */}
              <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{stat.value}</p>

              {/* Label */}
              <p className="text-sm font-semibold text-[#00000099]">{stat.label}</p>

              {/* Sublabel */}
              <p className="text-xs text-gray-400 mt-0.5">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
      <div className=" mt-5 p-4 sm:p-6 lg:p-0 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Search + Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 border-b border-gray-100">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or employee ID..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition"
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <DownloadIcon /> Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <FilterIcon /> Filters
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-gray-100 bg-white">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Employee ID", "Name", "Department", "Designation", "Type", "Shift", "Reporting To", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter(e =>
                    search === "" ||
                    e.name.toLowerCase().includes(search.toLowerCase()) ||
                    e.id.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((emp, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 text-gray-500 font-medium whitespace-nowrap">{emp.id}</td>
                      <td className="px-4 py-4 font-semibold text-gray-800 whitespace-nowrap">{emp.name}</td>
                      <td className="px-4 py-4 text-gray-500">{emp.dept}</td>
                      <td className="px-4 py-4 text-gray-400 text-xs leading-snug">{emp.designation}</td>
                      <td className="px-4 py-4"><TypeBadge type={emp.type} /></td>
                      <td className="px-4 py-4 text-gray-500">{emp.shift}</td>
                      <td className="px-4 py-4 text-gray-500 text-xs leading-snug">{emp.reporting}</td>
                      <td className="px-4 py-4"><StatusBadge status={emp.status} /></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-gray-400 hover:text-gray-700 transition-colors"><ViewIcon /></button>
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors"><EditIcon /></button>
                          <button className="p-1 text-gray-400 hover:text-red-500 transition-colors"><DeleteIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating AI Button */}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 z-50">
          <SparkleIcon />
        </button>
      </div>
    </div>
    </div>
  );
}