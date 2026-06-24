import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from "recharts";

const tooltipStyle = { borderRadius: "8px", border: "1px solid #e4e4e7", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" };

interface PriorityChartProps {
  stats: {
    tinggi: number;
    sedang: number;
    rendah: number;
  };
}

export default function PriorityChart({ stats }: PriorityChartProps) {
  const priorityData = [
    { name: "Tinggi", value: stats.tinggi, color: "#dc2626" },
    { name: "Sedang", value: stats.sedang, color: "#d97706" },
    { name: "Rendah", value: stats.rendah, color: "#16a34a" },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-zinc-900 mb-6">Distribusi Prioritas</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {priorityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip cursor={{ fill: '#f4f4f5' }} contentStyle={tooltipStyle} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
