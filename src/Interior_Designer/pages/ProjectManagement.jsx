import React, { useState } from 'react';
import {
  SquaresFour, List, UserPlus, CheckCircle, X, Building, User, Calendar,
  Ruler, CaretDown, MagnifyingGlass,
  Lightning, FileText, Phone, Envelope, Check, Info,
  CalendarBlank, HourglassHigh, ArrowRight, PaperPlane
} from '@phosphor-icons/react';

// Measurement Tag Component
const MeasurementTag = ({ label }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
    {label}
  </span>
);

// Priority Badge Component
const PriorityBadge = ({ priority }) => {
  const colors = {
    'High': 'bg-red-100 text-red-700 border-red-200',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Low': 'bg-green-100 text-green-700 border-green-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colors[priority] || colors['Medium']}`}>
      <Lightning size={12} className="mr-1" weight="bold" />
      {priority}
    </span>
  );
};

// Workload Indicator Component
const WorkloadIndicator = ({ percentage }) => {
  const getColor = () => {
    if (percentage >= 80) return 'bg-red-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-8">{percentage}%</span>
    </div>
  );
};

// Project Card Component (Grid View)
const ProjectCard = ({ project, onAssign }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    {/* Top Section */}
    <div className="p-5 border-b border-gray-50">
      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{project.projectName}</h3>
      <div className="flex items-center gap-1.5 mt-1">
        <User size={14} className="text-gray-400" />
        <p className="text-sm text-gray-500">{project.clientName}</p>
      </div>
    </div>

    {/* Details Section */}
    <div className="p-5 space-y-3">
      {/* Space Type */}
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 shrink-0">
          <Building size={16} className="text-gray-400" />
        </div>
        <div>
          <p className="text-xs text-gray-400">Space Type</p>
          <p className="text-sm font-medium text-gray-700">{project.spaceType}</p>
        </div>
      </div>

      {/* Measurements */}
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 shrink-0">
          <Ruler size={16} className="text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400">Measurements</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.measurements.slice(0, 3).map((m, i) => (
              <MeasurementTag key={i} label={m} />
            ))}
            {project.measurements.length > 3 && (
              <span className="text-xs text-gray-500">+{project.measurements.length - 3} more</span>
            )}
          </div>
        </div>
      </div>

      {/* Start Date */}
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 shrink-0">
          <Calendar size={16} className="text-gray-400" />
        </div>
        <div>
          <p className="text-xs text-gray-400">Start Date</p>
          <p className="text-sm font-medium text-gray-700">
            {new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>

    {/* Action Section */}
    <div className="p-4 bg-gray-50 border-t border-gray-50">
      <button
        onClick={() => onAssign(project)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium transition-colors"
        style={{ backgroundColor: '#EC1313' }}
      >
        <UserPlus size={18} weight="bold" />
        Assign Designer
      </button>
    </div>
  </div>
);

// Project Row Component (List View)
const ProjectRow = ({ project, onAssign }) => (
  <tr className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">
      <p className="font-medium text-gray-900">{project.projectName}</p>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-600">{project.clientName}</p>
    </td>
    <td className="px-6 py-4">
      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
        {project.spaceType}
      </span>
    </td>
    <td className="px-6 py-4">
      <div className="flex flex-wrap gap-1.5">
        {project.measurements.slice(0, 3).map((m, i) => (
          <MeasurementTag key={i} label={m} />
        ))}
        {project.measurements.length > 3 && (
          <span className="text-xs text-gray-500 self-center">+{project.measurements.length - 3}</span>
        )}
      </div>
    </td>
    <td className="px-6 py-4">
      <p className="text-sm text-gray-600">
        {new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </td>
    <td className="px-6 py-4">
      <button
        onClick={() => onAssign(project)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
        style={{ backgroundColor: '#EC1313' }}
      >
        <UserPlus size={16} weight="bold" />
        Assign
      </button>
    </td>
  </tr>
);

// Enhanced Assign Designer Modal Component
const AssignDesignerModal = ({ isOpen, onClose, project, onAssign }) => {
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const designers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      specialization: 'Kitchen Specialist',
      activeProjects: 3,
      workload: 65,
      rating: 4.8,
      expertise: ['Kitchen', 'Modular'],
      available: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      specialization: 'Living Room Expert',
      activeProjects: 5,
      workload: 85,
      rating: 4.9,
      expertise: ['Living Room', 'Bedroom'],
      available: true
    },
    {
      id: 3,
      name: 'Amit Singh',
      specialization: 'Bedroom Designer',
      activeProjects: 2,
      workload: 40,
      rating: 4.6,
      expertise: ['Bedroom', 'Wardrobe'],
      available: true
    },
    {
      id: 4,
      name: 'Sneha Patel',
      specialization: 'Full Home Interior',
      activeProjects: 4,
      workload: 75,
      rating: 4.7,
      expertise: ['Full Home', 'Office'],
      available: false
    },
    {
      id: 5,
      name: 'Vikram Mehta',
      specialization: 'Office Spaces',
      activeProjects: 1,
      workload: 25,
      rating: 4.5,
      expertise: ['Office', 'Commercial'],
      available: true
    },
  ];

  const priorities = [
    { value: 'High', label: 'High', color: 'red', description: 'Urgent - needs immediate attention' },
    { value: 'Medium', label: 'Medium', color: 'yellow', description: 'Standard priority' },
    { value: 'Low', label: 'Low', color: 'green', description: 'Can be scheduled flexibly' },
  ];

  const defaultDeadline = new Date();
  defaultDeadline.setDate(defaultDeadline.getDate() + 30);
  const defaultDeadlineStr = defaultDeadline.toISOString().split('T')[0];

  if (!isOpen || !project) return null;

  const selectedDesignerData = designers.find(d => d.name === selectedDesigner);

  const handleAssign = () => {
    if (selectedDesigner) {
      onAssign(project.id, selectedDesigner, selectedPriority, deadline || defaultDeadlineStr, notes);
      setSelectedDesigner('');
      setSelectedPriority('Medium');
      setDeadline('');
      setNotes('');
      onClose();
    }
  };

  const isMatch = selectedDesignerData?.expertise?.some(e =>
    project.spaceType.toLowerCase().includes(e.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden my-4">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <UserPlus size={24} className="text-red-600" weight="bold" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Assign Designer</h2>
                <p className="text-sm text-gray-500">Configure and assign project to a designer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Project Quick Info */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm font-medium">
              <Building size={14} className="text-gray-400" />
              {project.spaceType}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm">
              <Calendar size={14} className="text-gray-400" />
              Started: {new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-sm">
              <Ruler size={14} className="text-gray-400" />
              {project.measurements.length} measurements
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-gray-100">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'details' ? 'bg-red-600 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Project Details
            </button>
            <button
              onClick={() => setActiveTab('assign')}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'assign' ? 'bg-red-600 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Assign Designer
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-280px)]">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Project Info */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" />
                  Project Information
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Project Name</label>
                    <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                      {project.projectName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Client Name</label>
                    <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                      {project.clientName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Space Type</label>
                    <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                      {project.spaceType}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                    <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                      {new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Estimated Budget</label>
                    <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                      {project.estimatedBudget || '₹2,50,000 - ₹5,00,000'}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Complexity</label>
                    <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium">
                      <PriorityBadge priority={project.complexity || 'Medium'} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Measurements */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Ruler size={16} className="text-gray-400" />
                  Measurements from Sales
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Read Only</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.measurements.map((m, i) => (
                    <MeasurementTag key={i} label={m} />
                  ))}
                </div>
              </div>

              {/* Client Contact */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Client Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Phone</p>
                      <p className="text-sm font-medium text-gray-700">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Envelope size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-700">{project.clientName.toLowerCase().replace(' ', '.')}@email.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Designer Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Designer <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {designers.map((designer) => {
                    const isSelected = selectedDesigner === designer.name;
                    const isExpertiseMatch = designer.expertise?.some(e =>
                      project.spaceType.toLowerCase().includes(e.toLowerCase())
                    );

                    return (
                      <button
                        key={designer.id}
                        onClick={() => designer.available && setSelectedDesigner(designer.name)}
                        disabled={!designer.available}
                        className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-red-500 bg-red-50'
                            : designer.available
                              ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              : 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        {!designer.available && (
                          <span className="absolute top-2 right-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                            Unavailable
                          </span>
                        )}

                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                            {designer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">{designer.name}</p>
                              {isExpertiseMatch && (
                                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <Check size={10} weight="bold" /> Match
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">{designer.specialization}</p>

                            {/* Workload */}
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-500">Workload</span>
                                <span className={`font-medium ${designer.workload >= 80 ? 'text-red-600' : designer.workload >= 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                                  {designer.workload}%
                                </span>
                              </div>
                              <WorkloadIndicator percentage={designer.workload} />
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <FileText size={12} />
                                {designer.activeProjects} active
                              </span>
                              <span className="flex items-center gap-1">
                                ⭐ {designer.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-2 left-2">
                            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
                              <Check size={12} weight="bold" className="text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assignment Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Priority */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Lightning size={16} className="inline mr-1" />
                    Priority Level
                  </label>
                  <div className="space-y-2">
                    {priorities.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setSelectedPriority(p.value)}
                        className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                          selectedPriority === p.value
                            ? p.color === 'red'
                              ? 'border-red-500 bg-red-50'
                              : p.color === 'yellow'
                                ? 'border-yellow-500 bg-yellow-50'
                                : 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <PriorityBadge priority={p.label} />
                          <span className="text-xs text-gray-500">{p.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deadline & Notes */}
                <div className="space-y-4">
                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <CalendarBlank size={16} className="inline mr-1" />
                      Target Deadline
                    </label>
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      placeholder={defaultDeadlineStr}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    {!deadline && (
                      <p className="text-xs text-gray-400 mt-1">Default: 30 days from now</p>
                    )}
                  </div>

                  {/* Estimated Time */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <HourglassHigh size={16} className="inline mr-1" />
                      Estimated Completion Time
                    </label>
                    <div className="px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700">
                      Based on project complexity: <span className="font-medium">2-4 weeks</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FileText size={16} className="inline mr-1" />
                  Assignment Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any special instructions or notes for the designer..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Summary */}
              {selectedDesigner && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <CheckCircle size={16} weight="bold" />
                    Assignment Summary
                  </h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p><span className="font-medium">Designer:</span> {selectedDesigner}</p>
                    <p><span className="font-medium">Priority:</span> {selectedPriority}</p>
                    <p><span className="font-medium">Deadline:</span> {deadline ? new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date(defaultDeadlineStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    {notes && <p><span className="font-medium">Notes:</span> {notes}</p>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {activeTab === 'details' ? (
              <span className="flex items-center gap-1">
                <Info size={14} />
                Review project details before assigning
              </span>
            ) : (
              <span>* Required fields</span>
            )}
          </div>
          <div className="flex gap-3">
            {activeTab === 'details' ? (
              <button
                onClick={() => setActiveTab('assign')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
              >
                Continue to Assign
                <ArrowRight size={16} weight="bold" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('details')}
                  className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!selectedDesigner}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperPlane size={16} weight="bold" />
                  Assign Project
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main ProjectManagement Component
const ProjectManagement = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [spaceFilter, setSpaceFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock project data (from Sales module - read only)
  const [projects] = useState([
    {
      id: 1,
      projectName: 'L-Shape Kitchen Design',
      clientName: 'Arun Kumar',
      spaceType: 'Kitchen',
      measurements: ['Cabinet Depth', 'Loft Laminate', 'Handles', 'Hinges', 'Channel', 'Profile Lights'],
      startDate: '2026-03-06',
      estimatedBudget: '₹2,50,000 - ₹4,00,000',
      complexity: 'Medium',
    },
    {
      id: 2,
      projectName: 'Modern Living Room Interior',
      clientName: 'Priya Sharma',
      spaceType: 'Living Room',
      measurements: ['Wall Panel Height', 'TV Unit Width', 'Sofa Back Panel', 'Ceiling Height'],
      startDate: '2026-03-08',
      estimatedBudget: '₹3,00,000 - ₹5,00,000',
      complexity: 'High',
    },
    {
      id: 3,
      projectName: 'Master Bedroom Wardrobe',
      clientName: 'Ramesh Patel',
      spaceType: 'Bedroom',
      measurements: ['Wardrobe Depth', 'Loft Height', 'Drawer Size', 'Handle Type', 'Hinges'],
      startDate: '2026-03-10',
      estimatedBudget: '₹1,50,000 - ₹2,50,000',
      complexity: 'Low',
    },
    {
      id: 4,
      projectName: 'Traditional Mandir Design',
      clientName: 'Sunita Devi',
      spaceType: 'Mandir',
      measurements: ['Mandir Size', 'Drawer Size', 'Door Size', 'Knobs', 'Inner Laminate', 'Outer Laminate', 'CNC Design'],
      startDate: '2026-03-12',
      estimatedBudget: '₹80,000 - ₹1,50,000',
      complexity: 'High',
    },
    {
      id: 5,
      projectName: 'Office Cabin Interior',
      clientName: 'Tech Solutions Pvt Ltd',
      spaceType: 'Office',
      measurements: ['Cabin Size', 'Desk Height', 'Storage Units', 'Meeting Table', 'Cable Management'],
      startDate: '2026-03-14',
      estimatedBudget: '₹4,00,000 - ₹6,00,000',
      complexity: 'Medium',
    },
    {
      id: 6,
      projectName: 'Compact Kitchen Renovation',
      clientName: 'Meera Joshi',
      spaceType: 'Kitchen',
      measurements: ['Kitchen Laminate', 'Cabinet Height', 'Sink Area', 'Chimney Placement'],
      startDate: '2026-03-15',
      estimatedBudget: '₹1,00,000 - ₹2,00,000',
      complexity: 'Low',
    },
    {
      id: 7,
      projectName: 'Kids Room Design',
      clientName: 'Vikram Singh',
      spaceType: 'Bedroom',
      measurements: ['Bed Size', 'Study Table', 'Wardrobe', 'Toy Storage', 'Wall Art'],
      startDate: '2026-03-16',
      estimatedBudget: '₹1,80,000 - ₹3,00,000',
      complexity: 'Medium',
    },
    {
      id: 8,
      projectName: 'Restaurant Counter Design',
      clientName: 'Spice Garden Restaurant',
      spaceType: 'Commercial',
      measurements: ['Counter Height', 'Storage Depth', 'Display Area', 'Billing Counter', 'Menu Board'],
      startDate: '2026-03-18',
      estimatedBudget: '₹5,00,000 - ₹8,00,000',
      complexity: 'High',
    },
    {
      id: 9,
      projectName: 'Pooja Room Interior',
      clientName: 'Anjali Verma',
      spaceType: 'Mandir',
      measurements: ['Mandir Size', 'Door Design', 'Inner Laminate', 'Outer Laminate', 'Lighting'],
      startDate: '2026-03-20',
      estimatedBudget: '₹60,000 - ₹1,20,000',
      complexity: 'Low',
    },
  ]);

  // Get unique space types for filter
  const spaceTypes = [...new Set(projects.map(p => p.spaceType))];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpace = spaceFilter === 'all' || project.spaceType === spaceFilter;
    return matchesSearch && matchesSpace;
  });

  // Handle assign modal
  const openAssignModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleAssign = (projectId, designer, priority, deadline, notes) => {
    console.log('Assigning project:', projectId, 'to designer:', designer, 'with priority:', priority, 'deadline:', deadline, 'notes:', notes);
    alert(`Project assigned to ${designer}!\nPriority: ${priority}\nDeadline: ${new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`);
  };

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
        <p className="text-gray-500 text-sm mt-1">Assign new projects from Sales to designers</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search projects or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            {/* Space Type Filter */}
            <div className="relative">
              <select
                value={spaceFilter}
                onChange={(e) => setSpaceFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="all">All Space Types</option>
                {spaceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <CaretDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'} transition-colors`}
              title="Grid View"
            >
              <SquaresFour size={18} weight={viewMode === 'grid' ? 'bold' : 'regular'} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'} transition-colors`}
              title="List View"
            >
              <List size={18} weight={viewMode === 'list' ? 'bold' : 'regular'} />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onAssign={openAssignModal}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Space Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Measurements</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onAssign={openAssignModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Building size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No projects found matching your criteria.</p>
        </div>
      )}

      {/* Assign Designer Modal */}
      <AssignDesignerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
        onAssign={handleAssign}
      />
    </div>
  );
};

export default ProjectManagement;