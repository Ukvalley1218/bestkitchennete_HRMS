import { useState } from "react";
import { Search, Filter, Eye, Edit2, Trash2, Plus, Download, Send, FileText, Calculator, ChevronDown, XCircle } from "lucide-react";
import { QuotationCalculator } from "../components";

const Quotations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showQuickCalc, setShowQuickCalc] = useState(false);

  const [quotations, setQuotations] = useState([
    {
      id: "QT-001",
      client: "Mr. Sharma",
      contact: "John Smith",
      projectType: "2BHK Interior",
      area: "1200 sq ft",
      date: "Mar 10, 2026",
      validUntil: "Apr 10, 2026",
      amount: "₹3,50,000",
      status: "Accepted",
      items: 5,
    },
    {
      id: "QT-002",
      client: "Mrs. Patel",
      contact: "Sarah Wilson",
      projectType: "Office Design",
      area: "2500 sq ft",
      date: "Mar 08, 2026",
      validUntil: "Apr 08, 2026",
      amount: "₹8,00,000",
      status: "Pending",
      items: 3,
    },
    {
      id: "QT-003",
      client: "Mr. Kumar",
      contact: "Michael Brown",
      projectType: "Villa Interior",
      area: "4500 sq ft",
      date: "Mar 05, 2026",
      validUntil: "Apr 05, 2026",
      amount: "₹15,00,000",
      status: "Sent",
      items: 4,
    },
    {
      id: "QT-004",
      client: "Mrs. Gupta",
      contact: "Emily Davis",
      projectType: "3BHK Modular",
      area: "1800 sq ft",
      date: "Mar 03, 2026",
      validUntil: "Apr 03, 2026",
      amount: "₹5,00,000",
      status: "Rejected",
      items: 6,
    },
    {
      id: "QT-005",
      client: "Mr. Verma",
      contact: "Robert Chen",
      projectType: "Shop Interior",
      area: "800 sq ft",
      date: "Mar 01, 2026",
      validUntil: "Mar 31, 2026",
      amount: "₹4,00,000",
      status: "Expired",
      items: 2,
    },
    {
      id: "QT-006",
      client: "Mrs. Joshi",
      contact: "Lisa Anderson",
      projectType: "Home Renovation",
      area: "2000 sq ft",
      date: "Feb 28, 2026",
      validUntil: "Mar 28, 2026",
      amount: "₹7,00,000",
      status: "Draft",
      items: 8,
    },
  ]);

  // Quick Calculator State
  const [quickCalc, setQuickCalc] = useState({
    area: "",
    pricePerSqFt: "",
    materialCost: "",
    labourCost: "",
    discount: "",
    tax: "18",
  });

  // Quick Calculation
  const area = parseFloat(quickCalc.area) || 0;
  const pricePerSqFt = parseFloat(quickCalc.pricePerSqFt) || 0;
  const materialCost = parseFloat(quickCalc.materialCost) || 0;
  const labourCost = parseFloat(quickCalc.labourCost) || 0;
  const discount = parseFloat(quickCalc.discount) || 0;
  const taxPercent = parseFloat(quickCalc.tax) || 0;

  const baseAmount = area * pricePerSqFt;
  const subtotal = baseAmount + materialCost + labourCost;
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = (afterDiscount * taxPercent) / 100;
  const total = afterDiscount + taxAmount;

  const filters = [
    { id: "all", label: "All Quotations" },
    { id: "draft", label: "Draft" },
    { id: "sent", label: "Sent" },
    { id: "pending", label: "Pending" },
    { id: "accepted", label: "Accepted" },
    { id: "rejected", label: "Rejected" },
  ];

  const filteredQuotations = quotations.filter((quote) => {
    const matchesSearch = quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "draft" && quote.status === "Draft") ||
      (activeFilter === "sent" && quote.status === "Sent") ||
      (activeFilter === "pending" && quote.status === "Pending") ||
      (activeFilter === "accepted" && quote.status === "Accepted") ||
      (activeFilter === "rejected" && quote.status === "Rejected");
    return matchesSearch && matchesFilter;
  });

  const handleCreateQuotation = (quotationData) => {
    const newQuotation = {
      id: `QT-${String(quotations.length + 1).padStart(3, '0')}`,
      client: quotationData.clientName,
      contact: "-",
      projectType: quotationData.projectType,
      area: `${quotationData.area} sq ft`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: `₹${parseFloat(quotationData.total).toLocaleString()}`,
      status: "Draft",
      items: 1,
    };
    setQuotations([newQuotation, ...quotations]);
  };

  const getStatusBadge = (status) => {
    const styles = {
      Accepted: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Sent: "bg-blue-100 text-blue-700",
      Rejected: "bg-red-100 text-red-700",
      Expired: "bg-gray-100 text-gray-600",
      Draft: "bg-purple-100 text-purple-700",
      Negotiation: "bg-orange-100 text-orange-700",
      Open: "bg-cyan-100 text-cyan-700",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Quotations</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track your sales quotations</p>
        </div>
        <button
          onClick={() => setShowCalculator(true)}
          className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Create Quotation
        </button>
      </div>

      {/* Quick Calculator Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setShowQuickCalc(!showQuickCalc)}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Calculator size={20} className="text-[#FF1E1E]" />
            <span className="font-semibold text-[#1F2937]">Quick Quotation Calculator</span>
          </div>
          <ChevronDown size={20} className={`text-gray-400 transition-transform ${showQuickCalc ? 'rotate-180' : ''}`} />
        </button>

        {showQuickCalc && (
          <div className="p-5 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Area (sq ft)</label>
                <input
                  type="number"
                  value={quickCalc.area}
                  onChange={(e) => setQuickCalc({ ...quickCalc, area: e.target.value })}
                  placeholder="e.g., 1200"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Price/sq ft (₹)</label>
                <input
                  type="number"
                  value={quickCalc.pricePerSqFt}
                  onChange={(e) => setQuickCalc({ ...quickCalc, pricePerSqFt: e.target.value })}
                  placeholder="e.g., 1500"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Material Cost (₹)</label>
                <input
                  type="number"
                  value={quickCalc.materialCost}
                  onChange={(e) => setQuickCalc({ ...quickCalc, materialCost: e.target.value })}
                  placeholder="e.g., 50000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Labour Cost (₹)</label>
                <input
                  type="number"
                  value={quickCalc.labourCost}
                  onChange={(e) => setQuickCalc({ ...quickCalc, labourCost: e.target.value })}
                  placeholder="e.g., 30000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={quickCalc.discount}
                  onChange={(e) => setQuickCalc({ ...quickCalc, discount: e.target.value })}
                  placeholder="e.g., 5"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Tax (%)</label>
                <input
                  type="number"
                  value={quickCalc.tax}
                  onChange={(e) => setQuickCalc({ ...quickCalc, tax: e.target.value })}
                  placeholder="e.g., 18"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E]"
                />
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Base Amount</p>
                  <p className="text-sm font-bold text-gray-900">₹{baseAmount.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Material</p>
                  <p className="text-sm font-bold text-gray-900">₹{materialCost.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Labour</p>
                  <p className="text-sm font-bold text-gray-900">₹{labourCost.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Subtotal</p>
                  <p className="text-sm font-bold text-gray-900">₹{subtotal.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Discount</p>
                  <p className="text-sm font-bold text-green-600">-₹{discountAmount.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Tax ({taxPercent}%)</p>
                  <p className="text-sm font-bold text-orange-600">+₹{taxAmount.toLocaleString()}</p>
                </div>
                <div className="text-center bg-red-50 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-lg font-bold text-[#FF1E1E]">₹{total.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">
                <strong>Formula:</strong> Total = (Area × Price/sqft) + Material + Labour - Discount% + Tax%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Quotations</p>
          <p className="text-2xl font-bold text-[#1F2937]">{quotations.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{quotations.filter(q => q.status === 'Pending' || q.status === 'Sent').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Accepted</p>
          <p className="text-2xl font-bold text-green-600">{quotations.filter(q => q.status === 'Accepted').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold text-[#FF1E1E]">₹42.5L</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E] bg-white"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white">
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-[#FF1E1E] text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#FF1E1E] hover:text-[#FF1E1E]"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Quotations Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Quote ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Client / Project
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Valid Until
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotations.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-sm font-medium text-[#FF1E1E]">{quote.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="text-sm font-medium text-[#1F2937]">{quote.client}</span>
                      <p className="text-xs text-gray-500">{quote.projectType}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{quote.area}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-[#1F2937]">{quote.amount}</span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(quote.status)}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{quote.validUntil}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group" title="View">
                        <Eye size={16} className="text-gray-400 group-hover:text-[#FF1E1E]" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group" title="Edit">
                        <Edit2 size={16} className="text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group" title="Send">
                        <Send size={16} className="text-gray-400 group-hover:text-green-600" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group" title="Download">
                        <Download size={16} className="text-gray-400 group-hover:text-purple-600" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group" title="Delete">
                        <Trash2 size={16} className="text-gray-400 group-hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{filteredQuotations.length}</span> of{" "}
            <span className="font-medium text-gray-700">{quotations.length}</span> quotations
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-white transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm text-white bg-[#FF1E1E] rounded-lg hover:bg-red-600 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quotation Calculator Modal */}
      <QuotationCalculator
        isOpen={showCalculator}
        onClose={() => setShowCalculator(false)}
        onCalculate={handleCreateQuotation}
      />
    </div>
  );
};

export default Quotations;