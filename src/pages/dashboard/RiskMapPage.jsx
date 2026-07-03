import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import RiskGrid from "../../components/dashboard/RiskGrid";
import { zones } from "../../components/dashboard/mockData";

const FILTERS = ["all", "low", "medium", "high"];

const RISK_DOT = {
  low: "bg-fadig-green-light",
  medium: "bg-fadig-yellow",
  high: "bg-fadig-red-light",
};

const RISK_BADGE = {
  low: "bg-fadig-green/15 text-fadig-green-light",
  medium: "bg-fadig-yellow/15 text-fadig-yellow",
  high: "bg-fadig-red/15 text-fadig-red-light",
};

export default function RiskMapPage() {
  const [filter, setFilter] = useState("all");

  const counts = {
    low: zones.filter((z) => z.risk === "low").length,
    medium: zones.filter((z) => z.risk === "medium").length,
    high: zones.filter((z) => z.risk === "high").length,
  };

  const filtered =
    filter === "all" ? zones : zones.filter((z) => z.risk === filter);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {(["low", "medium", "high"]).map((level) => (
          <div
            key={level}
            className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-5"
          >
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${RISK_DOT[level]}`} />
              <p className="text-xs font-medium text-fadig-cream/50 capitalize">
                {level} risk zones
              </p>
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-white">
              {counts[level]}
            </p>
            <p className="mt-1 text-[11px] text-fadig-cream/40">
              of {zones.length} monitored zones
            </p>
          </div>
        ))}
      </div>

      <RiskGrid />

      <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-fadig-green-light" />
            <h3 className="font-display text-sm font-bold text-white">
              Zone Detail
            </h3>
          </div>
          <div className="flex gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold capitalize transition ${
                  filter === f
                    ? "bg-fadig-green text-white"
                    : "text-fadig-cream/50 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] text-fadig-cream/40 uppercase">
                <th className="pb-3 font-medium">Zone</th>
                <th className="pb-3 font-medium">Division</th>
                <th className="pb-3 font-medium">Risk</th>
                <th className="pb-3 font-medium">Pest index</th>
                <th className="pb-3 font-medium">Area</th>
                <th className="pb-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((z) => (
                <tr key={z.id} className="text-fadig-cream/80">
                  <td className="py-3 font-semibold text-white">{z.name}</td>
                  <td className="py-3 text-fadig-cream/60">{z.division}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${RISK_BADGE[z.risk]}`}
                    >
                      {z.risk}
                    </span>
                  </td>
                  <td className="py-3">{z.pestIndex}</td>
                  <td className="py-3">{z.areaHa} ha</td>
                  <td className="py-3 text-fadig-cream/40">{z.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="py-6 text-center text-xs text-fadig-cream/40">
              No zones match this filter.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
