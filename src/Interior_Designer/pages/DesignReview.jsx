import React, { useState } from 'react';
import {
  Eye, ArrowCounterClockwise, CheckCircle, X, Upload, Building,
  User, Calendar, Tag, FileText
} from '@phosphor-icons/react';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    'Under Review': { dot: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
    'Pending Approval': { dot: 'bg-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50' },
    'Approved': { dot: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50' },
    'Needs Revision': { dot: 'bg-red-500', text: 'text-red-700', bg: 'bg-red-50' },
  };

  const config = statusConfig[status] || statusConfig['Under Review'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {status}
    </span>
  );
};

// Version Badge Component
const VersionBadge = ({ version }) => (
  <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-gray-700 shadow-sm">
    {version}
  </span>
);

// Design Card Component
const DesignCard = ({ design, onView, onRedesign, onApprove }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
    {/* Image Section */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={design.image}
        alt={design.projectName}
        className="w-full h-full object-cover"
      />
      <VersionBadge version={design.version} />
    </div>

    {/* Content Section */}
    <div className="p-4 flex-1 flex flex-col">
      {/* Project & Client Info */}
      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 text-base line-clamp-1">{design.projectName}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{design.clientName}</p>
      </div>

      {/* Submission Date */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
        <Calendar size={14} />
        <span>Submitted: {design.submittedDate}</span>
      </div>

      {/* Status Bar */}
      <div className="mb-4">
        <StatusBadge status={design.status} />
      </div>

      {/* View Design Button */}
      <button
        onClick={() => onView(design)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 mb-3 rounded-lg text-white font-medium transition-colors"
        style={{ backgroundColor: '#2563EB' }}
      >
        <Eye size={18} weight="bold" />
        View Design
      </button>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={() => onRedesign(design)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowCounterClockwise size={16} />
          Redesign
        </button>
        <button
          onClick={() => onApprove(design)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ backgroundColor: '#EC1313' }}
        >
          <CheckCircle size={16} weight="bold" />
          Approve
        </button>
      </div>
    </div>
  </div>
);

// View Design Modal
const ViewDesignModal = ({ isOpen, onClose, design }) => {
  if (!isOpen || !design) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[700px] max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Design Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Design Image */}
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={design.image}
              alt={design.projectName}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Project Information Grid */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Project Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Project Name</label>
                <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                  {design.projectName}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Client Name</label>
                <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                  {design.clientName}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Employee Name</label>
                <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                  {design.employeeName}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Version Number</label>
                <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                  {design.version}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Space Type</label>
                <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-800">
                  {design.spaceType}
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Project Status</label>
                <div className="px-3 py-2.5 bg-white rounded-lg border border-gray-200 text-sm font-medium">
                  <StatusBadge status={design.status} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Redesign Modal
const RedesignModal = ({ isOpen, onClose, design, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  if (!isOpen || !design) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    onSubmit(design.id, feedback, uploadedFile);
    setFeedback('');
    setUploadedFile(null);
    onClose();
  };

  const handleClose = () => {
    setFeedback('');
    setUploadedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Update Client Response</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Project Information Card */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Project Name</label>
                <div className="text-sm font-medium text-gray-800">{design.projectName}</div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Client Name</label>
                <div className="text-sm font-medium text-gray-800">{design.clientName}</div>
              </div>
            </div>
          </div>

          {/* Client Feedback */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter client feedback for redesign..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Upload File Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment (Optional)
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                dragActive ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-300 mb-3" />
                {uploadedFile ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <FileText size={16} className="text-green-500" />
                    <span className="font-medium">{uploadedFile.name}</span>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-500">
                      <span className="text-red-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, PDF up to 10MB</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: '#DC2626' }}
          >
            Send for Redesign
          </button>
        </div>
      </div>
    </div>
  );
};

// Approve Modal
const ApproveModal = ({ isOpen, onClose, design, onConfirm }) => {
  const [comment, setComment] = useState('');

  if (!isOpen || !design) return null;

  const handleConfirm = () => {
    onConfirm(design.id, comment);
    setComment('');
    onClose();
  };

  const handleClose = () => {
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Approve Design</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-4">
            <img
              src={design.image}
              alt={design.projectName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{design.projectName}</h3>
              <p className="text-sm text-gray-500">{design.clientName}</p>
            </div>
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Approval Notes (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add any notes for the designer..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: '#EC1313' }}
          >
            <CheckCircle size={18} weight="bold" />
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Design Review Component
const DesignReview = () => {
  const [designs] = useState([
    {
      id: 1,
      projectName: 'Modern L-Shape Kitchen',
      clientName: 'Arun Kumar',
      employeeName: 'Rajesh Kumar',
      version: 'v1',
      spaceType: 'Kitchen',
      status: 'Under Review',
      submittedDate: '13 Mar 2026',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      projectName: 'Luxury Living Room',
      clientName: 'Priya Sharma',
      employeeName: 'Priya Sharma',
      version: 'v2',
      spaceType: 'Living Room',
      status: 'Pending Approval',
      submittedDate: '12 Mar 2026',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      projectName: 'Master Bedroom Suite',
      clientName: 'Ramesh Patel',
      employeeName: 'Amit Singh',
      version: 'v3',
      spaceType: 'Bedroom',
      status: 'Approved',
      submittedDate: '10 Mar 2026',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      projectName: 'Traditional Mandir Design',
      clientName: 'Sunita Devi',
      employeeName: 'Sneha Patel',
      version: 'v1',
      spaceType: 'Mandir',
      status: 'Needs Revision',
      submittedDate: '11 Mar 2026',
      image: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      projectName: 'Corporate Office Interior',
      clientName: 'Tech Solutions Pvt Ltd',
      employeeName: 'Vikram Mehta',
      version: 'v2',
      spaceType: 'Office',
      status: 'Under Review',
      submittedDate: '14 Mar 2026',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      projectName: 'Kids Room Theme',
      clientName: 'Meera Joshi',
      employeeName: 'Rajesh Kumar',
      version: 'v1',
      spaceType: 'Bedroom',
      status: 'Pending Approval',
      submittedDate: '15 Mar 2026',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop',
    },
    {
      id: 7,
      projectName: 'Restaurant Interior',
      clientName: 'Spice Garden',
      employeeName: 'Lisa Anderson',
      version: 'v2',
      spaceType: 'Commercial',
      status: 'Under Review',
      submittedDate: '09 Mar 2026',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    },
    {
      id: 8,
      projectName: 'Walk-in Wardrobe',
      clientName: 'Anjali Verma',
      employeeName: 'Amit Singh',
      version: 'v2',
      spaceType: 'Bedroom',
      status: 'Approved',
      submittedDate: '08 Mar 2026',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=300&fit=crop',
    },
    {
      id: 9,
      projectName: 'Pooja Room Design',
      clientName: 'Vikram Singh',
      employeeName: 'Sneha Patel',
      version: 'v1',
      spaceType: 'Mandir',
      status: 'Needs Revision',
      submittedDate: '07 Mar 2026',
      image: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop',
    },
  ]);

  const [selectedDesign, setSelectedDesign] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [redesignModalOpen, setRedesignModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);

  const handleView = (design) => {
    setSelectedDesign(design);
    setViewModalOpen(true);
  };

  const handleRedesign = (design) => {
    setSelectedDesign(design);
    setRedesignModalOpen(true);
  };

  const handleApprove = (design) => {
    setSelectedDesign(design);
    setApproveModalOpen(true);
  };

  const handleRedesignSubmit = (designId, feedback, file) => {
    console.log('Redesign submitted for:', designId, 'Feedback:', feedback, 'File:', file);
    // Add your submission logic here
  };

  const handleApproveConfirm = (designId, comment) => {
    console.log('Approved:', designId, 'Comment:', comment);
    // Add your approval logic here
  };

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Design Review</h1>
        <p className="text-gray-500 text-sm mt-1">Review and approve design submissions</p>
      </div>

      {/* Design Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onView={handleView}
            onRedesign={handleRedesign}
            onApprove={handleApprove}
          />
        ))}
      </div>

      {/* Empty State */}
      {designs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Building size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No design submissions to review.</p>
        </div>
      )}

      {/* View Design Modal */}
      <ViewDesignModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        design={selectedDesign}
      />

      {/* Redesign Modal */}
      <RedesignModal
        isOpen={redesignModalOpen}
        onClose={() => setRedesignModalOpen(false)}
        design={selectedDesign}
        onSubmit={handleRedesignSubmit}
      />

      {/* Approve Modal */}
      <ApproveModal
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        design={selectedDesign}
        onConfirm={handleApproveConfirm}
      />
    </div>
  );
};

export default DesignReview;