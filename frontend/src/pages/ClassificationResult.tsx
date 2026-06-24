import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FolderKanban, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import MissingComplaint from "../components/common/MissingComplaint";
import ComplaintSummaryCard from "../components/classification/ComplaintSummaryCard";
import AccuracyCard from "../components/classification/AccuracyCard";
import { useComplaint } from "../hooks/useComplaint";
import type { ComplaintLocationState } from "../types";

export default function ClassificationResult() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const initialComplaint = (location.state as ComplaintLocationState | null)?.complaint || null;

  const { complaint, loading, error } = useComplaint(id, initialComplaint);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-3 bg-white border border-zinc-200 rounded-xl p-12 text-center shadow-sm">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-600" />
        <p className="text-sm text-zinc-500">Memuat data laporan...</p>
      </div>
    );
  }

  if (error || !complaint) {
    return <MissingComplaint icon={AlertCircle} description={error || "Laporan tidak ditemukan."} />;
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

      <ComplaintSummaryCard complaint={complaint} />

      <AccuracyCard category={complaint.category} confidenceScore={complaint.confidenceScore} />

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
