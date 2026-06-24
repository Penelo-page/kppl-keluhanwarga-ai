import { cn } from "../../lib/utils";
import type { Priority } from "../../types";

const priorityStyles: Record<Priority, { card: string; badge: string }> = {
  Tinggi: {
    card: "bg-red-50/50 border border-red-200 text-red-900",
    badge: "bg-red-600 text-white shadow-red-200 shadow-sm",
  },
  Sedang: {
    card: "bg-amber-50/50 border border-amber-200 text-amber-900",
    badge: "bg-amber-500 text-white shadow-amber-200 shadow-sm",
  },
  Rendah: {
    card: "bg-emerald-50/50 border border-emerald-200 text-emerald-900",
    badge: "bg-emerald-600 text-white shadow-emerald-200 shadow-sm",
  },
};

interface PriorityCardProps {
  priority: Priority;
}

export default function PriorityCard({ priority }: PriorityCardProps) {
  const style = priorityStyles[priority] || { card: "", badge: "" };
  return (
    <div className={cn("overflow-hidden rounded-xl shadow-sm", style.card)}>
      <div className="p-10 text-center space-y-5">
        <div className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border bg-white/60 backdrop-blur-sm">
          Status Penanganan
        </div>
        <div className="flex items-center justify-center">
          <span className={cn("rounded-lg px-8 py-3 text-4xl font-display font-bold", style.badge)}>
            {priority}
          </span>
        </div>
      </div>
    </div>
  );
}
