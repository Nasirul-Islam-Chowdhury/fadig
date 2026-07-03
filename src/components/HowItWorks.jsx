import { SatelliteDish, Cpu, BellRing, Sprout } from "lucide-react";

const STEPS = [
  {
    icon: SatelliteDish,
    title: "Collect",
    text: "NASA & NOAA satellite feeds plus local climate sensors stream in continuously.",
  },
  {
    icon: Cpu,
    title: "Predict",
    text: "Our model scores outbreak probability per field using temperature, rainfall, humidity & wind.",
  },
  {
    icon: BellRing,
    title: "Alert",
    text: "Farmers get a plain-language, color-coded warning the moment risk crosses a threshold.",
  },
  {
    icon: Sprout,
    title: "Act",
    text: "A guided action plan — traps, treatments, expert contacts — is ready in the same tap.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-fadig-green-light uppercase">
            How It Works
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            From satellite to seedling in four steps
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative pl-1">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fadig-green/15 text-fadig-green-light ring-1 ring-fadig-green/30">
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="font-display text-3xl font-bold text-white/10">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fadig-cream/60">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
