import { TrendingUp, TrendingDown } from "lucide-react";
import { stats } from "./mockData";

const TONE = {
  red: "bg-fadig-red/15 text-fadig-red-light",
  green: "bg-fadig-green/15 text-fadig-green-light",
  yellow: "bg-fadig-yellow/15 text-fadig-yellow",
};

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-5"
        >
          <p className="text-xs font-medium text-fadig-cream/50">{s.label}</p>
          <div className="mt-2 flex items-end justify-between">
            <p className="font-display text-2xl font-bold text-white">
              {s.value}
            </p>
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full ${TONE[s.tone]}`}
            >
              {s.trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-fadig-cream/40">{s.delta}</p>
        </div>
      ))}
    </div>
  );
}
