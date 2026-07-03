import StatCards from "../../components/dashboard/StatCards";
import RiskGrid from "../../components/dashboard/RiskGrid";
import TrendChart from "../../components/dashboard/TrendChart";
import AlertsFeed from "../../components/dashboard/AlertsFeed";
import ActionPlan from "../../components/dashboard/ActionPlan";
import WeatherStrip from "../../components/dashboard/WeatherStrip";

export default function Overview() {
  return (
    <>
      <StatCards />
      <WeatherStrip />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <TrendChart />
          <RiskGrid />
        </div>
        <div className="space-y-6">
          <AlertsFeed />
          <ActionPlan />
        </div>
      </div>
    </>
  );
}
