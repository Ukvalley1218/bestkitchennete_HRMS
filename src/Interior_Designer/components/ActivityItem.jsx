import React from 'react';

const ActivityItem = ({ projectName, employeeName, activity, time, dotColor }) => {
  const dotColorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-b-0">
      <div className={`w-3 h-3 rounded-full ${dotColorClasses[dotColor] || "bg-gray-500"} flex-shrink-0`}></div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">{projectName}</p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">{employeeName}</span> {activity}
        </p>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  );
};

export default ActivityItem;