import { TrendingUp, TrendingDown } from "lucide-react";

const BudgetROI = () => {
  const budgetData = [
    { channel: "Google Ads", budget: "$12,000", spent: "$8,500", roi: "280%", trend: "up" },
    { channel: "Instagram", budget: "$5,000", spent: "$4,200", roi: "385%", trend: "up" },
    { channel: "Billboard", budget: "$8,000", spent: "$8,000", roi: "420%", trend: "up" },
    { channel: "Events", budget: "$15,000", spent: "$12,000", roi: "320%", trend: "up" },
    { channel: "Bus Branding", budget: "$6,000", spent: "$5,500", roi: "195%", trend: "down" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1F2937]">Budget & ROI</h1>
        <p className="text-gray-500 text-sm mt-1">Track marketing budget allocation and return on investment</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Budget</p>
          <h3 className="text-3xl font-bold text-[#1F2937] mt-2">$46,000</h3>
          <p className="text-xs text-gray-400 mt-2">Monthly allocation</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Spent This Month</p>
          <h3 className="text-3xl font-bold text-[#1F2937] mt-2">$38,200</h3>
          <p className="text-xs text-green-600 mt-2">83% utilized</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Average ROI</p>
          <h3 className="text-3xl font-bold text-green-600 mt-2">385%</h3>
          <p className="text-xs text-green-600 mt-2">+15% from last month</p>
        </div>
      </div>

      {/* Budget Allocation Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937]">Budget by Channel</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Channel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {budgetData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">{item.channel}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.budget}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.spent}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">{item.roi}</td>
                <td className="px-6 py-4">
                  {item.trend === "up" ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetROI;