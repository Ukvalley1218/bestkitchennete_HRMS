import React, { useState } from 'react';
import {
  SquaresFour, List, UserPlus, CheckCircle, X, Building, User, Calendar,
  Ruler, Tag, CaretDown, Eye, MagnifyingGlass, Funnel
} from '@phosphor-icons/react';

// Reusable Components

// Measurement Tag Component
const MeasurementTag = ({ label }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-100">
    {label}
  </span>
);

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
        Assign Designer
      </button>
    </td>
  </tr>
);

// Assign Designer Modal Component
const AssignDesignerModal = ({ isOpen, onClose, project, onAssign }) => {
  const [selectedDesigner, setSelectedDesigner] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('Medium');

  const designers = [
    { id: 1, name: 'Rajesh Kumar', specialization: 'Kitchen Specialist' },
    { id: 2, name: 'Priya Sharma', specialization: 'Living Room Expert' },
    { id: 3, name: 'Amit Singh', specialization: 'Bedroom Designer' },
    { id: 4, name: 'Sneha Patel', specialization: 'Full Home Interior' },
    { id: 5, name: 'Vikram Mehta', specialization: 'Office Spaces' },
  ];

  const priorities = ['High', 'Medium', 'Low'];

  if (!isOpen || !project) return null;

  const handleAssign = () => {
    if (selectedDesigner) {
      onAssign(project.id, selectedDesigner, selectedPriority);
      setSelectedDesigner('');
      setSelectedPriority('Medium');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[650px] max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <UserPlus size={20} className="text-red-600" weight="bold" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Assign Designer</h2>
              <p className="text-sm text-gray-500">Assign this project to a designer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Project Details Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Eye size={16} className="text-gray-400" />
              Project Details (Read Only)
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
              {/* Project Name & Client */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Project Name</label>
                  <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    {project.projectName}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Client Name</label>
                  <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    {project.clientName}
                  </div>
                </div>
              </div>

              {/* Space Type & Start Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Space Type</label>
                  <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    {project.spaceType}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Start Date</label>
                  <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                    {new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Measurements */}
              <div>
                <label className="block text-xs text-gray-400 mb-2">Measurements</label>
                <div className="flex flex-wrap gap-2">
                  {project.measurements.map((m, i) => (
                    <MeasurementTag key={i} label={m} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Section */}
          <div className="space-y-4">
            {/* Designer Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Designer <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDesigner}
                  onChange={(e) => setSelectedDesigner(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Choose a designer...</option>
                  {designers.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} - {d.specialization}
                    </option>
                  ))}
                </select>
                <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Priority Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="relative">
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                >
                  {priorities.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <CaretDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDesigner}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#EC1313' }}
          >
            <CheckCircle size={18} weight="bold" />
            Assign Project
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const Interior3DHeadProjectManagement = () => {
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
    },
    {
      id: 2,
      projectName: 'Modern Living Room Interior',
      clientName: 'Priya Sharma',
      spaceType: 'Living Room',
      measurements: ['Wall Panel Height', 'TV Unit Width', 'Sofa Back Panel', 'Ceiling Height'],
      startDate: '2026-03-08',
    },
    {
      id: 3,
      projectName: 'Master Bedroom Wardrobe',
      clientName: 'Ramesh Patel',
      spaceType: 'Bedroom',
      measurements: ['Wardrobe Depth', 'Loft Height', 'Drawer Size', 'Handle Type', 'Hinges'],
      startDate: '2026-03-10',
    },
    {
      id: 4,
      projectName: 'Traditional Mandir Design',
      clientName: 'Sunita Devi',
      spaceType: 'Mandir',
      measurements: ['Mandir Size', 'Drawer Size', 'Door Size', 'Knobs', 'Inner Laminate', 'Outer Laminate', 'CNC Design'],
      startDate: '2026-03-12',
    },
    {
      id: 5,
      projectName: 'Office Cabin Interior',
      clientName: 'Tech Solutions Pvt Ltd',
      spaceType: 'Office',
      measurements: ['Cabin Size', 'Desk Height', 'Storage Units', 'Meeting Table', 'Cable Management'],
      startDate: '2026-03-14',
    },
    {
      id: 6,
      projectName: 'Compact Kitchen Renovation',
      clientName: 'Meera Joshi',
      spaceType: 'Kitchen',
      measurements: ['Kitchen Laminate', 'Cabinet Height', 'Sink Area', 'Chimney Placement'],
      startDate: '2026-03-15',
    },
    {
      id: 7,
      projectName: 'Kids Room Design',
      clientName: 'Vikram Singh',
      spaceType: 'Bedroom',
      measurements: ['Bed Size', 'Study Table', 'Wardrobe', 'Toy Storage', 'Wall Art'],
      startDate: '2026-03-16',
    },
    {
      id: 8,
      projectName: 'Restaurant Counter Design',
      clientName: 'Spice Garden Restaurant',
      spaceType: 'Commercial',
      measurements: ['Counter Height', 'Storage Depth', 'Display Area', 'Billing Counter', 'Menu Board'],
      startDate: '2026-03-18',
    },
    {
      id: 9,
      projectName: 'Pooja Room Interior',
      clientName: 'Anjali Verma',
      spaceType: 'Mandir',
      measurements: ['Mandir Size', 'Door Design', 'Inner Laminate', 'Outer Laminate', 'Lighting'],
      startDate: '2026-03-20',
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

  const handleAssign = (projectId, designer, priority) => {
    console.log('Assigning project:', projectId, 'to designer:', designer, 'with priority:', priority);
    // In real app, this would call an API to assign the project
    alert(`Project assigned to ${designer} with ${priority} priority!`);
  };

  // Stats
  const stats = {
    total: projects.length,
    pending: projects.length,
    spaceTypes: spaceTypes.length,
  };

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen">
      {/* Page Container */}
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>
          <p className="text-gray-500 text-sm mt-1">Assign new projects to designers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ backgroundColor: '#FDE8E8', width: '40px', height: '40px', borderRadius: '12px' }}
              >
                <Building size={20} style={{ color: '#EF4444' }} weight="bold" />
              </div>
            </div>
            <div>
              <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">{stats.total}</p>
              <p className="text-sm text-[#00000099] mt-1.5 font-medium">Total Projects</p>
            </div>
          </div>

          <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ backgroundColor: '#FDE8E8', width: '40px', height: '40px', borderRadius: '12px' }}
              >
                <UserPlus size={20} style={{ color: '#EF4444' }} weight="bold" />
              </div>
            </div>
            <div>
              <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">{stats.pending}</p>
              <p className="text-sm text-[#00000099] mt-1.5 font-medium">Pending Assignment</p>
            </div>
          </div>

          <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-start justify-between">
              <div
                className="flex items-center justify-center rounded-xl"
                style={{ backgroundColor: '#FDE8E8', width: '40px', height: '40px', borderRadius: '12px' }}
              >
                <Tag size={20} style={{ color: '#EF4444' }} weight="bold" />
              </div>
            </div>
            <div>
              <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">{stats.spaceTypes}</p>
              <p className="text-sm text-[#00000099] mt-1.5 font-medium">Space Types</p>
            </div>
          </div>
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
      </div>

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

export default Interior3DHeadProjectManagement;