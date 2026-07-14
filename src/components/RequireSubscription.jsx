import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import useSubscription from "../hooks/useSubscription";
import FullPageSpinner from "./FullPageSpinner";

/** Gate: dashboard requires a signed-in Clerk user with an active Pro subscription. */
export default function RequireSubscription({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { loading, active } = useSubscription();

  if (!isLoaded || (isSignedIn && loading)) {
    return <FullPageSpinner label="Checking your access…" />;
  }
  if (!isSignedIn) return <Navigate to="/pricing" replace />;
  if (!active) return <Navigate to="/pricing?upgrade=1" replace />;
  return children;
}
