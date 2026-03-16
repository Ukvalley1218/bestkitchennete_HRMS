import { MapPin, Calendar, IndianRupee, Users, TrendingUp, User, Eye } from "lucide-react";

const CampaignCard = ({ campaign, onViewDetails }) => {
  const getStatusBadge = (status) => {
    if (status === "Active") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
          Active
        </span>
      );
    }
    if (status === "Pending") {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></span>
          Pending
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></span>
        Completed
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-[#1F2937] line-clamp-1">{campaign.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{campaign.channel}</p>
          </div>
          {getStatusBadge(campaign.status)}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4">
        {/* Location & Date */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span>{campaign.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} className="text-gray-400 flex-shrink-0" />
            <span>{campaign.startDate} - {campaign.endDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IndianRupee size={16} className="text-gray-400 flex-shrink-0" />
            <span>
              <span className="font-medium">{campaign.budget}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-[#FF1E1E]">{campaign.spent}</span>
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Vendor Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={16} className="text-gray-400 flex-shrink-0" />
            <span>
              <span className="text-gray-400">Vendor:</span>{" "}
              <span className="font-medium text-gray-700">{campaign.vendor}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} className="text-gray-400 flex-shrink-0" />
            <span>
              <span className="text-gray-400">Leads:</span>{" "}
              <span className="font-medium text-gray-700">{campaign.leads}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TrendingUp size={16} className="text-gray-400 flex-shrink-0" />
            <span>
              <span className="text-gray-400">Tracking:</span>{" "}
              <span className="font-medium text-gray-700">{campaign.tracking}</span>
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Performance Metrics */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">CPL</p>
            <p className="text-sm font-semibold text-gray-700">{campaign.cpl}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 mb-0.5">ROI</p>
            <p className={`text-sm font-semibold ${parseInt(campaign.roi) >= 100 ? "text-green-600" : "text-orange-600"}`}>
              {campaign.roi}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => onViewDetails(campaign)}
          className="w-full flex items-center justify-center gap-2 text-sm font-medium text-[#FF1E1E] hover:bg-red-50 py-2 rounded-lg transition-colors"
        >
          <Eye size={16} />
          View Details
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;