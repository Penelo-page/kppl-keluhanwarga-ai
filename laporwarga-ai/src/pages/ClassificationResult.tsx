import { useLocation, useNavigate } from "react-router-dom";
import { FolderKanban, ArrowRight, Activity, AlertCircle, FileText } from "lucide-react";
import MissingComplaint from "../components/MissingComplaint";
import type { ComplaintLocationState } from "../types";

export default function ClassificationResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = (location.state as ComplaintLocationState | null)?.complaint;

  if (!complaint) {
    return <MissingComplaint icon={AlertCircle} description="Laporan tidak valid atau sesi telah berakhir." />;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 text-zinc-900 mb-2">
          <FolderKanban className="h-6 w-6" />
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Klasifikasi Laporan Target
          </h1>
        </div>
        
        <p className="text-sm text-zinc-500 leading-relaxed">
          Laporan telah dikategorikan secara analitik berdasarkan pola dan indikator struktural yang ditemukan.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-zinc-400" />
          <h3 className="font-medium text-zinc-900">Detail Laporan: <span className="text-zinc-500 ml-1">{complaint.id}</span></h3>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Judul</div>
            <div className="text-zinc-900 font-medium">{complaint.title}</div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">Deskripsi</div>
            <div className="text-sm text-zinc-700 leading-relaxed">{complaint.description}</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FolderKanban className="h-5 w-5 text-zinc-700" />
            <h3 className="font-semibold text-zinc-900">Kategori Utama</h3>
          </div>
          <p className="text-2xl font-bold text-zinc-900">{complaint.category}</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
             <div className="flex items-center gap-2 mb-4">
               <Activity className="h-5 w-5 text-zinc-700" />
               <h3 className="font-semibold text-zinc-900">Skor Akurasi Deteksi</h3>
             </div>
             <div className="flex items-end gap-2">
               <p className="text-3xl font-bold text-zinc-900">{complaint.confidenceScore}%</p>
               <span className="text-sm font-medium text-zinc-500 mb-1">Akurat</span>
             </div>
          </div>
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div 
              className="h-full bg-zinc-900 transition-all duration-1000" 
              style={{ width: `${complaint.confidenceScore}%` }}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
         <button
          onClick={() => navigate(`/priority/${complaint.id}`, { state: { complaint } })}
          className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        >
          Lihat Tingkat Prioritas
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
