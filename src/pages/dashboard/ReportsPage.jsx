import { FileBarChart, Download, Calendar } from "lucide-react";
import TrendChart from "../../components/dashboard/TrendChart";
import { reports } from "../../components/dashboard/mockData";

const TYPE_BADGE = {
  Weekly: "bg-fadig-green/15 text-fadig-green-light",
  Monthly: "bg-fadig-yellow/15 text-fadig-yellow",
  Regional: "bg-fadig-red/15 text-fadig-red-light",
  Seasonal: "bg-[#c1793e]/20 text-[#e0a06a]",
  Advisory: "bg-white/10 text-fadig-cream/70",
};

export default function ReportsPage() {
  return (
    <>
      <TrendChart />

      <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4 text-fadig-green-light" />
            <h3 className="font-display text-sm font-bold text-white">
              Report Archive
            </h3>
          </div>
          <span className="text-[11px] text-fadig-cream/40">
            {reports.length} reports
          </span>
        </div>

        <div className="mt-4 divide-y divide-white/5">
          {reports.map((r) => (
            <div
              key={r.id}
              className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-white">
                    {r.title}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${TYPE_BADGE[r.type] ?? "bg-white/10 text-fadig-cream/70"}`}
                  >
                    {r.type}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-fadig-cream/40">
                  <Calendar className="h-3 w-3" />
                  {r.period} · Generated {r.generatedOn}
                </p>
              </div>
              <button className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-xs font-semibold text-fadig-cream/80 transition hover:border-fadig-green/50 hover:text-white">
                <Download className="h-3.5 w-3.5" />
                {r.fileSize}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
