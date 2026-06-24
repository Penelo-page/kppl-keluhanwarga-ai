import { Info } from "lucide-react";
import type { Complaint } from "../../types";

interface ComplaintDetailCardProps {
  complaint: Complaint;
}

export default function ComplaintDetailCard({ complaint }: ComplaintDetailCardProps) {
  return (
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
  );
}
