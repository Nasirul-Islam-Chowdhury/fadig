import { useState } from "react";
import { ListChecks, Check } from "lucide-react";
import { actionPlanFull } from "../../components/dashboard/mockData";

const CATEGORIES = ["Immediate", "This Week", "Ongoing"];

const CATEGORY_TONE = {
  Immediate: "text-fadig-red-light",
  "This Week": "text-fadig-yellow",
  Ongoing: "text-fadig-green-light",
};

export default function ActionPlansPage() {
  const [items, setItems] = useState(actionPlanFull);

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i))
    );

  const doneCount = items.filter((i) => i.done).length;

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-fadig-green-light" />
            <p className="text-sm font-semibold text-white">
              Overall progress
            </p>
          </div>
          <p className="text-xs font-medium text-fadig-cream/50">
            {doneCount}/{items.length} complete
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fadig-green to-fadig-green-light transition-all"
            style={{ width: `${(doneCount / items.length) * 100}%` }}
          />
        </div>
      </div>

      {CATEGORIES.map((cat) => {
        const catItems = items.filter((i) => i.category === cat);
        if (!catItems.length) return null;
        return (
          <div
            key={cat}
            className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6"
          >
            <h3 className={`font-display text-sm font-bold ${CATEGORY_TONE[cat]}`}>
              {cat}
            </h3>

            <div className="mt-4 space-y-2.5">
              {catItems.map((item) => (
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
                        item.done
                          ? "text-fadig-cream/40 line-through"
                          : "text-white"
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
      })}
    </>
  );
}
