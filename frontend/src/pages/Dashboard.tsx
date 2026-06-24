import { AlertTriangle, Clock, Activity, FileText } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import StatCard from "../components/dashboard/StatCard";
import PriorityChart from "../components/dashboard/PriorityChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentComplaintsTable from "../components/dashboard/RecentComplaintsTable";

export default function Dashboard() {
  const { data, error } = useDashboard();

  const stats = {
    total: data.totalLaporan,
    tinggi: data.distribusiPrioritas.Tinggi,
    sedang: data.distribusiPrioritas.Sedang,
    rendah: data.distribusiPrioritas.Rendah,
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold tracking-tight text-zinc-900">
          Dashboard Insight
        </h1>
        <p className="text-sm text-zinc-500">
          Ringkasan analisis keluhan warga dan pemantauan prioritas penanganan.
        </p>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Laporan" value={stats.total} icon={FileText} className="text-zinc-600 bg-zinc-100" />
        <StatCard title="Prioritas Tinggi" value={stats.tinggi} icon={AlertTriangle} className="text-red-900 bg-red-50 border-red-100" />
        <StatCard title="Prioritas Sedang" value={stats.sedang} icon={Activity} className="text-amber-900 bg-amber-50 border-amber-100" />
        <StatCard title="Prioritas Rendah" value={stats.rendah} icon={Clock} className="text-emerald-900 bg-emerald-50 border-emerald-100" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PriorityChart stats={stats} />
        <CategoryChart laporanPerKategori={data.laporanPerKategori} />
      </div>

      <RecentComplaintsTable complaints={data.laporanTerbaru} />
    </div>
  );
}
