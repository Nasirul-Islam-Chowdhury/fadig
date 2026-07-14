import { Loader2 } from "lucide-react";
import Logo from "./Logo";

export default function FullPageSpinner({ label = "Loading…" }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-fadig-bg text-fadig-cream">
      <Logo className="h-12 w-auto" />
      <div className="flex items-center gap-3 text-sm text-fadig-cream/60">
        <Loader2 className="h-5 w-5 animate-spin text-fadig-green-light" />
        {label}
      </div>
    </div>
  );
}
