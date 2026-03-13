const LeadsAttribution = () => {
  const leadsData = [
    { id: 1, name: "John Smith", email: "john@email.com", source: "Google Ads", campaign: "Product Launch", status: "Converted", date: "2024-01-20" },
    { id: 2, name: "Sarah Johnson", email: "sarah@email.com", source: "Instagram", campaign: "Summer Sale", status: "New", date: "2024-01-19" },
    { id: 3, name: "Mike Wilson", email: "mike@email.com", source: "Billboard", campaign: "MG Road", status: "Contacted", date: "2024-01-18" },
    { id: 4, name: "Emily Brown", email: "emily@email.com", source: "Event", campaign: "Tech Conference", status: "Converted", date: "2024-01-17" },
    { id: 5, name: "David Lee", email: "david@email.com", source: "LinkedIn", campaign: "B2B Outreach", status: "Qualified", date: "2024-01-16" },
  ];

  const getStatusColor = (status) => {
    const colors = {
      New: "bg-blue-100 text-blue-700",
      Contacted: "bg-yellow-100 text-yellow-700",
      Qualified: "bg-purple-100 text-purple-700",
      Converted: "bg-green-100 text-green-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2937]">Leads & Attribution</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your marketing leads</p>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Export
          </button>
          <button className="bg-[#FF1E1E] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
            + Add Lead
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Total Leads</p>
          <h3 className="text-xl font-bold text-[#1F2937] mt-1">2,845</h3>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">New This Week</p>
          <h3 className="text-xl font-bold text-[#1F2937] mt-1">156</h3>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <h3 className="text-xl font-bold text-[#1F2937] mt-1">25.5%</h3>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500">Avg. Lead Value</p>
          <h3 className="text-xl font-bold text-[#1F2937] mt-1">$85</h3>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leadsData.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-[#1F2937]">{lead.name}</p>
                    <p className="text-xs text-gray-500">{lead.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{lead.source}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{lead.campaign}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{lead.date}</td>
                <td className="px-6 py-4">
                  <button className="text-[#FF1E1E] text-sm font-medium hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsAttribution;