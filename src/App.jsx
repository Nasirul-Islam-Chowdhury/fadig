import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/dashboard/Overview";
import RiskMapPage from "./pages/dashboard/RiskMapPage";
import AlertsPage from "./pages/dashboard/AlertsPage";
import ReportsPage from "./pages/dashboard/ReportsPage";
import ActionPlansPage from "./pages/dashboard/ActionPlansPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import PricingPage from "./pages/PricingPage";
import BillingSuccessPage from "./pages/BillingSuccessPage";
import ScrollManager from "./components/ScrollManager";
import RequireSubscription from "./components/RequireSubscription";

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/billing/success" element={<BillingSuccessPage />} />
        <Route
          path="/dashboard"
          element={
            <RequireSubscription>
              <Dashboard />
            </RequireSubscription>
          }
        >
          <Route index element={<Overview />} />
          <Route path="risk-map" element={<RiskMapPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="action-plans" element={<ActionPlansPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
