import React, { useState } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const TrendIcon = ({ className = "" }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);
const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polyline points="9 11 12 14 22 4" />
  </svg>
);
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const FilterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5">
    <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
    <path d="M5 5 L5.8 8 L8 9 L5.8 10 L5 13 L4.2 10 L2 9 L4.2 8 Z" />
    <path d="M19 2 L19.5 4 L21 5 L19.5 6 L19 8 L18.5 6 L17 5 L18.5 4 Z" />
  </svg>
);
const CircleCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    Approved: "bg-blue-100 text-blue-600",
    Paid:     "bg-green-100 text-green-600",
    Pending:  "bg-yellow-100 text-yellow-600",
  };
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
};

// ─── Stat Card (pure display — no state) ─────────────────────────────────────
const IncentiveStatCard = ({ icon, badge, value, label, sublabel }) => (
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
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
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

// ─── Static data ──────────────────────────────────────────────────────────────
const stats = [
  { icon: <IncentiveIcon />, badge: "+12", value: "₹0.90L", label: "Total Incentives",  sublabel: "For Jan 2026"    },
  { icon: <PhoneIcon />,     badge: "+5",  value: "142",    label: "Pending Approvals", sublabel: "Requires Action" },
  { icon: <ChartIcon />,     badge: "+5",  value: "07",     label: "Approved",           sublabel: "Ready To Pay"    },
  { icon: <CheckIcon />,     badge: "+5",  value: "02",     label: "Paid",               sublabel: "Completed"       },
];

const allRecords = [
  { id: "EMP001", name: "Rajesh Kumar",  dept: "Sales",         type: "Sales Target",          target: "500,000", achievement: "620,000", pct: "124%",   rate: "2%",    amount: "₹12,400", status: "Approved", action: false },
  { id: "EMP002", name: "Priya Sharma",  dept: "Marketing",     type: "Campaign Performance",  target: "100",     achievement: "125",     pct: "125%",   rate: "50%",   amount: "₹6,250",  status: "Approved", action: false },
  { id: "EMP003", name: "Amit Patel",    dept: "Manufacturing", type: "Production Efficiency", target: "10,000",  achievement: "11,500",  pct: "115%",   rate: "0.5%",  amount: "₹5,750",  status: "Paid",     action: false },
  { id: "EMP004", name: "Sneha Iyer",    dept: "Finance",       type: "Cost Savings",          target: "50,000",  achievement: "65,000",  pct: "130%",   rate: "5%",    amount: "₹3,250",  status: "Pending",  action: true  },
  { id: "EMP005", name: "Vikram Singh",  dept: "IT",            type: "Project Delivery",      target: "5",       achievement: "6",       pct: "120%",   rate: "1000%", amount: "₹6,000",  status: "Approved", action: false },
  { id: "EMP006", name: "Kavita Reddy",  dept: "HR",            type: "Recruitment Target",    target: "15",      achievement: "18",      pct: "120%",   rate: "200%",  amount: "₹3,600",  status: "Approved", action: false },
  { id: "EMP007", name: "Rohit Verma",   dept: "Sales",         type: "Sales Target",          target: "300,000", achievement: "380,000", pct: "126.7%", rate: "2%",    amount: "₹7,600",  status: "Pending",  action: true  },
  { id: "EMP008", name: "Anjali Shah",   dept: "Operations",    type: "Efficiency Target",     target: "95",      achievement: "98",      pct: "103.2%", rate: "100%",  amount: "₹9,800",  status: "Approved", action: false },
  { id: "EMP009", name: "Sunil Yadav",   dept: "Manufacturing", type: "Quality Target",        target: "98",      achievement: "99.5",    pct: "101.5%", rate: "50%",   amount: "₹4,975",  status: "Pending",  action: true  },
  { id: "EMP010", name: "Deepa Menon",   dept: "Marketing",     type: "Content Performance",   target: "50",      achievement: "62",      pct: "124%",   rate: "100%",  amount: "₹6,200",  status: "Approved", action: false },
  { id: "EMP011", name: "Arjun Nair",    dept: "Sales",         type: "Sales Target",          target: "200,000", achievement: "240,000", pct: "120%",   rate: "2%",    amount: "₹4,800",  status: "Approved", action: false },
  { id: "EMP012", name: "Meera Pillai",  dept: "Finance",       type: "Cost Savings",          target: "30,000",  achievement: "38,000",  pct: "126.7%", rate: "5%",    amount: "₹1,900",  status: "Paid",     action: false },
];

const PAGE_SIZE = 10;

// ─── Main Component (all state lives here) ────────────────────────────────────
const IncentiveRecords = () => {
  const [activeTab, setActiveTab] = useState("thisMonth");
  const [search, setSearch]       = useState("");
  const [page, setPage]           = useState(1);

  const filtered = allRecords.filter(r =>
    search === "" ||
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* ── Header ── */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Incentive Records</h1>
          <p className="text-sm text-gray-400 mt-0.5">Track performance bonuses and incentive payouts</p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center w-fit">
          <TabButton label="This Month" active={activeTab === "thisMonth"} onClick={() => setActiveTab("thisMonth")} />
          <div className="w-px h-8 bg-gray-300 mx-2" />
          <TabButton label="Last Month" active={activeTab === "lastMonth"} onClick={() => setActiveTab("lastMonth")} />
        </div>

        {/* ── Stat Cards ── */}
        <div className="flex flex-wrap gap-4">
          {stats.map((s, i) => <IncentiveStatCard key={i} {...s} />)}
        </div>

        {/* ── Table Card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Search + Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 border-b border-gray-100">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon /></span>
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by name or employee ID..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition"
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <FilterIcon /> Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <DownloadIcon /> Export
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["Employee ID", "Name", "Department", "Incentive Type", "Target", "Achievement", "%", "Rate", "Amount", "Status", "Action"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 text-gray-400 text-xs font-medium whitespace-nowrap">{row.id}</td>
                    <td className="px-4 py-4 font-semibold text-gray-800 whitespace-nowrap">{row.name}</td>
                    <td className="px-4 py-4 text-gray-500 whitespace-nowrap">{row.dept}</td>
                    <td className="px-4 py-4 text-gray-400 text-xs leading-snug">{row.type}</td>
                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{row.target}</td>
                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{row.achievement}</td>
                    <td className="px-4 py-4 font-semibold text-green-500 whitespace-nowrap">{row.pct}</td>
                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{row.rate}</td>
                    <td className="px-4 py-4 font-semibold text-red-500 whitespace-nowrap">{row.amount}</td>
                    <td className="px-4 py-4"><StatusBadge status={row.status} /></td>
                    <td className="px-4 py-4">
                      {row.action && (
                        <button className="text-green-500 hover:text-green-600 transition-colors">
                          <CircleCheckIcon />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 bg-[#F9FAFB] border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} records
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    page === p ? "bg-red-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sparkle Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 z-50">
        <SparkleIcon />
      </button>
      
    </div>
  );
};

export default IncentiveRecords;