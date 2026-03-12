import React from "react";
import { TrendUpIcon } from "./Icons";

// ─── Dashboard Stats Card Component ────────────────────────────────────────────
export const DashboardStatsCard = ({ icon, value, label, sublabel, trend, trendColor = "green", bgColor = "#FFE3E3" }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${
            trendColor === "green" ? "text-green-600" :
            trendColor === "red" ? "text-red-600" :
            trendColor === "yellow" ? "text-yellow-600" : "text-blue-600"
          }`}>
            {trendColor === "green" && <TrendUpIcon />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
    </div>
  );
};

// ─── Progress Card Component ────────────────────────────────────────────────────
export const ProgressCard = ({
  icon,
  title,
  subtitle,
  progress,
   trend, trendColor = "green", 
  status,
   bgColor = "#FFE3E3"
}) => {

  const statusColors = {
    completed: {
      bg: "bg-green-500",
      text: "text-green-600",
      label: "Completed"
    },
    processing: {
      bg: "bg-yellow-500",
      text: "text-yellow-600",
      label: "Processing"
    },
    pending: {
      bg: "bg-gray-300",
      text: "text-gray-500",
      label: "Pending"
    }
  };

  const color = statusColors[status] || statusColors.pending;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
      
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>

        {/* Status */}
         <span className={`flex items-center gap-1 text-xs font-semibold ${
            trendColor === "green" ? "text-green-600" :
            trendColor === "red" ? "text-red-600" :
            trendColor === "yellow" ? "text-yellow-600" : "text-blue-600"
          }`}>
            {trendColor === "green" && <TrendUpIcon />}
            {trend}
          </span>
      </div>

      {/* Title */}
      <p className="text-2xl font-bold text-gray-900 mb-1">{progress}%</p>
      <p className="text-sm font-semibold text-gray-700">{title}</p>
      <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-4">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color.bg}`}
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
};

// ─── Mini Stat Card Component ───────────────────────────────────────────────────
export const MiniStatCard = ({ value, label, icon, color = "#ef4444" }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Chart Card Component ───────────────────────────────────────────────────────
export const ChartCard = ({ title, subtitle, children, action }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {action && action}
      </div>
      {children}
    </div>
  );
};

// ─── Timeline Step Component ────────────────────────────────────────────────────
export const TimelineStep = ({ step, title, subtitle, status, isLast }) => {
  const statusStyles = {
    completed: {
      circle: "bg-green-500 border-green-500",
      text: "text-gray-800",
      subtitle: "text-green-600",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
    },
    inProgress: {
      circle: "bg-yellow-500 border-yellow-500",
      text: "text-gray-800",
      subtitle: "text-yellow-600",
      icon: <span className="text-white text-xs font-bold">{step}</span>,
    },
    pending: {
      circle: "bg-white border-gray-300",
      text: "text-gray-500",
      subtitle: "text-gray-400",
      icon: <span className="text-gray-400 text-xs font-bold">{step}</span>,
    },
  };

  const style = statusStyles[status] || statusStyles.pending;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${style.circle}`}>
          {style.icon}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 mt-1 ${status === "completed" ? "bg-green-200" : "bg-gray-200"}`} />
        )}
      </div>
      <div className="pb-5">
        <p className={`text-sm font-semibold ${style.text}`}>{title}</p>
        <p className={`text-xs mt-0.5 ${style.subtitle}`}>{subtitle}</p>
      </div>
    </div>
  );
};

export default DashboardStatsCard;