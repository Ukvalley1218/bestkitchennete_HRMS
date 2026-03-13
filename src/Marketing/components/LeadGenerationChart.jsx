import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Week 1", Offline: 240, Online: 180 },
  { name: "Week 2", Offline: 280, Online: 220 },
  { name: "Week 3", Offline: 320, Online: 260 },
  { name: "Week 4", Offline: 380, Online: 310 },
];

const LeadGenerationChart = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-[#1F2937] mb-4">
        Offline vs Online Lead Generation
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} />
            <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="Offline" fill="#FF1E1E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Online" fill="#FF9999" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadGenerationChart;