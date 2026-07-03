export const stats = [
  {
    label: "Active Alerts",
    value: "7",
    delta: "+3 this week",
    trend: "up",
    tone: "red",
  },
  {
    label: "Fields Monitored",
    value: "128",
    delta: "+12 this month",
    trend: "up",
    tone: "green",
  },
  {
    label: "Regional Risk Level",
    value: "High",
    delta: "68% probability",
    trend: "up",
    tone: "yellow",
  },
  {
    label: "Avg. Response Time",
    value: "2.4h",
    delta: "-40 min vs last season",
    trend: "down",
    tone: "green",
  },
];

// 24 mock field plots for the risk grid, deterministic (not random per render)
export const fieldGrid = [
  "low","low","medium","high","low","medium",
  "medium","high","high","medium","low","low",
  "low","medium","high","high","medium","low",
  "medium","low","low","medium","high","medium",
];

export const trend = [
  { week: "W1", index: 12, threshold: 40 },
  { week: "W2", index: 18, threshold: 40 },
  { week: "W3", index: 15, threshold: 40 },
  { week: "W4", index: 22, threshold: 40 },
  { week: "W5", index: 28, threshold: 40 },
  { week: "W6", index: 26, threshold: 40 },
  { week: "W7", index: 34, threshold: 40 },
  { week: "W8", index: 41, threshold: 40 },
  { week: "W9", index: 47, threshold: 40 },
  { week: "W10", index: 52, threshold: 40 },
  { week: "W11", index: 45, threshold: 40 },
  { week: "W12", index: 39, threshold: 40 },
];

export const alerts = [
  {
    id: 1,
    severity: "high",
    zone: "Zone 4B · Rangpur",
    message: "Brown planthopper probability up 38% following high humidity.",
    time: "12 min ago",
    source: "NASA + NOAA",
    read: false,
  },
  {
    id: 2,
    severity: "high",
    zone: "Zone 2A · Rajshahi",
    message: "Sustained temperature spike raises risk to critical.",
    time: "1 hr ago",
    source: "NOAA Climate",
    read: false,
  },
  {
    id: 3,
    severity: "medium",
    zone: "Zone 7C · Sylhet",
    message: "Early signs of population growth detected via satellite imagery.",
    time: "3 hrs ago",
    source: "Satellite",
    read: false,
  },
  {
    id: 4,
    severity: "medium",
    zone: "Zone 1D · Comilla",
    message: "Wind patterns favor pest migration from neighboring fields.",
    time: "6 hrs ago",
    source: "Climate Model",
    read: true,
  },
  {
    id: 5,
    severity: "low",
    zone: "Zone 5A · Bogura",
    message: "Conditions stable — continue routine monitoring.",
    time: "Yesterday",
    source: "Field Sensor",
    read: true,
  },
  {
    id: 6,
    severity: "high",
    zone: "Zone 3F · Khulna",
    message: "Migration corridor detected moving in from neighboring district.",
    time: "Yesterday",
    source: "Satellite",
    read: false,
  },
  {
    id: 7,
    severity: "medium",
    zone: "Zone 6B · Barisal",
    message: "Humidity crossed 80% for the third consecutive day.",
    time: "2 days ago",
    source: "Field Sensor",
    read: true,
  },
  {
    id: 8,
    severity: "low",
    zone: "Zone 8A · Mymensingh",
    message: "Weekly scan complete — no anomalies detected.",
    time: "3 days ago",
    source: "Satellite",
    read: true,
  },
  {
    id: 9,
    severity: "medium",
    zone: "Zone 2C · Rajshahi",
    message: "Neighboring field reported outbreak — monitor closely.",
    time: "4 days ago",
    source: "Farmer Forum",
    read: true,
  },
  {
    id: 10,
    severity: "high",
    zone: "Zone 4D · Rangpur",
    message: "Pest index crossed alert threshold of 40.",
    time: "5 days ago",
    source: "Climate Model",
    read: true,
  },
];

