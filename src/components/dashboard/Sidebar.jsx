import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Map,
  BellRing,
  FileBarChart,
  ListChecks,
  Settings,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Logo from "../Logo";

const NAV = [
  { icon: LayoutGrid, label: "Overview", to: "/dashboard", end: true },
  { icon: Map, label: "Risk Map", to: "/dashboard/risk-map" },
  { icon: BellRing, label: "Alerts", to: "/dashboard/alerts" },
  { icon: FileBarChart, label: "Reports", to: "/dashboard/reports" },
  { icon: ListChecks, label: "Action Plans", to: "/dashboard/action-plans" },
  { icon: Settings, label: "Settings", to: "/dashboard/settings" },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <Link to="/dashboard" onClick={onNavigate} className="block px-6 py-6">
        <Logo className="h-11 w-auto" />
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {NAV.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-fadig-red/15 text-fadig-red-light"
                  : "text-fadig-cream/60 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon className="h-4.5 w-4.5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-6">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-fadig-cream/50 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Back to site
        </Link>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/5 bg-fadig-bg-soft/40 lg:block">
        <SidebarContent />
      </aside>

      {/* mobile trigger */}
      <div className="flex items-center justify-between border-b border-white/5 bg-fadig-bg-soft/40 px-4 py-3 lg:hidden">
        <Link to="/dashboard">
          <Logo className="h-9 w-auto" />
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6 text-fadig-cream" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute top-0 left-0 h-full w-64 bg-fadig-bg-soft">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-4"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-fadig-cream" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
