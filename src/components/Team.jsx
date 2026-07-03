const MEMBERS = [
  {
    initials: "PP",
    name: "Pritom Paul",
    affiliation: "Metropolitan University, Sylhet, Bangladesh",
  },
  {
    initials: "MC",
    name: "Md Nasirul Islam Chowdhury",
    affiliation: "Metropolitan University, Bangladesh",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <span className="text-xs font-bold tracking-widest text-fadig-red-light uppercase">
          Built By
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          Team Minus One
        </h2>
        <p className="mt-4 text-fadig-cream/60">
          Data-driven pest management: predicting brown planthopper outbreaks
          using satellite and climate analytics.
        </p>

        <div className="mx-auto mt-10 flex flex-wrap justify-center gap-4">
          {MEMBERS.map((member) => (
            <div
              key={member.name}
              className="flex w-full max-w-xs items-center gap-4 rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-5 text-left sm:w-auto"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fadig-green to-fadig-green-light font-display text-lg font-bold text-white">
                {member.initials}
              </div>
              <div>
                <p className="font-semibold text-white">{member.name}</p>
                <p className="text-xs text-fadig-cream/50">
                  {member.affiliation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
