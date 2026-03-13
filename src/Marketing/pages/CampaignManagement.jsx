import { useState } from "react";
import { Search, Filter, Eye, Edit2, Trash2, Plus } from "lucide-react";
import CreateCampaignModal from "../components/CreateCampaignModal";

const CampaignManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    };
    setCampaigns([campaign, ...campaigns]);
  };

  const filters = [
    { id: "all", label: "All Campaigns" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "online", label: "Online" },
    { id: "offline", label: "Offline" },
  ];

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "active" && campaign.status === "Active") ||
      (activeFilter === "completed" && campaign.status === "Completed") ||
      (activeFilter === "online" && campaign.type === "Online") ||
      (activeFilter === "offline" && campaign.type === "Offline");
    return matchesSearch && matchesFilter;
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

        {/* Filter Button */}
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
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group" title="View">
                        <Eye size={16} className="text-gray-400 group-hover:text-[#FF1E1E]" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors group" title="Edit">
                        <Edit2 size={16} className="text-gray-400 group-hover:text-blue-600" />
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
    </div>
  );
};

export default CampaignManagement;