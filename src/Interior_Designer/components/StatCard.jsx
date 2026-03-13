import React from 'react';

const StatCard = ({ icon, number, title, subtitle, iconBgColor = "bg-red-100", iconTextColor = "text-red-600", trend }) => {
  // Map Tailwind classes to actual colors
  const bgColorMap = {
    "bg-red-100": "#FEE2E2",
    "bg-yellow-100": "#FEF3C7",
    "bg-green-100": "#D1FAE5",
    "bg-blue-100": "#DBEAFE",
    "bg-purple-100": "#EDE9FE",
    "bg-orange-100": "#FFEDD5",
    "bg-pink-100": "#FCE7F3",
  };

  const textColorMap = {
    "text-red-600": "#DC2626",
    "text-yellow-600": "#D97706",
    "text-green-600": "#059669",
    "text-blue-600": "#2563EB",
    "text-purple-600": "#7C3AED",
    "text-orange-600": "#EA580C",
    "text-pink-600": "#DB2777",
  };

  const bgColor = bgColorMap[iconBgColor] || '#FEE2E2';
  const iconColor = textColorMap[iconTextColor] || '#DC2626';

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
      {/* Icon Box */}
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          backgroundColor: bgColor,
          width: '56px',
          height: '56px',
          borderRadius: '16px'
        }}
      >
        {React.cloneElement(icon, {
          size: 28,
          style: { color: iconColor },
          weight: 'bold'
        })}
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {number}
        </p>
        <p className="text-sm text-gray-600 mt-0.5">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;