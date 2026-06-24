import { useSubmitComplaint } from "../hooks/useSubmitComplaint";
import ComplaintFormStatus from "../components/complaint/ComplaintFormStatus";
import ComplaintFormSubmitButton from "../components/complaint/ComplaintFormSubmitButton";

export default function SubmitComplaint() {
  const { form, setForm, error, status, disabled, handleSubmit } = useSubmitComplaint();

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

        <ComplaintFormStatus error={error} status={status} />

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
              minLength={3}
              maxLength={255}
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
              minLength={10}
              maxLength={5000}
            />
          </div>

          <ComplaintFormSubmitButton status={status} disabled={disabled} />
        </form>
      </div>
    </div>
  );
}
