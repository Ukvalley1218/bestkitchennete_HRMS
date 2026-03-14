import { useState } from "react";
import { Search, Filter, Eye, Edit2, Trash2, Plus, X, Calendar, IndianRupee, Users, TrendingUp, Target, BarChart3, ChevronDown } from "lucide-react";
import CreateCampaignModal from "../components/CreateCampaignModal";

const CampaignManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [deletingCampaign, setDeletingCampaign] = useState(null);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Sale Billboard",
      type: "Offline",
      status: "Active",
      budget: "₹50,000",
      spent: "₹45,000",
      leads: 89,
      roi: "125%",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      location: "MG Road, Bangalore",
      description: "High visibility billboard campaign targeting summer shoppers",
      conversionRate: "12.5%",
    },
    {
      id: 2,
      name: "Instagram Product Launch",
      type: "Online",
      status: "Active",
      budget: "₹80,000",
      spent: "₹62,000",
      leads: 234,
      roi: "185%",
      startDate: "2024-01-10",
      endDate: "2024-02-10",
      location: "Instagram Platform",
      description: "Instagram sponsored posts and stories for new product launch",
      conversionRate: "18.2%",
    },
    {
      id: 3,
      name: "Tech Conference Booth",
      type: "Offline",
      status: "Completed",
      budget: "₹1,20,000",
      spent: "₹1,18,000",
      leads: 145,
      roi: "95%",
      startDate: "2024-01-05",
      endDate: "2024-01-07",
      location: "Bangalore Tech Park",
      description: "Exhibition booth at annual tech conference",
      conversionRate: "8.5%",
    },
    {
      id: 4,
      name: "Google Ads Campaign",
      type: "Online",
      status: "Active",
      budget: "₹1,00,000",
      spent: "₹78,000",
      leads: 312,
      roi: "210%",
      startDate: "2024-01-01",
      endDate: "2024-02-28",
      location: "Google Search & Display",
      description: "Search and display advertising campaign",
      conversionRate: "22.1%",
    },
    {
      id: 5,
      name: "Bus Branding – Route 101",
      type: "Offline",
      status: "Active",
      budget: "₹35,000",
      spent: "₹35,000",
      leads: 56,
      roi: "78%",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      location: "Route 101 - City Center",
      description: "Bus exterior branding for city route",
      conversionRate: "6.2%",
    },
    {
      id: 6,
      name: "Facebook Retargeting",
      type: "Online",
      status: "Active",
      budget: "₹45,000",
      spent: "₹32,000",
      leads: 178,
      roi: "165%",
      startDate: "2024-01-08",
      endDate: "2024-02-08",
      location: "Facebook Platform",
      description: "Retargeting campaign for website visitors",
      conversionRate: "15.8%",
    },
    {
      id: 7,
      name: "Radio FM Campaign",
      type: "Offline",
      status: "Completed",
      budget: "₹75,000",
      spent: "₹72,000",
      leads: 98,
      roi: "88%",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      location: "Radio Mirchi 98.3 FM",
      description: "Radio jingle and spot advertisements",
      conversionRate: "7.3%",
    },
    {
      id: 8,
      name: "YouTube Pre-roll Ads",
      type: "Online",
      status: "Active",
      budget: "₹60,000",
      spent: "₹48,000",
      leads: 267,
      roi: "195%",
      startDate: "2024-01-12",
      endDate: "2024-02-12",
      location: "YouTube Platform",
      description: "Pre-roll video advertisements",
      conversionRate: "19.4%",
    },
  ]);

  const handleCreateCampaign = (newCampaign) => {
    const campaign = {
      id: campaigns.length + 1,
      name: newCampaign.campaignName,
      type: newCampaign.campaignType,
      status: newCampaign.status,
      budget: `₹${Number(newCampaign.budget).toLocaleString()}`,
      spent: newCampaign.spent ? `₹${Number(newCampaign.spent).toLocaleString()}` : "₹0",
      leads: Number(newCampaign.expectedLeads) || 0,
      roi: "0%",
      startDate: newCampaign.startDate || "2024-01-01",
      endDate: newCampaign.endDate || "2024-02-01",
      location: newCampaign.location || "TBD",
      description: newCampaign.description || "New campaign",
      conversionRate: "0%",
    };
    setCampaigns([campaign, ...campaigns]);
  };

  const handleDeleteCampaign = () => {
    if (deletingCampaign) {
      setCampaigns(campaigns.filter((c) => c.id !== deletingCampaign.id));
      setDeletingCampaign(null);
    }
  };

  const filters = [
    { id: "all", label: "All Campaigns" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "online", label: "Online" },
    { id: "offline", label: "Offline" },
  ];

  const timeFilters = [
    { id: "all", label: "All Time" },
    { id: "weekly", label: "This Week" },
    { id: "monthly", label: "This Month" },
    { id: "quarterly", label: "This Quarter" },
  ];

  // Helper function to check if date falls within time period
  const isInTimePeriod = (dateStr, period) => {
    const date = new Date(dateStr);
    const now = new Date();

    if (period === "all") return true;

    if (period === "weekly") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return date >= startOfWeek && date <= endOfWeek;
    }

    if (period === "monthly") {
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }

    if (period === "quarterly") {
      const currentQuarter = Math.floor(now.getMonth() / 3);
      const dateQuarter = Math.floor(date.getMonth() / 3);
      return dateQuarter === currentQuarter && date.getFullYear() === now.getFullYear();
    }

    return true;
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "active" && campaign.status === "Active") ||
      (activeFilter === "completed" && campaign.status === "Completed") ||
      (activeFilter === "online" && campaign.type === "Online") ||
      (activeFilter === "offline" && campaign.type === "Offline");
    const matchesTime = isInTimePeriod(campaign.startDate, timeFilter);
    return matchesSearch && matchesFilter && matchesTime;
  });

  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>
        Completed
      </span>
    );
  };

  const getTypeBadge = (type) => {
    if (type === "Online") {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-600">
          Online
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-600">
        Offline
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Campaign Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all marketing campaigns</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E] bg-white"
          />
        </div>

        {/* Time Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white"
          >
            <Calendar size={18} />
            {timeFilters.find(f => f.id === timeFilter)?.label}
            <ChevronDown size={16} className={`transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showTimeDropdown && (
            <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    setTimeFilter(filter.id);
                    setShowTimeDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    timeFilter === filter.id
                      ? "bg-red-50 text-[#FF1E1E] font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
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

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Campaign Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Spent
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Leads
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ROI
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mr-3">
                        <span className="text-[#FF1E1E] font-semibold text-sm">
                          {campaign.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[#1F2937]">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getTypeBadge(campaign.type)}</td>
                  <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 font-medium">{campaign.budget}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">{campaign.spent}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 font-medium">{campaign.leads}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${parseInt(campaign.roi) >= 100 ? "text-green-600" : "text-orange-600"}`}>
                      {campaign.roi}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group"
                        title="View"
                      >
                        <Eye size={16} className="text-gray-400 group-hover:text-[#FF1E1E]" />
                      </button>
                      <button
                        onClick={() => setEditingCampaign(campaign)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group"
                        title="Edit"
                      >
                        <Edit2 size={16} className="text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button
                        onClick={() => setDeletingCampaign(campaign)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group"
                        title="Delete"
                      >
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
            Showing <span className="font-medium text-gray-700">{filteredCampaigns.length}</span> of{" "}
            <span className="font-medium text-gray-700">{campaigns.length}</span> campaigns
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

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />

      {/* View Campaign Overlay */}
      {selectedCampaign && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCampaign(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#1F2937]">Campaign Details</h2>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Campaign Name & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <span className="text-[#FF1E1E] font-bold text-lg">
                      {selectedCampaign.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937]">{selectedCampaign.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getTypeBadge(selectedCampaign.type)}
                      {getStatusBadge(selectedCampaign.status)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Budget Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <IndianRupee size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <IndianRupee size={16} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Spent</p>
                    <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.spent}</p>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Performance</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Leads</p>
                      <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.leads}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">ROI</p>
                      <p className={`text-sm font-semibold ${parseInt(selectedCampaign.roi) >= 100 ? "text-green-600" : "text-orange-600"}`}>
                        {selectedCampaign.roi}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Conv. Rate</p>
                      <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.conversionRate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Timeline</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm text-[#1F2937]">{selectedCampaign.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">End Date</p>
                      <p className="text-sm text-[#1F2937]">{selectedCampaign.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Platform / Location</p>
                  <p className="text-sm text-[#1F2937]">{selectedCampaign.location}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedCampaign.description}</p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedCampaign(null);
                  setEditingCampaign(selectedCampaign);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF1E1E] hover:bg-red-600 rounded-lg transition-colors"
              >
                Edit Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Campaign Overlay */}
      {editingCampaign && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setEditingCampaign(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#1F2937]">Edit Campaign</h2>
              <button
                onClick={() => setEditingCampaign(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  defaultValue={editingCampaign.name}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
                  <select
                    defaultValue={editingCampaign.type}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select
                    defaultValue={editingCampaign.status}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget (₹)</label>
                  <input
                    type="text"
                    defaultValue={editingCampaign.budget.replace('₹', '').replace(/,/g, '')}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Spent (₹)</label>
                  <input
                    type="text"
                    defaultValue={editingCampaign.spent.replace('₹', '').replace(/,/g, '')}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location / Platform</label>
                <input
                  type="text"
                  defaultValue={editingCampaign.location}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  defaultValue={editingCampaign.description}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E] resize-none"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setEditingCampaign(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setEditingCampaign(null)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF1E1E] hover:bg-red-600 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      {deletingCampaign && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setDeletingCampaign(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#1F2937]">Delete Campaign</h2>
              <button
                onClick={() => setDeletingCampaign(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 size={24} className="text-red-600" />
              </div>
              <p className="text-center text-gray-600">
                Are you sure you want to delete <span className="font-semibold text-[#1F2937]">{deletingCampaign.name}</span>? This action cannot be undone.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => setDeletingCampaign(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCampaign}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Delete Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignManagement;