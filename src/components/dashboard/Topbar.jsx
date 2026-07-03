import { useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, MapPin, TriangleAlert } from "lucide-react";
import { alerts, zones } from "./mockData";

const PAGE_META = {
  "/dashboard": {
    title: "Field Overview",
    subtitle: "Live satellite & climate monitoring across your registered fields",
  },
  "/dashboard/risk-map": {
    title: "Risk Map",
    subtitle: "Zone-by-zone brown planthopper risk across every monitored division",
  },
  "/dashboard/alerts": {
    title: "Alerts",
    subtitle: "Every satellite, climate, and field-sensor alert in one place",
  },
  "/dashboard/reports": {
    title: "Reports",
    subtitle: "Seasonal analysis and downloadable outbreak reports",
  },
  "/dashboard/action-plans": {
    title: "Action Plans",
    subtitle: "Recommended interventions, grouped by urgency",
  },
  "/dashboard/settings": {
    title: "Settings",
    subtitle: "Manage your profile, notifications, and connected data sources",
  },
};

export default function Topbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const meta = PAGE_META[pathname] ?? PAGE_META["/dashboard"];
  const unreadCount = alerts.filter((a) => !a.read).length;

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const blurTimer = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { zoneHits: [], alertHits: [] };
    return {
      zoneHits: zones
        .filter(
          (z) =>
            z.name.toLowerCase().includes(q) ||
            z.division.toLowerCase().includes(q)
        )
        .slice(0, 4),
      alertHits: alerts
        .filter(
          (a) =>
            a.zone.toLowerCase().includes(q) ||
            a.message.toLowerCase().includes(q)
        )
        .slice(0, 4),
    };
  }, [query]);

  const hasResults = results.zoneHits.length > 0 || results.alertHits.length > 0;

  const goToZone = () => {
    setQuery("");
    navigate("/dashboard/risk-map");
  };
  const goToAlert = () => {
    setQuery("");
    navigate("/dashboard/alerts");
  };

  return (
    <div className="hidden items-center justify-between border-b border-white/5 bg-fadig-bg/60 px-8 py-5 backdrop-blur lg:flex">
      <div>
        <h1 className="font-display text-xl font-bold text-white">
          {meta.title}
        </h1>
        <p className="text-xs text-fadig-cream/50">{meta.subtitle}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-fadig-cream/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              clearTimeout(blurTimer.current);
              setFocused(true);
            }}
            onBlur={() => {
              blurTimer.current = setTimeout(() => setFocused(false), 150);
            }}
            placeholder="Search zones, alerts..."
            className="w-64 rounded-full border border-white/10 bg-white/5 py-2 pr-4 pl-9 text-sm text-white placeholder:text-fadig-cream/30 focus:border-fadig-green/50 focus:outline-none"
          />

          {focused && query.trim() && (
            <div className="absolute top-full right-0 z-20 mt-2 w-80 overflow-hidden rounded-2xl border border-white/10 bg-fadig-bg-soft shadow-2xl shadow-black/40">
              {hasResults ? (
                <div className="max-h-80 overflow-y-auto py-2">
                  {results.zoneHits.length > 0 && (
                    <div className="px-2">
                      <p className="px-2.5 py-1 text-[10px] font-bold tracking-wide text-fadig-cream/40 uppercase">
                        Zones
                      </p>
                      {results.zoneHits.map((z) => (
                        <button
                          key={z.id}
                          onMouseDown={goToZone}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs text-fadig-cream/80 hover:bg-white/5"
                        >
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-fadig-green-light" />
                          <span className="truncate">
                            {z.name} · {z.division}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {results.alertHits.length > 0 && (
                    <div className="px-2">
                      <p className="px-2.5 py-1 text-[10px] font-bold tracking-wide text-fadig-cream/40 uppercase">
                        Alerts
                      </p>
                      {results.alertHits.map((a) => (
                        <button
                          key={a.id}
                          onMouseDown={goToAlert}
                          className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs text-fadig-cream/80 hover:bg-white/5"
                        >
                          <TriangleAlert className="h-3.5 w-3.5 shrink-0 text-fadig-red-light" />
                          <span className="truncate">{a.zone}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="px-4 py-4 text-xs text-fadig-cream/40">
                  No matches for “{query}”.
                </p>
              )}
            </div>
          )}
        </div>

        <Link
          to="/dashboard/alerts"
          className="relative rounded-full border border-white/10 p-2.5 text-fadig-cream/70 transition hover:border-white/25 hover:text-white"
          aria-label="View alerts"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-fadig-red text-[9px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link
          to="/dashboard/settings"
          className="flex items-center gap-2.5 rounded-full border border-white/10 py-1.5 pr-4 pl-1.5 transition hover:border-white/25"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-fadig-green to-fadig-green-light text-xs font-bold text-white">
            RH
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Rahim Hasan</p>
            <p className="text-[10px] text-fadig-cream/40">Rangpur Division</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
