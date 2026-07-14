import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { User, Bell, Satellite, ShieldCheck } from "lucide-react";

function Toggle({ enabled, onChange, label }) {
  return (
    <button
      onClick={onChange}
      aria-label={label}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled ? "bg-fadig-green" : "bg-white/10"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function Card({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-fadig-bg-soft/50 p-6">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-fadig-green-light" />
        <h3 className="font-display text-sm font-bold text-white">{title}</h3>
      </div>
      {subtitle && (
        <p className="mt-1 text-[11px] text-fadig-cream/40">{subtitle}</p>
      )}
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  // real account data from Clerk (guard guarantees a signed-in user here)
  const { user } = useUser();
  const [profile, setProfile] = useState(() => ({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: user?.primaryPhoneNumber?.phoneNumber || "",
    division: "",
  }));
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    weeklyDigest: true,
  });

  const [sources, setSources] = useState({
    nasa: true,
    noaa: true,
    fieldSensors: true,
    droneImagery: false,
  });

  const updateProfile = (key) => (e) =>
    setProfile((p) => ({ ...p, [key]: e.target.value }));

  const toggleNotif = (key) =>
    setNotifications((n) => ({ ...n, [key]: !n[key] }));

  const toggleSource = (key) =>
    setSources((s) => ({ ...s, [key]: !s[key] }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError(null);
    try {
      // persist the name to the Clerk account; phone/division are demo-only
      const [firstName, ...rest] = profile.name.trim().split(/\s+/);
      await user.update({ firstName, lastName: rest.join(" ") });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err.errors?.[0]?.message || err.message);
    }
  };

  return (
    <>
      <Card icon={User} title="Profile" subtitle="Your account details">
        <div className="mb-5 flex items-center gap-3">
          {user?.imageUrl && (
            <img
              src={user.imageUrl}
              alt="Profile"
              className="h-12 w-12 rounded-full border border-white/10"
            />
          )}
          <div>
            <p className="text-sm font-semibold text-white">
              {user?.fullName || "Your account"}
            </p>
            <p className="text-[11px] text-fadig-cream/40">
              Signed in with Google via Clerk
            </p>
          </div>
        </div>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-xs font-medium text-fadig-cream/50">
            Full name
            <input
              value={profile.name}
              onChange={updateProfile("name")}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-fadig-green/50 focus:outline-none"
            />
          </label>
          <label className="text-xs font-medium text-fadig-cream/50">
            Email (from your Google account)
            <input
              value={profile.email}
              readOnly
              className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-fadig-cream/60 focus:outline-none"
            />
          </label>
          <label className="text-xs font-medium text-fadig-cream/50">
            Phone
            <input
              value={profile.phone}
              onChange={updateProfile("phone")}
              placeholder="+880 1XXX-XXXXXX"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-fadig-green/50 focus:outline-none"
            />
          </label>
          <label className="text-xs font-medium text-fadig-cream/50">
            Division
            <input
              value={profile.division}
              onChange={updateProfile("division")}
              placeholder="e.g. Sylhet Division"
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white focus:border-fadig-green/50 focus:outline-none"
            />
          </label>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-fadig-green px-6 py-2.5 text-xs font-bold tracking-wide text-white uppercase shadow-lg shadow-fadig-green/20 transition hover:bg-fadig-green-light"
            >
              Save changes
            </button>
            {saved && (
              <span className="ml-3 text-xs font-medium text-fadig-green-light">
                Saved ✓
              </span>
            )}
            {saveError && (
              <span className="ml-3 text-xs font-medium text-fadig-red-light">
                {saveError}
              </span>
            )}
          </div>
        </form>
      </Card>

      <Card
        icon={Bell}
        title="Notifications"
        subtitle="Choose how you want to hear about risk changes"
      >
        <div className="divide-y divide-white/5">
          {[
            ["email", "Email alerts", "Critical and high-severity alerts by email"],
            ["sms", "SMS alerts", "Instant text messages for zone-critical events"],
            ["push", "Push notifications", "Mobile app push notifications"],
            ["weeklyDigest", "Weekly digest", "A weekly summary of all activity"],
          ].map(([key, label, desc]) => (
            <div key={key} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
              <div>
                <p className="text-xs font-semibold text-white">{label}</p>
                <p className="text-[11px] text-fadig-cream/40">{desc}</p>
              </div>
              <Toggle
                enabled={notifications[key]}
                onChange={() => toggleNotif(key)}
                label={label}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card
        icon={Satellite}
        title="Connected Data Sources"
        subtitle="Feeds powering your risk predictions"
      >
        <div className="divide-y divide-white/5">
          {[
            ["nasa", "NASA Earth Observation", "Vegetation & land-surface imagery"],
            ["noaa", "NOAA Climate Data", "Temperature, humidity, wind models"],
            ["fieldSensors", "Field Sensors", "On-the-ground humidity & soil probes"],
            ["droneImagery", "Drone Imagery", "High-resolution crop canopy scans"],
          ].map(([key, label, desc]) => (
            <div key={key} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
              <div>
                <p className="text-xs font-semibold text-white">{label}</p>
                <p className="text-[11px] text-fadig-cream/40">{desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-bold ${sources[key] ? "text-fadig-green-light" : "text-fadig-cream/30"}`}
                >
                  {sources[key] ? "Connected" : "Disabled"}
                </span>
                <Toggle
                  enabled={sources[key]}
                  onChange={() => toggleSource(key)}
                  label={label}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        icon={ShieldCheck}
        title="Security"
        subtitle="Keep your account protected"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-white">Two-factor authentication</p>
            <p className="text-[11px] text-fadig-cream/40">
              Adds an extra step when signing in from a new device.
            </p>
          </div>
          <button className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-fadig-cream/80 transition hover:border-fadig-green/50 hover:text-white">
            Enable 2FA
          </button>
        </div>
      </Card>
    </>
  );
}
