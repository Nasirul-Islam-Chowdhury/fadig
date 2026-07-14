import { Target, Telescope } from "lucide-react";
import Reveal from "./Reveal";

const CARDS = [
  {
    icon: Target,
    label: "Mission",
    accent: "green",
    text: "To empower rice farmers with a data-driven early warning system that uses satellite and climate analytics to predict Brown Planthopper outbreaks. Through real-time alerts, risk mapping, actionable guidance, and expert support, we aim to reduce crop losses, promote eco-friendly pest management, and improve farmers' productivity and income.",
  },
  {
    icon: Telescope,
    label: "Vision",
    accent: "yellow",
    text: "To transform traditional crop management into a smart, predictive, and sustainable agricultural ecosystem where every farmer can make informed decisions before pest outbreaks occur. We envision a climate-resilient future that strengthens food security, protects natural resources, and contributes to the Sustainable Development Goals.",
  },
];

const ACCENTS = {
  green: {
    ring: "hover:border-fadig-green/40",
    chip: "bg-fadig-green/15 text-fadig-green-light ring-fadig-green/30",
    label: "text-fadig-green-light",
    glow: "bg-fadig-green/10",
  },
  yellow: {
    ring: "hover:border-fadig-yellow/40",
    chip: "bg-fadig-yellow/15 text-fadig-yellow ring-fadig-yellow/30",
    label: "text-fadig-yellow",
    glow: "bg-fadig-yellow/10",
  },
};

export default function MissionVision() {
  return (
    <section className="border-y border-white/5 bg-fadig-bg-soft/40 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-fadig-green-light uppercase">
            Why We Exist
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Our Mission &amp; Vision
          </h2>
          <p className="mt-4 text-fadig-cream/60">
            A north star for every alert we send and every field we watch.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {CARDS.map((card, i) => {
            const a = ACCENTS[card.accent];
            return (
              <Reveal key={card.label} delay={i * 0.12}>
                <div
                  className={`relative h-full overflow-hidden rounded-3xl border border-white/10 bg-fadig-bg p-8 transition sm:p-10 ${a.ring}`}
                >
                  <div
                    className={`pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl ${a.glow}`}
                  />
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${a.chip}`}
                  >
                    <card.icon className="h-6 w-6" />
                  </div>
                  <p
                    className={`mt-6 text-xs font-bold tracking-widest uppercase ${a.label}`}
                  >
                    Our {card.label}
                  </p>
                  <p className="mt-3 text-base leading-8 text-fadig-cream/75">
                    {card.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