// Detailed per-zone data for the Risk Map page
export const zones = [
  { id: 1, name: "Zone 1A", division: "Comilla", risk: "low", pestIndex: 14, areaHa: 42, updated: "4 min ago" },
  { id: 2, name: "Zone 1D", division: "Comilla", risk: "medium", pestIndex: 31, areaHa: 38, updated: "6 hrs ago" },
  { id: 3, name: "Zone 2A", division: "Rajshahi", risk: "high", pestIndex: 58, areaHa: 51, updated: "1 hr ago" },
  { id: 4, name: "Zone 2C", division: "Rajshahi", risk: "medium", pestIndex: 36, areaHa: 29, updated: "4 days ago" },
  { id: 5, name: "Zone 3F", division: "Khulna", risk: "high", pestIndex: 61, areaHa: 47, updated: "Yesterday" },
  { id: 6, name: "Zone 4B", division: "Rangpur", risk: "high", pestIndex: 64, areaHa: 55, updated: "12 min ago" },
  { id: 7, name: "Zone 4D", division: "Rangpur", risk: "high", pestIndex: 49, areaHa: 33, updated: "5 days ago" },
  { id: 8, name: "Zone 5A", division: "Bogura", risk: "low", pestIndex: 11, areaHa: 40, updated: "Yesterday" },
  { id: 9, name: "Zone 5C", division: "Bogura", risk: "low", pestIndex: 9, areaHa: 26, updated: "2 days ago" },
  { id: 10, name: "Zone 6B", division: "Barisal", risk: "medium", pestIndex: 34, areaHa: 31, updated: "2 days ago" },
  { id: 11, name: "Zone 7C", division: "Sylhet", risk: "medium", pestIndex: 39, areaHa: 45, updated: "3 hrs ago" },
  { id: 12, name: "Zone 7E", division: "Sylhet", risk: "low", pestIndex: 16, areaHa: 22, updated: "3 days ago" },
  { id: 13, name: "Zone 8A", division: "Mymensingh", risk: "low", pestIndex: 8, areaHa: 37, updated: "3 days ago" },
  { id: 14, name: "Zone 8D", division: "Mymensingh", risk: "medium", pestIndex: 28, areaHa: 24, updated: "6 hrs ago" },
  { id: 15, name: "Zone 9A", division: "Dhaka", risk: "low", pestIndex: 12, areaHa: 19, updated: "1 day ago" },
  { id: 16, name: "Zone 9B", division: "Chittagong", risk: "high", pestIndex: 53, areaHa: 41, updated: "8 hrs ago" },
];

// Generated report archive for the Reports page
export const reports = [
  { id: 1, title: "Weekly Risk Summary — W12", period: "Jun 22 – Jun 28, 2026", type: "Weekly", generatedOn: "Jun 29, 2026", fileSize: "1.2 MB" },
  { id: 2, title: "Rangpur Division Outbreak Analysis", period: "Q2 2026", type: "Regional", generatedOn: "Jun 25, 2026", fileSize: "3.4 MB" },
  { id: 3, title: "Monthly Climate & Pest Correlation", period: "May 2026", type: "Monthly", generatedOn: "Jun 1, 2026", fileSize: "2.1 MB" },
  { id: 4, title: "Seasonal Forecast — Boro Season", period: "2025–26 Season", type: "Seasonal", generatedOn: "May 14, 2026", fileSize: "4.8 MB" },
  { id: 5, title: "Weekly Risk Summary — W11", period: "Jun 15 – Jun 21, 2026", type: "Weekly", generatedOn: "Jun 22, 2026", fileSize: "1.1 MB" },
  { id: 6, title: "Farmer Advisory Digest", period: "Jun 2026", type: "Advisory", generatedOn: "Jun 18, 2026", fileSize: "0.8 MB" },
];

export const actionPlan = [
  {
    id: "trap",
    title: "Deploy light traps in Zone 4B",
    detail: "Reduces adult population before egg-laying peaks.",
    done: false,
  },
  {
    id: "pesticide",
    title: "Apply eco-friendly neem-based pesticide",
    detail: "Recommended for zones flagged medium risk or higher.",
    done: false,
  },
  {
    id: "consult",
    title: "Consult regional agricultural advisor",
    detail: "Confirm treatment plan for Zone 2A before it turns critical.",
    done: true,
  },
  {
    id: "forum",
    title: "Share field notes on the Farmer Forum",
    detail: "Helps neighboring farms anticipate the same outbreak window.",
    done: false,
  },
];

export const weather = [
  { label: "Temperature", value: "31°C" },
  { label: "Humidity", value: "82%" },
  { label: "Rainfall", value: "14mm" },
  { label: "Wind", value: "12 km/h" },
];

// Fuller checklist for the dedicated Action Plans page, grouped by urgency
export const actionPlanFull = [
  {
    id: "trap",
    category: "Immediate",
    title: "Deploy light traps in Zone 4B",
    detail: "Reduces adult population before egg-laying peaks.",
    done: false,
  },
  {
    id: "pesticide",
    category: "Immediate",
    title: "Apply eco-friendly neem-based pesticide",
    detail: "Recommended for zones flagged medium risk or higher.",
    done: false,
  },
  {
    id: "isolate",
    category: "Immediate",
    title: "Isolate Zone 2A from irrigation shared with Zone 2C",
    detail: "Limits pest migration through shared water channels.",
    done: false,
  },
  {
    id: "consult",
    category: "This Week",
    title: "Consult regional agricultural advisor",
    detail: "Confirm treatment plan for Zone 2A before it turns critical.",
    done: true,
  },
  {
    id: "forum",
    category: "This Week",
    title: "Share field notes on the Farmer Forum",
    detail: "Helps neighboring farms anticipate the same outbreak window.",
    done: false,
  },
  {
    id: "resistant",
    category: "This Week",
    title: "Order resistant seed varieties for next planting",
    detail: "BRRI-recommended planthopper-resistant cultivars for Rangpur.",
    done: false,
  },
  {
    id: "drainage",
    category: "Ongoing",
    title: "Maintain alternate wetting and drying irrigation",
    detail: "Reduces humidity levels that favor planthopper breeding.",
    done: true,
  },
  {
    id: "training",
    category: "Ongoing",
    title: "Schedule quarterly field-agent training",
    detail: "Keeps local scouts current on early detection signs.",
    done: false,
  },
];
