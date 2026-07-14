import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { fetchJson } from "../lib/api";

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
      const data = await fetchJson("/api/subscription", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
