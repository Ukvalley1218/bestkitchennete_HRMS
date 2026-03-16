const SocialMediaMarketing = () => {
  const socialChannels = [
    { id: 1, name: "Instagram Campaign", platform: "Instagram", followers: "45.2K", engagement: "4.2%", leads: 156, budget: "₹4,15,000" },
    { id: 2, name: "Facebook Ads", platform: "Facebook", followers: "12.8K", engagement: "3.1%", leads: 89, budget: "₹2,90,500" },
    { id: 3, name: "LinkedIn Outreach", platform: "LinkedIn", followers: "8.5K", engagement: "5.8%", leads: 67, budget: "₹1,66,000" },
    { id: 4, name: "YouTube Pre-roll", platform: "YouTube", followers: "22.1K", engagement: "2.9%", leads: 134, budget: "₹6,22,500" },
  ];

  const getPlatformColor = (platform) => {
    const colors = {
      Instagram: "bg-pink-100 text-pink-700",
      Facebook: "bg-blue-100 text-blue-700",
      LinkedIn: "bg-sky-100 text-sky-700",
      YouTube: "bg-red-100 text-red-700",
    };
    return colors[platform] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Online & Social Media</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your digital marketing channels</p>
        </div>
        <button className="bg-[#FF1E1E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
          + Add Channel
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Followers</p>
          <h3 className="text-2xl font-bold text-[#1F2937] mt-1">88.6K</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Avg Engagement</p>
          <h3 className="text-2xl font-bold text-[#1F2937] mt-1">4.0%</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Leads</p>
          <h3 className="text-2xl font-bold text-[#1F2937] mt-1">446</h3>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Monthly Budget</p>
          <h3 className="text-2xl font-bold text-[#1F2937] mt-1">₹14,94,000</h3>
        </div>
      </div>

      {/* Social Channels List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-[#1F2937]">Active Channels</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          {socialChannels.map((channel) => (
            <div key={channel.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPlatformColor(channel.platform)}`}>
                    {channel.platform}
                  </span>
                  <h4 className="font-medium text-[#1F2937] mt-2">{channel.name}</h4>
                </div>
                <button className="text-gray-400 hover:text-[#FF1E1E]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500">Followers</p>
                  <p className="text-sm font-medium text-[#1F2937]">{channel.followers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Engagement</p>
                  <p className="text-sm font-medium text-[#1F2937]">{channel.engagement}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Leads</p>
                  <p className="text-sm font-medium text-[#1F2937]">{channel.leads}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-sm font-medium text-[#1F2937]">{channel.budget}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaMarketing;