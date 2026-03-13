import { useState } from "react";
import { Search, Filter, Eye, Edit2, Trash2, Plus, Phone, Mail } from "lucide-react";

const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "John Smith",
      company: "Tech Corp",
      email: "john@techcorp.com",
      phone: "+1 234 567 890",
      status: "Hot",
      source: "Website",
      value: "$25,000",
      assignedTo: "Mike Johnson",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      company: "Digital Solutions",
      email: "sarah@digitalsolutions.com",
      phone: "+1 234 567 891",
      status: "Warm",
      source: "Referral",
      value: "$15,000",
      assignedTo: "Jane Doe",
    },
    {
      id: 3,
      name: "Michael Brown",
      company: "Innovate Inc",
      email: "michael@innovate.com",
      phone: "+1 234 567 892",
      status: "Cold",
      source: "LinkedIn",
      value: "$8,000",
      assignedTo: "Mike Johnson",
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "StartUp Hub",
      email: "emily@startuphub.com",
      phone: "+1 234 567 893",
      status: "Hot",
      source: "Trade Show",
      value: "$32,000",
      assignedTo: "Jane Doe",
    },
    {
      id: 5,
      name: "Robert Chen",
      company: "Global Tech",
      email: "robert@globaltech.com",
      phone: "+1 234 567 894",
      status: "Warm",
      source: "Website",
      value: "$18,500",
      assignedTo: "Mike Johnson",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      company: "Creative Labs",
      email: "lisa@creativelabs.com",
      phone: "+1 234 567 895",
      status: "New",
      source: "Social Media",
      value: "$12,000",
      assignedTo: "Jane Doe",
    },
  ]);

  const filters = [
    { id: "all", label: "All Leads" },
    { id: "hot", label: "Hot" },
    { id: "warm", label: "Warm" },
    { id: "cold", label: "Cold" },
    { id: "new", label: "New" },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "hot" && lead.status === "Hot") ||
      (activeFilter === "warm" && lead.status === "Warm") ||
      (activeFilter === "cold" && lead.status === "Cold") ||
      (activeFilter === "new" && lead.status === "New");
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Hot: "bg-red-100 text-red-700",
      Warm: "bg-orange-100 text-orange-700",
      Cold: "bg-blue-100 text-blue-700",
      New: "bg-green-100 text-green-700",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getSourceBadge = (source) => {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
        {source}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Lead Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your sales leads and prospects</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search leads..."
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

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Lead Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center mr-3">
                        <span className="text-[#FF1E1E] font-semibold text-sm">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-[#1F2937]">{lead.name}</span>
                        <p className="text-xs text-gray-500">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-600">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-600">{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(lead.status)}</td>
                  <td className="px-6 py-4">{getSourceBadge(lead.source)}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700 font-medium">{lead.value}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{lead.assignedTo}</span>
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
            Showing <span className="font-medium text-gray-700">{filteredLeads.length}</span> of{" "}
            <span className="font-medium text-gray-700">{leads.length}</span> leads
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
    </div>
  );
};

export default LeadManagement;