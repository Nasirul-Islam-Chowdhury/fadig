import {
  BellRing,
  Map,
  LineChart,
  ClipboardList,
  Quote,
} from "lucide-react";
import Reveal from "./Reveal";

const PILLARS = [
  {
    icon: BellRing,
    title: "Early Warning System",
    text: "Infestation risk alerts reach farmers before severe damage occurs.",
  },
  {
    icon: Map,
    title: "Visual Data & Interactive Maps",
    text: "Color-coded risk zones make changing field conditions instantly readable.",
  },
  {
    icon: LineChart,
    title: "Data-Driven Insights",
    text: "Seasonal trends, pest patterns, and notifications tailored to each farmer.",
  },
  {
    icon: ClipboardList,
    title: "Guided Action Plans",
    text: "Light traps, eco-friendly treatments, a farmer forum, and expert support — one tap away.",
  },
];

function Stanza({ lines, accent = "text-fadig-green-light" }) {
  return (
    <div className="my-10 border-l-2 border-fadig-green/40 pl-6">
      {lines.map((line) => (
        <p
          key={line}
          className={`font-display text-xl font-semibold leading-relaxed sm:text-2xl ${accent}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}

function Prose({ children }) {
  return (
    <p className="mt-6 text-base leading-8 text-fadig-cream/70 sm:text-lg sm:leading-9">
      {children}
    </p>
  );
}

export default function Story() {
  return (
    <section className="relative pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-0">
        {/* ── Act I — the farmer ─────────────────────────────── */}
        <Reveal>
          <p className="text-xl leading-9 text-fadig-cream/85 sm:text-2xl sm:leading-10">
            <span className="float-left mt-1 mr-3 font-display text-6xl font-bold text-fadig-green-light sm:text-7xl">
              I
            </span>
            n the green fields of Sylhet, Bangladesh, we met a rice farmer
            whose life depended on a small piece of land. Every morning, he
            walked through his paddy field with hope. The rice plants looked
            green and healthy. He had invested his savings, months of hard
            work, and countless sleepless nights into that field.
          </p>

          <Prose>For him, it was not just a crop.</Prose>
          <Stanza
            lines={[
              "It was food for his family.",
              "It was his children's education.",
              "It was his hope for a better future.",
            ]}
          />

          <Prose>
            Then, one day, something began to change. Parts of his green field
            started turning yellow and weak. He did not clearly understand what
            was happening. There was no early warning, no real-time risk
            information, and no clear guidance on what action he should take.{" "}
            <strong className="font-semibold text-white">
              Brown Planthopper was present in his field.
            </strong>
          </Prose>

          <Prose>
            Sylhet is not considered a major Brown Planthopper outbreak zone —
            its climate is generally less favorable for severe outbreaks. But
            that does not mean the pest is absent. It can still attack. And
            shifting temperature, rainfall, humidity, and wind patterns can
            change pest risks over time.
          </Prose>

          <Prose>
            The farmer tried pesticides based on suggestions from others. He
            spent more money and used more chemicals. But without accurate
            information and proper timing, controlling the infestation became
            difficult.
          </Prose>
        </Reveal>

        {/* ── The quote that started everything ──────────────── */}
        <Reveal>
          <figure className="relative my-16 overflow-hidden rounded-3xl border border-fadig-yellow/20 bg-gradient-to-br from-fadig-bg-soft to-fadig-bg p-8 sm:p-12">
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-fadig-yellow/10 blur-2xl" />
            <Quote className="h-8 w-8 text-fadig-yellow/60" />
            <blockquote className="mt-4 font-display text-2xl leading-snug font-bold text-white sm:text-3xl">
              "If I had known a few days earlier, maybe I could have saved my
              crop."
            </blockquote>
            <figcaption className="mt-5 text-sm font-medium tracking-wide text-fadig-cream/50">
              — A rice farmer, standing beside his affected field in Sylhet
            </figcaption>
          </figure>

          <p className="text-center font-display text-xl font-semibold text-fadig-cream/80 sm:text-2xl">
            That sentence stayed with us. And it made us ask a bigger question:
          </p>
          <p className="mt-4 text-center font-display text-2xl font-bold text-fadig-green-light sm:text-3xl">
            Why should a farmer know about a pest risk only after seeing the
            damage?
          </p>
        </Reveal>

        {/* ── Act II — what we're building ───────────────────── */}
        <Reveal>
          <Prose>
            Today, organizations like NASA and NOAA generate valuable satellite
            and climate data. Temperature, rainfall, humidity, and wind data
            can reveal the environmental conditions linked with pest risks. But
            the farmer standing in the middle of a rice field does not need to
            understand complex datasets.
          </Prose>
          <Stanza
            lines={[
              "He needs a warning.",
              "He needs to understand the risk.",
              "He needs to know what to do next.",
            ]}
            accent="text-fadig-yellow"
          />
          <Prose>
            That is why we are building FaDig — a data-driven pest management
            system that transforms complex satellite and climate analytics into
            simple, real-time Brown Planthopper risk alerts for rice farmers.
          </Prose>
        </Reveal>

        <Reveal>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6 transition hover:border-fadig-green/40 hover:bg-fadig-bg-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fadig-green/15 text-fadig-green-light ring-1 ring-fadig-green/30">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fadig-cream/60">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Act III — grounded, honest, sustainable ────────── */}
        <Reveal>
          <Prose>
            But we did not build this project on an idea alone. We went to the
            ground. We conducted surveys. We listened to farmers. And we saw
            their challenges. Our ground survey and feasibility analysis helped
            us understand the real agricultural market, the financial capacity
            of potential users, and the community that could benefit most.
          </Prose>
          <Prose>
            We also understand that meaningful impact does not happen
            overnight. During the first six months, our project may operate at
            a loss. In the seventh month, the return may still be small. But
            from the eighth to the twelfth month, we expect gradual growth,
            with the goal of reaching our targeted return within the first
            year — because our purpose is bigger than quick profit.
          </Prose>
          <Prose>
            Our revenue model — subscription plans, in-app advertising,
            government and NGO partnerships, affiliate sales, and data
            analytics services — is designed to keep the solution financially
            sustainable and scalable. The project primarily contributes to{" "}
            <strong className="font-semibold text-white">
              SDG 2: Zero Hunger
            </strong>
            , while also supporting clean water, agricultural innovation,
            sustainable communities, climate resilience, and life on land.
          </Prose>
        </Reveal>

        {/* ── Act IV — from Sylhet to the world ──────────────── */}
        <Reveal>
          <div className="mt-16 rounded-3xl border border-fadig-green/20 bg-fadig-green/5 p-8 sm:p-12">
            <span className="text-xs font-bold tracking-widest text-fadig-green-light uppercase">
              Beyond Sylhet
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              Start locally. Learn from real farmers. Scale globally.
            </h2>
            <Prose>
              Our inspiration started with a farmer in Sylhet, but our vision
              does not end there — or in Bangladesh. Brown Planthopper
              challenges rice-growing communities across the world. The
              location may change, the climate may change, the farmer may speak
              a different language — but the fear of losing an entire crop is
              the same.
            </Prose>
            <Prose>
              Technology should not remain locked in satellites, research
              centers, or complex scientific reports. It must reach the farmer
              standing in the field. If one early warning can save one rice
              field, it can protect one family's income. Thousands of protected
              fields strengthen food security. And brought to farmers
              worldwide, this technology can help build a more resilient,
              sustainable global agricultural system.
            </Prose>

            <p className="mt-8 text-base leading-8 text-fadig-cream/70 sm:text-lg">
              If data can help a farmer act before the damage happens — then
              data is not just information.
            </p>
            <Stanza
              lines={["It is protection.", "It is opportunity.", "It is hope."]}
            />
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              We started with a field in Sylhet.{" "}
              <span className="text-fadig-green-light">
                But we are building for the world.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
