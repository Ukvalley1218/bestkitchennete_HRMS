import { useState } from "react";

const CampaignToggle = ({ activeTab, onTabChange }) => {
  return (
    <div className="inline-flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onTabChange("offline")}
        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          activeTab === "offline"
            ? "bg-white text-[#FF1E1E] shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Offline
      </button>
      <button
        onClick={() => onTabChange("online")}
        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          activeTab === "online"
            ? "bg-white text-[#FF1E1E] shadow-sm"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        Online
      </button>
    </div>
  );
};

export default CampaignToggle;