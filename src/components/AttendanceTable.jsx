import React from "react";

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const styles = {
    Present: "bg-green-100 text-green-600",
    Late:    "bg-yellow-100 text-yellow-600",
    Absent:  "bg-red-100 text-red-500",
    "On Leave": "bg-blue-100 text-blue-500",
  };
  return (
    <span className={`px-3 py-1 rounded-md text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
};

// ─── TodayAttendanceTable ─────────────────────────────────────────────────────
/**
 * Props:
 *  - date: string         — e.g. "February 12, 2026"
 *  - records: Array<{
 *      id: string,
 *      name: string,
 *      department: string,
 *      shift: string,
 *      checkIn: string,   — e.g. "09:02 AM" or "-"
 *      checkOut: string,  — e.g. "06:00 PM" or "-"
 *      status: "Present" | "Late" | "Absent" | "On Leave"
 *    }>
 */
const TodayAttendanceTable = ({ date, records = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-sans">

      {/* Title Bar */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-base font-bold text-gray-900">
          Today's Attendance
          {date && <span className="font-normal text-gray-400"> - {date}</span>}
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {["Employee ID", "Name", "Department", "Shift", "Check In", "Check Out", "Status"].map(h => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-sm text-gray-400">
                  No attendance records found.
                </td>
              </tr>
            ) : (
              records.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-gray-400 text-xs font-medium whitespace-nowrap">{row.id}</td>
                  <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">{row.name}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.department}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.shift}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.checkIn || "–"}</td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{row.checkOut || "–"}</td>
                  <td className="px-5 py-4"><StatusBadge status={row.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayAttendanceTable;


// ─── USAGE EXAMPLE ────────────────────────────────────────────────────────────
//
// import TodayAttendanceTable from "./TodayAttendanceTable";
//
// const records = [
//   { id: "EMP001", name: "Rajesh Kumar",  department: "Production", shift: "Morning", checkIn: "09:02 AM", checkOut: "-",        status: "Present" },
//   { id: "EMP002", name: "Priya Sharma",  department: "Sales",      shift: "General", checkIn: "09:35 AM", checkOut: "-",        status: "Late"    },
//   { id: "EMP003", name: "Amit Patel",    department: "IT",         shift: "General", checkIn: "09:00 AM", checkOut: "-",        status: "Present" },
//   { id: "EMP004", name: "Sneha Reddy",   department: "Production", shift: "Evening", checkIn: "-",        checkOut: "-",        status: "Absent"  },
// ];
//
// <TodayAttendanceTable date="February 12, 2026" records={records} />