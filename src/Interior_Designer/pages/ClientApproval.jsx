import React, { useState } from 'react';
import { PaperPlaneTilt, X, Building, Calendar, User, Tag } from '@phosphor-icons/react';

// Version Badge Component
const VersionBadge = ({ version }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
    {version}
  </span>
);

// Send Modal Component
const SendModal = ({ isOpen, onClose, design, onSend }) => {
  if (!isOpen || !design) return null;

  const handleSend = () => {
    onSend(design.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[620px] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Send Design to Client</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Design Preview Image */}
          <div className="rounded-xl overflow-hidden mb-6">
            <img
              src={design.image}
              alt={design.projectName}
              className="w-full h-56 object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="bg-gray-50 rounded-xl p-5 mb-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Project Details</h3>
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
            </div>
          </div>

          {/* Information Box */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-700">
              This design will be sent to the client for approval. The client will receive an email notification with a link to view and approve the design.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: '#DC2626' }}
          >
            <PaperPlaneTilt size={18} weight="bold" />
            Send to Client
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Client Approval Component
const ClientApproval = () => {
  const [designs] = useState([
    {
      id: 1,
      projectName: 'Modern L-Shape Kitchen',
      clientName: 'Arun Kumar',
      version: 'v2.1',
      sentDate: '13 Mar 2026',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      projectName: 'Luxury Living Room',
      clientName: 'Priya Sharma',
      version: 'v1.3',
      sentDate: '12 Mar 2026',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      projectName: 'Master Bedroom Suite',
      clientName: 'Ramesh Patel',
      version: 'v3.0',
      sentDate: '10 Mar 2026',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      projectName: 'Traditional Mandir Design',
      clientName: 'Sunita Devi',
      version: 'v1.2',
      sentDate: '11 Mar 2026',
      image: 'https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      projectName: 'Corporate Office Interior',
      clientName: 'Tech Solutions Pvt Ltd',
      version: 'v2.0',
      sentDate: '14 Mar 2026',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      projectName: 'Kids Room Theme',
      clientName: 'Meera Joshi',
      version: 'v1.0',
      sentDate: '15 Mar 2026',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=300&fit=crop',
    },
    {
      id: 7,
      projectName: 'Restaurant Interior',
      clientName: 'Spice Garden',
      version: 'v1.5',
      sentDate: '09 Mar 2026',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
    },
    {
      id: 8,
      projectName: 'Walk-in Wardrobe',
      clientName: 'Anjali Verma',
      version: 'v2.2',
      sentDate: '08 Mar 2026',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400&h=300&fit=crop',
    },
  ]);

  const [selectedDesign, setSelectedDesign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendClick = (design) => {
    setSelectedDesign(design);
    setIsModalOpen(true);
  };

  const handleSend = (designId) => {
    console.log('Sending design to client:', designId);
    // Add your send logic here
  };

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Client Approval</h1>
        <p className="text-gray-500 text-sm mt-1">Track client approval status</p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Client Approval Status</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sent Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {designs.map((design) => (
                <tr key={design.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={design.image}
                          alt={design.projectName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{design.projectName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-gray-600">{design.clientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <VersionBadge version={design.version} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-600">{design.sentDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleSendClick(design)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: '#DC2626' }}
                    >
                      <PaperPlaneTilt size={16} weight="bold" />
                      Send to Client
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {designs.length === 0 && (
          <div className="p-12 text-center">
            <Building size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No designs pending client approval.</p>
          </div>
        )}
      </div>

      {/* Send Modal */}
      <SendModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        design={selectedDesign}
        onSend={handleSend}
      />
    </div>
  );
};

export default ClientApproval;