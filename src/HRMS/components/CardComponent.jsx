import React from "react";
import { Star } from "lucide-react";
import Colors from "../utils/theme_cotext";

const EmployeeOfMonthCard = ({
  title,
  name,
  achievement,
  badgeText,
  image,
}) => {
  return (
    <div
      className={`${Colors.bg_color} relative w-full lg:max-w-[440px] rounded-2xl p-6 flex flex-wrap items-center justify-center lg:justify-between gap-6 overflow-hidden`}
    >
      {/* LEFT WHITE CURVED STRIP */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[85%] bg-white rounded-r" />

      {/* LEFT CONTENT */}
      <div className="text-white text-center lg:text-left space-y-3 relative z-10">
        {/* Title */}
        <div className="flex items-center justify-center lg:justify-start gap-2 text-[14px] font-semibold">
          <Star className="w-5 h-5" />
          <span>{title}</span>
        </div>

        {/* Name & Role */}
        <div>
          <h2 className="text-[14px] font-bold">{name}</h2>
          <p className="text-[12px] opacity-90 mt-1">{achievement}</p>
        </div>

        {/* Badge */}
        <div className="inline-block bg-white text-red-600 text-[10px] font-semibold px-4 py-1.5 rounded-full">
          {badgeText}
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="shrink-0 relative z-10">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-xl object-cover border-2 border-white"
        />
      </div>
    </div>
  );
};

export default EmployeeOfMonthCard;
