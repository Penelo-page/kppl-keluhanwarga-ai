import { useLocation, useNavigate } from "react-router-dom";
import { Info, ArrowLeft, LayoutDashboard, Target } from "lucide-react";
import MissingComplaint from "../components/MissingComplaint";
import { cn } from "../lib/utils";
import type { ComplaintLocationState, Priority } from "../types";

const priorityStyles: Record<Priority, { card: string; badge: string }> = {
  Tinggi: {
    card: "bg-red-50/50 border border-red-200 text-red-900",
    badge: "bg-red-600 text-white shadow-red-200 shadow-sm",
  },
  Sedang: {
    card: "bg-amber-50/50 border border-amber-200 text-amber-900",
    badge: "bg-amber-500 text-white shadow-amber-200 shadow-sm",
  },
  Rendah: {
    card: "bg-emerald-50/50 border border-emerald-200 text-emerald-900",
    badge: "bg-emerald-600 text-white shadow-emerald-200 shadow-sm",
  },
};

export default function PriorityResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = (location.state as ComplaintLocationState | null)?.complaint;

  if (!complaint) {
    return <MissingComplaint icon={Info} />;
  }

  const style = priorityStyles[complaint.priority];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 text-zinc-900 mb-2">
          <Target className="h-6 w-6" />
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Penilaian Prioritas Akhir
          </h1>
        </div>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Sistem merekomendasikan tingkat respons penanganan berdasarkan dampak, risiko keselamatan, dan eskalasi masalah.
        </p>
      </div>

      <div className={cn("overflow-hidden rounded-xl shadow-sm", style.card)}>
        <div className="p-10 text-center space-y-5">
          <div className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border bg-white/60 backdrop-blur-sm">
            Status Penanganan
          </div>
          <div className="flex items-center justify-center">
            <span className={cn("rounded-lg px-8 py-3 text-4xl font-display font-bold", style.badge)}>
              {complaint.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-5">
        <div>
           <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Judul Laporan</div>
           <div className="text-zinc-900 font-medium">{complaint.title}</div>
        </div>
        <div className="border-t border-zinc-200 pt-5">
           <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Kategori Terdeteksi</div>
           <div className="inline-flex items-center rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-800">
             {complaint.category}
           </div>
        </div>
        <div className="border-t border-zinc-200 pt-5 bg-zinc-50/50 -mx-6 -mb-6 p-6 rounded-b-xl">
           <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-zinc-900 mb-1.5">Keterangan Status</div>
                <div className="text-sm text-zinc-600 leading-relaxed">
                  {complaint.priorityReason}
                </div>
              </div>
           </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
        <button
          onClick={() => navigate(`/result/${complaint.id}`, { state: { complaint } })}
          className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 border border-zinc-200 shadow-sm transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Rincian Kelas
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        >
          Menuju Portal Petugas
          <LayoutDashboard className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
