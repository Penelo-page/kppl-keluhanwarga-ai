import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export default function MissingComplaint({ icon: Icon, description }: { icon: LucideIcon; description?: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
      <Icon className="mb-4 h-12 w-12 text-zinc-400" />
      <h2 className="font-display text-lg font-semibold text-zinc-900">Data Tidak Ditemukan</h2>
      {description && <p className="mt-2 text-zinc-500">{description}</p>}
      <button onClick={() => navigate("/")} className="mt-6 inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors">
        Kembali ke Form
      </button>
    </div>
  );
}
