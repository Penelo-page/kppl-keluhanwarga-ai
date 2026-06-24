import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Info, ArrowLeft, Target, Loader2 } from "lucide-react";
import MissingComplaint from "../components/common/MissingComplaint";
import PriorityCard from "../components/priority/PriorityCard";
import ComplaintDetailCard from "../components/priority/ComplaintDetailCard";
import { useComplaint } from "../hooks/useComplaint";
import type { ComplaintLocationState } from "../types";

export default function PriorityResult() {
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
    return <MissingComplaint icon={Info} description={error || "Laporan tidak ditemukan."} />;
  }

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

      <PriorityCard priority={complaint.priority} />

      <ComplaintDetailCard complaint={complaint} />

      <div className="pt-8 flex justify-start">
        <button
          onClick={() => navigate(`/result/${complaint.id}`, { state: { complaint } })}
          className="inline-flex items-center justify-center rounded-md bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 border border-zinc-200 shadow-sm transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Rincian Kelas
        </button>
      </div>
    </div>
  );
}
