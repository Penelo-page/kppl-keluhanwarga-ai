import { FolderKanban, Activity } from "lucide-react";

interface AccuracyCardProps {
  category: string;
  confidenceScore?: number | undefined;
}

export default function AccuracyCard({ category, confidenceScore = 0 }: AccuracyCardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FolderKanban className="h-5 w-5 text-zinc-700" />
          <h3 className="font-semibold text-zinc-900">Kategori Utama</h3>
        </div>
        <p className="text-2xl font-bold text-zinc-900">{category}</p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-zinc-700" />
            <h3 className="font-semibold text-zinc-900">Skor Akurasi Deteksi</h3>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-bold text-zinc-900">{confidenceScore}%</p>
            <span className="text-sm font-medium text-zinc-500 mb-1">Akurat</span>
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full bg-zinc-900 transition-all duration-1000"
            style={{ width: `${confidenceScore}%` }}
          />
        </div>
      </div>
    </div>
  );
}
