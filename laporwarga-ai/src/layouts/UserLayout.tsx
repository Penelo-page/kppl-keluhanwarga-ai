import type { ReactNode } from "react";
import { Building2 } from "lucide-react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <nav className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-zinc-900">Pengaduan Warga</span>
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
