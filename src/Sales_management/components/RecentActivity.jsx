const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                backgroundColor: activity.bgColor || '#FFE3E3',
                width: '32px',
                height: '32px'
              }}
            >
              <activity.icon size={16} style={{ color: activity.iconColor || '#A60000' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            {activity.amount && (
              <span className="text-sm font-semibold text-green-600">{activity.amount}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;