# FaDig — Landing Page + Dashboard

A React (Vite + Tailwind v4) marketing site and live-data dashboard for
**FaDig**, built from the "Team Minus One" pitch deck (brown planthopper
outbreak prediction using satellite & climate analytics).

## What's inside

- **`/` — Landing page**: hero, problem framing, 4 key features (Early
  Warning System, Visual Data & Mapping, Data-Driven Insights, Guided Action
  Plans), how-it-works pipeline, SDG impact grid, team credit, and a CTA into
  the dashboard.
- **`/dashboard` — Illustrative dashboard**: stat cards, a 12-week pest
  population trend chart (Recharts), a color-coded field risk grid, a live
  alerts feed, an interactive guided action-plan checklist, and a weather
  strip. All data in `src/components/dashboard/mockData.js` is placeholder —
  swap it for your real API/telemetry when ready.

## Design system

Colors, logo, and type treatment were extracted directly from the FaDig
pitch deck (`Product Features Website/*.png`):

| Token | Hex | Used for |
|---|---|---|
| `fadig-bg` | `#2b1821` | page background |
| `fadig-green` / `fadig-green-light` | `#549217` / `#7ec53e` | brand, positive states |
| `fadig-red` / `fadig-red-light` | `#f02a18` / `#f35446` | CTAs, high-risk states |
| `fadig-yellow` | `#e7cc3c` | medium-risk / warning accents |

Fonts: **Baloo 2** (headings) + **Poppins** (body), loaded via Google Fonts
in `index.html`. The logo was cropped directly out of the deck and lives at
`src/assets/fadig-logo.png`.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
```

## Notes / next steps

- Dashboard data is mocked — wire `mockData.js` up to your real pest-risk
  API when available.
- `src/App.css`, `src/assets/react.svg`, `src/assets/hero.png` are unused
  leftovers from the Vite scaffold and can be deleted.
- Consider code-splitting (`React.lazy`) for the dashboard route if the
  bundle grows — `vite build` currently warns past 500kB.
