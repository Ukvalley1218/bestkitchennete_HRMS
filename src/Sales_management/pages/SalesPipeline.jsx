import { useState } from "react";
import { MoreVertical, Plus, User, DollarSign, Calendar, X, Edit2, Trash2, Eye, Phone, Mail, Building2 } from "lucide-react";

const SalesPipeline = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [activeStage, setActiveStage] = useState(null);
  const [deals, setDeals] = useState([
    {
      id: 1,
      title: "Enterprise Software Deal",
      company: "Tech Corp",
      value: "$45,000",
      probability: "90%",
      stage: "Closed Won",
      contact: "John Smith",
      email: "john@techcorp.com",
      phone: "+1 234 567 890",
      expectedClose: "Mar 15, 2026",
      description: "Annual enterprise software license",
      notes: "Contract signed, payment pending",
    },
    {
      id: 2,
      title: "Cloud Migration Project",
      company: "Digital Solutions",
      value: "$32,000",
      probability: "75%",
      stage: "Negotiation",
      contact: "Sarah Wilson",
      email: "sarah@digitalsolutions.com",
      phone: "+1 234 567 891",
      expectedClose: "Mar 20, 2026",
      description: "Cloud infrastructure migration",
      notes: "Final negotiation in progress",
    },
    {
      id: 3,
      title: "Annual License Renewal",
      company: "Innovate Inc",
      value: "$28,000",
      probability: "60%",
      stage: "Proposal Sent",
      contact: "Michael Brown",
      email: "michael@innovate.com",
      phone: "+1 234 567 892",
      expectedClose: "Mar 25, 2026",
      description: "Software license renewal",
      notes: "Awaiting client approval",
    },
    {
      id: 4,
      title: "Custom Development",
      company: "StartUp Hub",
      value: "$55,000",
      probability: "40%",
      stage: "Discovery",
      contact: "Emily Davis",
      email: "emily@startuphub.com",
      phone: "+1 234 567 893",
      expectedClose: "Apr 10, 2026",
      description: "Custom software development",
      notes: "Initial discussions ongoing",
    },
    {
      id: 5,
      title: "Security Audit Service",
      company: "Global Tech",
      value: "$18,000",
      probability: "25%",
      stage: "Initial Contact",
      contact: "Robert Chen",
      email: "robert@globaltech.com",
      phone: "+1 234 567 894",
      expectedClose: "Apr 20, 2026",
      description: "Security assessment and audit",
      notes: "First meeting scheduled",
    },
    {
      id: 6,
      title: "Mobile App Development",
      company: "Creative Labs",
      value: "$72,000",
      probability: "80%",
      stage: "Negotiation",
      contact: "Lisa Anderson",
      email: "lisa@creativelabs.com",
      phone: "+1 234 567 895",
      expectedClose: "Mar 30, 2026",
      description: "iOS and Android app development",
      notes: "Proposal accepted, finalizing terms",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    value: "",
    probability: "50%",
    stage: "Initial Contact",
    contact: "",
    email: "",
    phone: "",
    expectedClose: "",
    description: "",
    notes: "",
  });

  const stages = [
    { id: "initial", name: "Initial Contact", color: "bg-gray-100", borderColor: "border-gray-300" },
    { id: "discovery", name: "Discovery", color: "bg-blue-50", borderColor: "border-blue-300" },
    { id: "proposal", name: "Proposal Sent", color: "bg-yellow-50", borderColor: "border-yellow-300" },
    { id: "negotiation", name: "Negotiation", color: "bg-orange-50", borderColor: "border-orange-300" },
    { id: "closed", name: "Closed Won", color: "bg-green-50", borderColor: "border-green-300" },
  ];

  const getDealsByStage = (stageName) => deals.filter(d => d.stage === stageName);

  const getProbabilityColor = (probability) => {
    const prob = parseInt(probability);
    if (prob >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (prob >= 50) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDeal = () => {
    const newDeal = {
      id: deals.length + 1,
      ...formData,
      value: formData.value ? `$${formData.value.replace(/[$,]/g, '').toLocaleString()}` : "$0",
    };
    setDeals([newDeal, ...deals]);
    setIsModalOpen(false);
    resetForm();
  };

  const handleEditDeal = () => {
    setDeals(deals.map((deal) =>
      deal.id === selectedDeal.id ? { ...deal, ...formData, value: `$${formData.value.replace(/[$,]/g, '').toLocaleString()}` } : deal
    ));
    setEditModalOpen(false);
    resetForm();
  };

  const handleDeleteDeal = (id) => {
    if (window.confirm("Are you sure you want to delete this deal?")) {
      setDeals(deals.filter((deal) => deal.id !== id));
    }
  };

  const openEditModal = (deal) => {
    setSelectedDeal(deal);
    setFormData({
      title: deal.title,
      company: deal.company,
      value: deal.value.replace(/[$,]/g, ''),
      probability: deal.probability,
      stage: deal.stage,
      contact: deal.contact,
      email: deal.email || "",
      phone: deal.phone || "",
      expectedClose: deal.expectedClose,
      description: deal.description || "",
      notes: deal.notes || "",
    });
    setEditModalOpen(true);
  };

  const openViewModal = (deal) => {
    setSelectedDeal(deal);
    setViewModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      value: "",
      probability: "50%",
      stage: "Initial Contact",
      contact: "",
      email: "",
      phone: "",
      expectedClose: "",
      description: "",
      notes: "",
    });
    setSelectedDeal(null);
  };

  const totalValue = deals.reduce((sum, d) => parseInt(d.value.replace(/[$,]/g, '')) + sum, 0);
  const wonDeals = deals.filter(d => d.stage === "Closed Won").length;

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
          <h1 className="text-2xl font-bold text-[#1F2937]">Sales Pipeline</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your deals across stages</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Deal
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Pipeline Value</p>
          <p className="text-2xl font-bold text-[#1F2937]">${totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Active Deals</p>
          <p className="text-2xl font-bold text-[#1F2937]">{deals.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Won Deals</p>
          <p className="text-2xl font-bold text-green-600">{wonDeals}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Avg Deal Size</p>
          <p className="text-2xl font-bold text-[#1F2937]">${Math.round(totalValue / deals.length).toLocaleString()}</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {stages.map((stage) => {
            const stageDeals = getDealsByStage(stage.name);
            const stageValue = stageDeals.reduce((sum, d) => parseInt(d.value.replace(/[$,]/g, '')) + sum, 0);

            return (
              <div key={stage.id} className="w-80 flex-shrink-0">
                {/* Stage Header */}
                <div className={`rounded-t-xl px-4 py-3 ${stage.color} border-t-2 ${stage.borderColor}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#1F2937]">{stage.name}</h3>
                    <span className="bg-white px-2 py-0.5 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                      {stageDeals.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 font-medium">
                    ${stageValue.toLocaleString()}
                  </p>
                </div>

                {/* Deal Cards */}
                <div className="bg-gray-50 rounded-b-xl p-3 space-y-3 min-h-[200px]">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openViewModal(deal)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-[#1F2937] text-sm flex-1 pr-2">{deal.title}</h4>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => { e.stopPropagation(); openEditModal(deal); }}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={14} className="text-gray-400 hover:text-blue-600" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteDeal(deal.id); }}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} className="text-gray-400 hover:text-red-600" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{deal.company}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-[#1F2937]">{deal.value}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getProbabilityColor(deal.probability)}`}>
                          {deal.probability}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <User size={12} />
                        <span>{deal.contact}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={12} />
                        <span>{deal.expectedClose}</span>
                      </div>
                    </div>
                  ))}

                  {/* Add Deal Button */}
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, stage: stage.name }));
                      setIsModalOpen(true);
                    }}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-[#FF1E1E] hover:text-[#FF1E1E] transition-colors flex items-center justify-center gap-1"
                  >
                    <Plus size={14} />
                    Add Deal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Deal Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Deal">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter deal title"
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
                <DollarSign className="w-4 h-4 inline mr-1" /> Deal Value *
              </label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                placeholder="Enter value (e.g., 25000)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.name}>{stage.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probability</label>
              <select
                name="probability"
                value={formData.probability}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="10%">10%</option>
                <option value="25%">25%</option>
                <option value="40%">40%</option>
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="75%">75%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-1" /> Contact Person *
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Enter contact name"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4 inline mr-1" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" /> Phone
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" /> Expected Close Date
              </label>
              <input
                type="date"
                name="expectedClose"
                value={formData.expectedClose}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the deal"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Add notes..."
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
              onClick={handleAddDeal}
              disabled={!formData.title || !formData.company || !formData.value || !formData.contact}
              className="px-4 py-2 bg-[#FF1E1E] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Deal
            </button>
          </div>
        </div>
      </Modal>

      {/* View Deal Modal */}
      <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="Deal Details">
        {selectedDeal && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-[#1F2937]">{selectedDeal.title}</h3>
                <p className="text-gray-500">{selectedDeal.company}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{selectedDeal.value}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProbabilityColor(selectedDeal.probability)}`}>
                  {selectedDeal.probability} Probability
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Stage</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedDeal.stage}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Expected Close</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedDeal.expectedClose}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Contact Person</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedDeal.contact}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedDeal.email || "N/A"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Phone</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedDeal.phone || "N/A"}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Company</p>
                <p className="text-sm font-medium text-[#1F2937]">{selectedDeal.company}</p>
              </div>
            </div>
            {selectedDeal.description && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Description</p>
                <p className="text-sm text-[#1F2937]">{selectedDeal.description}</p>
              </div>
            )}
            {selectedDeal.notes && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-[#1F2937]">{selectedDeal.notes}</p>
              </div>
            )}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => { setViewModalOpen(false); openEditModal(selectedDeal); }}
                className="px-4 py-2 bg-[#FF1E1E] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Edit Deal
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Deal Modal */}
      <Modal isOpen={editModalOpen} onClose={() => { setEditModalOpen(false); resetForm(); }} title="Edit Deal">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value *</label>
              <input
                type="text"
                name="value"
                value={formData.value}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.name}>{stage.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probability</label>
              <select
                name="probability"
                value={formData.probability}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="10%">10%</option>
                <option value="25%">25%</option>
                <option value="40%">40%</option>
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="75%">75%</option>
                <option value="80%">80%</option>
                <option value="90%">90%</option>
                <option value="100%">100%</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
              <input
                type="date"
                name="expectedClose"
                value={formData.expectedClose}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
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
              onClick={handleEditDeal}
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

export default SalesPipeline;