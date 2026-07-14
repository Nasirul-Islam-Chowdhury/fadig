import { motion } from "framer-motion";
import { MapPin, Wheat } from "lucide-react";

export default function StoryHero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
      {/* ambient glow blobs matching the landing hero */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-fadig-green/15 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -left-40 h-96 w-96 rounded-full bg-fadig-red/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-fadig-yellow/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-fadig-yellow/40 bg-fadig-yellow/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-fadig-yellow uppercase"
        >
          <MapPin className="h-3.5 w-3.5" />
          Our Story · Sylhet, Bangladesh
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-display text-4xl leading-[1.12] font-bold text-white sm:text-5xl lg:text-6xl"
        >
          The Field That Changed{" "}
          <span className="text-fadig-green-light">Our Vision</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fadig-cream/70"
        >
          FaDig didn't begin in a lab or a boardroom. It began beside a
          yellowing rice paddy, with a farmer's words we couldn't forget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-3 text-fadig-green-light/60"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-fadig-green/50" />
          <Wheat className="h-5 w-5" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-fadig-green/50" />
        </motion.div>
      </div>
    </section>
  );
}
