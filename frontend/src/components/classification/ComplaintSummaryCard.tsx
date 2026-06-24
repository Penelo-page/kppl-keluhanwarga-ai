import { FileText } from 'lucide-react';
import type { Complaint } from '../../types';

interface ComplaintSummaryCardProps {
  complaint: Complaint;
}

export default function ComplaintSummaryCard({ complaint }: ComplaintSummaryCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 bg-zinc-50/50 px-6 py-4 flex items-center gap-2">
        <FileText className="h-4 w-4 text-zinc-400" />
        <h3 className="font-medium text-zinc-900">
          Detail Laporan: <span className="text-zinc-500 ml-1">{complaint.id}</span>
        </h3>
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
  );
}
