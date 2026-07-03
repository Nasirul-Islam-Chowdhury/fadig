import { Link } from "react-router-dom";
import { Map, ArrowUpRight } from "lucide-react";
import { fieldGrid } from "./mockData";

const RISK_STYLE = {
  low: "bg-fadig-green/70 hover:bg-fadig-green",
  medium: "bg-fadig-yellow/80 hover:bg-fadig-yellow",
  high: "bg-fadig-red/80 hover:bg-fadig-red",
};

export default function RiskGrid() {
  return (
    <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 text-fadig-green-light" />
          <h3 className="font-display text-sm font-bold text-white">
            Field Risk Map
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 text-[11px] text-fadig-cream/50 sm:flex">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-fadig-green/70" /> Low
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-fadig-yellow/80" /> Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-fadig-red/80" /> High
            </span>
          </div>
          <Link
            to="/dashboard/risk-map"
            className="flex items-center gap-1 text-[11px] font-semibold text-fadig-green-light hover:text-fadig-green-light/80"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-6 gap-2">
        {fieldGrid.map((risk, i) => (
          <Link
            key={i}
            to="/dashboard/risk-map"
            title={`Zone ${i + 1} — ${risk} risk`}
            className={`group relative aspect-square rounded-lg transition ${RISK_STYLE[risk]}`}
          >
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-black/40 opacity-0 transition group-hover:opacity-100">
              {i + 1}
            </span>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-fadig-cream/40">
        128 plots monitored across 6 divisions · updated 4 minutes ago
      </p>
    </div>
  );
}
