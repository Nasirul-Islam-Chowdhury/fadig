import { Thermometer, Droplets, CloudRain, Wind } from "lucide-react";
import { weather } from "./mockData";

const ICONS = {
  Temperature: Thermometer,
  Humidity: Droplets,
  Rainfall: CloudRain,
  Wind: Wind,
};

export default function WeatherStrip() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {weather.map((w) => {
        const Icon = ICONS[w.label];
        return (
          <div
            key={w.label}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fadig-green/15 text-fadig-green-light">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-bold text-white">
                {w.value}
              </p>
              <p className="text-[10px] text-fadig-cream/40">{w.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
