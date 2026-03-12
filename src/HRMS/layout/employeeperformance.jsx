import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const EmployeePerformanceDistribution = () => {
  const data = [
    {
      name: 'Excellent',
      employees: 45,
      fill: '#22c55e'
    },
    {
      name: 'Good',
      employees: 89,
      fill: '#ff6b6b'
    },
    {
      name: 'Average',
      employees: 18,
      fill: '#fbbf24'
    },
    {
      name: 'Needs Improvement',
      employees: 4,
      fill: '#ef4444'
    }
  ];

  return (
    <section className="mt-6 mb-6">
      <div className="bg-white rounded-2xl shadow-sm border border-black/10 p-6">
        <h2 className="text-lg sm:text-[20px] font-semibold mb-16">
          Employee Performance Distribution
        </h2>
        
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
                label={{ value: 'Performance Rating', position: 'bottom', offset: 80 }}
              />
              <YAxis 
                label={{ value: 'Number of Employees', angle: -90, position: 'insideBottomLeft' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '8px'
                }}
                formatter={(value) => [value, 'Employees']}
              />
              <Bar dataKey="employees" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded" 
                style={{ backgroundColor: item.fill }}
              />
              <div>
                <p className="text-sm font-semibold text-black/80">{item.name}</p>
                <p className="text-xs text-black/60">{item.employees} employees</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default EmployeePerformanceDistribution;