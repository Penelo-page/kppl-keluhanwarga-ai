import { Send, Loader2, CheckCircle2 } from "lucide-react";

interface ComplaintFormSubmitButtonProps {
  status: "idle" | "loading" | "success" | "error";
  disabled: boolean;
}

export default function ComplaintFormSubmitButton({ status, disabled }: ComplaintFormSubmitButtonProps) {
  return (
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
  );
}
