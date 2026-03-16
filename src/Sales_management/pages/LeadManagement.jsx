import { useState } from "react";
import { Search, Filter, Eye, Edit2, Trash2, Plus, Phone, Mail, X, User, Building2, MapPin, DollarSign, Calendar, Briefcase, ChevronDown, UserCheck } from "lucide-react";

const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [assignDropdownOpen, setAssignDropdownOpen] = useState(null);

  // Extended employee list with roles and availability
  const employees = [
    { id: 1, name: "Rahul Sharma", role: "Senior Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", leads: 24, status: "active" },
    { id: 2, name: "Amit Patel", role: "Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit", leads: 18, status: "active" },
    { id: 3, name: "Sneha Verma", role: "Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha", leads: 15, status: "active" },
    { id: 4, name: "Priya Singh", role: "Sales Manager", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", leads: 35, status: "active" },
    { id: 5, name: "Vikram Desai", role: "Junior Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram", leads: 12, status: "active" },
    { id: 6, name: "Karan Mehta", role: "Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan", leads: 20, status: "active" },
    { id: 7, name: "Neha Gupta", role: "Senior Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha", leads: 28, status: "active" },
    { id: 8, name: "Rohan Kulkarni", role: "Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan", leads: 16, status: "active" },
    { id: 9, name: "Anjali Sharma", role: "Junior Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali", leads: 10, status: "active" },
    { id: 10, name: "Deepak Joshi", role: "Sales Executive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak", leads: 22, status: "active" },
  ];

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Mr. Patil",
      company: "Patil Furniture Works",
      email: "patil.furniture@gmail.com",
      phone: "+91 99887 76655",
      status: "Hot",
      source: "Website",
      value: "₹2,50,000",
      assignedTo: "Rahul Sharma",
      assignedToId: 1,
      address: "Nashik, Maharashtra",
      notes: "Interested in modular kitchen",
      createdAt: "2026-03-01",
    },
    {
      id: 2,
      name: "Mrs. Sharma",
      company: "Sharma Interiors",
      email: "sharma.interiors@gmail.com",
      phone: "+91 88776 65544",
      status: "Warm",
      source: "Referral",
      value: "₹1,80,000",
      assignedTo: "Amit Patel",
      assignedToId: 2,
      address: "Pune, Maharashtra",
      notes: "Follow up next week",
      createdAt: "2026-03-05",
    },
    {
      id: 3,
      name: "Mr. Joshi",
      company: "Joshi Modular Kitchen",
      email: "joshi.kitchen@gmail.com",
      phone: "+91 77665 54433",
      status: "Cold",
      source: "LinkedIn",
      value: "₹4,20,000",
      assignedTo: "Sneha Verma",
      assignedToId: 3,
      address: "Mumbai, Maharashtra",
      notes: "Sent proposal, waiting for response",
      createdAt: "2026-03-08",
    },
    {
      id: 4,
      name: "Ms. Kulkarni",
      company: "Kulkarni Home Solutions",
      email: "kulkarni.home@gmail.com",
      phone: "+91 66554 43322",
      status: "Hot",
      source: "Trade Show",
      value: "₹1,50,000",
      assignedTo: "Vikram Desai",
      assignedToId: 5,
      address: "Thane, Maharashtra",
      notes: "Ready to close, schedule meeting",
      createdAt: "2026-03-10",
    },
    {
      id: 5,
      name: "Mr. Verma",
      company: "Verma Enterprises",
      email: "verma.enterprise@gmail.com",
      phone: "+91 55443 32211",
      status: "Warm",
      source: "Website",
      value: "₹3,00,000",
      assignedTo: "Karan Mehta",
      assignedToId: 6,
      address: "Delhi, India",
      notes: "Interested in premium features",
      createdAt: "2026-03-11",
    },
    {
      id: 6,
      name: "Mrs. Gupta",
      company: "Gupta Designs",
      email: "gupta.designs@gmail.com",
      phone: "+91 98765 43210",
      status: "New",
      source: "Social Media",
      value: "₹2,00,000",
      assignedTo: "Neha Gupta",
      assignedToId: 7,
      address: "Bangalore, Karnataka",
      notes: "New inquiry from Instagram",
      createdAt: "2026-03-12",
    },
    {
      id: 7,
      name: "Mr. Reddy",
      company: "Reddy Constructions",
      email: "reddy.construct@gmail.com",
      phone: "+91 87654 32109",
      status: "Hot",
      source: "Cold Call",
      value: "₹5,50,000",
      assignedTo: "Rohan Kulkarni",
      assignedToId: 8,
      address: "Hyderabad, Telangana",
      notes: "High priority lead",
      createdAt: "2026-03-13",
    },
    {
      id: 8,
      name: "Ms. Iyer",
      company: "Iyer Interiors",
      email: "iyer.interiors@gmail.com",
      phone: "+91 76543 21098",
      status: "New",
      source: "Referral",
      value: "₹1,20,000",
      assignedTo: "Unassigned",
      assignedToId: null,
      address: "Chennai, Tamil Nadu",
      notes: "Looking for office interior",
      createdAt: "2026-03-13",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "New",
    source: "Website",
    value: "",
    assignedTo: "",
    assignedToId: null,
    address: "",
    notes: "",
  });

  const sources = ["Website", "Referral", "LinkedIn", "Trade Show", "Social Media", "Cold Call", "Email Campaign"];

  const filters = [
    { id: "all", label: "All Leads" },
    { id: "hot", label: "Hot" },
    { id: "warm", label: "Warm" },
    { id: "cold", label: "Cold" },
    { id: "new", label: "New" },
    { id: "unassigned", label: "Unassigned" },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "hot" && lead.status === "Hot") ||
      (activeFilter === "warm" && lead.status === "Warm") ||
      (activeFilter === "cold" && lead.status === "Cold") ||
      (activeFilter === "new" && lead.status === "New") ||
      (activeFilter === "unassigned" && lead.assignedToId === null);
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const styles = {
      Hot: "bg-red-100 text-red-700 border-red-200",
      Warm: "bg-orange-100 text-orange-700 border-orange-200",
      Cold: "bg-blue-100 text-blue-700 border-blue-200",
      New: "bg-green-100 text-green-700 border-green-200",
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const getSourceBadge = (source) => {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
        {source}
      </span>
    );
  };

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === id);
  };

  const handleAssignLead = (leadId, employeeId) => {
    const employee = getEmployeeById(employeeId);
    setLeads(leads.map((lead) =>
      lead.id === leadId
        ? { ...lead, assignedTo: employee ? employee.name : "Unassigned", assignedToId: employeeId }
        : lead
    ));
    setAssignDropdownOpen(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLead = () => {
    const employee = formData.assignedToId ? getEmployeeById(parseInt(formData.assignedToId)) : null;
    const newLead = {
      id: leads.length + 1,
      ...formData,
      assignedTo: employee ? employee.name : "Unassigned",
      assignedToId: employee ? employee.id : null,
      value: formData.value ? `₹${formData.value.replace(/[$,]/g, '').toLocaleString()}` : "₹0",
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads([newLead, ...leads]);
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditLead = () => {
    const employee = formData.assignedToId ? getEmployeeById(parseInt(formData.assignedToId)) : null;
    setLeads(leads.map((lead) =>
      lead.id === selectedLead.id
        ? { ...lead, ...formData, assignedTo: employee ? employee.name : "Unassigned", assignedToId: employee ? employee.id : null, value: `₹${formData.value.replace(/[$,]/g, '').toLocaleString()}` }
        : lead
    ));
    setEditModalOpen(false);
    resetForm();
  };

  const handleDeleteLead = (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(leads.filter((lead) => lead.id !== id));
    }
  };

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setFormData({
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      status: lead.status,
      source: lead.source,
      value: lead.value.replace(/[₹$,]/g, ''),
      assignedTo: lead.assignedTo,
      assignedToId: lead.assignedToId,
      address: lead.address || "",
      notes: lead.notes || "",
    });
    setEditModalOpen(true);
  };

  const openViewModal = (lead) => {
    setSelectedLead(lead);
    setViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "New",
      source: "Website",
      value: "",
      assignedTo: "",
      assignedToId: null,
      address: "",
      notes: "",
    });
    setSelectedLead(null);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#1F2937]">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Lead Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your sales leads and assign to team members</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Leads</p>
          <p className="text-2xl font-bold text-[#1F2937]">{leads.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Hot Leads</p>
          <p className="text-2xl font-bold text-red-600">{leads.filter(l => l.status === 'Hot').length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Unassigned</p>
          <p className="text-2xl font-bold text-yellow-600">{leads.filter(l => !l.assignedToId).length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Team Members</p>
          <p className="text-2xl font-bold text-green-600">{employees.length}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
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
                  Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Assign To
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => {
                const assignedEmployee = lead.assignedToId ? getEmployeeById(lead.assignedToId) : null;
                const isDropdownOpen = assignDropdownOpen === lead.id;

                return (
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
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 font-medium">{lead.value}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setAssignDropdownOpen(isDropdownOpen ? null : lead.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                            lead.assignedToId
                              ? 'bg-white border-gray-200 hover:border-[#FF1E1E] hover:bg-red-50'
                              : 'bg-yellow-50 border-yellow-200 hover:border-yellow-300'
                          }`}
                        >
                          {assignedEmployee ? (
                            <>
                              <img
                                src={assignedEmployee.avatar}
                                alt={assignedEmployee.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm text-[#1F2937]">{assignedEmployee.name.split(' ')[0]}</span>
                            </>
                          ) : (
                            <>
                              <UserCheck size={16} className="text-yellow-600" />
                              <span className="text-sm text-yellow-700">Assign</span>
                            </>
                          )}
                          <ChevronDown size={14} className="text-gray-400" />
                        </button>

                        {/* Dropdown */}
                        {isDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setAssignDropdownOpen(null)} />
                            <div className="absolute z-20 top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
                              <div className="p-2 border-b border-gray-100">
                                <p className="text-xs font-medium text-gray-500">Assign to Team Member</p>
                              </div>
                              <div className="p-1">
                                {employees.map((employee) => (
                                  <button
                                    key={employee.id}
                                    onClick={() => handleAssignLead(lead.id, employee.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                      lead.assignedToId === employee.id
                                        ? 'bg-red-50 border border-red-200'
                                        : 'hover:bg-gray-50'
                                    }`}
                                  >
                                    <img
                                      src={employee.avatar}
                                      alt={employee.name}
                                      className="w-8 h-8 rounded-full"
                                    />
                                    <div className="flex-1 text-left">
                                      <p className="text-sm font-medium text-[#1F2937]">{employee.name}</p>
                                      <p className="text-xs text-gray-500">{employee.role}</p>
                                    </div>
                                    {lead.assignedToId === employee.id && (
                                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Assigned</span>
                                    )}
                                  </button>
                                ))}
                              </div>
                              <div className="p-2 border-t border-gray-100">
                                <button
                                  onClick={() => handleAssignLead(lead.id, null)}
                                  className="w-full text-center text-sm text-gray-500 hover:text-red-600 py-1"
                                >
                                  Unassign
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openViewModal(lead)}
                          className="p-2 rounded-lg hover:bg-blue-50 transition-colors group"
                          title="View"
                        >
                          <Eye size={16} className="text-gray-400 group-hover:text-blue-600" />
                        </button>
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-2 rounded-lg hover:bg-green-50 transition-colors group"
                          title="Edit"
                        >
                          <Edit2 size={16} className="text-gray-400 group-hover:text-green-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
                          title="Delete"
                        >
                          <Trash2 size={16} className="text-gray-400 group-hover:text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

      {/* Add Lead Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lead">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-1" /> Lead Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter lead name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Building2 className="w-4 h-4 inline mr-1" /> Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Enter company name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 inline mr-1" /> Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" /> Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="New">New</option>
                <option value="Hot">Hot</option>
                <option value="Warm">Warm</option>
                <option value="Cold">Cold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign className="w-4 h-4 inline mr-1" /> Estimated Value
              </label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="Enter value (e.g., 250000)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <UserCheck className="w-4 h-4 inline mr-1" /> Assign To
              </label>
              <select
                name="assignedToId"
                value={formData.assignedToId || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" /> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add notes about this lead..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddLead}
              disabled={!formData.name || !formData.company || !formData.email || !formData.phone}
              className="px-4 py-2 bg-[#FF1E1E] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Lead
            </button>
          </div>
        </div>
      </Modal>

      {/* View Lead Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Lead Details">
        {selectedLead && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#FF1E1E]">{selectedLead.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1F2937]">{selectedLead.name}</h3>
                <p className="text-gray-500">{selectedLead.company}</p>
                {getStatusBadge(selectedLead.status)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedLead.email}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedLead.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Source</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedLead.source}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Estimated Value</p>
                <p className="text-sm font-bold text-green-600">{selectedLead.value}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Assigned To</p>
                <div className="flex items-center gap-2">
                  {selectedLead.assignedToId && (
                    <img
                      src={getEmployeeById(selectedLead.assignedToId)?.avatar}
                      alt={selectedLead.assignedTo}
                      className="w-5 h-5 rounded-full"
                    />
                  )}
                  <p className="text-sm font-medium text-[#1F2937]">{selectedLead.assignedTo}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Created Date</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedLead.createdAt}</p>
              </div>
            </div>
            {selectedLead.address && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Address</p>
                <p className="text-sm text-[#1F2937]">{selectedLead.address}</p>
              </div>
            )}
            {selectedLead.notes && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-[#1F2937]">{selectedLead.notes}</p>
              </div>
            )}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setViewModalOpen(false); openEditModal(selectedLead); }}
                className="px-4 py-2 bg-[#FF1E1E] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Edit Lead
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Lead Modal */}
      <Modal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); resetForm(); }} title="Edit Lead">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="New">New</option>
                <option value="Hot">Hot</option>
                <option value="Warm">Warm</option>
                <option value="Cold">Cold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Value</label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <UserCheck className="w-4 h-4 inline mr-1" /> Assign To
              </label>
              <select
                name="assignedToId"
                value={formData.assignedToId || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Unassigned</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} - {employee.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => { setEditModalOpen(false); resetForm(); }}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleEditLead}
              className="px-4 py-2 bg-[#FF1E1E] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LeadManagement;