import React from 'react';

const StatCard = ({ icon, number, title, subtitle, iconBgColor = "bg-red-100", iconTextColor = "text-red-600" }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className={`${iconBgColor} ${iconTextColor} p-3 rounded-full`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-3xl font-bold text-gray-800">{number}</h3>
          <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;