import * as THREE from "three";

// Rough, stylized continent silhouettes as [lat, lng] rings — not
// survey-accurate, just recognizable at globe scale and smoothed into soft
// blobs so imprecision reads as "stylized" rather than "wrong".
const NORTH_AMERICA = [
  [71, -156], [70, -141], [69, -125], [60, -125], [54, -130], [48, -124],
  [40, -124], [34, -120], [32, -117], [25, -111], [23, -106], [20, -105],
  [16, -95], [15, -92], [18, -88], [21, -87], [25, -97], [29, -95],
  [30, -89], [29, -82], [27, -80], [31, -81], [35, -76], [40, -74],
  [44, -67], [47, -60], [52, -56], [58, -63], [63, -78], [68, -85],
  [70, -95],
];

const SOUTH_AMERICA = [
  [12, -72], [11, -74], [8, -77], [1, -79], [-3, -81], [-6, -81],
  [-14, -76], [-18, -70], [-24, -70], [-30, -71], [-38, -73], [-45, -74],
  [-52, -74], [-55, -68], [-52, -64], [-45, -65], [-38, -62], [-33, -58],
  [-30, -53], [-23, -48], [-13, -39], [-8, -35], [-3, -40], [2, -50],
  [5, -53], [8, -60], [10, -65],
];

const EURASIA = [
  [71, 25], [75, 60], [75, 100], [70, 140], [60, 160], [50, 157],
  [45, 142], [40, 130], [32, 122], [25, 122], [22, 108], [10, 106],
  [8, 98], [13, 93], [20, 93], [22, 89], [21, 88], [16, 81], [8, 77],
  [8, 73], [15, 73], [24, 67], [27, 61], [30, 49], [29, 34], [31, 32],
  [33, 35], [36, 36], [37, 27], [41, 29], [45, 29], [48, 38], [55, 38],
  [58, 30], [60, 30], [65, 25], [68, 20],
];

const AFRICA = [
  [37, 10], [33, 10], [31, 20], [31, 32], [22, 37], [12, 43], [2, 45],
  [-5, 40], [-12, 40], [-18, 35], [-26, 33], [-34, 26], [-34, 19],
  [-29, 17], [-22, 14], [-17, 12], [-10, 13], [-4, 9], [4, 9], [4, -2],
  [10, -5], [15, -17], [21, -17], [28, -13], [33, -8], [35, -6],
];

const AUSTRALIA = [
  [-11, 131], [-12, 136], [-15, 136], [-12, 141], [-16, 145], [-19, 146],
  [-24, 153], [-28, 153], [-33, 151], [-38, 147], [-38, 140], [-35, 136],
  [-33, 134], [-32, 127], [-31, 115], [-25, 113], [-20, 114], [-16, 122],
  [-14, 127],
];

const GREENLAND = [[83, -40], [76, -20], [70, -25], [66, -38], [70, -55], [77, -65]];
const UK = [[59, -3], [54, -3], [51, -5], [50, -1], [52, 1], [55, -2]];
const JAPAN = [[45, 142], [40, 142], [36, 138], [33, 131], [31, 130], [35, 133], [38, 139], [41, 140]];
const MADAGASCAR = [[-12, 49], [-16, 50], [-22, 48], [-25, 45], [-21, 43], [-16, 44]];
const MARITIME_SEA = [[6, 122], [5, 119], [-2, 113], [-6, 106], [-8, 115], [-8, 119], [-3, 122], [0, 124], [3, 125]];

const CONTINENTS = [
  NORTH_AMERICA,
  SOUTH_AMERICA,
  EURASIA,
  AFRICA,
  AUSTRALIA,
  GREENLAND,
  UK,
  JAPAN,
  MADAGASCAR,
  MARITIME_SEA,
];

function project(lat, lng, w, h) {
  return [((lng + 180) / 360) * w, ((90 - lat) / 180) * h];
}

// Draw a ring of [lat,lng] points as a smooth, organic blob (quadratic
// curves through midpoints) rather than a jagged polygon.
function drawBlob(ctx, ring, w, h) {
  const pts = ring.map(([lat, lng]) => project(lat, lng, w, h));
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

  ctx.beginPath();
  const startMid = mid(pts[0], pts[pts.length - 1]);
  ctx.moveTo(startMid[0], startMid[1]);
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const m = mid(curr, next);
    ctx.quadraticCurveTo(curr[0], curr[1], m[0], m[1]);
  }
  ctx.closePath();
  ctx.fill();
}

export function createEarthTexture() {
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  // ocean — dark teal-navy so it reads as "water" without clashing with the
  // page's black-green background
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#101c22");
  grad.addColorStop(0.5, "#16232a");
  grad.addColorStop(1, "#101c22");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // faint baked-in lat/lng grid
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let lat = -60; lat <= 60; lat += 30) {
    const [, y] = project(lat, 0, w, h);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 30) {
    const [x] = project(0, lng, w, h);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  // land masses
  ctx.fillStyle = "#436b2d";
  CONTINENTS.forEach((ring) => drawBlob(ctx, ring, w, h));

  // subtle highlight rim on land for depth
  ctx.strokeStyle = "rgba(126,197,62,0.25)";
  ctx.lineWidth = 1.5;
  CONTINENTS.forEach((ring) => {
    ctx.beginPath();
    const pts = ring.map(([lat, lng]) => project(lat, lng, w, h));
    ctx.moveTo(pts[0][0], pts[0][1]);
    pts.forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.closePath();
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
