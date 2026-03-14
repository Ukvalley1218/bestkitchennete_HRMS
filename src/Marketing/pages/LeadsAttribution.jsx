import { useState } from "react";
import { Users, TrendingUp, Target, IndianRupee, X, Mail, Phone, Calendar, MapPin, Building, Tag, MessageSquare, Save, Trash2, Eye } from "lucide-react";

const LeadsAttribution = () => {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [newLeadData, setNewLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Google Ads",
    campaign: "",
    status: "New",
    company: "",
    location: "",
    notes: "",
    value: "",
    lastContact: new Date().toISOString().split('T')[0]
  });

  // Extended leads data with more details for the overlay
  const [leadsData, setLeadsData] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@email.com",
      phone: "+1 (555) 123-4567",
      source: "Google Ads",
      campaign: "Product Launch",
      status: "Converted",
      date: "2024-01-20",
      company: "Tech Solutions Inc.",
      location: "New York, USA",
      notes: "Interested in enterprise package. Follow-up scheduled for next week.",
      value: "₹12,45,000",
      lastContact: "2024-01-19"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      phone: "+1 (555) 234-5678",
      source: "Instagram",
      campaign: "Summer Sale",
      status: "New",
      date: "2024-01-19",
      company: "Fashion Boutique",
      location: "Los Angeles, USA",
      notes: "Found us through Instagram ad. High potential for conversion.",
      value: "₹7,05,500",
      lastContact: "2024-01-19"
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@email.com",
      phone: "+1 (555) 345-6789",
      source: "Billboard",
      campaign: "MG Road",
      status: "Contacted",
      date: "2024-01-18",
      company: "Wilson Enterprises",
      location: "Chicago, USA",
      notes: "Responded to billboard campaign. Requested product demo.",
      value: "₹9,96,000",
      lastContact: "2024-01-18"
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "emily@email.com",
      phone: "+1 (555) 456-7890",
      source: "Event",
      campaign: "Tech Conference",
      status: "Converted",
      date: "2024-01-17",
      company: "Digital Dynamics",
      location: "Seattle, USA",
      notes: "Met at Tech Conference 2024. Immediate conversion.",
      value: "₹18,26,000",
      lastContact: "2024-01-17"
    },
    {
      id: 5,
      name: "David Lee",
      email: "david@email.com",
      phone: "+1 (555) 567-8901",
      source: "LinkedIn",
      campaign: "B2B Outreach",
      status: "Qualified",
      date: "2024-01-16",
      company: "Innovate Corp",
      location: "Austin, USA",
      notes: "B2B lead from LinkedIn campaign. Interested in annual subscription.",
      value: "₹29,05,000",
      lastContact: "2024-01-16"
    },
  ]);

  const handleEditClick = (lead) => {
    setIsEditing(true);
    setEditFormData({ ...lead });
  };

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    setLeadsData(prev => prev.map(lead =>
      lead.id === editFormData.id ? editFormData : lead
    ));
    setSelectedLead(editFormData);
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData(null);
  };

  const handleNewLeadInputChange = (field, value) => {
    setNewLeadData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddLead = () => {
    const newLead = {
      ...newLeadData,
      id: Math.max(...leadsData.map(l => l.id)) + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setLeadsData(prev => [...prev, newLead]);
    setIsAddingLead(false);
    setNewLeadData({
      name: "",
      email: "",
      phone: "",
      source: "Google Ads",
      campaign: "",
      status: "New",
      company: "",
      location: "",
      notes: "",
      value: "",
      lastContact: new Date().toISOString().split('T')[0]
    });
  };

  const handleCancelAddLead = () => {
    setIsAddingLead(false);
    setNewLeadData({
      name: "",
      email: "",
      phone: "",
      source: "Google Ads",
      campaign: "",
      status: "New",
      company: "",
      location: "",
      notes: "",
      value: "",
      lastContact: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteLead = (leadId) => {
    setLeadsData(prev => prev.filter(lead => lead.id !== leadId));
    setDeleteConfirmId(null);
    if (selectedLead?.id === leadId) {
      setSelectedLead(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      New: "bg-blue-100 text-blue-700",
      Contacted: "bg-yellow-100 text-yellow-700",
      Qualified: "bg-purple-100 text-purple-700",
      Converted: "bg-green-100 text-green-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Leads & Attribution</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your marketing leads</p>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Export
          </button>
          <button
            onClick={() => setIsAddingLead(true)}
            className="bg-[#FF1E1E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
          >
            + Add Lead
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Total Leads */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#FDE8E8', width: '40px', height: '40px', borderRadius: '12px' }}>
              <Users size={20} style={{ color: '#EF4444' }} strokeWidth={1.5} />
            </div>
            <span className="flex items-center gap-0.5 pr-1 pt-1 text-xs font-semibold text-green-600">
              <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
              </svg>
              +15%
            </span>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">2,845</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">Total Leads</p>
          </div>
        </div>

        {/* New This Week */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#DCFCE7', width: '40px', height: '40px', borderRadius: '12px' }}>
              <TrendingUp size={20} style={{ color: '#22C55E' }} strokeWidth={1.5} />
            </div>
            <span className="flex items-center gap-0.5 pr-1 pt-1 text-xs font-semibold text-green-600">
              <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
              </svg>
              +23
            </span>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">156</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">New This Week</p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#DBEAFE', width: '40px', height: '40px', borderRadius: '12px' }}>
              <Target size={20} style={{ color: '#3B82F6' }} strokeWidth={1.5} />
            </div>
            <span className="flex items-center gap-0.5 pr-1 pt-1 text-xs font-semibold text-green-600">
              <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
              </svg>
              +3.2%
            </span>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">25.5%</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">Conversion Rate</p>
          </div>
        </div>

        {/* Avg. Lead Value */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#FEE2E2', width: '40px', height: '40px', borderRadius: '12px' }}>
              <IndianRupee size={20} style={{ color: '#EF4444' }} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">₹7,050</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">Avg. Lead Value</p>
            <p className="text-xs text-[#6A7282] font-semibold mt-0.5">Per qualified lead</p>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leadsData.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-[#1F2937]">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{lead.source}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{lead.campaign}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{lead.date}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-gray-500 hover:text-[#FF1E1E] transition-colors"
                      title="View lead"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(lead.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      title="Delete lead"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lead Detail Overlay */}
      {selectedLead && !isEditing && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => { setSelectedLead(null); setIsEditing(false); }}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#1F2937]">Lead Details</h2>
              <button
                onClick={() => { setSelectedLead(null); setIsEditing(false); }}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Lead Name & Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#FF1E1E]/10 flex items-center justify-center">
                    <span className="text-[#FF1E1E] font-semibold text-lg">
                      {selectedLead.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937]">{selectedLead.name}</h3>
                    <p className="text-sm text-gray-500">{selectedLead.company}</p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getStatusColor(selectedLead.status)}`}>
                  {selectedLead.status}
                </span>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Mail size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-[#1F2937]">{selectedLead.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Phone size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-[#1F2937]">{selectedLead.phone}</p>
                  </div>
                </div>
              </div>

              {/* Attribution Info */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Attribution</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Source</p>
                      <p className="text-sm text-[#1F2937]">{selectedLead.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Campaign</p>
                      <p className="text-sm text-[#1F2937]">{selectedLead.campaign}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Timeline</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Created</p>
                      <p className="text-sm text-[#1F2937]">{selectedLead.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Last Contact</p>
                      <p className="text-sm text-[#1F2937]">{selectedLead.lastContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Value */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-[#1F2937]">{selectedLead.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Lead Value</p>
                    <p className="text-sm font-semibold text-[#FF1E1E]">{selectedLead.value}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-400" />
                  <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Notes</h4>
                </div>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">{selectedLead.notes}</p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={() => { setSelectedLead(null); setIsEditing(false); }}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => handleEditClick(selectedLead)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#FF1E1E] hover:bg-red-600 rounded-lg transition-colors"
              >
                Edit Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lead Overlay */}
      {isEditing && editFormData && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCancelEdit}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#1F2937]">Edit Lead</h2>
              <button
                onClick={handleCancelEdit}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="p-5 space-y-4">
              {/* Name & Company */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                  <input
                    type="text"
                    value={editFormData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Source & Campaign */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
                  <select
                    value={editFormData.source}
                    onChange={(e) => handleInputChange('source', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Billboard">Billboard</option>
                    <option value="Event">Event</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign</label>
                  <input
                    type="text"
                    value={editFormData.campaign}
                    onChange={(e) => handleInputChange('campaign', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Status & Value */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Lead Value</label>
                  <input
                    type="text"
                    value={editFormData.value}
                    onChange={(e) => handleInputChange('value', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Location & Last Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={editFormData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Contact</label>
                  <input
                    type="date"
                    value={editFormData.lastContact}
                    onChange={(e) => handleInputChange('lastContact', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                <textarea
                  value={editFormData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E] resize-none"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF1E1E] hover:bg-red-600 rounded-lg transition-colors"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddingLead && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleCancelAddLead}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#1F2937]">Add New Lead</h2>
              <button
                onClick={handleCancelAddLead}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              {/* Name & Company */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newLeadData.name}
                    onChange={(e) => handleNewLeadInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                  <input
                    type="text"
                    value={newLeadData.company}
                    onChange={(e) => handleNewLeadInputChange('company', e.target.value)}
                    placeholder="Enter company name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={newLeadData.email}
                    onChange={(e) => handleNewLeadInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={newLeadData.phone}
                    onChange={(e) => handleNewLeadInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Source & Campaign */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Source <span className="text-red-500">*</span></label>
                  <select
                    value={newLeadData.source}
                    onChange={(e) => handleNewLeadInputChange('source', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Facebook">Facebook</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Billboard">Billboard</option>
                    <option value="Event">Event</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign</label>
                  <input
                    type="text"
                    value={newLeadData.campaign}
                    onChange={(e) => handleNewLeadInputChange('campaign', e.target.value)}
                    placeholder="Enter campaign name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Status & Lead Value */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                  <select
                    value={newLeadData.status}
                    onChange={(e) => handleNewLeadInputChange('status', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Lead Value</label>
                  <input
                    type="text"
                    value={newLeadData.value}
                    onChange={(e) => handleNewLeadInputChange('value', e.target.value)}
                    placeholder="e.g. ₹5,00,000"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Location & Last Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={newLeadData.location}
                    onChange={(e) => handleNewLeadInputChange('location', e.target.value)}
                    placeholder="Enter location"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Contact</label>
                  <input
                    type="date"
                    value={newLeadData.lastContact}
                    onChange={(e) => handleNewLeadInputChange('lastContact', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
                <textarea
                  value={newLeadData.notes}
                  onChange={(e) => handleNewLeadInputChange('notes', e.target.value)}
                  placeholder="Add any notes about this lead..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#FF1E1E] focus:ring-1 focus:ring-[#FF1E1E] resize-none"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100">
              <button
                onClick={handleCancelAddLead}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLead}
                disabled={!newLeadData.name || !newLeadData.email || !newLeadData.phone}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF1E1E] hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Add Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-[#1F2937] mb-2">Delete Lead?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this lead? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteLead(deleteConfirmId)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsAttribution;