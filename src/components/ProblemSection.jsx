import { TriangleAlert, Search, Target } from "lucide-react";

const STEPS = [
  {
    icon: TriangleAlert,
    title: "The Problem",
    text: "Farmers lack early detection tools — outbreaks are spotted only after major crop damage is done.",
    tone: "text-fadig-red-light bg-fadig-red/15 border-fadig-red/30",
  },
  {
    icon: Search,
    title: "The Gap",
    text: "Without satellite or climate data, pest risk stays invisible until it's too late to act cheaply.",
    tone: "text-fadig-yellow bg-fadig-yellow/10 border-fadig-yellow/30",
  },
  {
    icon: Target,
    title: "The Outcome",
    text: "FaDig closes that gap — advancing food security and 5 UN Sustainable Development Goals.",
    tone: "text-fadig-green-light bg-fadig-green/10 border-fadig-green/30",
  },
];

export default function ProblemSection() {
  return (
    <section className="border-y border-white/5 bg-fadig-bg-soft/40 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-fadig-green-light sm:text-4xl">
            Problems We Solve
          </h2>
          <p className="mt-4 text-fadig-cream/60">
            Brown planthopper outbreaks move fast. Traditional scouting
            can't keep up — data can.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="h-full rounded-2xl border border-white/10 bg-fadig-bg p-7">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border ${step.tone}`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fadig-cream/60">
                  {step.text}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="absolute top-1/2 -right-3 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-white/20 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
