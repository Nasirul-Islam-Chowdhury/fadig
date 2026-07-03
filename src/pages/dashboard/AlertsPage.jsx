import { useState } from "react";
import { TriangleAlert, Satellite, Check, X } from "lucide-react";
import { alerts as initialAlerts } from "../../components/dashboard/mockData";

const FILTERS = ["all", "high", "medium", "low"];

const SEVERITY = {
  high: "border-fadig-red/40 bg-fadig-red/10 text-fadig-red-light",
  medium: "border-fadig-yellow/40 bg-fadig-yellow/10 text-fadig-yellow",
  low: "border-fadig-green/40 bg-fadig-green/10 text-fadig-green-light",
};

export default function AlertsPage() {
  const [items, setItems] = useState(initialAlerts);
  const [filter, setFilter] = useState("all");

  const markRead = (id) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  const dismiss = (id) => setItems((prev) => prev.filter((a) => a.id !== id));

  const filtered =
    filter === "all" ? items : items.filter((a) => a.severity === filter);
  const unreadCount = items.filter((a) => !a.read).length;

  return (
    <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TriangleAlert className="h-4 w-4 text-fadig-red-light" />
          <h3 className="font-display text-sm font-bold text-white">
            All Alerts
          </h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-fadig-red/15 px-2.5 py-1 text-[10px] font-bold text-fadig-red-light">
              {unreadCount} unread
            </span>
          )}
        </div>
        <div className="flex gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition ${
                filter === f
                  ? "bg-fadig-red text-white"
                  : "text-fadig-cream/50 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((a) => (
          <div
            key={a.id}
            className={`rounded-xl border px-4 py-3.5 ${SEVERITY[a.severity]} ${
              a.read ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {!a.read && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-fadig-red-light" />
                )}
                <p className="text-xs font-bold text-white">{a.zone}</p>
              </div>
              <span className="shrink-0 text-[10px] text-fadig-cream/40">
                {a.time}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-fadig-cream/70">
              {a.message}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-fadig-cream/40">
                <Satellite className="h-3 w-3" />
                {a.source}
              </div>
              <div className="flex items-center gap-2">
                {!a.read && (
                  <button
                    onClick={() => markRead(a.id)}
                    className="flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-fadig-cream/70 transition hover:border-white/25 hover:text-white"
                  >
                    <Check className="h-3 w-3" /> Mark read
                  </button>
                )}
                <button
                  onClick={() => dismiss(a.id)}
                  className="flex items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-fadig-cream/70 transition hover:border-white/25 hover:text-white"
                >
                  <X className="h-3 w-3" /> Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-xs text-fadig-cream/40">
            No alerts to show.
          </p>
        )}
      </div>
    </div>
  );
}
