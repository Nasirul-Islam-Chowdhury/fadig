import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import Logo from "../components/Logo";
import { fetchJson } from "../lib/api";

export default function BillingSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");
  const started = useRef(false);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!isLoaded || started.current) return;
    if (!sessionId) {
      setStatus("error");
      setMessage("Missing checkout session.");
      return;
    }
    if (!isSignedIn) {
      setStatus("error");
      setMessage("Please sign in with the account that made the payment.");
      return;
    }
    started.current = true; // server upsert is idempotent, but skip the double-fire anyway

    (async () => {
      try {
        const token = await getToken();
        await fetchJson(
          `/api/checkout/verify?session_id=${encodeURIComponent(sessionId)}`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` } },
        );
        setStatus("success");
        setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
      } catch (err) {
        setStatus("error");
        setMessage(err.message);
      }
    })();
  }, [isLoaded, isSignedIn, sessionId, getToken, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-fadig-bg px-6 text-center text-fadig-cream">
      <Logo className="h-12 w-auto" />

      {status === "verifying" && (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-fadig-green-light" />
          <h1 className="font-display text-2xl font-bold text-white">
            Confirming your payment…
          </h1>
          <p className="max-w-sm text-sm text-fadig-cream/60">
            Verifying your checkout with Stripe and activating FaDig Pro.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="h-12 w-12 text-fadig-green-light" />
          <h1 className="font-display text-2xl font-bold text-white">
            Welcome to FaDig Pro!
          </h1>
          <p className="max-w-sm text-sm text-fadig-cream/60">
            Your subscription is active. Taking you to your dashboard…
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4">
          <XCircle className="h-12 w-12 text-fadig-red-light" />
          <h1 className="font-display text-2xl font-bold text-white">
            We couldn't confirm the payment
          </h1>
          <p className="max-w-sm text-sm text-fadig-cream/60">{message}</p>
          <Link
            to="/pricing"
            className="mt-2 rounded-full bg-fadig-green px-6 py-3 text-sm font-bold tracking-wide text-white uppercase shadow-xl shadow-fadig-green/25 transition hover:bg-fadig-green-light"
          >
            Back to pricing
          </Link>
        </div>
      )}
    </div>
  );
}
