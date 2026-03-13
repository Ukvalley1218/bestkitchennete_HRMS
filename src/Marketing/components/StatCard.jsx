const StatCard = ({ icon: Icon, trend, value, label, sub }) => {
  return (
    <div className="relative bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm border border-gray-100 flex-1 min-w-[140px] overflow-hidden">
      {/* Top row: icon + trend */}
      <div className="flex items-start justify-between">
        {/* Icon box - light red background */}
        <div className="flex items-center justify-center rounded-xl" style={{ backgroundColor: '#FDE8E8', width: '40px', height: '40px', borderRadius: '12px' }}>
          <Icon size={20} style={{ color: '#EF4444' }} strokeWidth={1.5} />
        </div>

        {/* Trend badge */}
        {trend && (
          <span className="flex items-center gap-0.5 pr-5 pt-2 text-xs font-semibold text-[#A60000]">
            <svg className="text-green-500" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.1877 2.84375V6.09375C12.1877 6.20149 12.1449 6.30483 12.0687 6.38101C11.9926 6.4572 11.8892 6.5 11.7815 6.5C11.6737 6.5 11.5704 6.4572 11.4942 6.38101C11.418 6.30483 11.3752 6.20149 11.3752 6.09375V3.82434L7.1939 8.00617C7.15617 8.04394 7.11136 8.07391 7.06205 8.09435C7.01273 8.1148 6.95986 8.12532 6.90648 8.12532C6.85309 8.12532 6.80022 8.1148 6.75091 8.09435C6.70159 8.07391 6.65678 8.04394 6.61905 8.00617L4.87523 6.26184L1.5064 9.63117C1.43017 9.7074 1.32678 9.75023 1.21898 9.75023C1.11117 9.75023 1.00778 9.7074 0.931554 9.63117C0.855325 9.55494 0.8125 9.45155 0.8125 9.34375C0.8125 9.23595 0.855325 9.13256 0.931554 9.05633L4.5878 5.40008C4.62553 5.36231 4.67034 5.33234 4.71966 5.3119C4.76897 5.29145 4.82184 5.28093 4.87523 5.28093C4.92861 5.28093 4.98148 5.29145 5.0308 5.3119C5.08011 5.33234 5.12492 5.36231 5.16265 5.40008L6.90648 7.14441L10.8009 3.25H8.53148C8.42373 3.25 8.3204 3.2072 8.24421 3.13101C8.16803 3.05483 8.12523 2.95149 8.12523 2.84375C8.12523 2.73601 8.16803 2.63267 8.24421 2.55649C8.3204 2.4803 8.42373 2.4375 8.53148 2.4375H11.7815C11.8892 2.4375 11.9926 2.4803 12.0687 2.55649C12.1449 2.63267 12.1877 2.73601 12.1877 2.84375Z" fill="#00A63E"/>
            </svg>
            {trend}
          </span>
        )}
      </div>

      {/* Value + labels */}
      <div>
        <p className="text-[2rem] font-semibold text-black leading-none tracking-tight">
          {value}
        </p>
        <p className="text-sm text-[#00000099] mt-1.5 font-medium">{label}</p>
        {sub && <p className="text-xs text-[#6A7282] font-semibold mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

export default StatCard;