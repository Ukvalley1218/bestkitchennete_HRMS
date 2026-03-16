import { useState } from "react";
import { Upload, Plus, Megaphone, Activity, Users, Wallet, X, MapPin, Calendar, IndianRupee, User, TrendingUp, Target, BarChart3, Phone, Mail, Link2, Settings, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import CampaignToggle from "../components/CampaignToggle";
import CampaignCard from "../components/CampaignCard";
import CreateCampaignModal from "../components/CreateCampaignModal";
import UploadLeadsModal from "../components/UploadLeadsModal";

const OfflineMarketing = () => {
  const [activeTab, setActiveTab] = useState("offline");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showToolConnection, setShowToolConnection] = useState(false);

  // Tool connections data for online campaigns
  const toolConnections = [
    {
      id: 1,
      name: "Instagram Business",
      type: "Social Media",
      icon: "📷",
      status: "connected",
      leads: 412,
      lastSync: "2 mins ago",
      color: "#E1306C",
      features: ["Stories", "Feed Posts", "Reels", "DM Automation"],
    },
    {
      id: 2,
      name: "Facebook Ads Manager",
      type: "Advertising",
      icon: "📘",
      status: "connected",
      leads: 178,
      lastSync: "5 mins ago",
      color: "#1877F2",
      features: ["Lead Forms", "Retargeting", "Custom Audiences"],
    },
    {
      id: 3,
      name: "Google Ads",
      type: "Advertising",
      icon: "🔍",
      status: "connected",
      leads: 312,
      lastSync: "1 min ago",
      color: "#4285F4",
      features: ["Search Ads", "Display Ads", "YouTube Ads"],
    },
    {
      id: 4,
      name: "YouTube Studio",
      type: "Video Platform",
      icon: "▶️",
      status: "connected",
      leads: 267,
      lastSync: "10 mins ago",
      color: "#FF0000",
      features: ["Pre-roll Ads", "Video Analytics", "Channel Insights"],
    },
    {
      id: 5,
      name: "Zoom Webinars",
      type: "Webinar Platform",
      icon: "🎥",
      status: "connected",
      leads: 89,
      lastSync: "1 hour ago",
      color: "#2D8CFF",
      features: ["Webinar Registration", "Attendee Tracking", "Recording Integration"],
    },
    {
      id: 6,
      name: "LinkedIn Campaigns",
      type: "Social Media",
      icon: "💼",
      status: "connected",
      leads: 89,
      lastSync: "15 mins ago",
      color: "#0A66C2",
      features: ["Lead Gen Forms", "InMail Campaigns", "Company Page"],
    },
    {
      id: 7,
      name: "HubSpot CRM",
      type: "CRM",
      icon: "🧡",
      status: "disconnected",
      leads: 0,
      lastSync: "Never",
      color: "#FF7A59",
      features: ["Contact Management", "Lead Scoring", "Email Tracking"],
    },
    {
      id: 8,
      name: "Zapier",
      type: "Automation",
      icon: "⚡",
      status: "connected",
      leads: 0,
      lastSync: "3 mins ago",
      color: "#FF4A00",
      features: ["Workflow Automation", "App Integrations", "Lead Routing"],
    },
  ];

  const leadSources = [
    { source: "Instagram Stories", leads: 156, percentage: 22, trend: "+12%" },
    { source: "Online Seminars", leads: 89, percentage: 13, trend: "+8%" },
    { source: "Google Search", leads: 312, percentage: 44, trend: "+15%" },
    { source: "YouTube Videos", leads: 267, percentage: 37, trend: "+5%" },
    { source: "Facebook Lead Forms", leads: 78, percentage: 11, trend: "-3%" },
  ];

  const allCampaigns = [
    // Offline Campaigns
    {
      id: 1,
      name: "Billboard - MG Road",
      channel: "Outdoor Advertising",
      type: "offline",
      status: "Active",
      location: "MG Road, Bangalore",
      startDate: "Jan 15, 2024",
      endDate: "Mar 15, 2024",
      budget: "₹50,000",
      spent: "₹45,000",
      vendor: "Outdoor Media Ltd",
      leads: 89,
      tracking: "QR Code + Landing Page",
      cpl: "₹505",
      roi: "125%",
    },
    {
      id: 2,
      name: "Tech Conference Booth",
      channel: "Event Marketing",
      type: "offline",
      status: "Completed",
      location: "Convention Center",
      startDate: "Feb 10, 2024",
      endDate: "Feb 12, 2024",
      budget: "₹1,20,000",
      spent: "₹1,18,000",
      vendor: "EventPro Services",
      leads: 145,
      tracking: "Badge Scanner",
      cpl: "₹814",
      roi: "95%",
    },
    {
      id: 3,
      name: "Bus Branding - Route 101",
      channel: "Transit Advertising",
      type: "offline",
      status: "Active",
      location: "Metro Routes",
      startDate: "Jan 20, 2024",
      endDate: "Apr 20, 2024",
      budget: "₹35,000",
      spent: "₹35,000",
      vendor: "TransitAds Inc",
      leads: 56,
      tracking: "Dedicated Phone Number",
      cpl: "₹625",
      roi: "78%",
    },
    {
      id: 4,
      name: "Radio FM Campaign",
      channel: "Radio Advertising",
      type: "offline",
      status: "Completed",
      location: "FM 92.5",
      startDate: "Dec 1, 2023",
      endDate: "Dec 31, 2023",
      budget: "₹75,000",
      spent: "₹72,000",
      vendor: "RadioMax Media",
      leads: 98,
      tracking: "Promo Code",
      cpl: "₹735",
      roi: "88%",
    },
    {
      id: 5,
      name: "Newspaper Ad - Times",
      channel: "Print Media",
      type: "offline",
      status: "Active",
      location: "Times of India",
      startDate: "Mar 1, 2024",
      endDate: "Mar 31, 2024",
      budget: "₹40,000",
      spent: "₹25,000",
      vendor: "PrintMedia Corp",
      leads: 42,
      tracking: "Coupon Code",
      cpl: "₹595",
      roi: "110%",
    },
    // Online Campaigns
    {
      id: 6,
      name: "Instagram Product Launch",
      channel: "Social Media Ads",
      type: "online",
      status: "Active",
      location: "Instagram Feed & Stories",
      startDate: "Jan 10, 2024",
      endDate: "Mar 10, 2024",
      budget: "₹80,000",
      spent: "₹62,000",
      vendor: "In-House Team",
      leads: 234,
      tracking: "UTM Parameters",
      cpl: "₹265",
      roi: "185%",
    },
    {
      id: 7,
      name: "Google Ads Campaign",
      channel: "Search Ads",
      type: "online",
      status: "Active",
      location: "Google Search Network",
      startDate: "Jan 1, 2024",
      endDate: "Mar 31, 2024",
      budget: "₹1,00,000",
      spent: "₹78,000",
      vendor: "Digital Agency",
      leads: 312,
      tracking: "Google Analytics",
      cpl: "₹250",
      roi: "210%",
    },
    {
      id: 8,
      name: "Facebook Retargeting",
      channel: "Social Media Ads",
      type: "online",
      status: "Active",
      location: "Facebook & Instagram",
      startDate: "Feb 1, 2024",
      endDate: "Apr 30, 2024",
      budget: "₹45,000",
      spent: "₹32,000",
      vendor: "In-House Team",
      leads: 178,
      tracking: "Facebook Pixel",
      cpl: "₹180",
      roi: "165%",
    },
    {
      id: 9,
      name: "YouTube Pre-roll Ads",
      channel: "Video Ads",
      type: "online",
      status: "Active",
      location: "YouTube",
      startDate: "Feb 15, 2024",
      endDate: "May 15, 2024",
      budget: "₹60,000",
      spent: "₹48,000",
      vendor: "Video Marketing Co",
      leads: 267,
      tracking: "YouTube Analytics",
      cpl: "₹180",
      roi: "195%",
    },
    {
      id: 10,
      name: "LinkedIn B2B Campaign",
      channel: "Social Media Ads",
      type: "online",
      status: "Active",
      location: "LinkedIn",
      startDate: "Mar 1, 2024",
      endDate: "May 31, 2024",
      budget: "₹55,000",
      spent: "₹22,000",
      vendor: "In-House Team",
      leads: 89,
      tracking: "LinkedIn Campaign Manager",
      cpl: "₹247",
      roi: "145%",
    },
  ];

  const filteredCampaigns = allCampaigns.filter(
    (campaign) => campaign.type === activeTab
  );

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
  };

  // Get status badge component
  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
          Active
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></span>
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>
        Completed
      </span>
    );
  };

  // Get type badge component
  const getTypeBadge = (type) => {
    if (type === "online") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-600">
          Online
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-orange-50 text-orange-600">
        Offline
      </span>
    );
  };

  const handleCreateCampaign = (newCampaign) => {
    console.log("New campaign:", newCampaign);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Marketing Campaigns</h1>
          <p className="text-gray-500 text-sm mt-1">Complete overview of marketing operations</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white"
          >
            <Upload size={18} />
            Upload CSV File
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FF1E1E] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Total Campaigns */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#FDE8E8', width: '40px', height: '40px', borderRadius: '12px' }}>
              <Megaphone size={20} style={{ color: '#EF4444' }} strokeWidth={1.5} />
            </div>
            <span className="flex items-center gap-0.5 pr-1 pt-1 text-xs font-semibold text-[#A60000]">
              <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
              </svg>
              +3
            </span>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">{allCampaigns.length}</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">Total Campaigns</p>
          </div>
        </div>

        {/* Active */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#DCFCE7', width: '40px', height: '40px', borderRadius: '12px' }}>
              <Activity size={20} style={{ color: '#22C55E' }} strokeWidth={1.5} />
            </div>
            <span className="flex items-center gap-0.5 pr-1 pt-1 text-xs font-semibold text-green-600">
              {allCampaigns.filter((c) => c.status === "Active").length} active
            </span>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">{allCampaigns.filter((c) => c.status === "Active").length}</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">Active Campaigns</p>
          </div>
        </div>

        {/* Total Leads */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#DBEAFE', width: '40px', height: '40px', borderRadius: '12px' }}>
              <Users size={20} style={{ color: '#3B82F6' }} strokeWidth={1.5} />
            </div>
            <span className="flex items-center gap-0.5 pr-1 pt-1 text-xs font-semibold text-[#A60000]">
              <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
              </svg>
              +12%
            </span>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">{allCampaigns.reduce((sum, c) => sum + c.leads, 0).toLocaleString()}</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">Total Leads</p>
          </div>
        </div>

        {/* Total Budget */}
        <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#FEE2E2', width: '40px', height: '40px', borderRadius: '12px' }}>
              <Wallet size={20} style={{ color: '#EF4444' }} strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">₹5.1L</p>
            <p className="text-sm text-[#00000099] mt-1.5 font-medium">Total Budget</p>
            <p className="text-xs text-[#6A7282] font-semibold mt-0.5">This month</p>
          </div>
        </div>
      </div>

      {/* Toggle Filter */}
      <div className="flex items-center justify-between">
        <CampaignToggle activeTab={activeTab} onTabChange={setActiveTab} />
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{filteredCampaigns.length}</span> {activeTab} campaigns
        </p>
      </div>

      {/* Tool Connection Section - Only for Online */}
      {activeTab === "online" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Link2 size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1F2937]">Tool Connections</h3>
                <p className="text-xs text-gray-500">Manage lead sources from connected platforms</p>
              </div>
            </div>
            <button
              onClick={() => setShowToolConnection(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FF1E1E] border border-[#FF1E1E] rounded-lg hover:bg-red-50 transition-colors"
            >
              <Settings size={16} />
              Manage Connections
            </button>
          </div>

          {/* Connected Tools Summary */}
          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {toolConnections.filter(t => t.status === "connected").slice(0, 6).map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-xl">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[#1F2937] truncate">{tool.name}</p>
                    <p className="text-xs text-green-600 flex items-center gap-0.5">
                      <CheckCircle size={10} />
                      {tool.leads} leads
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Lead Sources Breakdown */}
            <div className="mt-5">
              <h4 className="text-sm font-medium text-[#1F2937] mb-3">Lead Sources This Month</h4>
              <div className="space-y-2">
                {leadSources.slice(0, 3).map((source, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">{source.source}</span>
                        <span className="text-sm font-medium text-[#1F2937]">{source.leads} leads</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FF1E1E] rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-green-600">{source.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700">No {activeTab} campaigns</h3>
          <p className="text-gray-500 text-sm mt-1">Create your first campaign to get started</p>
        </div>
      )}

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateCampaign}
      />

      {/* Upload Leads Modal */}
      <UploadLeadsModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* Campaign Details Overlay */}
      {selectedCampaign && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCampaign(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <span className="text-[#FF1E1E] font-bold text-lg">
                    {selectedCampaign.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#1F2937]">{selectedCampaign.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    {getTypeBadge(selectedCampaign.type)}
                    {getStatusBadge(selectedCampaign.status)}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Channel & Location */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-500 mb-1">Channel</p>
                  <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.channel}</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.location}</p>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center flex-1">
                  <p className="text-xs text-gray-500 mb-1">Vendor</p>
                  <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.vendor}</p>
                </div>
              </div>

              {/* Budget Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <IndianRupee size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Budget</p>
                    <p className="text-lg font-semibold text-[#1F2937]">{selectedCampaign.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <IndianRupee size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Amount Spent</p>
                    <p className="text-lg font-semibold text-[#1F2937]">{selectedCampaign.spent}</p>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Performance Metrics</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                    <Users size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Leads</p>
                      <p className="text-sm font-semibold text-[#1F2937]">{selectedCampaign.leads}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                    <Target size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">CPL</p>
                      <p className="text-sm font-semibold text-[#1F2937]">{selectedCampaign.cpl}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                    <TrendingUp size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">ROI</p>
                      <p className={`text-sm font-semibold ${parseInt(selectedCampaign.roi) >= 100 ? "text-green-600" : "text-orange-600"}`}>
                        {selectedCampaign.roi}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Campaign Timeline</h4>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-1 text-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                      <Calendar size={18} className="text-green-600" />
                    </div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.startDate}</p>
                  </div>
                  <div className="flex-1">
                    <div className="h-0.5 bg-gray-200 relative">
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-2">
                      <Calendar size={18} className="text-red-600" />
                    </div>
                    <p className="text-xs text-gray-500">End Date</p>
                    <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.endDate}</p>
                  </div>
                </div>
              </div>

              {/* Tracking Method */}
              <div className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl">
                <BarChart3 size={20} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Tracking Method</p>
                  <p className="text-sm font-medium text-[#1F2937]">{selectedCampaign.tracking}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Phone size={18} />
                  Contact Vendor
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Mail size={18} />
                  Email Report
                </button>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setSelectedCampaign(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-[#FF1E1E] hover:bg-red-600 rounded-lg transition-colors">
                Edit Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tool Connection Overlay */}
      {showToolConnection && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowToolConnection(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Link2 size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#1F2937]">Tool Connections</h2>
                  <p className="text-xs text-gray-500">Manage your marketing tool integrations</p>
                </div>
              </div>
              <button
                onClick={() => setShowToolConnection(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-5">
              {/* Stats Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm text-gray-600">Connected</span>
                  </div>
                  <p className="text-2xl font-semibold text-[#1F2937]">
                    {toolConnections.filter(t => t.status === "connected").length}
                  </p>
                  <p className="text-xs text-gray-500">tools active</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-blue-600" />
                    <span className="text-sm text-gray-600">Total Leads</span>
                  </div>
                  <p className="text-2xl font-semibold text-[#1F2937]">
                    {toolConnections.filter(t => t.status === "connected").reduce((sum, t) => sum + t.leads, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">this month</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-orange-600" />
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <p className="text-2xl font-semibold text-[#1F2937]">
                    {toolConnections.filter(t => t.status === "disconnected").length}
                  </p>
                  <p className="text-xs text-gray-500">need setup</p>
                </div>
              </div>

              {/* Connected Tools List */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Connected Tools</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {toolConnections.filter(t => t.status === "connected").map((tool) => (
                    <div
                      key={tool.id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-[#FF1E1E] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                            style={{ backgroundColor: `${tool.color}20` }}
                          >
                            {tool.icon}
                          </div>
                          <div>
                            <h5 className="font-medium text-[#1F2937]">{tool.name}</h5>
                            <p className="text-xs text-gray-500">{tool.type}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle size={12} className="mr-1" />
                          Active
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Leads Generated</p>
                          <p className="text-lg font-semibold text-[#1F2937]">{tool.leads.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Last Sync</p>
                          <p className="text-sm text-gray-700">{tool.lastSync}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.map((feature, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disconnected Tools */}
              {toolConnections.filter(t => t.status === "disconnected").length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Available Integrations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {toolConnections.filter(t => t.status === "disconnected").map((tool) => (
                      <div
                        key={tool.id}
                        className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl opacity-50"
                              style={{ backgroundColor: `${tool.color}20` }}
                            >
                              {tool.icon}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-500">{tool.name}</h5>
                              <p className="text-xs text-gray-400">{tool.type}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                            Not Connected
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">Connect to start tracking leads from this platform</p>
                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#FF1E1E] hover:bg-red-50 transition-colors">
                          <ExternalLink size={14} />
                          Connect {tool.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lead Sources Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#1F2937] uppercase tracking-wide">Lead Sources Breakdown</h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  {leadSources.map((source, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-[#1F2937]">{source.source}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{source.leads} leads</span>
                            <span className="text-xs font-medium text-green-600">{source.trend}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF1E1E] rounded-full transition-all"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50">
              <button
                onClick={() => setShowToolConnection(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#FF1E1E] hover:bg-red-600 rounded-lg transition-colors">
                <Link2 size={16} />
                Add New Integration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineMarketing;