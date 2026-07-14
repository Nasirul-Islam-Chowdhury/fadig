import {
  BookOpenCheck,
  Users,
  BarChart3,
  CloudSun,
  Satellite,
  BrainCircuit,
  MonitorSmartphone,
  FlaskConical,
  Sprout,
  Rocket,
  Gauge,
  Flag,
} from "lucide-react";
import Reveal from "./Reveal";

const PHASES = [
  {
    name: "Research & Ground Truth",
    accent: {
      text: "text-fadig-green-light",
      dot: "bg-fadig-green-light",
      chip: "bg-fadig-green/15 text-fadig-green-light ring-fadig-green/30",
    },
    items: [
      {
        icon: BookOpenCheck,
        date: "01–10 Feb 2026",
        title: "Initial Research",
        text: "Study Brown Planthopper outbreaks, farmer challenges, and existing pest management practices.",
      },
      {
        icon: Users,
        date: "11–20 Feb 2026",
        title: "Ground Survey",
        text: "Conduct field surveys and collect real-world data directly from rice farmers.",
      },
      {
        icon: BarChart3,
        date: "21–28 Feb 2026",
        title: "Data Analysis",
        text: "Analyze survey findings, pest patterns, and key environmental risk factors.",
      },
    ],
  },
  {
    name: "Data & Intelligence",
    accent: {
      text: "text-fadig-yellow",
      dot: "bg-fadig-yellow",
      chip: "bg-fadig-yellow/15 text-fadig-yellow ring-fadig-yellow/30",
    },
    items: [
      {
        icon: CloudSun,
        date: "01–15 Mar 2026",
        title: "Climate Data Integration",
        text: "Integrate temperature, rainfall, humidity, and wind data into the prediction system.",
      },
      {
        icon: Satellite,
        date: "16–31 Mar 2026",
        title: "Satellite Data Setup",
        text: "Process satellite data and establish location-based pest risk analysis.",
      },
      {
        icon: BrainCircuit,
        date: "01–15 Apr 2026",
        title: "Prediction System",
        text: "Develop the data-driven Brown Planthopper outbreak prediction model.",
      },
    ],
  },
  {
    name: "Build & Validate",
    accent: {
      text: "text-fadig-red-light",
      dot: "bg-fadig-red-light",
      chip: "bg-fadig-red/15 text-fadig-red-light ring-fadig-red/30",
    },
    items: [
      {
        icon: MonitorSmartphone,
        date: "16–30 Apr 2026",
        title: "Web App Development",
        text: "Build real-time alerts, interactive maps, dashboards, and farmer-focused features.",
      },
      {
        icon: FlaskConical,
        date: "01–15 May 2026",
        title: "System Testing",
        text: "Test the prediction system, web application, and early warning features.",
      },
      {
        icon: Sprout,
        date: "16–31 May 2026",
        title: "Field Validation",
        text: "Compare system predictions with real field conditions and collect farmer feedback.",
      },
    ],
  },
  {
    name: "Launch & Scale",
    accent: {
      text: "text-fadig-cream",
      dot: "bg-fadig-cream",
      chip: "bg-fadig-cream/10 text-fadig-cream ring-fadig-cream/25",
    },
    items: [
      {
        icon: Rocket,
        date: "01–10 Jun 2026",
        title: "Pilot Launch",
        text: "Introduce the platform to selected farmers for real-world implementation.",
      },
      {
        icon: Gauge,
        date: "11–20 Jun 2026",
        title: "Optimization",
        text: "Improve system accuracy, user experience, alerts, and action recommendations.",
      },
      {
        icon: Flag,
        date: "21–30 Jun 2026",
        title: "Final Launch",
        text: "Officially launch the platform and prepare for wider farmer adoption and scale-up.",
      },
    ],
  },
];

export default function Milestones() {
  return (
    <section id="roadmap" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-fadig-yellow uppercase">
            Roadmap
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            From first survey to full launch
          </h2>
          <p className="mt-4 text-fadig-cream/60">
            Twelve milestones across five months — every step grounded in real
            fields and real farmer feedback.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 max-w-5xl">
          {PHASES.map((phase, pi) => (
            <div
              key={phase.name}
              className="grid grid-cols-1 gap-x-12 lg:grid-cols-[220px_1fr]"
            >
              {/* phase label — sticky on desktop so it tracks its milestones */}
              <Reveal>
                <div className="pt-2 lg:sticky lg:top-28">
                  <p
                    className={`text-xs font-bold tracking-widest uppercase ${phase.accent.text}`}
                  >
                    Phase 0{pi + 1}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">
                    {phase.name}
                  </h3>
                </div>
              </Reveal>

              {/* timeline column */}
              <div className="relative mt-6 border-l border-white/10 pb-14 pl-8 lg:mt-0 sm:pl-10">
                {phase.items.map((m, i) => (
                  <Reveal key={m.title} delay={i * 0.08}>
                    <div className="relative pb-10 last:pb-0">
                      {/* dot on the line */}
                      <span
                        className={`absolute top-1.5 -left-8 h-3 w-3 -translate-x-1/2 rounded-full ring-4 ring-fadig-bg sm:-left-10 ${phase.accent.dot}`}
                      />
                      <div className="group rounded-2xl border border-white/10 bg-fadig-bg-soft/40 p-6 transition hover:border-white/20 hover:bg-fadig-bg-soft/70">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ring-1 ${phase.accent.chip}`}
                          >
                            <m.icon className="h-4.5 w-4.5" />
                          </span>
                          <span className="rounded-full border border-white/10 bg-fadig-bg px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-fadig-cream/60">
                            {m.date}
                          </span>
                        </div>
                        <h4 className="mt-4 font-display text-lg font-bold text-white">
                          {m.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-fadig-cream/60">
                          {m.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
