import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell, Building2, FileText, LayoutDashboard, PanelLeftClose,
  PanelLeftOpen, Shield, Users, type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  open: boolean;
  to?: string;
  active?: boolean;
}

function SidebarItem({ icon: Icon, label, open, to, active }: SidebarItemProps) {
  const content = <><Icon className="h-4 w-4 shrink-0" />{open && <span className="whitespace-nowrap">{label}</span>}</>;
  const className = cn(
    "flex items-center rounded-md px-3 py-2.5 text-sm font-medium",
    open ? "space-x-3" : "justify-center",
    to
      ? cn("transition-colors", active ? "bg-zinc-100 text-zinc-900" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900")
      : "text-zinc-400 cursor-not-allowed"
  );

  return to
    ? <Link to={to} title={label} className={className}>{content}</Link>
    : <div title={label} className={className}>{content}</div>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 flex">
      <aside className={cn(
        "border-r border-zinc-200 bg-white flex flex-col hidden md:flex shrink-0 transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex h-16 items-center justify-center border-b border-zinc-200 px-4">
          <div className={cn("flex items-center w-full overflow-hidden", sidebarOpen ? "space-x-3" : "justify-center")}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-white">
              <Shield className="h-4 w-4 shrink-0" />
            </div>
            {sidebarOpen && <span className="font-display font-semibold tracking-tight text-zinc-900 whitespace-nowrap">Portal Petugas</span>}
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-hidden">
          <SidebarItem icon={LayoutDashboard} label="Dashboard Insight" open={sidebarOpen} to="/dashboard" active={pathname.startsWith("/dashboard")} />
          <SidebarItem icon={FileText} label="Semua Laporan" open={sidebarOpen} />
          <SidebarItem icon={Users} label="Daftar Warga" open={sidebarOpen} />
        </nav>

        <div className="p-3 border-t border-zinc-200 text-sm overflow-hidden">
          <Link to="/" title="Ke Portal Warga" className={cn(
            "text-zinc-500 hover:text-zinc-900 flex items-center rounded-md px-3 py-2.5 transition-colors hover:bg-zinc-100",
            sidebarOpen ? "space-x-3" : "justify-center"
          )}>
            <Building2 className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span className="whitespace-nowrap">Ke Portal Warga</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-200 bg-white">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:flex h-9 w-9 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
            </button>
            <span className="md:hidden font-display font-semibold tracking-tight text-zinc-900">Portal Petugas</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-zinc-500 hover:text-zinc-900"><Bell className="h-5 w-5" /></button>
            <div className="h-8 w-8 rounded-full bg-zinc-200 border border-zinc-300" />
          </div>
        </header>
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
