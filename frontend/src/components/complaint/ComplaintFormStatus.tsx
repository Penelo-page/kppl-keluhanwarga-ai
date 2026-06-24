import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ComplaintFormStatusProps {
  error: string | null;
  status: "idle" | "loading" | "success" | "error";
}

export default function ComplaintFormStatus({ error, status }: ComplaintFormStatusProps) {
  return (
    <>
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
    </>
  );
}
