import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight, Radio } from "lucide-react";
import Parachutist from "./Parachutist";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const PHASES = [
  {
    range: [0, 0.05, 0.22, 0.3],
    eyebrow: "MISSION BRIEFING",
    heading: "Risk is falling fast.",
    body: "Somewhere over your fields, a signal just crossed the threshold. Every second between alert and action matters.",
  },
  {
    range: [0.34, 0.4, 0.58, 0.66],
    eyebrow: "IN FREEFALL",
    heading: "FaDig drops in first.",
    body: "Satellite feeds, climate models, and field sensors converge into one clear call — delivered before the outbreak lands.",
  },
  {
    range: [0.7, 0.76, 1, 1],
    eyebrow: "TOUCHDOWN",
    heading: "Boots on the ground. Action ready.",
    body: "A guided response plan is already waiting — traps, treatments, experts — the moment you touch down.",
  },
];

function PhaseText({ progress, phase, isLast, onDeploy }) {
  const opacity = useTransform(progress, phase.range, [0, 1, 1, isLast ? 1 : 0]);
  const y = useTransform(progress, phase.range, [24, 0, 0, isLast ? 0 : -24]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-6 top-1/2 max-w-lg -translate-y-1/2 lg:inset-x-auto lg:left-10 xl:left-20"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-fadig-red/40 bg-fadig-red/10 px-4 py-1.5 text-xs font-bold tracking-widest text-fadig-red-light uppercase">
        <Radio className="h-3.5 w-3.5" />
        {phase.eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl">
        {phase.heading}
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-fadig-cream/70">
        {phase.body}
      </p>
      {isLast && (
        <button
          onClick={onDeploy}
          className="pointer-events-auto group mt-7 inline-flex items-center gap-2 rounded-full bg-fadig-red px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-fadig-red/30 transition hover:bg-fadig-red-light"
        >
          Deploy the Dashboard
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      )}
    </motion.div>
  );
}

function AnimatedSkyDrop() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const altitudeRef = useRef(null);
  const statusRef = useRef(null);
  const statusDotRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const altitude = Math.max(0, Math.round((1 - v) * 4000));
    if (altitudeRef.current) {
      altitudeRef.current.textContent = `${altitude.toLocaleString()} M`;
    }
    let label = "DEPLOYING";
    let dot = "bg-fadig-red";
    if (v >= 0.34 && v < 0.7) {
      label = "DESCENDING";
      dot = "bg-fadig-yellow";
    } else if (v >= 0.7) {
      label = "TOUCHDOWN";
      dot = "bg-fadig-green-light";
    }
    if (statusRef.current) statusRef.current.textContent = label;
    if (statusDotRef.current) {
      statusDotRef.current.className = `h-2 w-2 rounded-full ${dot}`;
    }
  });

  const skyTopOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0]);
  const skyBottomOpacity = useTransform(
    scrollYProgress,
    [0, 0.65, 1],
    [0, 0.35, 1]
  );

  const cloud1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const cloud2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);
  const cloud3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const cloudsOpacity = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0.55, 0.5, 0.12]
  );

  const streakOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  const groundY = useTransform(
    scrollYProgress,
    [0.55, 0.95],
    ["100%", "0%"]
  );

  const jumperTop = useTransform(
    scrollYProgress,
    (v) => `${8 + v * 54}%`
  );
  const jumperScale = useTransform(scrollYProgress, [0, 1], [0.55, 1.4]);
  const shadowScale = useTransform(scrollYProgress, [0.5, 1], [0.2, 1.4]);
  const shadowOpacity = useTransform(scrollYProgress, [0.5, 0.75, 1], [0, 0.5, 0.7]);

  const dustOpacity = useTransform(
    scrollYProgress,
    [0.85, 0.9, 1],
    [0, 1, 0.35]
  );
  const dustScale = useTransform(
    scrollYProgress,
    [0.85, 0.9, 1],
    [0.4, 1.3, 1.9]
  );

  return (
    <section ref={sectionRef} className="relative h-[350vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* sky */}
        <motion.div
          style={{ opacity: skyTopOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-fadig-bg via-fadig-bg-soft-2 to-[#6b3a2e]"
        />
        <motion.div
          style={{ opacity: skyBottomOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#6b3a2e] via-fadig-bg-soft-2 to-fadig-bg"
        />

        {/* clouds */}
        <motion.div
          style={{ y: cloud1Y, opacity: cloudsOpacity }}
          className="absolute top-[15%] left-[8%] h-40 w-72 rounded-full bg-fadig-cream/20 blur-3xl"
        />
        <motion.div
          style={{ y: cloud2Y, opacity: cloudsOpacity }}
          className="absolute top-[35%] right-[10%] h-56 w-96 rounded-full bg-fadig-cream/15 blur-3xl"
        />
        <motion.div
          style={{ y: cloud3Y, opacity: cloudsOpacity }}
          className="absolute top-[55%] left-[30%] h-32 w-64 rounded-full bg-fadig-cream/10 blur-3xl"
        />

        {/* HUD */}
        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 pt-24 pb-6 lg:px-10 lg:pt-28">
          <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono backdrop-blur">
            <p className="text-[10px] tracking-widest text-fadig-cream/40 uppercase">
              Altitude
            </p>
            <p ref={altitudeRef} className="text-xl font-bold text-white">
              4,000 M
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur">
            <span ref={statusDotRef} className="h-2 w-2 rounded-full bg-fadig-red" />
            <span
              ref={statusRef}
              className="font-mono text-xs font-bold tracking-widest text-white"
            >
              DEPLOYING
            </span>
          </div>
        </div>

        {/* speed streaks */}
        <motion.div
          style={{ opacity: streakOpacity }}
          className="absolute top-1/4 left-1/2 flex -translate-x-1/2 flex-col gap-3"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 w-0.5 rotate-12 bg-gradient-to-b from-transparent via-fadig-cream/40 to-transparent"
              style={{ marginLeft: `${(i - 1) * 26}px` }}
            />
          ))}
        </motion.div>

        {/* landing shadow */}
        <motion.div
          style={{
            scale: shadowScale,
            opacity: shadowOpacity,
          }}
          className="absolute bottom-[9%] left-1/2 h-6 w-40 -translate-x-1/2 rounded-full bg-black/50 blur-md"
        />

        {/* parachutist */}
        <motion.div
          style={{ top: jumperTop, scale: jumperScale }}
          className="absolute left-1/2 w-40 -translate-x-1/2 sm:w-52 lg:w-64"
        >
          <div className="animate-fadig-sway">
            <Parachutist className="w-full drop-shadow-2xl" />
          </div>
        </motion.div>

        {/* landing dust burst */}
        <motion.div
          style={{ opacity: dustOpacity, scale: dustScale }}
          className="absolute bottom-[9%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-fadig-cream/40 blur-xl"
        />

        {/* ground / rice-paddy rows */}
        <motion.div
          style={{ y: groundY }}
          className="absolute inset-x-0 bottom-0 h-[14%]"
        >
          <div
            className="h-full w-full border-t border-fadig-green-light/30"
            style={{
              background:
                "repeating-linear-gradient(100deg, rgba(84,146,23,0.55) 0px, rgba(84,146,23,0.55) 26px, rgba(126,197,62,0.35) 26px, rgba(126,197,62,0.35) 52px)",
            }}
          />
        </motion.div>

        {/* staged narrative copy */}
        {PHASES.map((phase, i) => (
          <PhaseText
            key={phase.eyebrow}
            progress={scrollYProgress}
            phase={phase}
            isLast={i === PHASES.length - 1}
            onDeploy={() => navigate("/dashboard")}
          />
        ))}
      </div>
    </section>
  );
}

function StaticSkyDrop({ onDeploy }) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:px-10">
        <div className="mx-auto w-48 sm:w-64">
          <Parachutist className="w-full drop-shadow-2xl" />
        </div>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-fadig-red/40 bg-fadig-red/10 px-4 py-1.5 text-xs font-bold tracking-widest text-fadig-red-light uppercase">
            <Radio className="h-3.5 w-3.5" />
            Field Ops
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight font-bold text-white sm:text-4xl">
            FaDig drops in before the outbreak lands.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-fadig-cream/70">
            Satellite feeds, climate models, and field sensors converge into
            one clear call — with a guided response plan already waiting the
            moment you touch down.
          </p>
          <button
            onClick={onDeploy}
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-fadig-red px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-fadig-red/30 transition hover:bg-fadig-red-light"
          >
            Deploy the Dashboard
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function SkyDrop() {
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <StaticSkyDrop onDeploy={() => navigate("/dashboard")} />;
  }
  return <AnimatedSkyDrop />;
}
