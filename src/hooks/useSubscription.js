import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

/**
 * Fetches the signed-in user's subscription from the API.
 * Signed-out users resolve immediately to { active: false }.
 */
export default function useSubscription() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [state, setState] = useState({ loading: true, active: false, plan: null });

  const refresh = useCallback(async () => {
    if (!isSignedIn) {
      setState({ loading: false, active: false, plan: null });
      return;
    }
    try {
      const token = await getToken();
      const res = await fetch("/api/subscription", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setState({ loading: false, active: !!data.active, plan: data.plan ?? null });
    } catch {
      setState({ loading: false, active: false, plan: null });
    }
  }, [isSignedIn, getToken]);

  useEffect(() => {
    if (!isLoaded) return;
    refresh();
  }, [isLoaded, refresh]);

  return { ...state, loading: !isLoaded || state.loading, refresh };
}
