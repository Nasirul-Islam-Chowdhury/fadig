import * as THREE from "three";

/**
 * Convert lat/lng (degrees) to a position on a sphere of the given radius,
 * using the standard equirectangular convention so it lines up with the
 * CanvasTexture UVs produced in earthTexture.js.
 */
export function latLngToVector3(lat, lng, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Real brown planthopper (BPH) hotspots in major rice-growing regions.
export const HIGH_RISK = [
  { name: "Rangpur, Bangladesh", lat: 25.75, lng: 89.25 },
  { name: "Mekong Delta, Vietnam", lat: 10.0, lng: 105.8 },
  { name: "West Bengal, India", lat: 22.9, lng: 88.4 },
  { name: "Central Luzon, Philippines", lat: 15.5, lng: 120.9 },
  { name: "Guangdong, China", lat: 23.1, lng: 113.3 },
];

export const MEDIUM_RISK = [
  { name: "Central Thailand", lat: 15.87, lng: 100.99 },
  { name: "Ayeyarwady, Myanmar", lat: 16.8, lng: 95.2 },
  { name: "Central Java, Indonesia", lat: -7.6, lng: 110.4 },
];

// Reference regions with negligible BPH pressure this season.
export const NO_RISK = [
  { name: "Western Australia", lat: -25.3, lng: 122.0 },
  { name: "Iowa, USA", lat: 42.0, lng: -93.6 },
  { name: "Normandy, France", lat: 49.0, lng: 0.5 },
  { name: "Hokkaido, Japan", lat: 43.0, lng: 142.8 },
];

// Simplified wind-borne BPH migration corridors (a real, documented
// phenomenon — planthoppers ride seasonal monsoon winds across the region).
export const MIGRATION_ROUTES = [
  {
    from: { lat: 8, lng: 107 },
    to: HIGH_RISK[0], // -> Bangladesh
  },
  {
    from: { lat: 18, lng: 108 },
    to: HIGH_RISK[3], // -> Philippines
  },
  {
    from: { lat: 20, lng: 96 },
    to: HIGH_RISK[2], // -> West Bengal
  },
];
