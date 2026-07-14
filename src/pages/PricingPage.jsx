import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth, useClerk, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Check, Loader2, Sparkles, Lock, CreditCard } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useSubscription from "../hooks/useSubscription";
import { fetchJson } from "../lib/api";

const TIERS = {
  free: {
    name: "Field Scout",
    tagline: "Explore FaDig and follow our public risk outlooks.",
    features: [
      "Public landing & story pages",
      "Seasonal outbreak news",
      "Community farmer forum (read-only)",
      "Email updates",
    ],
  },
  pro: {
    name: "FaDig Pro",
    tagline: "The full early-warning system for your fields.",
    monthly: { price: 4.99, suffix: "/month", note: "billed monthly" },
    yearly: { price: 49, suffix: "/year", note: "2 months free — save ~18%" },
    features: [
      "Real-time Brown Planthopper risk alerts",
      "Interactive color-coded risk map",
      "Full analytics dashboard & reports",
      "Guided action plans & expert support",
      "Custom notifications for your zones",
    ],
  },
};

/* Stylized placeholders for local payment methods (coming soon) */
function PaymentBadges() {
  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <p className="text-xs font-semibold tracking-widest text-fadig-cream/40 uppercase">
        Payment methods
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-fadig-cream">
          <CreditCard className="h-4 w-4 text-fadig-green-light" />
          Card — powered by Stripe
         
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e2136e]/40 bg-[#e2136e]/10 px-4 py-2 font-display text-sm font-bold text-[#ff5ca8] italic">
          bKash
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-fadig-cream/50 uppercase not-italic">
            coming soon
          </span>
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#f6921e]/40 bg-[#f6921e]/10 px-4 py-2 font-display text-sm font-bold text-[#ffab4a]">
          নগদ Nagad
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-fadig-cream/50 uppercase">
            coming soon
          </span>
        </span>
      </div>
      
    </div>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const { isSignedIn, getToken } = useAuth();
  const clerk = useClerk();
  const { active, plan } = useSubscription();

  const upgradeNudge = searchParams.get("upgrade") === "1" && !active;
  const pro = TIERS.pro[billing];

  const subscribe = async () => {
    setError(null);
    if (!isSignedIn) {
      clerk.openSignIn({ redirectUrl: "/pricing?upgrade=1" });
      return;
    }
    try {
      setCheckingOut(true);
      const token = await getToken();
      const data = await fetchJson(`/api/checkout?plan=${billing}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!data.url) throw new Error("Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-fadig-bg text-fadig-cream">
      <Navbar />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-fadig-green/15 blur-3xl" />
        <div className="pointer-events-none absolute top-64 -left-40 h-96 w-96 rounded-full bg-fadig-red/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold tracking-widest text-fadig-yellow uppercase">
              Pricing
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
              Protect your harvest for less than{" "}
              <span className="text-fadig-green-light">a cup of tea a day</span>
            </h1>
            <p className="mt-4 text-fadig-cream/60">
              Start free. Upgrade to Pro for the full early-warning system —
              cancel anytime.
            </p>
          </div>

          {upgradeNudge && (
            <div className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 rounded-2xl border border-fadig-yellow/30 bg-fadig-yellow/10 px-5 py-3 text-sm font-medium text-fadig-yellow">
              <Lock className="h-4 w-4 shrink-0" />
              The dashboard is a Pro feature — subscribe below to unlock it.
            </div>
          )}

          {/* billing toggle */}
          <div className="mt-10 flex items-center justify-center">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-fadig-bg-soft/60 p-1">
              {["monthly", "yearly"].map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBilling(cycle)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${
                    billing === cycle
                      ? "bg-fadig-green text-white shadow-lg shadow-fadig-green/25"
                      : "text-fadig-cream/60 hover:text-white"
                  }`}
                >
                  {cycle}
                  {cycle === "yearly" && (
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        billing === "yearly"
                          ? "bg-white/20 text-white"
                          : "bg-fadig-yellow/15 text-fadig-yellow"
                      }`}
                    >
                      save 18%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* tier cards */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="flex flex-col rounded-3xl border border-white/10 bg-fadig-bg-soft/40 p-8">
              <h2 className="font-display text-xl font-bold text-white">
                {TIERS.free.name}
              </h2>
              <p className="mt-1 text-sm text-fadig-cream/50">
                {TIERS.free.tagline}
              </p>
              <p className="mt-6 font-display text-4xl font-bold text-white">
                $0
                <span className="text-base font-medium text-fadig-cream/40">
                  {" "}
                  forever
                </span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {TIERS.free.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-fadig-cream/70"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-fadig-green-light" />
                    {f}
                  </li>
                ))}
              </ul>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="mt-8 w-full rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-fadig-cream/80 transition hover:border-white/30 hover:text-white">
                    Sign in free with Google
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button
                  disabled
                  className="mt-8 w-full cursor-default rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-fadig-cream/40"
                >
                  {active ? "Included in Pro" : "Your current plan"}
                </button>
              </SignedIn>
            </div>

            {/* Pro */}
            <div className="relative flex flex-col overflow-hidden rounded-3xl border border-fadig-green/40 bg-gradient-to-br from-fadig-bg-soft to-fadig-bg-soft-2 p-8 shadow-2xl shadow-fadig-green/10">
              <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-fadig-green/15 blur-3xl" />
              <span className="absolute top-5 right-5 inline-flex items-center gap-1 rounded-full bg-fadig-green px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                <Sparkles className="h-3 w-3" />
                Most popular
              </span>
              <h2 className="font-display text-xl font-bold text-white">
                {TIERS.pro.name}
              </h2>
              <p className="mt-1 text-sm text-fadig-cream/50">
                {TIERS.pro.tagline}
              </p>
              <p className="mt-6 font-display text-4xl font-bold text-white">
                ${pro.price}
                <span className="text-base font-medium text-fadig-cream/40">
                  {pro.suffix}
                </span>
              </p>
              <p className="mt-1 text-xs font-semibold text-fadig-yellow">
                {pro.note}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {TIERS.pro.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-fadig-cream/70"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-fadig-green-light" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={subscribe}
                disabled={checkingOut || active}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-fadig-green px-6 py-3.5 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-fadig-green/25 transition hover:bg-fadig-green-light disabled:cursor-default disabled:opacity-60"
              >
                {checkingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirecting to Stripe…
                  </>
                ) : active ? (
                  `You're on Pro (${plan})`
                ) : isSignedIn ? (
                  "Subscribe to Pro"
                ) : (
                  "Sign in & subscribe"
                )}
              </button>
              {error && (
                <p className="mt-3 text-center text-xs font-medium text-fadig-red-light">
                  {error}
                </p>
              )}
            </div>
          </div>

          <PaymentBadges />
        </div>
      </section>

      <Footer />
    </div>
  );
}
