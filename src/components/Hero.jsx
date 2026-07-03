import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Satellite, Leaf } from "lucide-react";
import GlobeErrorBoundary from "./globe/GlobeErrorBoundary";
import GlobeSkeleton from "./globe/GlobeSkeleton";

// Three.js is heavy — keep it out of the main bundle until the hero mounts.
const Globe3D = lazy(() => import("./globe/Globe3D"));

const LEGEND = [
  { color: "bg-fadig-red", label: "High risk" },
  { color: "bg-fadig-yellow", label: "Medium risk" },
  { color: "bg-fadig-green-light", label: "No risk" },
  { color: "bg-[#c1793e]", label: "Migration alert" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* ambient glow blobs matching the deck's dark-maroon mood */}
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-fadig-green/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-40 h-96 w-96 rounded-full bg-fadig-red/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-fadig-green/40 bg-fadig-green/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-fadig-green-light uppercase">
            <Leaf className="h-3.5 w-3.5" />
            Data-driven pest management
          </span>

          <h1 className="mt-6 font-display text-4xl leading-[1.1] font-bold text-white sm:text-5xl lg:text-[3.4rem]">
            Transforming Crop Management with{" "}
            <span className="text-fadig-green-light">Data-Driven</span>{" "}
            Insights
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-fadig-cream/70">
            FaDig predicts and manages brown planthopper infestations in your
            rice fields with real-time, satellite-powered alerts — so you act
            before the outbreak, not after.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="group inline-flex items-center gap-2 rounded-full bg-fadig-red px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-fadig-red/30 transition hover:bg-fadig-red-light"
            >
              Learn More
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#features"
              className="text-sm font-semibold text-fadig-cream/80 underline decoration-fadig-green-light/50 decoration-2 underline-offset-4 hover:text-white"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="font-display text-2xl font-bold text-white">10M+</p>
              <p className="text-xs text-fadig-cream/50">Farmers addressable</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-bold text-white">2,000M</p>
              <p className="text-xs text-fadig-cream/50">Sq.km rice area tracked</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-bold text-white">24/7</p>
              <p className="text-xs text-fadig-cream/50">Satellite monitoring</p>
            </div>
          </div>
        </div>

        {/* Interactive 3D risk globe */}
        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-fadig-green/20 via-transparent to-fadig-red/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-fadig-bg-soft/80 p-5 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-fadig-cream/60">
                <Satellite className="h-4 w-4 text-fadig-green-light" />
                Global Risk Watch
              </div>
              <span className="flex items-center gap-1.5 text-[10px] text-fadig-cream/40">
                <span className="h-1.5 w-1.5 rounded-full bg-fadig-green-light" />
                Drag to rotate
              </span>
            </div>

            <div className="relative mt-2 h-[320px] cursor-grab touch-none active:cursor-grabbing sm:h-[380px]">
              <GlobeErrorBoundary fallback={<GlobeSkeleton />}>
                <Suspense fallback={<GlobeSkeleton />}>
                  <Globe3D />
                </Suspense>
              </GlobeErrorBoundary>
            </div>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/5 pt-4">
              {LEGEND.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 text-[11px] text-fadig-cream/60"
                >
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
