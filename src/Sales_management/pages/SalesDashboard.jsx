import { useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Phone,
  Calendar,
  MapPin,
  Target,
  ChevronDown,
  AlertTriangle,
  Award,
  Gift,
  Bell,
  Plus,
  User,
  FileText,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";
import { StatCard, QuotationCalculator } from "../components";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Dropdown Component
const FilterDropdown = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className="relative">
      {label && <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 min-w-[140px] px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:shadow-sm transition-all"
      >
        <span className="truncate">{selectedOption?.name || "Select"}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-full min-w-[140px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1 max-h-60 overflow-auto">
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

// Critical Alert Component
const CriticalAlert = ({ type, message, time }) => {
  const styles = {
    urgent: "bg-red-50 border-red-200 text-red-700",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    success: "bg-green-50 border-green-200 text-green-700",
  };
  const icons = {
    urgent: <AlertTriangle size={16} className="text-red-500" />,
    warning: <Clock size={16} className="text-yellow-500" />,
    success: <CheckCircle size={16} className="text-green-500" />,
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg border ${styles[type]}`}>
      {icons[type]}
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
        <p className="text-xs opacity-70">{time}</p>
      </div>
    </div>
  );
};

// Pipeline Kanban Card
const PipelineCard = ({ deal, onConvert3D }) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer mb-3">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-medium text-[#1F2937] text-sm truncate">{deal.client}</h4>
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
        deal.priority === 'High' ? 'bg-red-100 text-red-700' :
        deal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
        'bg-green-100 text-green-700'
      }`}>
        {deal.priority}
      </span>
    </div>
    <p className="text-xs text-gray-500 mb-2">{deal.project}</p>
    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
      <User size={12} />
      <span>{deal.salesperson}</span>
    </div>
    <div className="flex items-center justify-between mb-3">
      <span className="text-lg font-bold text-[#1F2937]">{deal.value}</span>
      <span className="text-xs text-gray-500">{deal.stage}</span>
    </div>
    {deal.stage === "Design Discussion" && (
      <button
        onClick={() => onConvert3D(deal)}
        className="w-full flex items-center justify-center gap-1 bg-[#FF1E1E] text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-red-600 transition-colors"
      >
        <Zap size={12} />
        Convert to 3D
      </button>
    )}
  </div>
);

// Top Performer Card
const TopPerformerCard = ({ rank, name, revenue, deals, conversion }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
      rank === 1 ? 'bg-yellow-100 text-yellow-700' :
      rank === 2 ? 'bg-gray-200 text-gray-700' :
      rank === 3 ? 'bg-orange-100 text-orange-700' :
      'bg-gray-100 text-gray-600'
    }`}>
      {rank}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-[#1F2937]">{name}</p>
      <p className="text-xs text-gray-500">{deals} deals • {conversion}% conversion</p>
    </div>
    <span className="text-sm font-bold text-[#1F2937]">{revenue}</span>
  </div>
);

// Client Milestone Card
const ClientMilestoneCard = ({ client, type, date, icon }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
    <div className="bg-red-50 p-2 rounded-lg">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-[#1F2937]">{client}</p>
      <p className="text-xs text-gray-500">{type}</p>
    </div>
    <span className="text-xs text-gray-500">{date}</span>
  </div>
);

// Activity Item Component
const ActivityItem = ({ activity }) => {
  const iconStyles = {
    lead: { bg: 'bg-blue-50', color: 'text-blue-600' },
    quotation: { bg: 'bg-purple-50', color: 'text-purple-600' },
    deal: { bg: 'bg-green-50', color: 'text-green-600' },
    payment: { bg: 'bg-yellow-50', color: 'text-yellow-600' },
    design: { bg: 'bg-pink-50', color: 'text-pink-600' },
  };
  const style = iconStyles[activity.type] || iconStyles.lead;

  return (
    <div className="flex items-start gap-3">
      <div className={`flex items-center justify-center rounded-full flex-shrink-0 ${style.bg}`} style={{ width: '32px', height: '32px' }}>
        <activity.icon size={14} className={style.color} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
        <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
      </div>
      {activity.amount && <span className="text-sm font-semibold text-green-600">{activity.amount}</span>}
    </div>
  );
};

const SalesDashboard = () => {
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [showQuotationCalculator, setShowQuotationCalculator] = useState(false);
  const [quotations, setQuotations] = useState([
    { id: "all", name: "All Departments" },
    { id: "sales", name: "Sales" },
    { id: "design", name: "Design" },
    { id: "production", name: "Production" },
    { id: "accounts", name: "Accounts" },
  ];

  const stages = [
    { id: "all", name: "All Stages" },
    { id: "new", name: "New Projects" },
    { id: "ongoing", name: "Ongoing" },
    { id: "review", name: "Under Review" },
    { id: "approved", name: "Approved" },
  ];

  // KPI Stats - Sales Performance
  const performanceStats = [
    {
      id: 1,
      label: "Total Revenue",
      value: "₹45,23,100",
      icon: DollarSign,
      trend: "+20.1%",
      sub: "vs last month",
    },
    {
      id: 2,
      label: "Total Orders",
      value: "2,350",
      icon: ShoppingCart,
      trend: "+15.3%",
      sub: "vs last month",
    },
    {
      id: 3,
      label: "New Customers",
      value: "1,234",
      icon: Users,
      trend: "+12.5%",
      sub: "vs last month",
    },
    {
      id: 4,
      label: "Conversion Rate",
      value: "89.2%",
      icon: TrendingUp,
      trend: "+4.1%",
      sub: "vs last month",
    },
  ];

  // Sales Activity KPIs
  const activityStats = [
    { id: 1, label: "Calls Made", value: "125", icon: Phone, trend: "+12%", sub: "vs yesterday" },
    { id: 2, label: "Leads Generated", value: "48", icon: Users, trend: "+8%", sub: "vs yesterday" },
    { id: 3, label: "Meetings", value: "12", icon: Calendar, trend: "+5%", sub: "vs yesterday" },
    { id: 4, label: "Site Visits", value: "8", icon: MapPin, trend: "+3%", sub: "vs yesterday" },
  ];

  // Target vs Achievement
  const targetData = {
    monthlyTarget: "₹6,00,000",
    achieved: "₹4,80,000",
    remaining: "₹1,20,000",
    achievement: 80,
  };

  // Monthly Sales Data
  const monthlySalesData = [
    { name: 'Jan', sales: 4000, target: 3500 },
    { name: 'Feb', sales: 3200, target: 3400 },
    { name: 'Mar', sales: 5000, target: 4500 },
    { name: 'Apr', sales: 4500, target: 4000 },
    { name: 'May', sales: 6000, target: 5500 },
    { name: 'Jun', sales: 5500, target: 5000 },
    { name: 'Jul', sales: 7000, target: 6500 },
  ];

  // Lead Conversion Funnel Data
  const funnelData = [
    { name: 'New Leads', value: 100, color: '#FF1E1E' },
    { name: 'Contacted', value: 75, color: '#F59E0B' },
    { name: 'Site Visit', value: 50, color: '#10B981' },
    { name: 'Quotation', value: 30, color: '#3B82F6' },
    { name: 'Negotiation', value: 20, color: '#8B5CF6' },
    { name: 'Closed', value: 15, color: '#059669' },
  ];

  // Pipeline Data
  const pipelineStages = [
    { id: 'new', name: 'New Lead', color: 'bg-blue-100', deals: [
      { id: 1, client: 'Mr. Sharma', project: '2BHK Interior', value: '₹3.5L', salesperson: 'Rahul', priority: 'High', stage: 'New Lead' },
      { id: 2, client: 'Mrs. Patel', project: 'Office Design', value: '₹8L', salesperson: 'Amit', priority: 'Medium', stage: 'New Lead' },
    ]},
    { id: 'contacted', name: 'Contacted', color: 'bg-yellow-100', deals: [
      { id: 3, client: 'Mr. Kumar', project: 'Villa Interior', value: '₹15L', salesperson: 'Sneha', priority: 'High', stage: 'Contacted' },
    ]},
    { id: 'visit', name: 'Site Visit', color: 'bg-orange-100', deals: [
      { id: 4, client: 'Mr. Singh', project: 'Restaurant', value: '₹12L', salesperson: 'Rahul', priority: 'Medium', stage: 'Site Visit' },
    ]},
    { id: 'design', name: 'Design Discussion', color: 'bg-purple-100', deals: [
      { id: 5, client: 'Mrs. Gupta', project: '3BHK Modular', value: '₹5L', salesperson: 'Amit', priority: 'High', stage: 'Design Discussion' },
    ]},
    { id: 'quotation', name: 'Quotation Sent', color: 'bg-indigo-100', deals: [
      { id: 6, client: 'Mr. Verma', project: 'Shop Interior', value: '₹4L', salesperson: 'Sneha', priority: 'Low', stage: 'Quotation Sent' },
    ]},
    { id: 'negotiation', name: 'Negotiation', color: 'bg-pink-100', deals: [
      { id: 7, client: 'Mrs. Joshi', project: 'Home Renovation', value: '₹7L', salesperson: 'Rahul', priority: 'High', stage: 'Negotiation' },
    ]},
    { id: 'closed', name: 'Deal Closed', color: 'bg-green-100', deals: [
      { id: 8, client: 'Mr. Mehta', project: 'Flat Interior', value: '₹6L', salesperson: 'Amit', priority: 'Medium', stage: 'Deal Closed' },
    ]},
    { id: 'lost', name: 'Lost', color: 'bg-red-100', deals: [
      { id: 9, client: 'Mr. Brown', project: 'Cafe Design', value: '₹9L', salesperson: 'Sneha', priority: 'Low', stage: 'Lost' },
    ]},
  ];

  // Quotations Data
  const [quotations, setQuotations] = useState([
    { id: 'QT-001', client: 'Mr. Sharma', type: '2BHK Interior', amount: '₹3,50,000', status: 'Open', updated: '2 hrs ago' },
    { id: 'QT-002', client: 'Mrs. Patel', type: 'Office Design', amount: '₹8,00,000', status: 'Negotiation', updated: '5 hrs ago' },
    { id: 'QT-003', client: 'Mr. Kumar', type: 'Villa Interior', amount: '₹15,00,000', status: 'Approved', updated: '1 day ago' },
    { id: 'QT-004', client: 'Mrs. Gupta', type: '3BHK Modular', amount: '₹5,00,000', status: 'Draft', updated: '2 days ago' },
    { id: 'QT-005', client: 'Mr. Verma', type: 'Shop Interior', amount: '₹4,00,000', status: 'Sent', updated: '3 days ago' },
  ]);

  // Recent Activities
  const recentActivities = [
    { id: 1, type: 'lead', icon: Users, title: 'New lead added', user: 'Rahul', time: '5 mins ago' },
    { id: 2, type: 'quotation', icon: FileText, title: 'Quotation sent to Mr. Sharma', user: 'Amit', time: '10 mins ago' },
    { id: 3, type: 'deal', icon: Briefcase, title: 'Deal closed - Villa Interior', user: 'Sneha', time: '1 hr ago', amount: '+₹15L' },
    { id: 4, type: 'payment', icon: DollarSign, title: 'Payment received', user: 'Rahul', time: '2 hrs ago', amount: '+₹3.5L' },
    { id: 5, type: 'design', icon: CheckCircle, title: 'Design approved by client', user: 'Amit', time: '3 hrs ago' },
  ];

  // Critical Alerts
  const criticalAlerts = [
    { type: 'urgent', message: 'Quotation pending approval for 3 days', time: 'Action required' },
    { type: 'warning', message: 'Monthly target 20% behind schedule', time: '2 days left' },
    { type: 'urgent', message: 'Client follow-up overdue - Mrs. Patel', time: 'Due yesterday' },
  ];

  // Top Performers
  const topPerformers = [
    { rank: 1, name: 'Rahul', revenue: '₹12L', deals: 15, conversion: 85 },
    { rank: 2, name: 'Amit', revenue: '₹10L', deals: 12, conversion: 78 },
    { rank: 3, name: 'Sneha', revenue: '₹9L', deals: 10, conversion: 72 },
    { rank: 4, name: 'Priya', revenue: '₹7L', deals: 8, conversion: 68 },
    { rank: 5, name: 'Vikram', revenue: '₹5L', deals: 6, conversion: 65 },
  ];

  // Client Milestones
  const clientMilestones = [
    { client: 'Mr. Sharma', type: 'Birthday', date: 'Tomorrow', icon: <Gift size={16} className="text-red-600" /> },
    { client: 'Mrs. Patel', type: 'Anniversary', date: 'Mar 15', icon: <Gift size={16} className="text-red-600" /> },
    { client: 'Mr. Kumar', type: 'Follow-up Due', date: 'Today', icon: <Bell size={16} className="text-red-600" /> },
  ];

  const handleConvert3D = (deal) => {
    console.log('Converting to 3D:', deal);
    alert(`Project "${deal.project}" moved to Design Department!\nDesigner will be assigned automatically.`);
  };

  const handleCreateQuotation = (quotationData) => {
    const newQuotation = {
      id: `QT-${String(quotations.length + 1).padStart(3, '0')}`,
      client: quotationData.clientName,
      type: quotationData.projectType,
      amount: `₹${parseFloat(quotationData.total).toLocaleString()}`,
      status: 'Draft',
      updated: 'Just now',
    };
    setQuotations([newQuotation, ...quotations]);
    console.log('New quotation created:', quotationData);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-700',
      'Sent': 'bg-blue-100 text-blue-700',
      'Open': 'bg-yellow-100 text-yellow-700',
      'Negotiation': 'bg-orange-100 text-orange-700',
      'Approved': 'bg-green-100 text-green-700',
      'Rejected': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Sales Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Overview of your sales performance and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterDropdown
            label="Department"
            options={departments}
            value={departmentFilter}
            onChange={setDepartmentFilter}
          />
        </div>
      </div>

      {/* Performance Stats Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Sales Activity Stats Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activityStats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Target vs Achievement Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Target vs Achievement</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Monthly Target</p>
            <p className="text-xl font-bold text-[#1F2937]">{targetData.monthlyTarget}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Achieved Sales</p>
            <p className="text-xl font-bold text-green-600">{targetData.achieved}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Remaining</p>
            <p className="text-xl font-bold text-orange-600">{targetData.remaining}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Achievement</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-[#FF1E1E]">{targetData.achievement}%</p>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-[#FF1E1E] h-2 rounded-full" style={{ width: `${targetData.achievement}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Sales Trend */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Monthly Sales vs Target</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }} />
              <Bar dataKey="sales" fill="#FF1E1E" radius={[4, 4, 0, 0]} name="Sales" />
              <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Conversion Funnel */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Lead Conversion</h3>
          <div className="space-y-2">
            {funnelData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600 flex-1">{item.name}</span>
                <span className="text-sm font-medium text-[#1F2937]">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={funnelData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                  {funnelData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Critical Alerts Section */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
          <AlertTriangle size={20} className="text-red-500" />
          Critical Alerts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {criticalAlerts.map((alert, index) => (
            <CriticalAlert key={index} {...alert} />
          ))}
        </div>
      </div>

      {/* Sales Pipeline Section */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1F2937]">Sales Pipeline</h3>
          <FilterDropdown
            label=""
            options={stages}
            value={stageFilter}
            onChange={setStageFilter}
          />
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {pipelineStages.map((stage) => (
              <div key={stage.id} className="w-72">
                <div className={`rounded-t-xl px-4 py-3 ${stage.color}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#1F2937] text-sm">{stage.name}</h4>
                    <span className="bg-white px-2 py-0.5 rounded-full text-xs font-medium text-gray-600">
                      {stage.deals.length}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-b-xl p-3 min-h-[150px] space-y-3">
                  {stage.deals.map((deal) => (
                    <PipelineCard key={deal.id} deal={deal} onConvert3D={handleConvert3D} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quotations and Top Performers Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quotation Management */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F2937]">Quotation Management</h3>
            <button
              onClick={() => setShowQuotationCalculator(true)}
              className="flex items-center gap-1 bg-[#FF1E1E] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              <Plus size={16} />
              Create
            </button>
          </div>

          {/* Quick Calculator Preview */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Quotation Calculator</h4>
              <button
                onClick={() => setShowQuotationCalculator(true)}
                className="flex items-center gap-1 text-sm text-[#FF1E1E] font-medium hover:underline"
              >
                <Calculator size={14} />
                Open Calculator
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Formula: Total = (Area × Price/sqft) + Material + Labour - Discount% + Tax%
            </p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Base</p>
                <p className="text-sm font-bold text-gray-900">Auto</p>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Tax</p>
                <p className="text-sm font-bold text-gray-900">18%</p>
              </div>
              <div className="bg-white rounded-lg p-2 text-center">
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-sm font-bold text-[#FF1E1E]">Auto</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Recent Quotations</p>
            {quotations.slice(0, 4).map((quote) => (
              <div key={quote.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1F2937]">{quote.client}</p>
                  <p className="text-xs text-gray-500">{quote.type}</p>
                </div>
                <div className="text-right mr-3">
                  <p className="text-sm font-bold text-[#1F2937]">{quote.amount}</p>
                  <p className="text-xs text-gray-500">{quote.updated}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(quote.status)}`}>
                  {quote.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#1F2937] flex items-center gap-2">
              <Award size={20} className="text-yellow-500" />
              Top Performers
            </h3>
          </div>
          <div className="space-y-3">
            {topPerformers.map((performer) => (
              <TopPerformerCard key={performer.rank} {...performer} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity and Client Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        {/* Client Milestones */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4 flex items-center gap-2">
            <Gift size={20} className="text-red-500" />
            Client Milestones
          </h3>
          <div className="space-y-3">
            {clientMilestones.map((milestone, index) => (
              <ClientMilestoneCard key={index} {...milestone} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <div className="relative">
          {showFloatingMenu && (
            <div className="absolute bottom-14 right-0 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[180px]">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <User size={16} />
                Add Lead
              </button>
              <button
                onClick={() => {
                  setShowQuotationCalculator(true);
                  setShowFloatingMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <FileText size={16} />
                Create Quotation
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Calendar size={16} />
                Schedule Meeting
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Users size={16} />
                Add Client
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <Briefcase size={16} />
                Create Deal
              </button>
            </div>
          )}
          <button
            onClick={() => setShowFloatingMenu(!showFloatingMenu)}
            className="w-14 h-14 bg-[#FF1E1E] rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
          >
            {showFloatingMenu ? <XCircle size={24} className="text-white" /> : <Plus size={24} className="text-white" />}
          </button>
        </div>
      </div>

      {/* Quotation Calculator Modal */}
      <QuotationCalculator
        isOpen={showQuotationCalculator}
        onClose={() => setShowQuotationCalculator(false)}
        onCalculate={handleCreateQuotation}
      />
    </div>
  );
};

export default SalesDashboard;