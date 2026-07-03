import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FileBarChart } from "lucide-react";
import { trend } from "./mockData";

function TooltipCard({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-fadig-bg px-3 py-2 text-xs shadow-xl">
      <p className="font-semibold text-white">{label}</p>
      <p className="text-fadig-green-light">
        Pest index: {payload[0]?.value}
      </p>
      <p className="text-fadig-cream/40">Alert threshold: {payload[1]?.value}</p>
    </div>
  );
}

export default function TrendChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
      <div className="flex items-center gap-2">
        <FileBarChart className="h-4 w-4 text-fadig-green-light" />
        <h3 className="font-display text-sm font-bold text-white">
          Pest Population Index — Last 12 Weeks
        </h3>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={trend} margin={{ left: -20, right: 10, top: 10 }}>
            <defs>
              <linearGradient id="indexFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7ec53e" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#7ec53e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: "rgba(245,239,233,0.4)", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(245,239,233,0.4)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<TooltipCard />} />
            <Area
              type="monotone"
              dataKey="index"
              stroke="#7ec53e"
              strokeWidth={2.5}
              fill="url(#indexFill)"
            />
            <Line
              type="monotone"
              dataKey="threshold"
              stroke="#f35446"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px] text-fadig-cream/40">
        Dashed line marks the regional alert threshold (40).
      </p>
    </div>
  );
}
