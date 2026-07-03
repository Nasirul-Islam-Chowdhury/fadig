const GOALS = [
  { code: "02", name: "Zero Hunger", target: null },
  { code: "06", name: "Clean Water & Sanitation", target: "6.3 & 6.6" },
  { code: "09", name: "Industry, Innovation & Infrastructure", target: "9.3 & 9.5" },
  { code: "11", name: "Sustainable Cities & Communities", target: "11.4 & 11.5" },
  { code: "13", name: "Climate Action", target: "13.1 & 13.3" },
  { code: "15", name: "Life on Land", target: "15.1 & 15.5" },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="border-y border-white/5 bg-fadig-bg-soft/40 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-widest text-fadig-yellow uppercase">
            Global Impact
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Advancing 6 UN Sustainable Development Goals
          </h2>
          <p className="mt-4 text-fadig-cream/60">
            Better pest prediction means less crop loss, less pesticide
            runoff, and more resilient rural communities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOALS.map((g) => (
            <div
              key={g.code}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-fadig-bg p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fadig-green font-display text-lg font-extrabold text-white">
                {g.code}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{g.name}</p>
                {g.target && (
                  <p className="text-xs font-medium text-fadig-yellow">
                    Target {g.target}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
