import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { AlertTriangle, Clock, Activity, FileText, type LucideIcon } from "lucide-react";
import { mockDashboardData } from "../data";
import { cn } from "../lib/utils";

const countPriority = (priority: string) => mockDashboardData.filter(item => item.priority === priority).length;
const stats = {
  total: mockDashboardData.length,
  tinggi: countPriority("Tinggi"),
  sedang: countPriority("Sedang"),
  rendah: countPriority("Rendah"),
};
const priorityData = [
  { name: "Tinggi", value: stats.tinggi, color: "#dc2626" },
  { name: "Sedang", value: stats.sedang, color: "#d97706" },
  { name: "Rendah", value: stats.rendah, color: "#16a34a" },
];
const categoryData = Object.entries(
  mockDashboardData.reduce<Record<string, number>>((result, item) => {
    result[item.category] = (result[item.category] || 0) + 1;
    return result;
  }, {})
).map(([name, value]) => ({ name, value }));
const tooltipStyle = { borderRadius: "8px", border: "1px solid #e4e4e7", boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" };
const priorityClass = {
  Tinggi: "bg-red-50 text-red-700 border-red-200",
  Sedang: "bg-amber-50 text-amber-700 border-amber-200",
  Rendah: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-zinc-900">
          Dashboard Insight
        </h1>
        <p className="text-sm text-zinc-500">
          Ringkasan analisis keluhan warga dan pemantauan prioritas penanganan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Laporan" value={stats.total} icon={FileText} className="text-zinc-600 bg-zinc-100" />
        <StatCard title="Prioritas Tinggi" value={stats.tinggi} icon={AlertTriangle} className="text-red-900 bg-red-50 border-red-100" />
        <StatCard title="Prioritas Sedang" value={stats.sedang} icon={Activity} className="text-amber-900 bg-amber-50 border-amber-100" />
        <StatCard title="Prioritas Rendah" value={stats.rendah} icon={Clock} className="text-emerald-900 bg-emerald-50 border-emerald-100" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
                <RechartsTooltip cursor={{fill: '#f4f4f5'}} contentStyle={tooltipStyle} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-zinc-900 mb-6">Laporan per Kategori</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#71717a'}} tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <RechartsTooltip cursor={{fill: '#f4f4f5'}} contentStyle={tooltipStyle} />
                <Bar dataKey="value" fill="#18181b" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-5 bg-zinc-50/50">
          <h3 className="font-semibold text-zinc-900">Laporan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="bg-zinc-50/80 text-xs font-semibold uppercase text-zinc-500 border-b border-zinc-200">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4 cursor-pointer">Judul Keluhan</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Prioritas</th>
                <th className="px-6 py-4">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/80">
              {mockDashboardData.map((row) => (
                <tr key={row.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-medium text-zinc-500">{row.id}</td>
                  <td className="px-6 py-4 font-medium text-zinc-900">{row.title}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 border border-zinc-200/50">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border", priorityClass[row.priority])}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-zinc-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  className: string;
}

function StatCard({ title, value, icon: Icon, className }: StatCardProps) {
  return (
    <div className={cn("flex flex-col rounded-xl border border-zinc-200 p-6 bg-white shadow-sm")}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-500">{title}</p>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg border border-transparent", className)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <h4 className="font-display text-4xl font-bold text-zinc-900">{value}</h4>
      </div>
    </div>
  );
}
