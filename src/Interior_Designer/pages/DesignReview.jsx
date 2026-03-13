import React, { useState } from 'react';
import {
  Eye, PencilSimple, Trash, CheckCircle, XCircle, Clock, Files, ChatCircle,
  MagnifyingGlass, Funnel, ArrowRight, ArrowClockwise, Download, Share,
  ThumbsUp, ThumbsDown, User, Calendar, Tag, Folder, Star, Warning,
  X, Plus, Paperclip, NotePencil
} from '@phosphor-icons/react';

const DesignReview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const [designs, setDesigns] = useState([
    {
      id: 1,
      title: "Modern Living Room Concept",
      project: "Modern Living Room",
      client: "John Smith",
      designer: "Sarah Johnson",
      status: "Pending Review",
      category: "Living Room",
      submittedDate: "2024-03-10",
      version: "v2.1",
      priority: "High",
      thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=250&fit=crop",
      description: "Contemporary living room design featuring minimalist furniture, neutral color palette with accent pieces, and integrated smart home technology.",
      files: [
        { id: 1, name: "FloorPlan_Final.pdf", type: "pdf", size: "2.4 MB" },
        { id: 2, name: "3D_Render_01.png", type: "image", size: "5.1 MB" },
        { id: 3, name: "Material_Board.pdf", type: "pdf", size: "3.2 MB" },
      ],
      comments: [
        { id: 1, user: "Michael Chen", text: "Great use of natural light. Consider adding more storage options.", date: "2024-03-11", type: "feedback" },
        { id: 2, user: "Client Review", text: "Love the color scheme! Can we explore darker accent colors?", date: "2024-03-12", type: "client" },
      ],
      versions: [
        { version: "v1.0", date: "2024-03-01", status: "Rejected", note: "Client requested major revisions" },
        { version: "v2.0", date: "2024-03-05", status: "Rejected", note: "Color scheme adjustment needed" },
        { version: "v2.1", date: "2024-03-10", status: "Pending Review", note: "Latest revision" },
      ],
      rating: 4.5,
      reviewHistory: [
        { action: "Submitted for review", date: "2024-03-10", user: "Sarah Johnson" },
        { action: "Initial feedback provided", date: "2024-03-11", user: "Michael Chen" },
      ],
    },
    {
      id: 2,
      title: "Corporate Office Layout",
      project: "Corporate Office Renovation",
      client: "Tech Solutions Ltd",
      designer: "Michael Chen",
      status: "In Review",
      category: "Office",
      submittedDate: "2024-03-08",
      version: "v1.3",
      priority: "High",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
      description: "Modern office space design with open floor plan, collaborative zones, private meeting rooms, and ergonomic workstation clusters.",
      files: [
        { id: 1, name: "Office_Layout.dwg", type: "drawing", size: "8.2 MB" },
        { id: 2, name: "Furniture_Specs.pdf", type: "pdf", size: "4.5 MB" },
      ],
      comments: [
        { id: 1, user: "Lisa Anderson", text: "Meeting room placement looks good. Need to verify fire exit compliance.", date: "2024-03-09", type: "feedback" },
      ],
      versions: [
        { version: "v1.0", date: "2024-02-20", status: "Rejected", note: "Initial draft" },
        { version: "v1.2", date: "2024-03-01", status: "Approved", note: "Approved with minor changes" },
        { version: "v1.3", date: "2024-03-08", status: "In Review", note: "Client revision request" },
      ],
      rating: 4.2,
      reviewHistory: [
        { action: "Submitted for review", date: "2024-03-08", user: "Michael Chen" },
        { action: "Assigned to review team", date: "2024-03-09", user: "System" },
      ],
    },
    {
      id: 3,
      title: "Luxury Kitchen Design",
      project: "Luxury Kitchen Remodel",
      client: "Priya Sharma",
      designer: "Emily Davis",
      status: "Approved",
      category: "Kitchen",
      submittedDate: "2024-02-20",
      version: "v3.0",
      priority: "Medium",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
      description: "High-end kitchen renovation featuring custom cabinetry, premium appliances, marble countertops, and integrated lighting solutions.",
      files: [
        { id: 1, name: "Kitchen_3D_Render.png", type: "image", size: "12.3 MB" },
        { id: 2, name: "Appliance_List.pdf", type: "pdf", size: "1.8 MB" },
        { id: 3, name: "Cabinet_Drawings.dwg", type: "drawing", size: "5.6 MB" },
      ],
      comments: [
        { id: 1, user: "John Smith", text: "Excellent work! Client is very happy with the design.", date: "2024-02-22", type: "approval" },
      ],
      versions: [
        { version: "v1.0", date: "2024-01-15", status: "Rejected", note: "Major revision needed" },
        { version: "v2.0", date: "2024-02-01", status: "In Review", note: "Revised design" },
        { version: "v3.0", date: "2024-02-20", status: "Approved", note: "Final approval" },
      ],
      rating: 5.0,
      reviewHistory: [
        { action: "Submitted for review", date: "2024-02-20", user: "Emily Davis" },
        { action: "Approved by client", date: "2024-02-22", user: "John Smith" },
        { action: "Moved to implementation", date: "2024-02-25", user: "System" },
      ],
    },
    {
      id: 4,
      title: "Boutique Hotel Suite Concept",
      project: "Boutique Hotel Suite",
      client: "Grand Hotels Inc",
      designer: "James Wilson",
      status: "Rejected",
      category: "Hospitality",
      submittedDate: "2024-03-05",
      version: "v1.2",
      priority: "High",
      thumbnail: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=250&fit=crop",
      description: "Luxury suite design with tropical theme, custom furniture, and premium amenities for boutique hotel chain.",
      files: [
        { id: 1, name: "Suite_Concept.pdf", type: "pdf", size: "6.7 MB" },
      ],
      comments: [
        { id: 1, user: "Client Review", text: "The theme doesn't match our brand identity. Please revise with more modern elements.", date: "2024-03-07", type: "client" },
        { id: 2, user: "Lisa Anderson", text: "Need to align with updated brand guidelines.", date: "2024-03-08", type: "feedback" },
      ],
      versions: [
        { version: "v1.0", date: "2024-02-25", status: "Rejected", note: "Brand mismatch" },
        { version: "v1.1", date: "2024-03-02", status: "Rejected", note: "Still not aligned" },
        { version: "v1.2", date: "2024-03-05", status: "Rejected", note: "Requires major revision" },
      ],
      rating: 2.8,
      reviewHistory: [
        { action: "Submitted for review", date: "2024-03-05", user: "James Wilson" },
        { action: "Rejected by client", date: "2024-03-07", user: "Client Review" },
      ],
    },
    {
      id: 5,
      title: "Restaurant Interior Proposal",
      project: "Restaurant Interior Design",
      client: "Spice Garden",
      designer: "Lisa Anderson",
      status: "Pending Revision",
      category: "Commercial",
      submittedDate: "2024-03-12",
      version: "v2.0",
      priority: "Medium",
      thumbnail: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
      description: "Modern restaurant interior combining traditional elements with contemporary design, featuring open kitchen concept and ambient lighting.",
      files: [
        { id: 1, name: "Restaurant_Design.pdf", type: "pdf", size: "8.9 MB" },
        { id: 2, name: "Lighting_Plan.png", type: "image", size: "4.2 MB" },
      ],
      comments: [
        { id: 1, user: "Client Review", text: "Ambient lighting is perfect. Need minor adjustments to seating layout.", date: "2024-03-13", type: "client" },
      ],
      versions: [
        { version: "v1.0", date: "2024-02-28", status: "In Review", note: "Initial proposal" },
        { version: "v2.0", date: "2024-03-12", status: "Pending Revision", note: "Minor changes requested" },
      ],
      rating: 4.0,
      reviewHistory: [
        { action: "Submitted for review", date: "2024-03-12", user: "Lisa Anderson" },
        { action: "Revision requested", date: "2024-03-13", user: "Client Review" },
      ],
    },
    {
      id: 6,
      title: "Master Bedroom Suite",
      project: "Bedroom Suite Design",
      client: "Amit Patel",
      designer: "David Brown",
      status: "Pending Review",
      category: "Bedroom",
      submittedDate: "2024-03-11",
      version: "v1.0",
      priority: "Low",
      thumbnail: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=250&fit=crop",
      description: "Elegant master bedroom design with walk-in closet and en-suite bathroom integration, featuring warm wood tones and soft textiles.",
      files: [
        { id: 1, name: "Bedroom_Concept.pdf", type: "pdf", size: "5.3 MB" },
      ],
      comments: [],
      versions: [
        { version: "v1.0", date: "2024-03-11", status: "Pending Review", note: "Initial submission" },
      ],
      rating: 0,
      reviewHistory: [
        { action: "Submitted for review", date: "2024-03-11", user: "David Brown" },
      ],
    },
  ]);

  const statusColors = {
    "Pending Review": { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200", icon: Clock },
    "In Review": { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", icon: Eye },
    "Approved": { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", icon: CheckCircle },
    "Rejected": { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", icon: XCircle },
    "Pending Revision": { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200", icon: ArrowClockwise },
  };

  const priorityColors = {
    "High": { bg: "bg-red-50", text: "text-red-600" },
    "Medium": { bg: "bg-yellow-50", text: "text-yellow-600" },
    "Low": { bg: "bg-green-50", text: "text-green-600" },
  };

  const categoryColors = {
    "Living Room": { bg: "bg-blue-50", text: "text-blue-600" },
    "Office": { bg: "bg-purple-50", text: "text-purple-600" },
    "Kitchen": { bg: "bg-green-50", text: "text-green-600" },
    "Hospitality": { bg: "bg-orange-50", text: "text-orange-600" },
    "Commercial": { bg: "bg-pink-50", text: "text-pink-600" },
    "Bedroom": { bg: "bg-indigo-50", text: "text-indigo-600" },
  };

  // Stats calculation
  const stats = {
    total: designs.length,
    pending: designs.filter(d => d.status === "Pending Review").length,
    inReview: designs.filter(d => d.status === "In Review").length,
    approved: designs.filter(d => d.status === "Approved").length,
    rejected: designs.filter(d => d.status === "Rejected").length,
    pendingRevision: designs.filter(d => d.status === "Pending Revision").length,
  };

  // Filter designs
  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          design.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          design.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || design.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesCategory = categoryFilter === "all" || design.category === categoryFilter;
    const matchesTab = activeTab === "all" ||
                       (activeTab === "pending" && (design.status === "Pending Review" || design.status === "Pending Revision")) ||
                       (activeTab === "approved" && design.status === "Approved") ||
                       (activeTab === "rejected" && design.status === "Rejected") ||
                       (activeTab === "in-review" && design.status === "In Review");
    return matchesSearch && matchesStatus && matchesCategory && matchesTab;
  });

  // Get unique categories
  const categories = [...new Set(designs.map(d => d.category))];

  const openDetailModal = (design) => {
    setSelectedDesign(design);
    setIsDetailModalOpen(true);
  };

  const handleApprove = () => {
    if (selectedDesign && reviewComment.trim()) {
      setDesigns(designs.map(d =>
        d.id === selectedDesign.id
          ? {
              ...d,
              status: "Approved",
              comments: [...d.comments, { id: Date.now(), user: "Review Team", text: reviewComment, date: new Date().toISOString().split('T')[0], type: "approval" }],
              reviewHistory: [...d.reviewHistory, { action: "Approved: " + reviewComment, date: new Date().toISOString().split('T')[0], user: "Review Team" }]
            }
          : d
      ));
      setIsApproveModalOpen(false);
      setIsDetailModalOpen(false);
      setReviewComment("");
    }
  };

  const handleReject = () => {
    if (selectedDesign && reviewComment.trim()) {
      setDesigns(designs.map(d =>
        d.id === selectedDesign.id
          ? {
              ...d,
              status: "Rejected",
              comments: [...d.comments, { id: Date.now(), user: "Review Team", text: reviewComment, date: new Date().toISOString().split('T')[0], type: "rejection" }],
              reviewHistory: [...d.reviewHistory, { action: "Rejected: " + reviewComment, date: new Date().toISOString().split('T')[0], user: "Review Team" }]
            }
          : d
      ));
      setIsRejectModalOpen(false);
      setIsDetailModalOpen(false);
      setReviewComment("");
    }
  };

  const requestRevision = (designId) => {
    setDesigns(designs.map(d =>
      d.id === designId
        ? { ...d, status: "Pending Revision" }
        : d
    ));
  };

  const addComment = (designId, comment) => {
    if (!comment.trim()) return;
    setDesigns(designs.map(d =>
      d.id === designId
        ? { ...d, comments: [...d.comments, { id: Date.now(), user: "You", text: comment, date: new Date().toISOString().split('T')[0], type: "feedback" }] }
        : d
    ));
    if (selectedDesign?.id === designId) {
      setSelectedDesign({
        ...selectedDesign,
        comments: [...(selectedDesign.comments || []), { id: Date.now(), user: "You", text: comment, date: new Date().toISOString().split('T')[0], type: "feedback" }]
      });
    }
    setReviewComment("");
  };

  return (
    <div className="font-[Lato] bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Design Review</h1>
          <p className="text-gray-500 text-sm mt-1">Review and approve design proposals</p>
        </div>
        <button
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus size={20} weight="bold" />
          Submit Design
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
              <Folder size={24} className="text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Eye size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.inReview}</p>
              <p className="text-sm text-gray-500">In Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.approved}</p>
              <p className="text-sm text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <XCircle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.rejected}</p>
              <p className="text-sm text-gray-500">Rejected</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <ArrowClockwise size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{stats.pendingRevision}</p>
              <p className="text-sm text-gray-500">Revision</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-1 mb-6 flex gap-1 overflow-x-auto">
        {[
          { key: "all", label: "All", count: stats.total },
          { key: "pending", label: "Pending", count: stats.pending + stats.pendingRevision },
          { key: "in-review", label: "In Review", count: stats.inReview },
          { key: "approved", label: "Approved", count: stats.approved },
          { key: "rejected", label: "Rejected", count: stats.rejected },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-red-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search designs, projects, or clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending review">Pending Review</option>
              <option value="in review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="pending revision">Pending Revision</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Designs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDesigns.map(design => (
          <div key={design.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={design.thumbnail}
                alt={design.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium ${statusColors[design.status]?.bg} ${statusColors[design.status]?.text}`}>
                {design.status}
              </span>
              <span className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-medium ${priorityColors[design.priority]?.bg} ${priorityColors[design.priority]?.text}`}>
                {design.priority}
              </span>
              {design.rating > 0 && (
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur px-2 py-1 rounded">
                  <Star size={14} className="text-yellow-500" weight="fill" />
                  <span className="text-sm font-medium text-gray-800">{design.rating}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-1">{design.title}</h3>
                  <p className="text-sm text-gray-500">{design.project}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[design.category]?.bg || 'bg-gray-100'} ${categoryColors[design.category]?.text || 'text-gray-600'}`}>
                  {design.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{design.client}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(design.submittedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                <Tag size={14} />
                <span>{design.version}</span>
                <span className="text-gray-300">•</span>
                <span>{design.files.length} file{design.files.length > 1 ? 's' : ''}</span>
                <span className="text-gray-300">•</span>
                <span>{design.comments.length} comment{design.comments.length > 1 ? 's' : ''}</span>
              </div>

              {/* Version History */}
              <div className="flex gap-1 mb-3">
                {design.versions.slice(-3).map((v, i) => (
                  <div
                    key={i}
                    className={`px-2 py-0.5 rounded text-xs ${
                      v.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      v.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      v.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}
                    title={`${v.version}: ${v.note}`}
                  >
                    {v.version}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => openDetailModal(design)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <Eye size={16} />
                  Review
                </button>
                {design.status === "Pending Review" && (
                  <>
                    <button
                      onClick={() => { setSelectedDesign(design); setIsApproveModalOpen(true); }}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      title="Approve"
                    >
                      <ThumbsUp size={18} />
                    </button>
                    <button
                      onClick={() => { setSelectedDesign(design); setIsRejectModalOpen(true); }}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Reject"
                    >
                      <ThumbsDown size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDesigns.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Files size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No designs found matching your criteria.</p>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && selectedDesign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-gray-800">{selectedDesign.title}</h2>
                    <span className={`px-2 py-0.5 rounded text-xs ${statusColors[selectedDesign.status]?.bg} ${statusColors[selectedDesign.status]?.text}`}>
                      {selectedDesign.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{selectedDesign.project}</p>
                </div>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Preview Image */}
                  <div className="rounded-xl overflow-hidden">
                    <img src={selectedDesign.thumbnail} alt={selectedDesign.title} className="w-full h-64 object-cover" />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-600 text-sm">{selectedDesign.description}</p>
                  </div>

                  {/* Files */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Files ({selectedDesign.files.length})</h3>
                    <div className="space-y-2">
                      {selectedDesign.files.map(file => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Files size={20} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-800">{file.name}</p>
                              <p className="text-xs text-gray-500">{file.size}</p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-500">
                            <Download size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Version History */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Version History</h3>
                    <div className="space-y-2">
                      {selectedDesign.versions.map((v, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              v.status === 'Approved' ? 'bg-green-100 text-green-700' :
                              v.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                              v.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {v.version}
                            </span>
                            <span className="text-sm text-gray-600">{v.note}</span>
                          </div>
                          <span className="text-xs text-gray-500">{v.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Client</p>
                          <p className="text-sm font-medium text-gray-800">{selectedDesign.client}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <PencilSimple size={18} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Designer</p>
                          <p className="text-sm font-medium text-gray-800">{selectedDesign.designer}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Tag size={18} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="text-sm font-medium text-gray-800">{selectedDesign.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-gray-400" />
                        <div>
                          <p className="text-xs text-gray-500">Submitted</p>
                          <p className="text-sm font-medium text-gray-800">{new Date(selectedDesign.submittedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Comments ({selectedDesign.comments.length})</h3>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                      {selectedDesign.comments.length > 0 ? (
                        selectedDesign.comments.map(comment => (
                          <div key={comment.id} className={`p-3 rounded-lg ${
                            comment.type === 'client' ? 'bg-blue-50' :
                            comment.type === 'approval' ? 'bg-green-50' :
                            comment.type === 'rejection' ? 'bg-red-50' :
                            'bg-gray-50'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-800">{comment.user}</span>
                              <span className="text-xs text-gray-500">{comment.date}</span>
                            </div>
                            <p className="text-sm text-gray-600">{comment.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No comments yet.</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button
                        onClick={() => addComment(selectedDesign.id, reviewComment)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                      >
                        Send
                      </button>
                    </div>
                  </div>

                  {/* Review History */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Review History</h3>
                    <div className="space-y-2">
                      {selectedDesign.reviewHistory.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                          <div>
                            <p className="text-sm text-gray-800">{item.action}</p>
                            <p className="text-xs text-gray-500">{item.user} • {item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              {selectedDesign.status !== "Approved" && selectedDesign.status !== "Rejected" && (
                <>
                  <button
                    onClick={() => requestRevision(selectedDesign.id)}
                    className="px-4 py-2 border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 flex items-center gap-2"
                  >
                    <ArrowClockwise size={18} />
                    Request Revision
                  </button>
                  <button
                    onClick={() => { setIsDetailModalOpen(false); setIsApproveModalOpen(true); }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => { setIsDetailModalOpen(false); setIsRejectModalOpen(true); }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {isApproveModalOpen && selectedDesign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Approve Design</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">You are approving: <span className="font-medium">{selectedDesign.title}</span></p>
              <label className="block text-sm font-medium text-gray-700 mb-2">Approval Note</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={3}
                placeholder="Enter approval notes..."
              />
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => { setIsApproveModalOpen(false); setReviewComment(""); }}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={!reviewComment.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Approve Design
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && selectedDesign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Reject Design</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">You are rejecting: <span className="font-medium">{selectedDesign.title}</span></p>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason *</label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                rows={3}
                placeholder="Enter rejection reason..."
              />
            </div>
            <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => { setIsRejectModalOpen(false); setReviewComment(""); }}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!reviewComment.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Design
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignReview;