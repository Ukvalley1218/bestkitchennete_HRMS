import { useState } from "react";
import LeaveStatCard from "../components/StatCard";

// ───────────────── ICONS ─────────────────

const ActiveProgramIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M26.7017 15.2535L18.2642 10.7535C18.1828 10.7102 18.092 10.6875 17.9998 10.6875C17.9076 10.6875 17.8168 10.7102 17.7354 10.7535L9.29795 15.2535C9.20795 15.3015 9.13269 15.373 9.08021 15.4604C9.02772 15.5479 9 15.6479 9 15.7499C9 15.8519 9.02772 15.9519 9.08021 16.0394C9.13269 16.1268 9.20795 16.1984 9.29795 16.2463L11.2498 17.2876V20.6922C11.2492 20.9685 11.3509 21.2352 11.5353 21.441C12.4564 22.4669 14.5201 24.1874 17.9998 24.1874C19.1536 24.1969 20.2988 23.988 21.3748 23.5715V25.8749C21.3748 26.0241 21.4341 26.1672 21.5396 26.2727C21.6451 26.3781 21.7881 26.4374 21.9373 26.4374C22.0865 26.4374 22.2296 26.3781 22.3351 26.2727C22.4406 26.1672 22.4998 26.0241 22.4998 25.8749V23.028C23.2333 22.6045 23.8962 22.0691 24.4644 21.441C24.6487 21.2352 24.7504 20.9685 24.7498 20.6922V17.2876L26.7017 16.2463C26.7917 16.1984 26.867 16.1268 26.9194 16.0394C26.9719 15.9519 26.9996 15.8519 26.9996 15.7499C26.9996 15.6479 26.9719 15.5479 26.9194 15.4604C26.867 15.373 26.7917 15.3015 26.7017 15.2535ZM17.9998 23.0624C14.9574 23.0624 13.1679 21.576 12.3748 20.6922V17.8874L17.7354 20.7463C17.8168 20.7896 17.9076 20.8123 17.9998 20.8123C18.092 20.8123 18.1828 20.7896 18.2642 20.7463L21.3748 19.0876V22.3459C20.4889 22.7594 19.3723 23.0624 17.9998 23.0624ZM23.6248 20.6894C23.2876 21.0635 22.9104 21.3995 22.4998 21.6913V18.4872L23.6248 17.8874V20.6894ZM22.2186 17.3629L22.2031 17.3537L18.2656 15.2535C18.1342 15.1864 17.9818 15.1736 17.841 15.2178C17.7003 15.2621 17.5826 15.3598 17.5133 15.49C17.4439 15.6202 17.4285 15.7725 17.4703 15.9139C17.5121 16.0554 17.6079 16.1747 17.7369 16.2463L21.0233 17.9999L17.9998 19.6122L10.7576 15.7499L17.9998 11.8876L25.242 15.7499L22.2186 17.3629Z"
      fill="#A60000"
    />
  </svg>
);

const EnrolledIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M23.625 10.6875H14.0625C13.4658 10.6875 12.8935 10.9246 12.4715 11.3465C12.0496 11.7685 11.8125 12.3408 11.8125 12.9375V24.75C11.8125 24.8992 11.8718 25.0423 11.9773 25.1477C12.0827 25.2532 12.2258 25.3125 12.375 25.3125H22.5C22.6492 25.3125 22.7923 25.2532 22.8977 25.1477C23.0032 25.0423 23.0625 24.8992 23.0625 24.75C23.0625 24.6008 23.0032 24.4577 22.8977 24.3523C22.7923 24.2468 22.6492 24.1875 22.5 24.1875H12.9375C12.9375 23.8891 13.056 23.603 13.267 23.392C13.478 23.181 13.7641 23.0625 14.0625 23.0625H23.625C23.7742 23.0625 23.9173 23.0032 24.0227 22.8977C24.1282 22.7923 24.1875 22.6492 24.1875 22.5V11.25C24.1875 11.1008 24.1282 10.9577 24.0227 10.8523C23.9173 10.7468 23.7742 10.6875 23.625 10.6875ZM17.4375 11.8125H20.8125V16.875L19.4618 15.8625C19.3644 15.7895 19.246 15.75 19.1243 15.75C19.0026 15.75 18.8842 15.7895 18.7868 15.8625L17.4375 16.875V11.8125ZM23.0625 21.9375H14.0625C13.6674 21.937 13.2793 22.041 12.9375 22.2391V12.9375C12.9375 12.6391 13.056 12.353 13.267 12.142C13.478 11.931 13.7641 11.8125 14.0625 11.8125H16.3125V18C16.3125 18.1045 16.3416 18.2069 16.3965 18.2957C16.4514 18.3846 16.53 18.4564 16.6234 18.5031C16.7169 18.5498 16.8215 18.5696 16.9255 18.5602C17.0296 18.5508 17.1289 18.5127 17.2125 18.45L19.125 17.0156L21.0382 18.45C21.1354 18.5229 21.2535 18.5623 21.375 18.5625C21.5242 18.5625 21.6673 18.5032 21.7727 18.3977C21.8782 18.2923 21.9375 18.1492 21.9375 18V11.8125H23.0625V21.9375Z"
      fill="#A60000"
    />
  </svg>
);

const ActiveJobsIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M23.1875 13.5H20.375C20.375 12.6049 20.0194 11.7464 19.3865 11.1135C18.7536 10.4806 17.8951 10.125 17 10.125C16.1049 10.125 15.2464 10.4806 14.6135 11.1135C13.9806 11.7464 13.625 12.6049 13.625 13.5H10.8125C10.5141 13.5 10.228 13.6185 10.017 13.8295C9.80603 14.0405 9.6875 14.3266 9.6875 14.625V23.0625C9.6875 23.3609 9.80603 23.647 10.017 23.858C10.228 24.069 10.5141 24.1875 10.8125 24.1875H23.1875C23.4859 24.1875 23.772 24.069 23.983 23.858C24.194 23.647 24.3125 23.3609 24.3125 23.0625V14.625C24.3125 14.3266 24.194 14.0405 23.983 13.8295C23.772 13.6185 23.4859 13.5 23.1875 13.5ZM17 11.25C17.5967 11.25 18.169 11.4871 18.591 11.909C19.0129 12.331 19.25 12.9033 19.25 13.5H14.75C14.75 12.9033 14.9871 12.331 15.409 11.909C15.831 11.4871 16.4033 11.25 17 11.25ZM23.1875 23.0625H10.8125V14.625H13.625V15.75C13.625 15.8992 13.6843 16.0423 13.7898 16.1477C13.8952 16.2532 14.0383 16.3125 14.1875 16.3125C14.3367 16.3125 14.4798 16.2532 14.5852 16.1477C14.6907 16.0423 14.75 15.8992 14.75 15.75V14.625H19.25V15.75C19.25 15.8992 19.3093 16.0423 19.4148 16.1477C19.5202 16.2532 19.6633 16.3125 19.8125 16.3125C19.9617 16.3125 20.1048 16.2532 20.2102 16.1477C20.3157 16.0423 20.375 15.8992 20.375 15.75V14.625H23.1875V23.0625Z"
      fill="#A60000"
    />
  </svg>
);

const InactiveJobsIcon = () => (
  <svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="35" height="35" rx="10" fill="#FFE3E3" />
    <path
      d="M23.1875 13.5H20.375C20.375 12.6049 20.0194 11.7464 19.3865 11.1135C18.7536 10.4806 17.8951 10.125 17 10.125C16.1049 10.125 15.2464 10.4806 14.6135 11.1135C13.9806 11.7464 13.625 12.6049 13.625 13.5H10.8125C10.5141 13.5 10.228 13.6185 10.017 13.8295C9.80603 14.0405 9.6875 14.3266 9.6875 14.625V23.0625C9.6875 23.3609 9.80603 23.647 10.017 23.858C10.228 24.069 10.5141 24.1875 10.8125 24.1875H23.1875C23.4859 24.1875 23.772 24.069 23.983 23.858C24.194 23.647 24.3125 23.3609 24.3125 23.0625V14.625C24.3125 14.3266 24.194 14.0405 23.983 13.8295C23.772 13.6185 23.4859 13.5 23.1875 13.5ZM17 11.25C17.5967 11.25 18.169 11.4871 18.591 11.909C19.0129 12.331 19.25 12.9033 19.25 13.5H14.75C14.75 12.9033 14.9871 12.331 15.409 11.909C15.831 11.4871 16.4033 11.25 17 11.25ZM23.1875 23.0625H10.8125V14.625H13.625V15.75C13.625 15.8992 13.6843 16.0423 13.7898 16.1477C13.8952 16.2532 14.0383 16.3125 14.1875 16.3125C14.3367 16.3125 14.4798 16.2532 14.5852 16.1477C14.6907 16.0423 14.75 15.8992 14.75 15.75V14.625H19.25V15.75C19.25 15.8992 19.3093 16.0423 19.4148 16.1477C19.5202 16.2532 19.6633 16.3125 19.8125 16.3125C19.9617 16.3125 20.1048 16.2532 20.2102 16.1477C20.3157 16.0423 20.375 15.8992 20.375 15.75V14.625H23.1875V23.0625Z"
      fill="#A60000"
    />
  </svg>
);

// ───────────────── DATA ─────────────────

const EVENTS = {
  "2026-02-10": [
    { time: "10:00 AM", color: "bg-green-500" },
    { time: "3:00 PM", color: "bg-purple-500" },
  ],
  "2026-02-12": [{ time: "2:00 PM", color: "bg-purple-500" }],
  "2026-02-17": [{ time: "11:00 AM", color: "bg-orange-500" }],
};

// const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
// const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y, m) {
  return new Date(y, m, 1).getDay();
}
const MEETINGS = [
  {
    title: "Interview for Interior Designer Position",
    date: "Feb 15, 2026",
    tag: "Interview",
    tagColor: "bg-purple-100 text-purple-600",
  },
  {
    title: "Internal Review",
    date: "Feb 20, 2026",
    tag: "External",
    tagColor: "bg-blue-100 text-blue-600",
  },
  {
    title: "New Product line training for sales team",
    date: "Feb 25, 2026",
    tag: "Internal",
    tagColor: "bg-orange-100 text-orange-500",
  },
  {
    title: "Client Meeting",
    date: "Feb 25, 2026",
    tag: "Internal",
    tagColor: "bg-green-100 text-green-600",
  },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ───────────────── HELPERS ─────────────────

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

// ───────────────── MAIN COMPONENT ─────────────────

export default function CalenderTraining() {
  const today = new Date();

  const [view, setView] = useState("Month");

  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const { year, month } = current;

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prev = () => {
    setCurrent(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 },
    );
  };

  const next = () => {
    setCurrent(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 },
    );
  };

  const goToday = () =>
    setCurrent({
      year: today.getFullYear(),
      month: today.getMonth(),
    });

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const dateKey = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-7xl space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Calendar & Training Program</h1>
          <p className="text-[#757575]">KPI tracking and employee appraisals</p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <LeaveStatCard
            icon={ActiveProgramIcon}
            trend="+12"
            value="8"
            label="Active Program"
            sub="This Month"
          />

          <LeaveStatCard
            icon={EnrolledIcon}
            trend="+5"
            value="05"
            label="Enrolled Employees"
          />

          <LeaveStatCard
            icon={ActiveJobsIcon}
            trend="+5"
            value="06"
            label="Active Jobs"
          />

          <LeaveStatCard
            icon={InactiveJobsIcon}
            trend="+5"
            value="12"
            label="Inactive Jobs"
          />
        </div>

        {/* CALENDAR + MEETINGS */}
        <div className="flex gap-6 flex-col lg:flex-row">
          {/* CALENDAR */}
          <div className="flex items-start justify-center p-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full max-w-[800px]">
              {/* ── Row 1: Title left | View toggle right ── */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-gray-900">Event</h2>

                {/* Day / Week / Month toggle */}
                <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-medium">
                  {["Day", "Week", "Month"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      className={`px-3 py-1.5 transition-colors ${
                        view === v
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Row 2: Prev/Next + Today ── */}
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={prev}
                  className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-lg leading-none transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-lg leading-none transition-colors"
                >
                  ›
                </button>
                <button
                  onClick={goToday}
                  className="px-3 py-1 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Today
                </button>
              </div>

              {/* ── Day headers ── */}
              <div className="grid grid-cols-7 mb-1">
                {DAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs font-semibold text-gray-500 py-1"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* ── Date grid ── */}
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, i) => {
                  const key = day ? dateKey(day) : null;
                  const events = key ? (EVENTS[key] ?? []) : [];
                  const today_ = day && isToday(day);

                  return (
                    <div
                      key={i}
                      className={`rounded-xl min-h-[102px] p-3.5 border ${
                        today_
                          ? "border-cyan-300 bg-cyan-50"
                          : "border-gray-100"
                      } ${day ? "hover:bg-gray-50 cursor-pointer" : ""} transition-colors`}
                    >
                      {day && (
                        <>
                          {/* Day number */}
                          <span
                            className={`text-[11px] font-semibold w-5 h-5 flex items-center justify-center rounded-full mb-1 ${
                              today_ ? "bg-red-500 text-white" : "text-gray-700"
                            }`}
                          >
                            {day}
                          </span>

                          {/* Events */}
                          <div className="space-y-0.5">
                            {events.map((ev, j) => (
                              <div
                                key={j}
                                className={`${ev.color} text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md truncate`}
                              >
                                • {ev.time}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MEETINGS */}
          <div className=" flex items-start justify-center p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 w-full max-w-xs sm:max-w-sm">
              {/* ── Header with red left border accent ── */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 bg-red-500 rounded-full shrink-0" />
                <h2 className="text-base font-bold text-gray-900">
                  Meeting Schedule
                </h2>
              </div>

              {/* ── Meeting list ── */}
              <div className="space-y-0">
                {MEETINGS.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 py-3.5 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Left: title + date */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 leading-snug">
                        {m.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{m.date}</p>
                    </div>

                    {/* Right: tag badge */}
                    <span
                      className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-md mt-0.5 ${m.tagColor}`}
                    >
                      {m.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
