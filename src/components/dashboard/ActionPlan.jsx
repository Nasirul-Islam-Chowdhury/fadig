import { useState } from "react";
import { Link } from "react-router-dom";
import { ListChecks, Check, ArrowUpRight } from "lucide-react";
import { actionPlan } from "./mockData";

export default function ActionPlan() {
  const [items, setItems] = useState(actionPlan);

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i))
    );

  const doneCount = items.filter((i) => i.done).length;

  return (
    <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-fadig-green-light" />
          <h3 className="font-display text-sm font-bold text-white">
            Guided Action Plan
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-medium text-fadig-cream/40">
            {doneCount}/{items.length} done
          </span>
          <Link
            to="/dashboard/action-plans"
            className="flex items-center gap-1 text-[11px] font-semibold text-fadig-green-light hover:text-fadig-green-light/80"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className="flex w-full items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 text-left transition hover:border-white/15"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
                item.done
                  ? "border-fadig-green bg-fadig-green"
                  : "border-white/20"
              }`}
            >
              {item.done && <Check className="h-3.5 w-3.5 text-white" />}
            </span>
            <span>
              <p
                className={`text-xs font-semibold ${
                  item.done ? "text-fadig-cream/40 line-through" : "text-white"
                }`}
              >
                {item.title}
              </p>
              <p className="mt-0.5 text-[11px] text-fadig-cream/40">
                {item.detail}
              </p>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
