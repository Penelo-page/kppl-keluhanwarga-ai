import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Send, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import type { Complaint } from "../types";

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const disabled = status !== "idle";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Judul dan deskripsi keluhan wajib diisi.");
      return;
    }
    setError("");
    setStatus("loading");

    setTimeout(() => {
      setStatus("success");
      
      const newComplaint: Complaint = {
        id: `LAP-${Math.floor(1000 + Math.random() * 9000)}`,
        ...form,
        category: "Jalan Rusak tes",
        confidenceScore: 92,
        priority: "Tinggi",
        priorityReason: "Laporan berpotensi menyebabkan kecelakaan dan membahayakan keselamatan pengguna jalan.",
        date: new Date().toISOString().slice(0, 10),
      };

      setTimeout(() => {
        navigate(`/result/${newComplaint.id}`, { state: { complaint: newComplaint } });
      }, 1500);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
            Form Laporan Baru
          </h1>
          <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
            Sampaikan keluhan Anda terkait fasilitas atau layanan publik. Laporan akan dikategorikan dan diprioritaskan secara otomatis oleh sistem.
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-md bg-red-50 p-4 text-sm text-red-800 border border-red-100">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}

        {status === "success" && (
          <div className="mb-6 flex items-center gap-2 rounded-md bg-zinc-50 p-4 text-sm text-zinc-800 border border-zinc-200">
            <CheckCircle2 className="h-4 w-4" />
            <p className="font-medium">Laporan terkirim. Memproses data...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium leading-none text-zinc-900">
              Judul Masalah
            </label>
            <input
              id="title"
              type="text"
              placeholder="Contoh: Jalan Berlubang di Depan Sekolah"
              className="flex h-11 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium leading-none text-zinc-900">
              Deskripsi Detail
            </label>
            <textarea
              id="description"
              placeholder="Jelaskan detail keluhan, lokasi kejadian, dan dampak yang dirasakan..."
              className="flex min-h-[140px] w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              disabled={disabled}
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="inline-flex w-full items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim Laporan...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Sedang Memproses
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Kirim Laporan
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
