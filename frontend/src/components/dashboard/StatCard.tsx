import { type LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  className: string;
}

export default function StatCard({ title, value, icon: Icon, className }: StatCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 p-6 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-500">{title}</p>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg border border-transparent", className)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <h4 className="font-display text-4xl font-bold text-zinc-900">{value}</h4>
      </div>
    </div>
  );
}
