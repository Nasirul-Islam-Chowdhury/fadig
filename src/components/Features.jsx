import {
  TriangleAlert,
  MapPin,
  Lightbulb,
  Target,
  Satellite,
  CloudSun,
  Map,
  Radar,
  FileBarChart,
  BellRing,
  Sparkles,
  Users,
} from "lucide-react";

const FEATURES = [
  {
    icon: TriangleAlert,
    title: "Early Warning System",
    desc: "Real-time infestation alerts before outbreaks spread.",
    points: [
      { icon: Satellite, text: "Infestation alerts powered by NASA & NOAA data" },
      { icon: CloudSun, text: "Climate-based predictions using temperature, rainfall, humidity & wind" },
    ],
  },
  {
    icon: MapPin,
    title: "Visual Data & Mapping",
    desc: "See risk across your fields at a glance.",
    points: [
      { icon: Map, text: "Interactive map views with color-coded risk zones" },
      { icon: Radar, text: "Satellite visualization to track real-time conditions" },
    ],
  },
  {
    icon: Lightbulb,
    title: "Data-Driven Insights",
    desc: "Turn seasonal patterns into decisions.",
    points: [
      { icon: FileBarChart, text: "Reports & analysis of seasonal trends and pest patterns" },
      { icon: BellRing, text: "Customized notifications tailored to farmers' needs" },
    ],
  },
  {
    icon: Target,
    title: "Guided Action Plans",
    desc: "From alert to action in one tap.",
    points: [
      { icon: Sparkles, text: "Actionable tips: light traps & eco-friendly pesticides" },
      { icon: Users, text: "Farmer forum & expert consultations on demand" },
    ],
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-fadig-red-light uppercase">
            Key Features
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Everything a farmer needs to{" "}
            <span className="text-fadig-green-light">stay ahead</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-white/10 bg-fadig-bg-soft/50 p-8 transition hover:border-fadig-red/30 hover:bg-fadig-bg-soft"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fadig-red to-fadig-red-light shadow-lg shadow-fadig-red/20">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-white">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-fadig-cream/50">{feature.desc}</p>

              <ul className="mt-5 space-y-3 border-t border-white/5 pt-5">
                {feature.points.map((p) => (
                  <li key={p.text} className="flex items-start gap-3">
                    <p.icon className="mt-0.5 h-4 w-4 shrink-0 text-fadig-green-light" />
                    <span className="text-sm leading-relaxed text-fadig-cream/70">
                      {p.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
