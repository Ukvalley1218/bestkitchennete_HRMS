import { useState } from "react";
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const SalesReport = () => {
  const [period, setPeriod] = useState("month");

  const monthlyData = [
    { name: 'Jan', sales: 4000, target: 3500 },
    { name: 'Feb', sales: 3000, target: 3200 },
    { name: 'Mar', sales: 5000, target: 4500 },
    { name: 'Apr', sales: 4500, target: 4000 },
    { name: 'May', sales: 6000, target: 5500 },
    { name: 'Jun', sales: 5500, target: 5000 },
  ];

  const revenueData = [
    { name: 'Week 1', value: 12000 },
    { name: 'Week 2', value: 15000 },
    { name: 'Week 3', value: 18000 },
    { name: 'Week 4', value: 14000 },
  ];

  const sourceData = [
    { name: 'Website', value: 35, color: '#FF1E1E' },
    { name: 'Referral', value: 25, color: '#10B981' },
    { name: 'Social Media', value: 20, color: '#F59E0B' },
    { name: 'Direct', value: 15, color: '#8B5CF6' },
    { name: 'Other', value: 5, color: '#6B7280' },
  ];

  const topProducts = [
    { name: 'Enterprise License', sales: 156, revenue: '$234,000', growth: '+12%' },
    { name: 'Cloud Services', sales: 124, revenue: '$186,000', growth: '+8%' },
    { name: 'Consulting Package', sales: 89, revenue: '$133,500', growth: '+15%' },
    { name: 'Support Plan', sales: 78, revenue: '$78,000', growth: '+5%' },
    { name: 'Training Program', sales: 45, revenue: '$67,500', growth: '+22%' },
  ];

  const salesTeamPerformance = [
    { name: 'Mike Johnson', deals: 23, revenue: '$156,000', target: '$150,000', progress: 104 },
    { name: 'Jane Doe', deals: 19, revenue: '$142,000', target: '$140,000', progress: 101 },
    { name: 'Alex Smith', deals: 15, revenue: '$98,000', target: '$120,000', progress: 82 },
    { name: 'Emily Brown', deals: 12, revenue: '$87,000', target: '$100,000', progress: 87 },
  ];

  return (
    <div className="pt-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Sales Report</h1>
          <p className="text-gray-500 text-sm mt-1">Analyze your sales performance and metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#FF1E1E]"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-[#1F2937]">$250,000</p>
              <p className="text-xs text-green-600 mt-1">+12.5% vs last period</p>
            </div>
            <div className="bg-red-50 p-3 rounded-xl">
              <DollarSign size={24} className="text-[#A60000]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Deals</p>
              <p className="text-2xl font-bold text-[#1F2937]">156</p>
              <p className="text-xs text-green-600 mt-1">+8.3% vs last period</p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <BarChart3 size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">New Customers</p>
              <p className="text-2xl font-bold text-[#1F2937]">89</p>
              <p className="text-xs text-green-600 mt-1">+15.2% vs last period</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl">
              <Users size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg Deal Size</p>
              <p className="text-2xl font-bold text-[#1F2937]">$1,602</p>
              <p className="text-xs text-red-600 mt-1">-3.2% vs last period</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-xl">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Target Chart */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Sales vs Target</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="sales" fill="#FF1E1E" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#FF1E1E" strokeWidth={2} dot={{ fill: '#FF1E1E' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales by Source */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Sales by Source</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {sourceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-[#1F2937]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Top Products</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-[#1F2937]">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#1F2937]">{product.revenue}</p>
                  <p className="text-xs text-green-600">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937] mb-4">Team Performance</h3>
          <div className="space-y-4">
            {salesTeamPerformance.map((member, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#1F2937]">{member.name}</span>
                  <span className="text-xs text-gray-500">{member.revenue}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${member.progress >= 100 ? 'bg-green-500' : 'bg-[#FF1E1E]'}`}
                    style={{ width: `${Math.min(member.progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{member.progress}% of target</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;