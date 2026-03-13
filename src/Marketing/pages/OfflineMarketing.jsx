import { useState } from "react";
import { Upload, Plus, Megaphone, Activity, Users, Wallet } from "lucide-react";
import CampaignToggle from "../components/CampaignToggle";
import CampaignCard from "../components/CampaignCard";
import CreateCampaignModal from "../components/CreateCampaignModal";
import UploadLeadsModal from "../components/UploadLeadsModal";

const OfflineMarketing = () => {
  const [activeTab, setActiveTab] = useState("offline");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
    console.log("View details for:", campaign);
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

      {/* Campaign Cards Grid */}
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
    </div>
  );
};

export default OfflineMarketing;