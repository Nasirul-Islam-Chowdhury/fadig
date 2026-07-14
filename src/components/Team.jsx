import pritomPhoto from "../assets/pritom.jpeg";
import nasirPhoto from "../assets/nasir.jpeg";

const MEMBERS = [
  {
    photo: pritomPhoto,
    name: "Pritom Paul",
    affiliation: "Metropolitan University, Sylhet, Bangladesh",
  },
  {
    photo: nasirPhoto,
    name: "Md Nasirul Islam Chowdhury",
    affiliation: "Metropolitan University, Sylhet, Bangladesh",
  },
];

export default function Team() {
  return (
    <section id="team" className="scroll-mt-20 py-24">
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

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {MEMBERS.map((member) => (
            <div
              key={member.name}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black transition duration-300 hover:border-fadig-green/40 hover:shadow-2xl hover:shadow-fadig-green/10"
            >
              {/* photos are shot on pure black, so they melt into the card */}
              <img
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />

              {/* legibility scrim + brand glow on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fadig-green/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                <span className="block h-0.5 w-8 rounded-full bg-fadig-green-light transition-all duration-500 group-hover:w-14" />
                <p className="mt-3 font-display text-xl font-bold text-white">
                  {member.name}
                </p>
                <p className="mt-1 text-xs text-fadig-cream/60">
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
