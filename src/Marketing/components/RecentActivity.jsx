const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-gray-100 text-gray-600",
  };

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[status] || statusStyles.Pending}`}>
      {status}
    </span>
  );
};

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      name: "Instagram Carousel – Summer Sale",
      leads: 156,
      status: "Active",
    },
    {
      id: 2,
      name: "Billboard – MG Road",
      leads: 89,
      status: "Pending",
    },
    {
      id: 3,
      name: "Google Ads – Product Launch",
      leads: 234,
      status: "Active",
    },
    {
      id: 4,
      name: "Event – Tech Conference",
      leads: 145,
      status: "Completed",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1F2937]">
          Recent Campaign Activity
        </h3>
        <button className="text-sm text-[#FF1E1E] font-medium hover:underline">
          View All
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <h4 className="text-sm font-medium text-[#1F2937]">{activity.name}</h4>
              <p className="text-xs text-gray-500 mt-1">Leads: {activity.leads}</p>
            </div>
            <StatusBadge status={activity.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;