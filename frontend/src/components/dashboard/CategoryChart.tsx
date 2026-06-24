import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Bar } from "recharts";

const tooltipStyle = { borderRadius: "8px", border: "1px solid #e4e4e7", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" };

interface CategoryChartProps {
  laporanPerKategori: Record<string, number>;
}

export default function CategoryChart({ laporanPerKategori }: CategoryChartProps) {
  const categoryData = Object.entries(laporanPerKategori).map(([name, value]) => ({ name, value }));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="font-semibold text-zinc-900 mb-6">Laporan per Kategori</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#71717a' }} tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#71717a' }} />
            <RechartsTooltip cursor={{ fill: '#f4f4f5' }} contentStyle={tooltipStyle} />
            <Bar dataKey="value" fill="#18181b" radius={[4, 4, 0, 0]} maxBarSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
