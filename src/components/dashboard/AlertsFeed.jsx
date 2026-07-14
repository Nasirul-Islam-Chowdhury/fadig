import { Link } from "react-router-dom";
import { TriangleAlert, Satellite, ArrowUpRight } from "lucide-react";
import { useAlerts } from "./alertsStore";

const SEVERITY = {
  high: "border-fadig-red/40 bg-fadig-red/10 text-fadig-red-light",
  medium: "border-fadig-yellow/40 bg-fadig-yellow/10 text-fadig-yellow",
  low: "border-fadig-green/40 bg-fadig-green/10 text-fadig-green-light",
};

export default function AlertsFeed() {
  const alerts = useAlerts();
  const preview = alerts.slice(0, 5);

  return (
    <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TriangleAlert className="h-4 w-4 text-fadig-red-light" />
          <h3 className="font-display text-sm font-bold text-white">
            Live Alerts
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-fadig-red/15 px-2.5 py-1 text-[10px] font-bold text-fadig-red-light">
            {alerts.filter((a) => a.severity === "high").length} critical
          </span>
          <Link
            to="/dashboard/alerts"
            className="flex items-center gap-1 text-[11px] font-semibold text-fadig-green-light hover:text-fadig-green-light/80"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {preview.map((a) => (
          <Link
            to="/dashboard/alerts"
            key={a.id}
            className={`block rounded-xl border px-4 py-3 transition hover:brightness-110 ${SEVERITY[a.severity]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-bold text-white">{a.zone}</p>
              <span className="shrink-0 text-[10px] text-fadig-cream/40">
                {a.time}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-fadig-cream/70">
              {a.message}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-fadig-cream/40">
              <Satellite className="h-3 w-3" />
              {a.source}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
