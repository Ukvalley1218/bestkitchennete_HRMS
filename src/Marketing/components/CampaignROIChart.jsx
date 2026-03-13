import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Billboard", roi: 420 },
  { name: "Instagram", roi: 385 },
  { name: "Event XYZ", roi: 320 },
  { name: "Google Ads", roi: 280 },
  { name: "Bus Branding", roi: 195 },
];

const CampaignROIChart = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-[#1F2937] mb-4">
        Campaign-wise ROI %
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
            <XAxis type="number" tick={{ fill: "#6B7280", fontSize: 12 }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
              formatter={(value) => [`${value}%`, "ROI"]}
            />
            <Bar dataKey="roi" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`linear-gradient(90deg, #FF1E1E ${(100 - index * 15)}%, #FF6B6B 100%)`}
                  style={{ fill: `rgb(255, ${30 + index * 30}, ${30 + index * 30})` }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CampaignROIChart;