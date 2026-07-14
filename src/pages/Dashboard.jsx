import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

// Shared shell for every /dashboard/* route: sidebar + topbar stay put,
// the active page renders into the Outlet below.
export default function Dashboard() {
  // column on mobile (header bar on top), row on desktop (sidebar left)
  return (
    <div className="flex min-h-screen flex-col bg-fadig-bg text-fadig-cream lg:flex-row">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="space-y-6 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
