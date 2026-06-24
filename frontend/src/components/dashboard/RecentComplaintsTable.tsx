import { cn } from "../../lib/utils";
import type { Priority } from "../../types";

const priorityClass: Record<Priority, string> = {
  Tinggi: "bg-red-50 text-red-700 border-red-200",
  Sedang: "bg-amber-50 text-amber-700 border-amber-200",
  Rendah: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

interface RecentComplaint {
  idKeluhan: string;
  judul: string;
  kategori: string;
  prioritas: Priority;
  tanggalKirim: string;
}

interface RecentComplaintsTableProps {
  complaints: RecentComplaint[];
}

export default function RecentComplaintsTable({ complaints }: RecentComplaintsTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-zinc-200 px-6 py-5 bg-zinc-50/50">
        <h3 className="font-semibold text-zinc-900">Laporan Terbaru</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50/80 text-xs font-semibold uppercase text-zinc-500 border-b border-zinc-200">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Judul Keluhan</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Prioritas</th>
              <th className="px-6 py-4">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200/80">
            {complaints.map((row) => (
              <tr key={row.idKeluhan} className="hover:bg-zinc-50/80 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-medium text-zinc-500">{row.idKeluhan}</td>
                <td className="px-6 py-4 font-medium text-zinc-900">{row.judul}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 border border-zinc-200/50">
                    {row.kategori}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border", priorityClass[row.prioritas])}>
                    {row.prioritas}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-zinc-500">{row.tanggalKirim.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
