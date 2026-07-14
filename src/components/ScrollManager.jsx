import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Router-aware scrolling: on every navigation, scroll to the URL hash target
 * (retrying across frames until React has rendered it) or to the top when
 * there is no hash. Native fragment scrolling can't handle cross-page hash
 * links in an SPA because the target section doesn't exist at load time.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.slice(1);
    let frame;
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts++ < 30) {
        frame = requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
