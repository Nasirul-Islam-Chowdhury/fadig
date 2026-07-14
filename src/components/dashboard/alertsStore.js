import { useSyncExternalStore } from "react";
import { alerts as initialAlerts } from "./mockData";

// Tiny shared store so the Topbar badge, AlertsPage, and AlertsFeed all see
// the same alert state. `seen` drives the badge (cleared by visiting the
// alerts page); `read` drives per-item styling (cleared by "Mark read").
let alertsState = initialAlerts.map((a) => ({ ...a, seen: a.read }));
const listeners = new Set();

function setState(next) {
  alertsState = next;
  listeners.forEach((l) => l());
}

export function markRead(id) {
  setState(
    alertsState.map((a) => (a.id === id ? { ...a, read: true, seen: true } : a)),
  );
}

export function dismissAlert(id) {
  setState(alertsState.filter((a) => a.id !== id));
}

export function markAllSeen() {
  if (alertsState.every((a) => a.seen)) return;
  setState(alertsState.map((a) => (a.seen ? a : { ...a, seen: true })));
}

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useAlerts() {
  return useSyncExternalStore(subscribe, () => alertsState);
}
