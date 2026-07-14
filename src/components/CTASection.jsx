import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-fadig-bg-soft to-fadig-bg-soft-2 px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fadig-green/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fadig-red/20 blur-3xl" />

          <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to protect your fields?
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-fadig-cream/70">
            Jump into the live dashboard demo and see how FaDig turns
            satellite data into action for farmers.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="group inline-flex items-center gap-2 rounded-full bg-fadig-green px-7 py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-fadig-green/25 transition hover:bg-fadig-green-light"
            >
              Explore Dashboard
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#features"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-fadig-cream/80 transition hover:border-white/30 hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
