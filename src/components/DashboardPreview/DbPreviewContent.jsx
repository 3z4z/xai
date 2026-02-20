"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  CircleGauge,
  LucideDatabase,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2375, pv: 1550 },
  { name: "Jul", uv: 3210, pv: 4875 },
  { name: "Aug", uv: 1990, pv: 6870 },
];

const stats = [
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

export default function DashboardView() {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.section
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-6 rounded-3xl"
    >
      <div className="grid md:grid-cols-[1fr_320px] gap-4">
        <div className="space-y-6 max-md:order-2">
          <div className="h-[320px] w-full px-6 pt-8 pb-12 rounded-2xl bg-base-200 border border-primary/14 group cursor-pointer">
            <h4 className="mb-4 font-medium opacity-75 group-hover:text-primary transition-all">
              Data Ingestion Flow
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(70% 0.22 240)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(70% 0.22 240)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff16"
                />
                <XAxis
                  dataKey="name"
                  stroke="#789"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#789" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="oklch(70% 0.22 240)"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                  isAnimationActive={isInView}
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[320px] w-full px-6 pt-8 pb-12 rounded-2xl bg-base-200 border border-secondary/14 group cursor-pointer">
            <h4 className="mb-4 font-medium opacity-75 group-hover:text-secondary transition-all">
              Processing Efficiency
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff16"
                />
                <XAxis dataKey="name" stroke="#789" fontSize={12} />
                <YAxis stroke="#789" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "#ffffff05" }}
                  contentStyle={{ backgroundColor: "#111", border: "none" }}
                />
                <Bar
                  dataKey="pv"
                  fill="oklch(55% 0.23 300)"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={isInView}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid md:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all border border-primary/17 hover:border-primary/30 even:border-secondary/17 hover:even:border-secondary/30 shadow-none hover:shadow-xl shadow-primary/15 even:shadow-secondary/15 cursor-pointer group flex flex-col"
            >
              <div>
                <p className="text-sm group-hover:text-primary group-even:group-hover:text-secondary transition-all opacity-60 group-hover:opacity-80">
                  {stat.label}
                </p>
                <div className="flex items-end gap-2 mt-2">
                  <h3 className="text-2xl font-bold opacity-80 group-hover:opacity-100">
                    {stat.value}
                  </h3>
                  <span className="text-xs text-success mb-1">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex justify-end items-end">
                <p className="border border-primary/25 bg-primary/8 group-even:border-secondary/25 group-even:bg-secondary/8 p-2 rounded-xl size-11 flex items-center justify-center">
                  <stat.icon className="text-primary group-even:text-secondary" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
        <table className="table w-full text-left">
          <thead className="bg-primary/10">
            <tr>
              <th className="p-4">Source</th>
              <th className="p-4">Status</th>
              <th className="p-4">Confidence</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="hover:bg-primary/5 transition-colors">
                <td className="p-4 font-mono text-sm">
                  AWS_S3_BUCKET_0{index + 1}
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                    ACTIVE
                  </span>
                </td>
                <td className="p-4">{(95 + index).toFixed(1)}%</td>
                <td className="p-4 text-gray-500 text-sm">2 mins ago</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
