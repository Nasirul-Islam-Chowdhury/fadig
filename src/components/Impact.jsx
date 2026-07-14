import { Wheat, ArrowRight } from "lucide-react";
import childHunger from "../assets/child-hunger.jpg";
import zeroHungerHands from "../assets/zero-hunger-hands.webp";
import kidsHarvest from "../assets/children-harvest.jpeg";

const SUPPORTING_GOALS = [
  { code: "06", name: "Clean Water & Sanitation" },
  { code: "09", name: "Industry, Innovation & Infrastructure" },
  { code: "11", name: "Sustainable Cities & Communities" },
  { code: "13", name: "Climate Action" },
  { code: "15", name: "Life on Land" },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="scroll-mt-20 border-y border-white/5 bg-fadig-bg-soft/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ── photo collage ─────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-lg pb-16 lg:pb-20">
            <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-fadig-yellow/15 via-transparent to-fadig-green/15 blur-2xl" />

            {/* main photo — hands sharing grain, "SDG 2: Zero Hunger" */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/50">
              <img
                src={zeroHungerHands}
                alt="Outstretched hands sharing grain — SDG 2: Zero Hunger"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* offset photo — children with their harvest */}
            <div className="absolute bottom-0 -left-3 w-3/5 overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60 sm:-left-8">
              <img
                src={kidsHarvest}
                alt="Children proudly holding their harvest"
                loading="lazy"
                className="aspect-[15/8] w-full object-cover object-bottom"
              />
            </div>

            {/* offset portrait — a child's meal at stake */}
            <img
              src={childHunger}
              alt="A young child eating a small piece of cassava"
              loading="lazy"
              className="absolute -top-6 -right-3 h-28 w-28 rounded-2xl border border-white/15 object-cover shadow-2xl shadow-black/60 sm:-right-6 sm:h-36 sm:w-36"
            />
          </div>

          {/* ── copy ──────────────────────────────────────── */}
          <div>
            <span className="text-xs font-bold tracking-widest text-fadig-yellow uppercase">
              Global Impact · SDG 2
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Zero Hunger is why{" "}
              <span className="text-fadig-yellow">FaDig exists</span>
            </h2>
            <p className="mt-5 leading-relaxed text-fadig-cream/70">
              Rice feeds more than half the world — and a single Brown
              Planthopper outbreak can wipe out an entire season's harvest.
              When a field is lost, it isn't just income that disappears: it's
              the food on a family's plate and a child's next meal.
            </p>
            <p className="mt-4 leading-relaxed text-fadig-cream/70">
              Every early warning FaDig delivers protects a harvest before the
              damage happens. Protected fields mean stable food supplies,
              steadier incomes, and fewer families facing hunger — the heart
              of the UN's{" "}
              <strong className="font-semibold text-white">
                Sustainable Development Goal 2: Zero Hunger
              </strong>
              .
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-fadig-yellow/25 bg-fadig-yellow/10 px-5 py-4">
              <Wheat className="h-6 w-6 shrink-0 text-fadig-yellow" />
              <p className="text-sm leading-relaxed text-fadig-cream/80">
                Severe planthopper outbreaks can destroy{" "}
                <strong className="font-bold text-white">
                  up to 60% of a rice yield
                </strong>{" "}
                — losses that early warnings can prevent.
              </p>
            </div>

            {/* supporting goals */}
            <p className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest text-fadig-cream/40 uppercase">
              Also advancing
              <ArrowRight className="h-3.5 w-3.5" />
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUPPORTING_GOALS.map((g) => (
                <span
                  key={g.code}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-fadig-bg px-3.5 py-1.5 text-xs font-medium text-fadig-cream/70"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-fadig-green font-display text-[10px] font-extrabold text-white">
                    {g.code}
                  </span>
                  {g.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
