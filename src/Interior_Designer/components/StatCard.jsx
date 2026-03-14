import React from 'react';

const StatCard = ({ icon, number, title, subtitle, iconBgColor = "bg-red-100", iconTextColor = "text-red-600", trend }) => {
  // All cards use the same red color like Marketing dashboard
  const bgColor = '#FDE8E8';
  const iconColor = '#EF4444';

  return (
    <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100 flex-1 min-w-[140px] overflow-hidden">
      {/* Top row: icon */}
      <div className="flex items-start justify-between">
        <div
          className="flex items-center justify-center"
          style={{
            backgroundColor: bgColor,
            width: '40px',
            height: '40px',
            borderRadius: '12px'
          }}
        >
          {React.cloneElement(icon, {
            size: 20,
            style: { color: iconColor },
            weight: 'bold'
          })}
        </div>
      </div>

      {/* Value + labels */}
      <div>
        <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">
          {number}
        </p>
        <p className="text-sm text-[#00000099] mt-1.5 font-medium">{title}</p>
        {subtitle && <p className="text-xs text-[#6A7282] font-semibold mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;