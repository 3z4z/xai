import {
  CircleGauge,
  LucideDatabase,
  ShieldCheck,
  Sparkles,
  LucideAtom,
  LucideCog,
  LucideGrid,
  LucideLightbulb,
  LucideUser2,
} from "lucide-react";

export const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2375, pv: 1550 },
  { name: "Jul", uv: 3210, pv: 4875 },
  { name: "Aug", uv: 1990, pv: 6870 },
];

export const stats = [
  {
    label: "Total Ingested",
    value: "12.4 TB",
    change: "+14%",
    icon: LucideDatabase,
  },
  {
    label: "AI Confidence",
    value: "98.2%",
    change: "+2.1%",
    icon: ShieldCheck,
  },
  { label: "Insights Gen", value: "1,420", change: "+124", icon: Sparkles },
  { label: "System Latency", value: "24ms", change: "-4ms", icon: CircleGauge },
];

export const managementLinks = [
  { title: "Overview", icon: LucideGrid, key: "overview" },
  { title: "Insights", icon: LucideLightbulb, key: "insights" },
  { title: "Automation", icon: LucideAtom, key: "automation" },
];

export const userLinks = [
  { title: "Profile", icon: LucideUser2, key: "profile" },
  { title: "Settings", icon: LucideCog, key: "settings" },
];

export const insightSteps = [
  {
    title: "Ingest Data",
    subtitle: "Unified Data Aggregation",
    text: "Bridge the gap between siloed environments. Our engine connects to your entire stack—SQL, NoSQL, APIs, and raw documents—normalizing disparate data into a high-fidelity vector space in real-time.",
    features: ["Multi-source Sync", "Auto-Schema Mapping", "Real-time ETL"],
  },
  {
    title: "Analyze with AI",
    subtitle: "Neural Context Engine",
    text: "Move beyond keyword search. Our LLM-orchestration layer performs deep semantic analysis, identifying hidden correlations and anomalies across millions of data points that human observers miss.",
    features: ["Pattern Recognition", "Semantic Search", "Anomaly Detection"],
  },
  {
    title: "Generate Insight",
    subtitle: "Strategic Decision Intelligence",
    text: "Convert complexity into clarity. Automated reports, executive summaries, and predictive forecasting are generated instantly, providing a clear roadmap for your next strategic move.",
    features: ["Automated Reporting", "Trend Forecasting", "Actionable Alerts"],
  },
];
