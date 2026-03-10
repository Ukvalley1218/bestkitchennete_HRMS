import React, { useState, useMemo } from "react";
import {
  PlusIcon,
  SearchIcon,
  DownloadIcon,
  CalculatorIcon,
  TargetIcon,
  RefreshIcon,
  TrendUpIcon,
} from "./components/Icons";
import { salesIncentiveData, incentiveSlabs } from "./data/payrollData";
import {
  formatCurrency,
  formatNumber,
  calculateIncentive,
  getIncentivePercentage,
  calculateOverAchievedTarget,
  calculate3DDeduction,
  calculateActualIncentive,
} from "./utils/payrollCalculations";

// ─── Incentive Calculator Component ─────────────────────────────────────────────
const IncentiveCalculator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [monthlyTarget, setMonthlyTarget] = useState(600000);

  // Calculate totals from sales data
  const salesCalculations = useMemo(() => {
    const totalSales = salesIncentiveData.reduce((sum, sale) => sum + sale.receipt, 0);
    const totalDealAmount = salesIncentiveData.reduce((sum, sale) => sum + sale.dealAmount, 0);
    const overAchieved = calculateOverAchievedTarget(totalSales, monthlyTarget);
    const incentivePercent = getIncentivePercentage(totalSales, incentiveSlabs);
    const incentiveAmount = calculateIncentive(totalSales, incentiveSlabs);
    const deduction3D = calculate3DDeduction(incentiveAmount);
    const actualIncentive = calculateActualIncentive(incentiveAmount, deduction3D);

    return {
      totalSales,
      totalDealAmount,
      overAchieved,
      incentivePercent,
      incentiveAmount,
      deduction3D,
      actualIncentive,
    };
  }, [monthlyTarget]);

  const filteredSales = salesIncentiveData.filter((sale) =>
    sale.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Incentive Calculator</h1>
            <p className="text-sm text-gray-500 mt-0.5">Calculate sales incentives based on performance</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
              <RefreshIcon />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all hover:shadow-lg">
              <PlusIcon />
              Add Sale
            </button>
          </div>
        </div>

        {/* Incentive Slabs Info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Incentive Structure</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {incentiveSlabs.map((slab, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-500">
                  {slab.max === Infinity
                    ? `Above ${formatNumber(slab.min)}`
                    : `${formatNumber(slab.min / 100000)}L - ${formatNumber(slab.max / 100000)}L`}
                </p>
                <p className="text-lg font-bold text-red-600 mt-1">{slab.percentage}%</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            * Incentive paid after 45 days before 18th of next month
          </p>
        </div>

        {/* Monthly Target Input */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm opacity-80">Monthly Basic Target</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-3xl font-bold">₹</span>
                <input
                  type="number"
                  value={monthlyTarget}
                  onChange={(e) => setMonthlyTarget(Number(e.target.value))}
                  className="w-40 bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-2xl font-bold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-80">Total Sales</p>
                <p className="text-xl font-bold">{formatCurrency(salesCalculations.totalSales)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-80">Over Achieved</p>
                <p className="text-xl font-bold text-green-300">+{formatCurrency(salesCalculations.overAchieved)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-80">Incentive %</p>
                <p className="text-xl font-bold">{salesCalculations.incentivePercent}%</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-xs opacity-80">Incentive</p>
                <p className="text-xl font-bold text-yellow-300">{formatCurrency(salesCalculations.incentiveAmount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calculation Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CalculatorIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500">Calculated Incentive</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(salesCalculations.incentiveAmount)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">@ {salesCalculations.incentivePercent}% on total sales</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                <span className="text-lg font-bold">3D</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">3D Deduction (0.10%)</p>
                <p className="text-2xl font-bold text-red-600">-{formatCurrency(salesCalculations.deduction3D)}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">Standard deduction applied</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 shadow-sm text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                <TrendUpIcon />
              </div>
              <div>
                <p className="text-sm opacity-80">Actual Incentive Payable</p>
                <p className="text-2xl font-bold">{formatCurrency(salesCalculations.actualIncentive)}</p>
              </div>
            </div>
            <p className="text-xs opacity-80">After 3D deduction</p>
          </div>
        </div>

        {/* Sales Data Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-base font-semibold text-gray-900">Sales Sheet - February 2024</h3>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sr No</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Estimate</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deal Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Receipt</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 text-sm text-gray-500">{sale.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                      {sale.clientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{sale.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(sale.estimate)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(sale.dealAmount)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-green-600">{formatCurrency(sale.receipt)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{sale.remarks}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50 border-t-2 border-gray-100">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-sm font-bold text-gray-900">Total</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {formatCurrency(salesIncentiveData.reduce((sum, s) => sum + s.estimate, 0))}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    {formatCurrency(salesCalculations.totalDealAmount)}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600">
                    {formatCurrency(salesCalculations.totalSales)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredSales.length}</span> sales records
            </p>
            <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium">
              <DownloadIcon />
              Export Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncentiveCalculator;